import { login } from "../api/auth-api"


export function useLogin(){

    const loginHandler = async( email, password) =>{
        
       
            const result = await login(email, password);
            console.log(result)
       
    }

    return loginHandler
}