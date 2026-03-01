import React, {useEffect, useRef, useState} from 'react';
import {
    Avatar,
    Backdrop,
    Button,
    Card,
    CardContent,
    Chip,
    InputAdornment,
    Rating,
    Skeleton,
    TextField
} from "@mui/material";
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import EditNoteIcon from '@mui/icons-material/EditNote';
import BadgeIcon from '@mui/icons-material/Badge';
import SaveIcon from '@mui/icons-material/Save';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail'
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import toast from "react-hot-toast";
import {getProfile, updateProfile, updateUserProfileImage} from "../../services/authService.js";
import Loader from "../../components/Loader.jsx";


const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [isEdit, setIsEdit] = useState(false);
    const [fullName, setFullName] = useState(user?.fullName);
    const [phoneNumber, setPhoneNumber] = useState(user?.phone);
    const [loading, setLoading] = useState(false);
    const [updateLoading, setUpdateLoading] = useState(false);
    const fileInputRef = useRef(null);

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
            console.log(response.data);
        }
        catch(e) {
            console.log(e);
            toast.error("Error fetching user profile");
        }
        finally {
            setLoading(false);
        }
    }

    const updateUserProfile = async () => {

        if (fullName.length < 3 || fullName.length > 30) {
            toast.error("Full Name must have 3-30 characters");
            return;
        }

        if (!/^[6-9]\d{9}$/.test(phoneNumber)) {
            toast.error("Phone Number must be valid 10 digits");
            return;
        }

        setUpdateLoading(true);

        const request = {
            userId: user.id,
            email: user.email,
            fullName,
            phone: phoneNumber
        };

        try {
            const response = await updateProfile(request);
            setUser(response.data); // update UI
            toast.success("Profile updated successfully!");
        } catch (error) {
            console.log(error);
            toast.error("Error updating profile");
        } finally {
            setUpdateLoading(false);
        }
    };

    const handleUpdateProfile = async () => {
        if (!isEdit) {
            setIsEdit(true);
        } else {
            await updateUserProfile();
            setIsEdit(false);
        }
    };

    //Triggering Input From Button
    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleFileUpload = async (event) => {
        const file = event.target.files[0];

        if(!file) {
            toast.error("Please select a image first");
            return;
        }
        const data = new FormData();
        data.append("file", file);
        try {
            setUpdateLoading(true);
            const response = await updateUserProfileImage(data);
            setUser(response.data)
            toast.success("Profile image updated successfully!");
        } catch (error) {
            console.error("Upload error:", error);
            alert("Upload failed!");
        } finally {
            setUpdateLoading(false);
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
                    <h1 className="text-4xl font-bold text-indigo-800 mb-2" >My <span className="bg-gradient-to-br from-indigo-600 to-purple-400 bg-clip-text text-transparent" >Profile</span></h1>

                    <p className="text-lg text-gray-600" >Manage your account information and preferences.</p>

                </div>
                {/*  Main Content  */}
                <div className="grid grid-cols-1 my-4 gap-6 lg:grid-cols-[30%_70%] lg:gap-6">
                    {/*Side bar Skeleton*/}
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
                        <h1 className="text-4xl font-bold text-indigo-800 mb-2" >My <span className="bg-gradient-to-br from-indigo-600 to-purple-400 bg-clip-text text-transparent" >Profile</span></h1>

                        <p className="text-lg text-gray-600" >Manage your account information and preferences.</p>

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

                                        <input
                                            type="file"
                                            accept="image/*"
                                            style={{display: 'none'}}
                                            onChange={handleFileUpload}
                                            ref={fileInputRef}
                                        />

                                        {/* Icon Badge */}
                                        <div
                                            className="absolute bottom-2 right-2
                                                        flex items-center justify-center w-10 h-10
                                                        bg-gradient-to-r from-indigo-500 to-blue-600
                                                        rounded-full
                                                        shadow-lg
                                                        border-4 border-white cursor-pointer"
                                            onClick={handleButtonClick}
                                        >

                                            <DriveFileRenameOutlineIcon className="w-5 h-5 text-white" />
                                        </div>

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
                                        label="Premium Member"
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
                            <Card className=" px-8 py-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300">
                                <CardContent className="flex flex-col items-center gap-4 text-center">
                                    <h2 className="text-2xl font-bold text-gray-800">My Rating</h2>
                                    <div className="flex items-center gap-2">
                                        <Rating value={4.5} precision={0.5} readOnly size="large"/>
                                        <span className="text-sm text-gray-600 font-semibold">(4.5)</span>
                                    </div>
                                    <div className="flex flex-row items-center gap-2 bg-red-200 rounded-xl py-4 px-2 shadow-md" >
                                        <span className="text-md text-red-500 font-bold">Note: </span>
                                        <span className="text-sm text-gray-600 font-semibold">Users with rating below 3 may not be allowed to take Vehicle Rentals</span>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                        <Card className=" px-8 py-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300">
                            <CardContent>
                                <div className="flex items-center justify-between w-full mb-12">
                                    <h2 className="font-bold text-2xl">Profile Information</h2>
                                    <Button onClick={handleUpdateProfile}
                                            disabled={updateLoading}
                                            variant="outlined"
                                            startIcon={ isEdit ? <SaveIcon /> : <EditNoteIcon /> }
                                            sx={{fontWeight:"bold"}}>
                                        {
                                            isEdit ? "Save Changes" : "Edit Profile"
                                        }
                                    </Button>

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
                                        value={isEdit ? fullName : user?.fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                        slotProps={{
                                            input: {readOnly:  !isEdit}
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
                                        value={isEdit ? phoneNumber : user?.phone}
                                        slotProps={{
                                            input: {
                                                readOnly:  !isEdit,
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
                {updateLoading && (
                    <Backdrop
                        sx={{
                            color: '#6366f1', // Indigo-600
                            zIndex: (theme) => theme.zIndex.drawer + 1,
                            backgroundColor: 'rgba(255, 255, 255, 0.4)',
                            backdropFilter: 'blur(8px)',
                        }}
                        open={updateLoading}>
                        <Loader text="Oiling your profile..." />
                    </Backdrop>
                )}
            </div>
        );
    }

};

export default ProfilePage;
