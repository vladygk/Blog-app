package transport

import (
	pb "blog-app-auth-service/_protos/v1/auth"
	"blog-app-auth-service/service"
	"context"

	"github.com/sirupsen/logrus"
)

type GRPCHandler struct {
	logger  *logrus.Logger
	service service.Servicer
	pb.UnimplementedAuthenticationServiceServer
}

func NewGRPCHandler(service service.Servicer, logger *logrus.Logger) *GRPCHandler {
	return &GRPCHandler{
		service: service,
		logger:  logger,
	}
}

func (h *GRPCHandler) GetAllUsers(ctx context.Context, empty *pb.EmptyRequest) (*pb.UsersInfo, error) {
	h.logger.Info()
	res, err := h.service.GetAllUsers(ctx)
	if err != nil {
		return nil, err
	}

	return res.ToGRPCResponse().(*pb.UsersInfo), nil
}

func (h *GRPCHandler) RegisterUser(ctx context.Context, req *pb.UserData) (*pb.JwtToken, error) {
	h.logger.Info(req)
	res, err := h.service.RegisterUser(ctx, req.Username, req.Email, req.Password)
	if err != nil {
		return nil, err
	}
	return res.ToGRPCResponse().(*pb.JwtToken), nil
}

func (h *GRPCHandler) LoginUser(ctx context.Context, req *pb.UserData) (*pb.JwtToken, error) {
	h.logger.Info(req)
	res, err := h.service.LoginUser(ctx, req.Username, req.Password)
	if err != nil {
		return nil, err
	}
	return res.ToGRPCResponse().(*pb.JwtToken), nil
}
