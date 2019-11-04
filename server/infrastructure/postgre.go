package infrastructure

import (
	model "Chess/server/models"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres"
	"log"
	"os"
)

const (
	HOST             = "DB_HOST"
	PORT             = "DB_PORT"
	USER             = "DB_USER"
	DBNAME           = "DB_DBNAME"
	PASSWORD         = "DB_PASSWORD"
	HTTPSWAGGER      = "HTTP_SWAGGER"
)

var (
	Host             string
	Port             string
	User             string
	DbName           string
	Password         string
	HttpSwagger      string
	infoLog, errLog  *log.Logger
)

func getStringEnvParameter(envParam string, defaultValue string) string {
	if value, ok := os.LookupEnv(envParam); ok {
		return value
	}
	return defaultValue
}

func loadEnvParameters() {
	Host = getStringEnvParameter(HOST, "ec2-23-21-87-183.compute-1.amazonaws.com") // host database
	Port = getStringEnvParameter(PORT, "5432") // post databse
	User = getStringEnvParameter(USER, "vywmqsxbsdejqf")
	DbName = getStringEnvParameter(DBNAME, "ddvk6a4d4i1iip")
	Password = getStringEnvParameter(PASSWORD, "63caf6761cd96f92f55248c5ebe9e80372510ec02f5939d2f2245182db9b323a")
	HttpSwagger = getStringEnvParameter(HTTPSWAGGER, "https://chess-apis.herokuapp.com:4000/api/v1/be/swagger/doc.json")
}

func init() {
	infoLog = log.New(os.Stdout, "INFO: ", log.Ldate|log.Ltime|log.Lshortfile)
	errLog = log.New(os.Stderr, "ERROR: ", log.Ldate|log.Ltime|log.Lshortfile)
	loadEnvParameters()
}

// OpenConnection open one session
func OpenConnection() (*gorm.DB, error) {
	connectSQL := "host=" + Host + " port= " + Port + " user=" + User + " dbname= " + DbName + " password = " + Password + " sslmode=disable"
	db, err := gorm.Open("postgres", connectSQL)

	if err != nil {
		log.Println("connection error")
		log.Fatal(err)
		return nil, err
	}
	return db, nil
}

// CloseConnection Close one session
func CloseConnection(db *gorm.DB) {
	_ = db.Close()
}

// InitDatabase init tables in database
func InitDatabase() error {
	db, err := OpenConnection()
	if err != nil {
		return err
	}

	//migrate database
	db.AutoMigrate(
		&model.User{})

	CloseConnection(db)
	return nil
}