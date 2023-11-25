const UserService = require('../services/user.service');

class UserController{
    getAllUsers = async (req,res)=>{
        try {
            const allUsers =  await UserService.getAllUsers();
            res.status(200).json(allUsers);
          } catch {
            res.status(500).send();
          }
    }
    loginUser = async (req,res)=>{
        try{
            const loginCredentials = req.body;
            const jwtToken = await UserService.loginUser(loginCredentials);
            res.status(200).json(jwtToken);
        }catch (error){
            res.status(500).send(error)
        }
    }

    registerUser = async (req,res)=>{
        try{
            const registerInfo = req.body;
            const jwtToken = await UserService.registerUser(registerInfo);
            res.status(200).json(jwtToken);
        }catch (error){
            res.status(500).send(error)
        }
    }
}

module.exports = new UserController();