import { useContext } from "react";

import { login, register , logout } from "../api/auth-api"
import { AuthContext } from "../contexts/authContext";


export function useLogin(){

    const { changeAuthState } = useContext(AuthContext);
    const loginHandler = async( email, password) =>{
        
            const result = await login(email, password);
            //const {password: _, ...authData} = await login(email, password) way to remove password from authState
            changeAuthState(result);
            return result;
    }

    return loginHandler
}

export function useRegister(){

    const { changeAuthState } = useContext(AuthContext);
    const registerHandler = async( email, password) =>{
        
            const result = await register(email, password);

            changeAuthState(result);
            return result;
         
    }

    return registerHandler
}

export function useLogout () {
    
    const { logout: localLogout } = useContext(AuthContext);
    const logoutHandler = async() =>{
        
            await logout();
            localLogout()

    }

    return logoutHandler
}