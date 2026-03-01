import React, {useEffect, useState} from 'react';
import {Avatar, Card, CardContent, Chip, InputAdornment, Skeleton, TextField} from "@mui/material";
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import BadgeIcon from '@mui/icons-material/Badge';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail'
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import toast from "react-hot-toast";
import {getProfile} from "../../services/authService.js";


const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [fullName, setFullName] = useState(user?.fullName);
    const [phoneNumber, setPhoneNumber] = useState(user?.phone);
    const [loading, setLoading] = useState(false);


    console.log(user)

    function formatDateTime(dateString) {
        if (!dateString) return "N/A";

        const date = new Date(dateString);

        return date.toLocaleString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "numeric",
            minute: "2-digit",
            hour12: true
        });
    }

    const getUserProfile = async () => {
        setLoading(true);
        try {
            const response = await getProfile();
            setUser(response.data);
        }
        catch(e) {
            console.log(e);
            toast.error("Error fetching user profile");
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getUserProfile()
    }, []);

    useEffect(() => {
        if (user) {
            setFullName(user.fullName || "");
            setPhoneNumber(user.phone || "");
        }
    }, [user]);

    if(loading || !user) {
        return ( <div className="min-h-screen bg-indigo-50 py-8">
                <div className="px-4 sm:px-8 lg:px-8">
                    <div className="mb-8" >
                        <h1 className="text-4xl font-bold text-indigo-800 mb-2" >My <span className="bg-gradient-to-br from-red-600 to-gray-900 bg-clip-text text-transparent" >Profile</span></h1>

                        <p className="text-lg text-gray-600" >Your account information and preferences.</p>

                    </div>
                    {/*  Main Content  */}
                    <div className="grid grid-cols-1 my-4 gap-6 lg:grid-cols-[30%_70%] lg:gap-6">
                        {/*Sidebar Skeleton*/}
                        <div className="flex flex-col gap-6">
                            <Card className=" px-8 py-6 rounded-2xl ">
                                <div className="flex flex-col items-center gap-6">
                                    <Skeleton variant="circular" width={150} height={150} />
                                    <Skeleton variant="text" width="60%" height={32} />
                                    <Skeleton variant="text" width="40%" height={20} />
                                </div>
                            </Card>
                            <Card className=" px-8 py-6 rounded-2xl ">
                                <Skeleton variant="rectangular" height={100} className="rounded-xl" />
                            </Card>
                        </div>
                        {/*Main Content Skeleton*/}
                        <Card className="px-8 py-6 rounded-2xl">
                            <div className="flex justify-between mb-12">
                                <Skeleton variant="text" width="30%" height={40} />
                                <Skeleton variant="rectangular" width={120} height={40} className="rounded-lg" />
                            </div>

                            <div className="space-y-8">
                                {
                                    [1,2,3].map((i) => (
                                        <div key={i}>
                                            <Skeleton variant="text" width="20%" />
                                            <Skeleton variant="rectangular" height={56} className="rounded-md" />
                                        </div>
                                    ))
                                }
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        );
    }
    else {
        return (
            <div className="min-h-screen bg-indigo-50 py-8">
                <div className="px-4 sm:px-8 lg:px-8">
                    <div className="mb-8 animate-fade-in-up" >
                        <h1 className="text-4xl font-bold text-indigo-800 mb-2" >My <span className="bg-gradient-to-br from-red-600 to-white bg-clip-text text-transparent" >Profile</span></h1>

                        <p className="text-lg text-gray-600" >Your account information and preferences.</p>

                    </div>
                    {/*  Main Content  */}
                    <div className="grid grid-cols-1 my-4 gap-6 lg:grid-cols-[30%_70%] lg:gap-6">
                        <div className="flex flex-col gap-6">
                            <Card className=" px-8 py-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300">

                                <CardContent className="flex flex-col items-center gap-4 text-center">

                                    {/* Avatar Wrapper */}
                                    <div className="relative inline-block">

                                        <Avatar
                                            src={user?.profileImageUrl}
                                            sx={{ width: 150, height: 150 }}
                                        >
                                            {user?.fullName?.charAt(0)}
                                        </Avatar>

                                    </div>

                                    {/* User Info */}
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-800">
                                            {user?.fullName}
                                        </h2>

                                        <h3 className="text-md text-gray-500 mt-1">
                                            {user?.email}
                                        </h3>
                                    </div>

                                    {/* Premium Chip */}
                                    <Chip
                                        icon={<TaskAltIcon sx={{ fontSize: 18, color: "#A57C00" }} />}
                                        label="Admin"
                                        sx={{
                                            background: "linear-gradient(135deg, #facc15, #f59e0b)",
                                            color: "#1f2937",
                                            fontWeight: 600,
                                            px: 1,
                                            "& .MuiChip-icon": {
                                                color: "#1f2937"
                                            }
                                        }}
                                    />

                                </CardContent>
                            </Card>
                        </div>
                        <Card className=" px-8 py-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300">
                            <CardContent>
                                <div className="flex items-center justify-between w-full mb-12">
                                    <h2 className="font-bold text-2xl">Profile Information</h2>
                                </div>
                                <form className="flex flex-col justify-center gap-2 mb-4">
                                    {/*Full Name*/}
                                    <div className="flex items-center gap-2 text-gray-700 font-semibold mt-4">
                                        <BadgeIcon/>
                                        <span>Full Name</span>
                                    </div>
                                    <TextField
                                        id="fullName"
                                        type="text"
                                        variant="outlined"
                                        value={user?.fullName || ''}
                                        onChange={(e) => setFullName(e.target.value)}
                                        slotProps={{
                                            input: {readOnly:  true}
                                        }}
                                    />

                                    {/* Email -> Always Read Only */}
                                    <div className="flex items-center gap-2 text-gray-700 font-semibold mt-4">
                                        <AlternateEmailIcon/>
                                        <span>Email Address</span>
                                    </div>
                                    <TextField
                                        type="email"
                                        variant="outlined"
                                        value={user?.email || ''
                                        }
                                        slotProps={{
                                            input: {readOnly:  true}
                                        }}
                                    />

                                    {/*  Phone Number  */}
                                    <div className="flex items-center gap-2 text-gray-700 font-semibold mt-4">
                                        <ContactPhoneIcon/>
                                        <span>Phone Number</span>
                                    </div>
                                    <TextField
                                        type="number"
                                        variant="outlined"
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                        value={ user?.phone || ''}
                                        slotProps={{
                                            input: {
                                                readOnly:  true,
                                                startAdornment: <InputAdornment position="start">+ 91</InputAdornment>,
                                                endAdornment: <InputAdornment position="end">🇮🇳</InputAdornment>
                                            },
                                        }}
                                    />

                                    <div className="flex flex-col items-center justify-center bg-indigo-200 rounded-xl py-4 px-2 shadow-md mt-6 gap-2">
                                        <p className="font-bold text-indigo-800" >Last Login</p>
                                        <p className="font-semibold font-mono">{formatDateTime(user?.lastLogin)}</p>
                                    </div>

                                </form>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        );
    }

};

export default ProfilePage;
