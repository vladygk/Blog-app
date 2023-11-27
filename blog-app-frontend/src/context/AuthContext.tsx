import { Dispatch, SetStateAction, createContext } from "react";

export interface AuthContextFields{
    username:string;
    token:string;
    setToken: Dispatch<SetStateAction<string|null>>;
}

const AuthContext = createContext({username:'',token:'',setToken:(e:any) => {} });



export default AuthContext;