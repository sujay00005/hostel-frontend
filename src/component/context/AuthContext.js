import {createContext} from "react";
import {login, signInWithGoogle, register, logout} from "../general/auth";

const UserContext=createContext();

export const AuthContextProvider=({children})=>{
    return (
        <UserContext.Provider value={{login, signInWithGoogle, register, logout}}>
            {children}
        </UserContext.Provider>
    )
}

export const UserAuth=() => {
    return UserContext(UserContext)
}