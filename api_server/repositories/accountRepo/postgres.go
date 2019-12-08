package accountRepo

import (
	"Chess/api_server/infrastructure"
	model "Chess/api_server/models"

	"errors"
	"time"

	"golang.org/x/crypto/bcrypt"
)

// UserRepository blah blah
type UserRepository struct {
}

const (
	NANO_TO_SECOND        = 1000000000
	Extend_Hour           = 240
)

// CreateUser blah blah
func (ur *UserRepository) CreateUser(user *model.User) (*model.User, error) {
	db := infrastructure.GetDB()

	password, err := ur.HashPassword(user.Password)
	if err != nil {
		return nil, err
	}

	user.Password = password

	if err := db.Create(&user).Error; err != nil {
		return nil, err
	}

	return user, nil
}

// GetListUser blah blah
func (ur *UserRepository) GetFilterListUser(name, rank, nickname *string, page int, pageSize int) (users []model.User, total int, err error) {
	db := infrastructure.GetDB()

	db.Exec("CREATE EXTENSION IF NOT EXISTS unaccent")

	whereQuery := ""
	if name == nil {
		whereQuery += "name ILIKE '%'"
	} else {
		whereQuery += "unaccent(name) ILIKE unaccent('%" + *name + "%')"
	}

	if nickname == nil {
		whereQuery += "nick_name ILIKE '%'"
	} else {
		whereQuery += "unaccent(nick_name) ILIKE unaccent('%" + *nickname + "%')"
	}

	if rank != nil{
		whereQuery += " AND rank = '" + *rank + "'"
	}


	var temp []model.User
	err = db.Table("users").
		Select("*").
		Where(whereQuery).
		Scan(&temp).Count(&total).Error

	if err != nil{
		return nil, 0, err
	}

	err = db.Limit(pageSize).
		Offset((page - 1) * pageSize).
		Table("users").
		Select("*").
		Where(whereQuery).
		Scan(&users).Error

	if err != nil{
		return nil, 0, err
	}

	return users, total, nil
}

// FindById return user match id parameter
func (ur *UserRepository) FindById(id int) (*model.User, error) {
	db := infrastructure.GetDB()
	var user model.User
	if err := db.First(&user, id).Error; err != nil {
		return nil, err
	}

	return &user, nil
}

// UpdateUser update user without password
func (ur *UserRepository) UpdateUser(accountID int, updatedUser *model.User) error {
	db := infrastructure.GetDB()

	if err := db.First(&model.User{ID: uint(accountID)}).Update(updatedUser).Error; err != nil {
		return err
	}

	return nil
}

// UpdatePassword only update password == reset password
func (ur *UserRepository) UpdatePassword(id int, oldPass string, newPass string) error {
	db := infrastructure.GetDB()

	var user model.User
	if err := db.Where("id = ? ", id).First(&user).Error; err != nil {
		return  err
	}
	if ok := ur.ComparePassword(user.Password, oldPass); ok != nil {
		return errors.New("Wrong password!")
	}

	hashNewPass, err := ur.HashPassword(newPass)
	if err != nil {
		return err
	}
	if err := db.First(&user, id).Updates(map[string]interface{}{
		"password": hashNewPass,
	}).Error; err != nil {
		return err
	}

	return nil
}

// DeleteUser delete user by id
func (ur *UserRepository) DeleteUser(id int) error {
	db := infrastructure.GetDB()

	if err := db.Unscoped().Delete(&model.User{
		ID: uint(id),
	}).Error; err != nil {
		return err
	}
	return nil
}

// LoginRequest get more data for user to send to token jwt
func (ur *UserRepository) LoginRequest(user *model.User) (*model.User, error) {
	db := infrastructure.GetDB()

	var foundUser model.User
	if err := db.Where("name = ?", user.Name).First(&foundUser).Error; err != nil {
		return nil, err
	}


	if err := ur.ComparePassword(foundUser.Password, user.Password); err != nil {
		return nil, err
	}

	foundUser.ExpiresAt = time.Now().Local().Add(time.Hour*time.Duration(Extend_Hour)).UnixNano() / NANO_TO_SECOND

	if err := db.First(&model.User{ID: foundUser.ID}).Update(foundUser).Error; err != nil {
		return nil, err
	}

	return &foundUser, nil
}

func (ur *UserRepository) LoginTokenRequest(user *model.User) (bool, error) {
	db := infrastructure.GetDB()

	var users []*model.User
	if err := db.Where("name = ? AND password = ?", user.Name, user.Password).Find(&users).Error; err != nil {
		return false, nil
	}

	users[0].ExpiresAt = time.Now().Local().Add(time.Hour*time.Duration(Extend_Hour)).UnixNano() / NANO_TO_SECOND

	if err := db.First(&model.User{ID: users[0].ID}).Update(users[0]).Error; err != nil {
		return false, err
	}

	return true, nil
}

func (ur *UserRepository) HashPassword(password string) (string, error) {
	passBytes := []byte(password)
	hashBytes, err := bcrypt.GenerateFromPassword(passBytes, bcrypt.DefaultCost)
	if err != nil {
		return "", err
	}
	hash := string(hashBytes[:])
	return hash, nil
}

func (ur *UserRepository) ComparePassword(hash string, password string) error {
	passBytes := []byte(password)
	hashBytes := []byte(hash)
	return bcrypt.CompareHashAndPassword(hashBytes, passBytes)
}

func NewUserRepository() model.UserRepository {
	return &UserRepository{}
}
