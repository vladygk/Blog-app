package app

import (
	pb "blog-app-auth-service/_protos/v1/auth"
	"blog-app-auth-service/service"
	transport "blog-app-auth-service/transport/grpc"
	"context"
	"net"
	"time"

	"github.com/sirupsen/logrus"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"google.golang.org/grpc"
)

type App struct {
	Server *grpc.Server
	Logger *logrus.Logger
}

func (a *App) Initialize(dbConnectionString string) {

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	dbClient, err := mongo.Connect(ctx, options.Client().SetDirect(true).ApplyURI(dbConnectionString))
	if err != nil {
		a.Logger.WithError(err).Fatal("Failed to connect to auth database")
	}
	a.Logger.Info("Connected to DB")
	service := service.NewService(a.Logger, dbClient)

	a.initGRPCServer(service, a.Logger)
}

func (a *App) buildGRPCHandler(servicer service.Servicer) pb.AuthenticationServiceServer {
	grpcServer := transport.NewGRPCHandler(servicer)
	return grpcServer
}

func (a *App) initGRPCServer(service service.Servicer, logger *logrus.Logger) {

	var GRPCHandler = a.buildGRPCHandler(service)

	a.Server = grpc.NewServer()

	pb.RegisterAuthenticationServiceServer(a.Server, GRPCHandler)
}

func (a *App) RunGRPCServer(grpcPort string) {

	listen, err := net.Listen("tcp", ":"+grpcPort)
	if err != nil {
		a.Logger.WithError(err).Fatal("Error while starting the GRPC server")
	}

	a.Logger.Info("GRPC server listening on port: " + grpcPort)
	err = a.Server.Serve(listen)
	if err != nil {
		a.Logger.WithError(err).Fatal("Error while serving the GRPC server")
	}
}
