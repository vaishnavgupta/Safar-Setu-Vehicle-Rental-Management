import React from 'react';
import {Navigate, Outlet} from "react-router";
import {jwtDecode} from "jwt-decode";
import toast from "react-hot-toast";

const ProtectedRoute = () => {
    const isTokenValid = () => {
        const token = localStorage.getItem("token");
        if(!token) return false;

        try {
            const decoded = jwtDecode(token);
            const currentTime = Date.now() / 1000;
            return decoded.exp > currentTime;
        }
        catch(error) {
            console.error(error);
            toast.error("Invalid JWT Token");
            return false;
        }
    }
    return isTokenValid()
        ? <Outlet />
        : <Navigate to="/" replace />

};

export default ProtectedRoute;
