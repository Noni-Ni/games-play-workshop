import { useContext } from "react"
import { AuthContext } from "../../contexts/authContext"
import { Navigate, Outlet } from "react-router-dom";

export default function PrivateGuard(){

    const { isAuthenticated } = useContext(AuthContext);
    if(! isAuthenticated){
        return <Navigate to={'/login'} />
    }
    return (
        <>
            <Outlet/>
        </>
    )
}