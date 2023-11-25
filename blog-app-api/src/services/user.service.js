const grpcClient = require('../grpc-client/grpc');

class UserService{
    
    getAllUsers = async ()=>{
        try{
            return await grpcClient.getAllUsers();
        }catch (error){
            logger.error(error.message);
            throw error;
        }
    }

    loginUser = async (loginCredentials)=>{
        try{
            return await grpcClient.loginUser(loginCredentials);
        }catch (error){
            logger.error(error.message);
            throw error;
        }
    }

    registerUser = async (registerInfo)=>{
        try{
            return await grpcClient.registerUser(registerInfo);
        }catch (error){
            logger.error(error.message);
            throw error;
        }
    }

}

module.exports = new UserService();