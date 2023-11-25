package service

import (
	"blog-app-auth-service/models"
	"blog-app-auth-service/utils"
	"context"
	"fmt"

	"github.com/sirupsen/logrus"
	"go.mongodb.org/mongo-driver/mongo"
)

type Servicer interface {
	LoginUser(ctx context.Context, username string, password string) (models.ResponseModeler, error)
	RegisterUser(ctx context.Context, username string, email string, password string) (models.ResponseModeler, error)
	GetAllUsers(ctx context.Context) (models.ResponseModeler, error)
}

type service struct {
	logger     *logrus.Logger
	repository Repositorer
}

func NewService(logger *logrus.Logger, db *mongo.Client) Servicer {
	return &service{logger, NewRepository(db)}
}

func (s service) GetAllUsers(ctx context.Context) (models.ResponseModeler, error) {
	usersDataDTO, err := s.repository.getAllUsers(ctx)
	if err != nil {
		s.logger.Error(err)
		return nil, err
	}

	usersInfoModel := &models.UsersInfo{
		Data: []*models.UserInfo{},
	}

	for _, userDataDto := range usersDataDTO {
		usersInfoModel.Data = append(usersInfoModel.Data, userDataDto.ToModel())
	}

	return usersInfoModel, nil
}

func (s service) LoginUser(ctx context.Context, username string, password string) (models.ResponseModeler, error) {
	userDataDTO, err := s.repository.getUserByUsername(ctx, username)
	if err != nil {
		s.logger.Error(err)
		return nil, err
	}

	err = utils.ComparePasswords(userDataDTO.PasswordHash, password)
	if err != nil {
		s.logger.Error(err)
		return nil, err
	}

	jwtToken, err := utils.GenerateJWT(username)
	if err != nil {
		s.logger.Error(err)
		return nil, err
	}

	return &models.JwtToken{Token: jwtToken}, nil
}

func (s service) RegisterUser(ctx context.Context, username string, email string, password string) (models.ResponseModeler, error) {
	userByEmail, _ := s.repository.getUserByEmail(ctx, email)
	userByUsername, _ := s.repository.getUserByUsername(ctx, username)

	if userByEmail.Id != "" || userByUsername.Id != "" {
		err := fmt.Errorf("User with this username or email already exists")
		s.logger.Error(err)
		return nil, err
	}

	hashedPassword, err := utils.HashPassword(password)
	if err != nil {
		s.logger.Error(err)
		return nil, err
	}

	err = s.repository.createUser(ctx, username, email, hashedPassword)
	if err != nil {
		s.logger.Error(err)
		return nil, err
	}

	jwtToken, err := utils.GenerateJWT(username)
	if err != nil {
		s.logger.Error(err)
		return nil, err
	}

	return &models.JwtToken{Token: jwtToken}, nil
}
