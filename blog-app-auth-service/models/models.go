package models

import pb "blog-app-auth-service/_protos/v1/auth"

type UserData struct {
	Username     string
	Email        string
	PasswordHash string
}

type UserInfo struct {
	Username string
	Email    string
}

type UsersInfo struct {
	Data []*UserInfo
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

func (userInfo UserInfo) ToGRPCResponse() interface{} {
	return &pb.UserInfo{
		Username: userInfo.Username,
		Email:    userInfo.Email,
	}
}

func (usersInfo *UsersInfo) ToGRPCResponse() interface{} {
	grpcUsersInfo := pb.UsersInfo{
		Data: []*pb.UserInfo{},
	}

	for _, userInfo := range usersInfo.Data {
		grpcUsersInfo.Data = append(grpcUsersInfo.Data, userInfo.ToGRPCResponse().(*pb.UserInfo))
	}

	return &grpcUsersInfo
}
