package model

type Room struct {
	ID 	int
	Name string
}

type RoomRepository interface {
	CreateRoom(room *Room)(*Room, error)
	DeleteRoom(id int) error
	GetAllRoom()([]*Room, error)
}
