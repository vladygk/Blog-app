package models

import pb "blog-app-auth-service/_protos/v1/auth"

type UserData struct {
	Username     string
	Email        string
	PasswordHash string
}

type JwtToken struct {
	Token string
}

type ResponseModeler interface {
	ToGRPCResponse() interface{}
}

func (jwtToken *JwtToken) ToGRPCResponse() interface{} {
	return &pb.JwtToken{
		Token: jwtToken.Token,
	}
}
