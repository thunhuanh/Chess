package model

import (
	"time"

	"github.com/dgrijalva/jwt-go"
)

type StatusAccountEnum string

type User struct {
	ID                 uint               `gorm:"column:id;auto_increment;unique;not null;primary_key" json:"id"`
	Name               string             `gorm:"column:name;type:varchar(255);unique;not null" json:"name"`
	Password           string             `gorm:"column:password;type:varchar(255);not null" json:"password"`
	CreatedAt          time.Time          `gorm:"column:created_at;type:timestamp;not null" json:"created_at"`
	UpdatedAt          time.Time          `gorm:"column:updated_at;type:timestamp;not null" json:"updated_at"`
	Rank			   string
	Type 			   string
	Status 			   string
	NickName		   string
	RoomId 			   int
	jwt.StandardClaims `gorm:"-"`
}

type UserRepository interface {
	CreateUser(user *User) (*User, error)
	GetFilterListUser(name, role *string, page int, pageSize int) ([]User, int, error)
	FindById(id int) (*User, error)
	UpdateUser(accountID int, updatedUser *User) error
	UpdatePassword(id int, oldPass string, newPass string) error
	DeleteUser(id int) error
	LoginRequest(user *User) (*User, error)
	LoginTokenRequest(user *User) (bool, error)
	HashPassword(password string) (string, error)
	ComparePassword(hash string, password string) error
}

type UserResponse struct {
	User 				*User			`json:"user"`
}