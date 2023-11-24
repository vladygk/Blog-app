package transport

import (
	pb "blog-app-auth-service/_protos/v1/auth"
	"blog-app-auth-service/service"
	"context"
)

type GRPCHandler struct {
	service service.Servicer
	pb.UnimplementedAuthenticationServiceServer
}

func NewGRPCHandler(service service.Servicer) *GRPCHandler {
	return &GRPCHandler{
		service: service,
	}
}

func (h *GRPCHandler) RegisterUser(ctx context.Context, req *pb.UserData) (*pb.JwtToken, error) {
	res, err := h.service.RegisterUser(ctx, req.Username, req.Email, req.Password)
	if err != nil {
		return nil, err
	}
	return res.ToGRPCResponse().(*pb.JwtToken), nil
}

func (h *GRPCHandler) LoginUser(ctx context.Context, req *pb.UserData) (*pb.JwtToken, error) {

	res, err := h.service.LoginUser(ctx, req.Username, req.Password)
	if err != nil {
		return nil, err
	}
	return res.ToGRPCResponse().(*pb.JwtToken), nil
}
