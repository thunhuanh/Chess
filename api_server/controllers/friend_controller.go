package controllers

import (
	model "Chess/api_server/models"
	"Chess/api_server/services/friendService"
	"encoding/json"
	"github.com/go-chi/chi"
	"github.com/go-chi/render"
	"log"
	"net/http"
	"strconv"
)

type FriendController interface {
	GetAllFriendByUserId(w http.ResponseWriter, r *http.Request)
	DeleteFriendByFriendId(w http.ResponseWriter, r *http.Request)
	CreateNewFriend(w http.ResponseWriter, r *http.Request)
}

type friendController struct {
	friendService friendService.Service
}

// Get all friends godoc
// @tags friend-manager-apis
// @Summary get all friends
// @Description get all friends
// @Accept json
// @Produce json
// @Security ApiKeyAuth
// @Param userId path integer true "id of user account"
// @Success 200 {object} controllers.Response
// @Router /friend/friends/all/{userId} [get]
func (fc *friendController) GetAllFriendByUserId(w http.ResponseWriter, r *http.Request) {
	userId,_ := strconv.Atoi(chi.URLParam(r, "userId"))

	friends, err := fc.friendService.GetAllFriendByUserId(userId)

	var res *Response

	if err != nil {
		res = &Response{
			Data:    nil,
			Message: "failed to get record. " + err.Error(),
			Success: false,
		}
	} else {
		res = &Response{
			Data:    friends,
			Message: "get friends succesful.",
			Success: true,
		}
	}
	render.JSON(w, r, res)
}


// Delete friend by id godoc
// @tags friend-manager-apis
// @Summary Delete friend by id
// @Description Delete friend by id
// @Accept json
// @Produce json
// @Security ApiKeyAuth
// @Param userId path integer true "id of user account"
// @Param friendId path integer true "id of friend account"
// @Success 200 {object} controllers.Response
// @Router /friend/friends/{userId}/{friendId} [delete]
func (fc *friendController) DeleteFriendByFriendId(w http.ResponseWriter, r *http.Request) {
	userId,_ := strconv.Atoi(chi.URLParam(r, "userId"))
	friendId,_ := strconv.Atoi(chi.URLParam(r, "friendId"))

	err := fc.friendService.DeleteFriendByFriendId(userId, friendId)

	var res *Response
	if err != nil {
		res = &Response{
			Data:    nil,
			Message: "delete friend failed.",
			Success: false,
		}
	} else {
		res = &Response{
			Data:    nil,
			Message: "delete friend successful",
			Success: true,
		}
	}
	render.JSON(w, r, res)
}

// Create new Friend godoc
// @tags friend-manager-apis
// @Summary Create new Friend
// @Description Create new Friend
// @Accept json
// @Produce json
// @Security ApiKeyAuth
// @Param FriendInformation body controllers.FriendPayload true "Friend information"
// @Success 200 {object} controllers.Response
// @Router /friend/friends/new [post]
func (fc *friendController) CreateNewFriend(w http.ResponseWriter, r *http.Request) {
	decoder := json.NewDecoder(r.Body)
	var data FriendPayload
	err := decoder.Decode(&data)
	if err != nil {
		log.Fatal(err)
	}
	friend := model.Friend{
		UserId:     data.UserId,
		FriendId: data.FriendId,
	}
	newFriend, err := fc.friendService.CreateNewFriend(&friend)
	var res *Response
	if err != nil {
		res = &Response{
			Data:    nil,
			Message: "Create friend failed.",
			Success: false,
		}
	} else {
		res = &Response{
			Data:    newFriend,
			Message: "Create friend successful.",
			Success: true,
		}
	}

	render.JSON(w, r, res)
}

func NewFriendController() (FriendController, error) {
	friendService := friendService.NewFriendService()
	return &friendController{
		friendService: friendService,
	}, nil
}

type FriendPayload struct {
	UserId int	`json:"userId"`
	FriendId int `json:"friendId"`
}