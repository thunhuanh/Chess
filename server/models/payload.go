package model

type Response struct {
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