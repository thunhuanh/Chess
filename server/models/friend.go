package model

type Friend struct {
	ID 			int
	UserId 		int	`json:"userId"`
	FriendId 	int `json:"friendId"`
}

type FriendRepository interface {
	GetById(id int) (*Friend, error)
	GetAllFriendByUserId(userId int) ([]*User, error)
	DeleteFriendByFriendId(userId, friendId int) error
	CreateNewFriend(*Friend) (*Friend, error)
}