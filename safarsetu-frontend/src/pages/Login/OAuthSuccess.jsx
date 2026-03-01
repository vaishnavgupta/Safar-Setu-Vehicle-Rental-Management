import React, {useEffect} from 'react';
import {useNavigate, useSearchParams} from "react-router";
import CommuteIcon from "@mui/icons-material/Commute";
import {CircularProgress} from "@mui/material";

const OAuthSuccess = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const handleOAuthLogin = () => {
        const token = searchParams.get("token");
        console.log("Full URL:", window.location.href);
        console.log("Token extracted:", token);
        if(token) {
            localStorage.setItem("token", token);
            navigate("/dashboard", {replace: true});
        }
        else navigate("/login", {replace: true});
    }

    useEffect(() => {
        handleOAuthLogin();
    }, []);

    return (
        <>
            <div className="bg-indigo-100 flex flex-col items-center justify-center min-h-screen">
                {/* Top Logo */}
                <div className="flex items-center gap-3 mb-10 cursor-pointer">
                    <div className="p-2 bg-indigo-600 rounded-lg">
                        <CommuteIcon className="text-white"/>
                    </div>
                    <h2 className="text-2xl font-bold">
                        Safar <span className="text-indigo-400">Setu</span>
                    </h2>
                </div>
                <CircularProgress size={48} sx={{ color: '#6366f1' }} />
                <h3 className="text-3xl font-sana font-bold">Logging you in</h3>
            </div>
        </>
    );
};

export default OAuthSuccess;
