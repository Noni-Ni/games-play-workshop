import { useContext } from "react";
import { AuthContext } from "../contexts/authContext";

export default function withAuth(Component){
    const ComponentWrapper = ( props ) =>{
        const authContext = useContext(AuthContext);
        return <Component { ...props} auth={authContext}  />
    }
    return ComponentWrapper;
}