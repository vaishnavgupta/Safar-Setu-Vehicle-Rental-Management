import React from 'react';
import { Navigate, Outlet } from 'react-router';
import { jwtDecode } from 'jwt-decode';

const PublicRoute = () => {
    const token = localStorage.getItem('token');
    try {
        if (token && jwtDecode(token).exp > Date.now() / 1000) {
            return <Navigate to="/dashboard" replace />;
        }
    } catch { /* invalid token, not allow access */ }

    return <Outlet />;
};

export default PublicRoute;