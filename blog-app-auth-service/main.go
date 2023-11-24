package main

import (
	"blog-app-auth-service/app"
	"fmt"
	"os"

	"github.com/joho/godotenv"
	"github.com/sirupsen/logrus"
)

func main() {
	logger := logrus.New()
	logger.Out = os.Stdout
	logger.SetFormatter(&logrus.JSONFormatter{})

	if err := godotenv.Load(); err != nil {
		logger.Errorf("Could not load env vars: %s", err.Error())
	}

	DB_USER := os.Getenv("DB_USER")
	DB_PASS := os.Getenv("DB_PASS")
	DB_PORT := os.Getenv("DB_PORT")
	//DB_NAME := os.Getenv("DB_NAME")
	DB_CONNECTION_STRING := fmt.Sprintf("mongodb://%s:%s@localhost:%s", DB_USER, DB_PASS, DB_PORT)

	GRPC_PORT := os.Getenv("GRPC_PORT")

	a := app.App{Logger: logger}
	a.Initialize(DB_CONNECTION_STRING)

	a.RunGRPCServer(GRPC_PORT)

}
