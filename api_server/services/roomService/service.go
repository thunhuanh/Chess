package roomService

import (
	model "Chess/api_server/models"
	"Chess/api_server/repositories/roomRepo"
)

type Service interface {
	CreateRoom(room *model.Room)(*model.Room, error)
	DeleteRoom(id int) error
	GetAllRoom()([]*model.Room, error)
}

type service struct {
	roomRepo model.RoomRepository
}

func (s *service) GetAllRoom() ([]*model.Room, error) {
	rooms, err := s.roomRepo.GetAllRoom()
	if err != nil{
		return nil, err
	}

	return rooms, nil
}

func (s *service) CreateRoom(room *model.Room) (*model.Room, error) {
	tempRoom, err := s.roomRepo.CreateRoom(room)
	if err != nil{
		return nil, err
	}

	return tempRoom, nil
}

func (s *service) DeleteRoom(id int) error {
	err := s.roomRepo.DeleteRoom(id)
	if err != nil{
		return err
	}

	return nil
}

func NewRoomService() Service {
	roomRepo := roomRepo.NewRoomRepository()
	return &service{
		roomRepo: roomRepo,
	}
}

