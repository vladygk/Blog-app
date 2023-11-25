const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require("path");
const { error } = require('winston');

class GrpcClient {
  constructor(grpcHost, grpcPort) {
    this.authPackage = this.loadAuthPackage();
    this.client = new this.authPackage.AuthenticationService(
      `${grpcHost}:${grpcPort}`,
      grpc.credentials.createInsecure()
    );
  }

  loadAuthPackage = () => {
    const fullPath = path.resolve(__dirname, "./protos/auth.proto");
    const packageDefinition = protoLoader.loadSync(fullPath, {});
    return grpc.loadPackageDefinition(packageDefinition).auth.service;
  };

  getAllUsers = () => {
    return new Promise((resolve, reject) => {
      this.client.GetAllUsers(null, (err, response) => {
        if (err) {
          reject(err);
        } else {
          resolve(response);
        }
      });
    });
  };

  loginUser = (loginCredentials) => {
    return new Promise((resolve, reject) => {  
      this.client.LoginUser(loginCredentials, (err, response) => {
        if (err) {
          reject(err);
        } else {
          resolve(response);
        }
      });
    });
  };

  registerUser = (registerInfo) => {
    return new Promise((resolve, reject) => {  
      this.client.RegisterUser(registerInfo, (err, response) => {
        if (err) {
          reject(err);
        } else {
          resolve(response);
        }
      });
    });
  };
}

const grpcHost = process.env.GRPC_HOST;
const grpcPort = process.env.GRPC_PORT;

module.exports = new GrpcClient(grpcHost,grpcPort);