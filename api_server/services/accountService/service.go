package accountService

import (
	middleAccess "Chess/api_server/middleware"
	model "Chess/api_server/models"
	"Chess/api_server/repositories/accountRepo"
	"errors"
	"log"
	"strconv"
	"time"
)

// Service service for account
type Service interface {
	CreateNewUser(user *model.User) (*model.User, error)
	GetFilterListUser(name, rank, nickname *string, page int, pageSize int) ([]model.User, int, error)
	GetUserByID(id string) (*model.User, error)
	UpdateUser(accountID int, updateUser *model.User) error
	UpdatePassword(id int, oldPass string, newPass string) error
	DeleteUser(id string) error
	LoginRequest(username string, password string) (*model.User, string, error)
	LoginWithToken(tokenString string) (*model.User, string, bool, error)
}

type service struct {
	userRepository model.UserRepository
	authentication middleAccess.Authentication
}

func (s *service) CreateNewUser(user *model.User) (*model.User, error) {
	newUser, err := s.userRepository.CreateUser(user)
	if err != nil {
		return nil, err
	}

	return newUser, nil
}

func (s *service) GetFilterListUser(name, rank, nickname *string, page int, pageSize int) ([]model.User, int, error) {
	listUser, total, err := s.userRepository.GetFilterListUser(name, rank, nickname, page, pageSize)
	if err != nil {
		return nil, 0, err
	}
	return listUser, total, nil
}

func (s *service) GetUserByID(id string) (*model.User, error) {
	userID, err := strconv.Atoi(id)
	if err != nil {
		log.Fatal(err)
	}

	user, err := s.userRepository.FindById(userID)
	if err != nil {
		log.Fatal(err)
	}
	return user, nil
}

func (s *service) UpdateUser(accountID int, updateUser *model.User) error {
	err := s.userRepository.UpdateUser(accountID, updateUser)
	if err != nil {
		return err
	}
	return nil
}

func (s *service) UpdatePassword(id int, oldPass string, newPass string) error {
	if err := s.userRepository.UpdatePassword(id, oldPass, newPass); err != nil {
		return err
	}
	return nil

}

func (s *service) DeleteUser(id string) error {
	userID, _ := strconv.Atoi(id)

	err := s.userRepository.DeleteUser(userID)
	if err != nil {
		log.Fatal(err)
	}
	return nil
}

func (s *service) LoginRequest(username string, password string) (*model.User, string, error) {
	user := &model.User{
		Name:     username,
		Password: password,
	}

	userData, err := s.userRepository.LoginRequest(user)
	if err != nil {
		if userData == nil {
			return nil, "", nil
		}
		log.Printf("Have problem at login request: %v\n", err)
		return nil, "", err
	}

	tokenString, err := s.authentication.GetTokenString(userData)
	if err != nil {
		log.Printf("have problem in loginRequest by authentication: %v\n", err)
		return nil, "", err
	}

	return userData, tokenString, nil
}

func (s *service) LoginWithToken(tokenString string) (*model.User, string, bool, error) {
	user, err := s.authentication.GetClaimsData(tokenString)
	if err != nil {
		log.Printf("Has problem at Login with token, get cliams data from authen middleware: %v\n", err)
		return nil, "Token invalid", false, nil
	}
	log.Printf("User: %v\n", user)
	okDate := user.VerifyExpiresAt(time.Now().UnixNano()/accountRepo.NANO_TO_SECOND, true)
	if okDate == false {
		log.Println("Expire has excceed")
		return nil, "token has exceed expire", false, nil
	}

	if ok, err := s.userRepository.LoginTokenRequest(user); err != nil {
		log.Printf("Has problem at Login with token, login request at repo: %v\n", err)
		return nil, "", false, err
	} else {
		if ok == false {
			return nil, "token invalid", false, nil
		}
	}
	newTokenString, err := s.authentication.GetTokenString(user)
	if err != nil {
		log.Printf("have problem in loginRequest by authentication: %v\n", err)
		return nil, "", false, err
	}
	return user, newTokenString, true, nil
}

// NewAccountService export service for account
func NewAccountService(userRepo model.UserRepository, authentication middleAccess.Authentication) Service {
	return &service{
		userRepository: userRepo,
		authentication: authentication,
	}
}

var (
	// ErrCantCreateUser error while create user
	ErrCantCreateUser = errors.New("Can't create user")
)
