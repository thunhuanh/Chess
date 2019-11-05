package middleAccess

import (
	model "Chess/server/models"
	"crypto/rsa"
	"crypto/x509"
	"encoding/pem"
	"io/ioutil"
	"log"
	"os"
	"time"

	"strings"

	"github.com/dgrijalva/jwt-go"
	"github.com/go-chi/jwtauth"
)

const (
	PATH_PRIVATE_KEY = "JWT_PRIVATE_KEY_PATH"
	PATH_PUBLIC_KEY  = "JWT_PUBLIC_KEY_PATH"
)

var (
	NANO_TO_SECOND   int64 = 1000000000
	EXTEND_HOUR      int   = 240
	Path_Private_Key string
	Path_Public_Key  string
)

func getStringEnvParameter(envParam string, defaultValue string) string {
	if value, ok := os.LookupEnv(envParam); ok {
		return value
	} else {
		return defaultValue
	}

}

func loadEnvParameters() {
	Path_Private_Key = getStringEnvParameter(PATH_PRIVATE_KEY, "./infrastructure/private.pem")
	Path_Public_Key = getStringEnvParameter(PATH_PUBLIC_KEY, "./infrastructure/public.pem")
}

func init() {

	loadEnvParameters()
}

// Authentication interface have some method interact with token jwt
type Authentication interface {
	GetTokenString(user *model.User) (string, error)
	GetTokenAuth() *jwtauth.JWTAuth
	GetClaimsData(tokenString string) (*model.User, error)
	GetClaimsData2(tokenString string) (*model.User, error)
}

type authenication struct {
	tokenAuth       *jwtauth.JWTAuth
	tokenAuthDecode *jwtauth.JWTAuth
	privateKey      *rsa.PrivateKey
	publicKey       interface{}
}

func (ac *authenication) GetTokenAuth() *jwtauth.JWTAuth {
	return ac.tokenAuthDecode
	// return ac.tokenAuth
}

func (ac *authenication) GetTokenString(user *model.User) (string, error) {
	claim := jwtauth.Claims{
		"id":         user.ID,
		"name":       user.Name,
		"password":   user.Password,
		"created_at": user.CreatedAt,
		"updated_at": user.UpdatedAt,
	}
	claim.SetExpiry(time.Now().Local().Add(time.Hour * time.Duration(EXTEND_HOUR)))
	_, tokenString, _ := ac.tokenAuth.Encode(claim)
	tokenString = "Bearer " + tokenString
	return tokenString, nil
}

func (ac *authenication) GetClaimsData(tokenString string) (*model.User, error) {
	user := model.User{}
	words := strings.Fields(tokenString)
	if len(words) == 1 {
		token, err := jwt.ParseWithClaims(words[0], &user, func(token *jwt.Token) (interface{}, error) {
			return ac.publicKey, nil
		})
		if err != nil {
			log.Printf("Have problem at get claims data: %v\n", err)
			return nil, err
		}
		if token.Valid != true {
			log.Printf("Have problem at get claims data: %v\n", err)
			return nil, err
		}
	} else {
		token, err := jwt.ParseWithClaims(words[1], &user, func(token *jwt.Token) (interface{}, error) {
			return ac.publicKey, nil
		})
		if err != nil {
			log.Printf("Have problem at get claims data: %v\n", err)
			return nil, err
		}
		if token.Valid != true {
			log.Printf("Have problem at get claims data: %v\n", err)
			return nil, err
		}
	}

	return &user, nil
}

func (ac *authenication) GetClaimsData2(tokenString string) (*model.User, error) {
	user := model.User{}
	token, err := jwt.ParseWithClaims(tokenString, &user, func(token *jwt.Token) (interface{}, error) {
		return ac.publicKey, nil
	})
	if err != nil {
		log.Printf("Have problem at get claims data 2: %v\n", err)
		return nil, err
	}
	log.Println(token.Valid, user.Name, err)

	return &user, nil
}

// NewAuthentication export middleware authentication
func NewAuthentication() (Authentication, error) {
	privateByte, err := ioutil.ReadFile(Path_Private_Key)
	if err != nil {
		log.Printf("Has problem at create authentication: %v", err)
		return nil, err
	}
	PrivateKeyRS256String := string(privateByte)
	privateKeyBlock, _ := pem.Decode([]byte(PrivateKeyRS256String))
	privateKey, err := x509.ParsePKCS1PrivateKey(privateKeyBlock.Bytes)
	if err != nil {
		log.Printf("Has problem at create authentication: %v", err)
		return nil, err
	}
	// log.Printf("private: %+v\n", privateKey)
	publicByte, err := ioutil.ReadFile(Path_Public_Key)
	if err != nil {
		log.Printf("Has problem at create authentication, parse private key: %v", err)
		return nil, err
	}
	PublicKeyRS256String := string(publicByte)
	publicKeyBlock, _ := pem.Decode([]byte(PublicKeyRS256String))
	publicKey, err := x509.ParsePKIXPublicKey(publicKeyBlock.Bytes)
	if err != nil {
		log.Printf("Has problem at create authentication, parse public key: %v", err)
		return nil, err
	}

	return &authenication{
		tokenAuth:       jwtauth.New("RS256", privateKey, nil),
		tokenAuthDecode: jwtauth.New("RS256", publicKey, nil),
		privateKey:      privateKey,
		publicKey:       publicKey,
	}, nil

}
