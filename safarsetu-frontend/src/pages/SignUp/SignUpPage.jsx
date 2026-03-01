import React, {useState} from 'react';
import CommuteIcon from "@mui/icons-material/Commute";
import {Backdrop, Button, Checkbox, IconButton, InputAdornment, TextField} from "@mui/material";
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import KeyIcon from '@mui/icons-material/Key';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';
import signUpAnimation from "../../assets/animations/sign_up_hero.json"
import AnimatedHero from "../Home/AnimatedHero.jsx";
import BadgeIcon from '@mui/icons-material/Badge';
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {useNavigate} from "react-router";
import {signUpUser} from "../../services/authService.js";
import toast from "react-hot-toast";
import Loader from "../../components/Loader.jsx";
import ConstructionIcon from "@mui/icons-material/Construction";
import CarRentalIcon from "@mui/icons-material/CarRental";

const registerSchema = z.object({
    fullName: z.string().min(3, "Min Length is 3").max(30, 'Max Length is 30'),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, 'Minimum 8 chars')
        .regex(/[A-Z]/, 'Need uppercase')
        .regex(/[0-9]/, 'Need number'),
    phone: z.string()
        .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit phone number"),
})

const SignUpPage = () => {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (event) => {
        event.preventDefault();
    };

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        resolver:  zodResolver(registerSchema),
        mode: 'onBlur'
    });

    const onSubmit = async (data) => {
        setLoading(true);
        try{
            await signUpUser(data)
            toast.success(`User signed up successfully.`)
            navigate("/login")
            reset()
        }
        catch (err) {
            console.error(err.response?.data?.message || "Signup failed");
            toast.error(`${err.response?.data?.message || "Signup failed"}`)
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen">
            <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-36 items-center px-3 py-12">

                {/* Signup Form */}
                <div className="flex flex-col items-center justify-center">
                    {/* Top Logo */}
                    <div className="flex items-center gap-3 mb-10 cursor-pointer">
                        <div className="p-2 bg-indigo-600 rounded-lg">
                            <CarRentalIcon className="text-white" />
                        </div>
                        <h2 className="text-2xl font-bold">
                            Safar <span className="text-indigo-400">Setu</span>
                        </h2>
                    </div>

                    {/* Mobile Heading */}
                    <h1 className="text-2xl font-serif text-indigo-800 bg-indigo-100 rounded-xl p-2 font-bold border border-gray-300 mb-8 lg:hidden">Create an account!</h1>

                    {/*  Form Fields  */}
                    <form className="flex flex-col justify-center w-full gap-2 mb-8" onSubmit={handleSubmit(onSubmit)}>
                        {/* Name */}
                        <label htmlFor="fullName" className="text-md text-gray-800 font-bold tracking-wider ">Name</label>
                        <TextField
                            id="fullName"
                            variant="outlined"
                            placeholder="John Doe"
                            fullWidth
                            sx={{mb: 2}}
                            type="text"
                            {...register("fullName")}
                            error={!!errors.fullName}
                            helperText={errors.fullName?.message}
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <BadgeIcon />
                                        </InputAdornment>
                                    ),
                                },
                            }}
                        />

                        {/* Email */}
                        <label htmlFor="email" className="text-md text-gray-800 font-bold tracking-wider ">Email</label>
                        <TextField
                            id="email"
                            variant="outlined"
                            placeholder="johndoe@example.com"
                            fullWidth
                            sx={{mb: 2}}
                            {...register("email")}
                            error={!!errors.email}
                            helperText={errors.email?.message}
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <AlternateEmailIcon />
                                        </InputAdornment>
                                    ),
                                },
                            }}
                        />

                        {/* Phone */}
                        <label htmlFor="phone" className="text-md text-gray-800 font-bold tracking-wider ">Phone Number</label>
                        <TextField
                            id="phone"
                            variant="outlined"
                            placeholder="9876543210"
                            fullWidth
                            sx={{mb: 2}}
                            type="tel"
                            {...register('phone')}
                            error={!!errors.phone}
                            helperText={errors.phone?.message}
                            slotProps={{
                                input: {
                                    startAdornment: <InputAdornment position="start">+91</InputAdornment>,
                                    endAdornment: <InputAdornment position="end">🇮🇳</InputAdornment>
                                },
                            }}
                        />

                        {/*  Password  */}
                        <label htmlFor="password" className="text-md text-gray-800 font-bold tracking-wider ">Password</label>
                        <TextField
                            id="password"
                            variant="outlined"
                            placeholder="••••••••"
                            fullWidth
                            sx={{ mb: 2 }}
                            type={showPassword ? 'text' : 'password'}
                            {...register('password')}
                            error={!!errors.password}
                            helperText={errors.password?.message}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <KeyIcon />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label={
                                                showPassword ? 'hide the password' : 'display the password'
                                            }
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            onMouseUp={handleMouseUpPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />

                        {/*  Log In Button  */}
                        <Button
                            variant="contained"
                            sx={{fontWeight: 'bold'}}
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? "Registering..." : "Sign up"}
                        </Button>
                    </form>

                    {/*  OR Line  */}
                    <div className="flex items-center w-full mb-4">
                        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-400 to-gray-300" />

                        <span className="px-4 text-gray-600 font-medium">OR</span>

                        <div className="flex-1 h-px bg-gradient-to-l from-transparent via-gray-400 to-gray-300" />
                    </div>

                    {/*  Sign Up  */}
                    <p className="mb-4">
                        Already have an account ? <span className="text-indigo-600 font-semibold"> <a href="/login">Log in</a> </span>
                    </p>

                    <div className="flex flex-col lg:flex-row gap-4 items-center justify-between w-full">
                        {/*  Google Button  */}
                        <div
                            onClick={() => {
                                window.location.href = "http://localhost:8080/oauth2/authorization/google"
                            }}
                            className="flex items-center justify-center w-full gap-2 bg-white rounded-lg border border-gray-300 py-2 hover:bg-gray-100 cursor-pointer">
                            <GoogleIcon />
                            <p className="font-bold">Sign up with Google</p>
                        </div>

                        {/*  Github Button  */}
                        <div
                            onClick={() => {
                                toast.error("Github OAuth Failure. Use Others.", {
                                    icon: <ConstructionIcon sx={{ color: '#f59e0b' }} />,
                                })
                            }}
                            className="flex items-center justify-center w-full gap-2 bg-gray-900 rounded-lg py-2 hover:bg-gray-800 cursor-pointer">
                            <GitHubIcon sx={{color:"#ffffff"}} />
                            <p className="font-bold text-white">Sign up with Github</p>
                        </div>
                    </div>

                </div>
                {/* Graphic Illustration */}
                <div className="w-full h-full hidden lg:flex lg:flex-col items-center justify-center gap-4">
                    <h2 className="text-4xl font-bold font-serif text-indigo-800 bg-indigo-100 rounded-xl p-4 border border-gray-300">Create an account!</h2>
                    <AnimatedHero animation={signUpAnimation} />
                </div>
            </div>
            <div className="flex flex-col items-center justify-center mb-4">
                <p>
                    © {new Date().getFullYear()} Safar Setu. All rights reserved.
                </p>

                <p>
                    Designed & Developed with ❤️ by <span className="font-bold">Vaishnav Gupta</span>
                </p>
            </div>
            {loading && (
                <Backdrop
                    sx={{
                        color: '#6366f1', // Indigo-600
                        zIndex: (theme) => theme.zIndex.drawer + 1,
                        backgroundColor: 'rgba(255, 255, 255, 0.4)',
                        backdropFilter: 'blur(8px)',
                    }}
                    open={loading}>
                    <Loader text="Fueling up your account..." />
                </Backdrop>
            )}
        </div>
    );
};

export default SignUpPage;
