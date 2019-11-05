package friendService

import (
	model "Chess/server/models"
	"Chess/server/repositories/friendRepo"
)

type Service interface {
	GetById(id int) (*model.Friend, error)
	GetAllFriendByUserId(userId int) ([]*model.User, error)
	DeleteFriendByFriendId(userId, friendId int) error
	CreateNewFriend(*model.Friend) (*model.Friend, error)
}

type service struct {
	friendRepo model.FriendRepository
}

func (s *service) GetById(id int) (*model.Friend, error) {
	friend, err := s.friendRepo.GetById(id)
	if err != nil{
		return nil, err
	}

	return friend, nil
}

func (s *service) GetAllFriendByUserId(userId int) ([]*model.User, error) {
	friends, err := s.friendRepo.GetAllFriendByUserId(userId)
	if err != nil{
		return nil, err
	}

	return friends, nil
}

func (s *service) DeleteFriendByFriendId(userId, friendId int) error {
	err := s.friendRepo.DeleteFriendByFriendId(userId, friendId)
	if err != nil{
		return err
	}

	return nil
}

func (s *service) CreateNewFriend(friend *model.Friend) (*model.Friend, error) {
	friend, err := s.friendRepo.CreateNewFriend(friend)
	if err != nil{
		return nil, err
	}

	return friend, nil
}

func NewFriendService() Service {
	friendRepo := friendRepo.NewFriendRepository()
	return &service{
		friendRepo: friendRepo,
	}
}