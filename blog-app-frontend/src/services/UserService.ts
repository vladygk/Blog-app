export interface UserRequestInput{
    username:string;
    email:string;
    password:string;
}

class UserService{
    getAllUsers =async ()=>{
        const url = "http://localhost:5000/auth/all";
        const response = await fetch(url);
        const data = await response.json();
        return data.data;
    }

    loginUser = async (input:UserRequestInput)=>{
        const url = "http://localhost:5000/auth/login";
        const response = await fetch(url, {
            method: "POST",
            headers:{
                "Content-Type": "application/json",
            },
            body:JSON.stringify(input)
        });
        const data = await response.json();
        console.log(data);
    }

    registerUser = async (input:UserRequestInput)=>{
        const url = "http://localhost:5000/auth/register";
        const response = await fetch(url, {
            method: "POST",
            headers:{
                "Content-Type": "application/json",
            },
            body:JSON.stringify(input)
        });
        const data = await response.json();
        console.log(data);
    }
}

export default new UserService();