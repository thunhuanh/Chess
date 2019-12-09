package model

type MetaDataResponse struct {
	Data        interface{} `json:"data"`
	MetaData	MetaData		`json:"metaData"`
	Message     string      `json:"message"`
	Success     bool        `json:"success"`
}

type MetaData struct{
	Page 		int `json:"page"`
	PageSize	int `json:"pageSize"`
	Total		int `json:"total"`
}

type ReportPayload struct {
	ID int 			`json:"id"`
	Reporter *User	`json:"reporter"`
	ReportedUser *User `json:"reported"`
	Message string 	`json:"message"`
}