package roomRepo

import (
	"Chess/api_server/infrastructure"
	model "Chess/api_server/models"
)

type RoomRepository struct {
}

func (RoomRepository) GetAllRoom() ([]*model.Room, error) {
	db := infrastructure.GetDB()

	var rooms []*model.Room

	if err := db.Find(&rooms).Error; err != nil{
		return nil, err
	}

	return rooms, nil
}

func (RoomRepository) CreateRoom(room *model.Room) (*model.Room, error) {
	db := infrastructure.GetDB()

	if err := db.Create(&room).Error; err != nil{
		return nil, err
	}

	return room, nil
}

func (RoomRepository) DeleteRoom(id int) error {
	db := infrastructure.GetDB()

	if err := db.Delete(&model.Room{}, id).Error; err != nil{
		return err
	}
	return nil
}

func NewRoomRepository() model.RoomRepository {
	return &RoomRepository{}
}