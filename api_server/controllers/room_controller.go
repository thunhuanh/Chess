package controllers

import (
	model "Chess/api_server/models"
	"Chess/api_server/services/roomService"
	"encoding/json"
	"github.com/go-chi/chi"
	"github.com/go-chi/render"
	"log"
	"net/http"
	"strconv"
)

type RoomController interface {
	CreateRoom(w http.ResponseWriter, r *http.Request)
	DeleteRoom(w http.ResponseWriter, r *http.Request)
	GetAllRoom(w http.ResponseWriter, r *http.Request)
}

type roomController struct {
	roomService roomService.Service
}


// Get all room godoc
// @tags room-manager-apis
// @Summary Get all room
// @Description Get all room
// @Accept json
// @Produce json
// @Security ApiKeyAuth
// @Success 200 {object} controllers.Response
// @Router /room/rooms/all [get]
func (rc *roomController) GetAllRoom(w http.ResponseWriter, r *http.Request) {
	var res *Response

	rooms, err := rc.roomService.GetAllRoom()

	if err != nil{
		res = &Response{
			Data: nil,
			Message: "Get all rooms failed. " + err.Error(),
			Success: false,
		}
	} else {
		res = &Response{
			Data: rooms,
			Message: "Get all rooms successful.",
			Success: true,
		}
	}

	render.JSON(w, r, res)
}

// Create room godoc
// @tags room-manager-apis
// @Summary Create room
// @Description Create room
// @Accept json
// @Produce json
// @Security ApiKeyAuth
// @Param RoomInformation body controllers.RoomPayload true "Room information"
// @Success 200 {object} controllers.Response
// @Router /room/rooms [post]
func (rc *roomController) CreateRoom(w http.ResponseWriter, r *http.Request) {
	var res *Response
	var data RoomPayload
	decoder := json.NewDecoder(r.Body)

	if err := decoder.Decode(&data); err != nil{
		log.Fatal(err)
	}

	room := model.Room{
		Name: data.Name,
	}

	temp, err := rc.roomService.CreateRoom(&room)
	if err != nil {
		res = &Response{
			Data:    nil,
			Message: "Create room failed. " + err.Error(),
			Success: false,
		}
	} else {
		res = &Response{
			Data:    temp,
			Message: "Create room successful.",
			Success: true,
		}
	}

	render.JSON(w, r, res)
}

// Delete room by id godoc
// @tags room-manager-apis
// @Summary Delete room by id
// @Description Delete room by id
// @Accept json
// @Produce json
// @Security ApiKeyAuth
// @Param roomId path integer true "id of room"
// @Success 200 {object} controllers.Response
// @Router /room/rooms/{roomId} [delete]
func (rc *roomController) DeleteRoom(w http.ResponseWriter, r *http.Request) {
	id, _ := strconv.Atoi(chi.URLParam(r, "roomId"))

	err := rc.roomService.DeleteRoom(id)

	var res *Response
	if err != nil {
		res = &Response{
			Data:    nil,
			Message: "delete room failed. " + err.Error(),
			Success: false,
		}
	} else {
		res = &Response{
			Data:    nil,
			Message: "delete room successful",
			Success: true,
		}
	}
	render.JSON(w, r, res)
}

func NewRoomController() (RoomController, error) {
	roomService := roomService.NewRoomService()
	return &roomController{
		roomService: roomService,
	}, nil
}

type RoomPayload struct {
	Name string
}