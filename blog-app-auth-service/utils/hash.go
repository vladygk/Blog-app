package utils

import (
	"golang.org/x/crypto/bcrypt"
)

func HashPassword(password string) (string, error) {
	// Generate a hashed password using bcrypt
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return "", err
	}

	// Convert the hashed password to a base64-encoded string
	hashedPasswordString := string(hashedPassword)

	return hashedPasswordString, nil
}

func ComparePasswords(hashedPasswordString string, password string) error {
	// Decode the base64-encoded string back to a byte slice
	err := bcrypt.CompareHashAndPassword([]byte(hashedPasswordString), []byte(password))
	if err != nil {
		return err
	}
	return nil
}
