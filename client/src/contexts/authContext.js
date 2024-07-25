import { createContext } from "react";



export const AuthContext = createContext({
    _id: '',
    username: '',
    email: '',
    accessToken: '',
    isAuthenticated: false,
    changeAuthState: ( authState = {}) => null
});