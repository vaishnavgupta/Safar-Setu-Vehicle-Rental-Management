import {createContext, useEffect, useState} from "react";
import {getProfile} from "../services/authService.js";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true);

    const loadUser = async () => {
        const token = localStorage.getItem("token");

        if(!token){
            setLoading(false);
            return;
        }

        try {
            const user = await getProfile();
            setUser(user);
        } catch {
            localStorage.removeItem("token");
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadUser();
    }, [])
    
    return (
        <AuthContext.Provider value={{user, setUser , loading}}>
            {children}
        </AuthContext.Provider>
    );
};