import React, { useState } from 'react';
import { TextField, InputAdornment, IconButton, CircularProgress } from '@mui/material';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import RequestUserDialog from './RequestUserDialog';
import {loginUser} from "../../services/authService.js";
import toast, {Toaster} from "react-hot-toast";
import {useNavigate} from "react-router";

const inputSx = {
    '& .MuiOutlinedInput-root': {
        borderRadius: 2.5,
        background: '#fafafa',
        '&:hover fieldset': { borderColor: '#c0392b' },
        '&.Mui-focused fieldset': { borderColor: '#c0392b', borderWidth: 2 },
    },
    '& label.Mui-focused': { color: '#c0392b' },
};

const LoginForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [form, setForm] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await loginUser(form);
            const userData = response.data.userDto;
            if(userData.role === "ROLE_USER") {
                toast.error("Admin privileges not found for this account.")
            }
            else {
                localStorage.setItem('token', response.data.jwt);
                toast.success("Login successful");
                navigate('/dashboard')
            }
        }
        catch (err) {
            console.error(`${err.response?.data?.message || "Login failed"}`);
            toast.error("Invalid credentials")
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="w-full max-w-md mx-auto px-6 pb-16">
                <div className="rounded-3xl overflow-hidden shadow-2xl border border-gray-100">

                    {/* Card Header */}
                    <div style={{ background: 'linear-gradient(135deg, #c0392b 0%, #7f1d1d 100%)', padding: '28px 32px' }}>
                        <div className="flex items-center gap-2 mb-1">
                            <LoginIcon style={{ color: 'rgba(255,255,255,0.85)', fontSize: 20 }} />
                            <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.7)' }}>
                                Admin Access
                            </p>
                        </div>
                        <h2 className="text-2xl font-black text-white" style={{ fontFamily: "'Georgia', serif" }}>
                            Log in to Safar Setu
                        </h2>
                        <p className="text-sm mt-1" style={{ color: 'rgba(255,255,255,0.65)' }}>
                            Enter your credentials to continue
                        </p>
                    </div>

                    {/* Form Body */}
                    <div className="bg-white p-8">
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            <TextField
                                label="Email Address"
                                name="email"
                                type="email"
                                value={form.email}
                                onChange={handleChange}
                                fullWidth
                                required
                                sx={inputSx}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <EmailOutlinedIcon fontSize="small" style={{ color: '#c0392b' }} />
                                        </InputAdornment>
                                    )
                                }}
                            />

                            <TextField
                                label="Password"
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                value={form.password}
                                onChange={handleChange}
                                fullWidth
                                required
                                sx={inputSx}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <LockOutlinedIcon fontSize="small" style={{ color: '#c0392b' }} />
                                        </InputAdornment>
                                    ),
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={() => setShowPassword(!showPassword)} edge="end" size="small">
                                                {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                            />

                            {/* Login Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full cursor-pointer py-3 rounded-xl font-bold text-white text-sm tracking-wide flex items-center justify-center gap-2 transition-all hover:opacity-90 hover:shadow-lg active:scale-[0.98] disabled:opacity-60"
                                style={{ background: 'linear-gradient(135deg, #c0392b, #7f1d1d)', marginTop: 4 }}
                            >
                                {loading
                                    ? <CircularProgress size={18} style={{ color: 'white' }} />
                                    : <><LoginIcon fontSize="small" /> Sign In</>
                                }
                            </button>

                            {/* Divider */}
                            <div className="flex items-center gap-3 my-1">
                                <div className="flex-1 h-px bg-gray-200" />
                                <span className="text-xs text-gray-400 font-medium">OR</span>
                                <div className="flex-1 h-px bg-gray-200" />
                            </div>

                            {/* Request User Button */}
                            <button
                                type="button"
                                onClick={() => setDialogOpen(true)}
                                className="w-full cursor-pointer py-3 rounded-xl font-bold text-sm tracking-wide flex items-center justify-center gap-2 transition-all hover:shadow-md active:scale-[0.98]"
                                style={{
                                    background: 'transparent',
                                    border: '2px solid #c0392b',
                                    color: '#c0392b',
                                }}
                            >
                                <PersonAddIcon fontSize="small" />
                                Request New User Account
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            <RequestUserDialog open={dialogOpen} onClose={() => setDialogOpen(false)} />
        </>
    );
};

export default LoginForm;