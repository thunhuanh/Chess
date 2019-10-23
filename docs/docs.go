// GENERATED BY THE COMMAND ABOVE; DO NOT EDIT
// This file was generated by swaggo/swag at
// 2019-10-23 11:06:47.4844953 +0700 +07 m=+0.427069301

package docs

import (
	"bytes"

	"github.com/alecthomas/template"
	"github.com/swaggo/swag"
)

var doc = `{
    "swagger": "2.0",
    "info": {
        "description": "This is list api for chess project",
        "title": "Swagger Chess project API",
        "contact": {},
        "license": {},
        "version": "2.0"
    },
    "host": "{{.Host}}",
    "basePath": "/api/v1/be",
    "paths": {
        "/access/login": {
            "post": {
                "description": "login with username, password. return token string jwt",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "access-apis"
                ],
                "summary": "Login system",
                "parameters": [
                    {
                        "description": "username and password",
                        "name": "accountInfo",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "type": "object",
                            "$ref": "#/definitions/controllers.LoginRequest"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "type": "object",
                            "$ref": "#/definitions/controllers.LoginResponse"
                        }
                    }
                }
            }
        },
        "/access/login/token": {
            "post": {
                "security": [
                    {
                        "ApiKeyAuth": []
                    }
                ],
                "description": "login with token string. return new token string jwt",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "access-apis"
                ],
                "summary": "Login system by token string",
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "type": "object",
                            "$ref": "#/definitions/controllers.LoginResponse"
                        }
                    }
                }
            }
        },
        "/account/accounts": {
            "get": {
                "security": [
                    {
                        "ApiKeyAuth": []
                    }
                ],
                "description": "filter list user and paging filtered",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "account-manager-apis"
                ],
                "summary": "Filter users and paging",
                "operationId": "00002",
                "parameters": [
                    {
                        "type": "string",
                        "description": "name for user",
                        "name": "name",
                        "in": "query"
                    },
                    {
                        "type": "integer",
                        "description": "page number for user",
                        "name": "page",
                        "in": "query"
                    },
                    {
                        "type": "integer",
                        "description": "page size each page",
                        "name": "pageSize",
                        "in": "query"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "type": "object",
                            "$ref": "#/definitions/model.Response"
                        }
                    }
                }
            }
        },
        "/account/create": {
            "post": {
                "description": "Create new account with role default is customer",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "account-manager-apis"
                ],
                "summary": "Create new Account",
                "operationId": "00001",
                "parameters": [
                    {
                        "description": "User information",
                        "name": "UserInformation",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "type": "object",
                            "$ref": "#/definitions/controllers.UserM"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "type": "object",
                            "$ref": "#/definitions/controllers.AccountResponse"
                        }
                    }
                }
            }
        },
        "/account/password": {
            "put": {
                "security": [
                    {
                        "ApiKeyAuth": []
                    }
                ],
                "description": "update password for exists user",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "account-manager-apis"
                ],
                "summary": "Update password",
                "operationId": "00005",
                "parameters": [
                    {
                        "description": "cuple value id and reset password",
                        "name": "Update_Password",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "type": "object",
                            "$ref": "#/definitions/controllers.UpdatePassResponse"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "type": "object",
                            "$ref": "#/definitions/controllers.AccountResponse"
                        }
                    }
                }
            }
        },
        "/account/{accountId}": {
            "put": {
                "security": [
                    {
                        "ApiKeyAuth": []
                    }
                ],
                "description": "update user by field:name, avatar, status, role",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "account-manager-apis"
                ],
                "summary": "Update user",
                "operationId": "00003",
                "parameters": [
                    {
                        "type": "integer",
                        "description": "id of user account",
                        "name": "accountId",
                        "in": "path",
                        "required": true
                    },
                    {
                        "description": "inlucde old user and new update user",
                        "name": "update_model",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "type": "object",
                            "$ref": "#/definitions/controllers.UpdateAccountResponse"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "type": "object",
                            "$ref": "#/definitions/controllers.AccountResponse"
                        }
                    }
                }
            }
        },
        "/account/{userId}": {
            "get": {
                "security": [
                    {
                        "ApiKeyAuth": []
                    }
                ],
                "description": "find user by user id",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "account-manager-apis"
                ],
                "summary": "Get user by user id",
                "operationId": "00007",
                "parameters": [
                    {
                        "type": "string",
                        "default": "1",
                        "description": "user id is wanted find",
                        "name": "userId",
                        "in": "path",
                        "required": true
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "type": "object",
                            "$ref": "#/definitions/controllers.AccountResponse"
                        }
                    }
                }
            },
            "delete": {
                "security": [
                    {
                        "ApiKeyAuth": []
                    }
                ],
                "description": "Soft Delete user by user id",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "account-manager-apis"
                ],
                "summary": "Remove User",
                "operationId": "00006",
                "parameters": [
                    {
                        "type": "string",
                        "description": "user id is wanted remove",
                        "name": "userId",
                        "in": "path",
                        "required": true
                    }
                ],
                "responses": {
                    "200": {
                        "description": "OK",
                        "schema": {
                            "type": "object",
                            "$ref": "#/definitions/controllers.AccountResponse"
                        }
                    }
                }
            }
        }
    },
    "definitions": {
        "controllers.AccountResponse": {
            "type": "object",
            "properties": {
                "data": {
                    "type": "object"
                },
                "message": {
                    "type": "string"
                },
                "success": {
                    "type": "boolean"
                }
            }
        },
        "controllers.LoginRequest": {
            "type": "object",
            "properties": {
                "name": {
                    "type": "string"
                },
                "password": {
                    "type": "string"
                }
            }
        },
        "controllers.LoginResponse": {
            "type": "object",
            "properties": {
                "data": {
                    "type": "object"
                },
                "message": {
                    "type": "string"
                },
                "success": {
                    "type": "boolean"
                },
                "token": {
                    "type": "string"
                }
            }
        },
        "controllers.UpdateAccountResponse": {
            "type": "object",
            "properties": {
                "avatar": {
                    "type": "string"
                },
                "name": {
                    "type": "string"
                },
                "password": {
                    "type": "string"
                },
                "role": {
                    "type": "string"
                },
                "status": {
                    "type": "string"
                }
            }
        },
        "controllers.UpdatePassResponse": {
            "type": "object",
            "properties": {
                "newPass": {
                    "type": "string"
                },
                "oldPass": {
                    "type": "string"
                },
                "userId": {
                    "type": "integer"
                }
            }
        },
        "controllers.UserM": {
            "type": "object",
            "properties": {
                "avatar": {
                    "type": "string"
                },
                "name": {
                    "type": "string"
                },
                "password": {
                    "type": "string"
                }
            }
        },
        "model.MetaData": {
            "type": "object",
            "properties": {
                "page": {
                    "type": "integer"
                },
                "pageSize": {
                    "type": "integer"
                },
                "total": {
                    "type": "integer"
                }
            }
        },
        "model.Response": {
            "type": "object",
            "properties": {
                "data": {
                    "type": "object"
                },
                "message": {
                    "type": "string"
                },
                "metaData": {
                    "type": "object",
                    "$ref": "#/definitions/model.MetaData"
                },
                "success": {
                    "type": "boolean"
                }
            }
        }
    },
    "securityDefinitions": {
        "ApiKeyAuth": {
            "type": "apiKey",
            "name": "Authorization",
            "in": "header"
        }
    }
}`

type swaggerInfo struct {
	Version     string
	Host        string
	BasePath    string
	Title       string
	Description string
}

// SwaggerInfo holds exported Swagger Info so clients can modify it
var SwaggerInfo swaggerInfo

type s struct{}

func (s *s) ReadDoc() string {
	t, err := template.New("swagger_info").Parse(doc)
	if err != nil {
		return doc
	}

	var tpl bytes.Buffer
	if err := t.Execute(&tpl, SwaggerInfo); err != nil {
		return doc
	}

	return tpl.String()
}

func init() {
	swag.Register(swag.Name, &s{})
}
