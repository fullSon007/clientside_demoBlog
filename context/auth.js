"use client";
import { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext();

function AuthProvider({children}) {
    const [auth, setAuth] = useState(null);

    useEffect(() => {
        const auth = localStorage.getItem("auth");
        auth && setAuth(JSON.parse(auth));
    }, [])

    return (
        <AuthContext.Provider value={{auth, setAuth}}>
            {children}
        </AuthContext.Provider>
    );
}

const useAuth = () => useContext(AuthContext);

export {useAuth, AuthProvider};