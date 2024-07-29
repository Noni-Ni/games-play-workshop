import { createContext } from "react";
import usePersistedState from "../hooks/usePersistedState";



export const AuthContext = createContext({
    _id: '',
    username: '',
    email: '',
    accessToken: '',
    isAuthenticated: false,
    changeAuthState: ( authState = {}) => null,
    logout: () => null
});

export function AuthContextProvider(props){
    
  const [authState, setAuthState] = usePersistedState('auth', {});

  const changeAuthState = (state) => {
    localStorage.setItem('accessToken', state.accessToken)
    setAuthState(state);
  }

  const logout = () => {
    setAuthState(null)
  }

  const contextData = {
    _id: authState?._id,
    username: authState?.username,
    email: authState?.email,
    accessToken: authState?.accessToken,
    isAuthenticated: !!authState?.email,
    changeAuthState,
    logout
  }
    return (
        <AuthContext.Provider value={contextData} >
            {props.children}
        </AuthContext.Provider>
    )
}