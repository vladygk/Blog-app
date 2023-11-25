package service

import (
	"blog-app-auth-service/models"
	"context"
	"os"

	"github.com/google/uuid"
	"github.com/pkg/errors"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

type Repositorer interface {
	getUserByUsername(ctx context.Context, username string) (*userDataDTO, error)
	getUserByEmail(ctx context.Context, username string) (*userDataDTO, error)
	createUser(ctx context.Context, username string, email string, password string) error
	getAllUsers(ctx context.Context) ([]*userDataDTO, error)
}

type repository struct {
	db *mongo.Client
}

// NewRepository will create and initialize the repository
func NewRepository(db *mongo.Client) Repositorer {
	return repository{
		db: db,
	}
}

type userDataDTO struct {
	Id           string `bson:"_id"`
	Username     string `bson:"username"`
	Email        string `bson:"email"`
	PasswordHash string `bson:"password"`
}

func (userDataDto *userDataDTO) ToModel() *models.UserInfo {
	return &models.UserInfo{
		Username: userDataDto.Username,
		Email:    userDataDto.Email,
	}
}

func (r repository) getAllUsers(ctx context.Context) ([]*userDataDTO, error) {
	DB_NAME := os.Getenv("DB_NAME")
	DB_USER_COLLECTION_NAME := os.Getenv("DB_USER_COLLECTION_NAME")
	usersCollection := r.db.Database(DB_NAME).Collection(DB_USER_COLLECTION_NAME)
	cur, err := usersCollection.Find(context.Background(), bson.M{})

	var usersDTO []*userDataDTO
	if err != nil {
		if err == mongo.ErrNoDocuments {

			return usersDTO, nil
		}
		return nil, errors.Wrap(err, "Error while getting users from DB")
	}

	for cur.Next(ctx) {
		current := &userDataDTO{}
		err = cur.Decode(current)
		if err != nil {
			return nil, errors.Wrap(err, "Error while decoding UserData result from DB")
		}
		usersDTO = append(usersDTO, current)
	}

	return usersDTO, nil
}

func (r repository) getUserByUsername(ctx context.Context, username string) (*userDataDTO, error) {
	DB_NAME := os.Getenv("DB_NAME")
	DB_USER_COLLECTION_NAME := os.Getenv("DB_USER_COLLECTION_NAME")
	usersCollection := r.db.Database(DB_NAME).Collection(DB_USER_COLLECTION_NAME)

	singleResult := usersCollection.FindOne(context.Background(), bson.M{"username": username})

	if err := singleResult.Err(); err != nil {
		if err == mongo.ErrNoDocuments {
			return &userDataDTO{}, nil
		}
		return nil, errors.Wrap(err, "Error while getting user from DB, no result found")
	}

	userDTO := userDataDTO{}

	decodeErr := singleResult.Decode(&userDTO)
	if decodeErr != nil {
		if decodeErr == mongo.ErrNoDocuments {
			return &userDataDTO{}, nil
		}
		return nil, errors.Wrap(decodeErr, "Error while decoding user result from DB")
	}

	return &userDTO, nil
}
func (r repository) getUserByEmail(ctx context.Context, email string) (*userDataDTO, error) {
	DB_NAME := os.Getenv("DB_NAME")
	DB_USER_COLLECTION_NAME := os.Getenv("DB_USER_COLLECTION_NAME")
	usersCollection := r.db.Database(DB_NAME).Collection(DB_USER_COLLECTION_NAME)

	singleResult := usersCollection.FindOne(context.Background(), bson.M{"email": email})

	if err := singleResult.Err(); err != nil {
		if err == mongo.ErrNoDocuments {
			return &userDataDTO{}, nil
		}
		return nil, errors.Wrap(err, "Error while getting user from DB, no result found")
	}

	userDTO := userDataDTO{}

	decodeErr := singleResult.Decode(&userDTO)
	if decodeErr != nil {
		if decodeErr == mongo.ErrNoDocuments {
			return &userDataDTO{}, nil
		}
		return nil, errors.Wrap(decodeErr, "Error while decoding user result from DB")
	}

	return &userDTO, nil
}

func (r repository) createUser(ctx context.Context, username string, email string, passwordHash string) error {
	DB_NAME := os.Getenv("DB_NAME")
	DB_USER_COLLECTION_NAME := os.Getenv("DB_USER_COLLECTION_NAME")
	usersCollection := r.db.Database(DB_NAME).Collection(DB_USER_COLLECTION_NAME)

	userDTO := &userDataDTO{
		Id:           uuid.New().String(),
		Username:     username,
		Email:        email,
		PasswordHash: passwordHash,
	}
	_, err := usersCollection.InsertOne(ctx, userDTO)
	if err != nil {
		return errors.Wrap(err, "Error, while inserting a new user")
	}

	return nil
}
