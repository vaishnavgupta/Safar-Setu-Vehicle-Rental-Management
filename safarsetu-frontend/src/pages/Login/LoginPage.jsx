import React, {useContext, useState} from 'react';
import {
    Backdrop,
    Button,
    Checkbox,
    Dialog,
    DialogActions,
    DialogTitle,
    IconButton,
    InputAdornment,
    TextField
} from "@mui/material";
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import KeyIcon from '@mui/icons-material/Key';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';
import LoginHero from '../../assets/login_hero.png';
import {z} from 'zod';
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {getProfile, loginUser} from "../../services/authService.js";
import toast from "react-hot-toast";
import {useNavigate} from "react-router";
import {AuthContext} from "../../context/AuthContext.jsx";
import Loader from "../../components/Loader.jsx";
import ConstructionIcon from '@mui/icons-material/Construction';
import CarRentalIcon from "@mui/icons-material/CarRental";

const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string()
});

const LoginPage = () => {
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

    const { setUser } = useContext(AuthContext)

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        resolver:  zodResolver(loginSchema),
        mode: 'onBlur'
    })

    const [openDialog, setOpenDialog] = useState(false);
    const handleClose = () => {
        setOpenDialog(false);
    }

    const onSubmit = async (data) => {
        setLoading(true);
        try{
            const response = await loginUser(data)
            localStorage.setItem('token', response.data.jwt);
            const resp = await getProfile();
            setUser(resp.data);
            toast.success(`User logged in successfully.`)
            navigate("/dashboard")
            reset()
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
    <div className="min-h-screen">
      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-36 items-center px-3 py-12">

          {/* Login Form */}
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
              <h1 className="text-2xl font-serif text-indigo-800 bg-indigo-100 rounded-xl p-2 font-bold border border-gray-300 mb-8 lg:hidden">Welcome Back!</h1>

              {/*  Form Fields  */}
              <form className="flex flex-col justify-center w-full gap-2 mb-8" onSubmit={handleSubmit(onSubmit)}>
                  {/* Email */}
                  <label htmlFor="email" className="text-md text-gray-800 font-bold tracking-wider ">Email</label>
                  <TextField
                      id="email"
                      variant="outlined"
                      placeholder="johndoe@example.com"
                      fullWidth
                      sx={{mb: 2}}
                      {...register('email')}
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

                  {/*  Password  */}
                  <label htmlFor="password" className="text-md text-gray-800 font-bold tracking-wider ">Password</label>
                  <TextField
                      id="password"
                      variant="outlined"
                      placeholder="••••••••"
                      fullWidth
                      sx={{ mb: 2 }}
                      type={showPassword ? 'text' : 'password'}
                      {...register("password")}
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

                  {/*  Remember Me  */}
                  <div className="flex items-center gap-3 mb-3">
                      <Checkbox />
                      <span className="font-bold text-gray-800">Remember me</span>
                  </div>

                  {/*  Log In Button  */}
                  <Button
                      variant="contained"
                      sx={{fontWeight: 'bold'}}
                      disabled={loading}
                      type="submit"
                  >
                      {loading ? "Logging in ..." : "Log in"}
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
                  Don't have an account ? <span className="text-indigo-600 font-semibold"> <a href="/sign-up">Sign up</a> </span>
              </p>

              <Dialog
                  open={openDialog}
                  onClose={handleClose}
              >
                <DialogTitle >
                    Login As Guest
                </DialogTitle>
                  <DialogActions>
                      <Button onClick={handleClose}>No</Button>
                      <Button onClick={handleClose} autoFocus>
                          Yes
                      </Button>
                  </DialogActions>
              </Dialog>

              <div className="flex flex-col lg:flex-row gap-4 items-center justify-between w-full">
                  {/*  Google Button  */}
                  <div
                      onClick={() => {
                          window.location.href = import.meta.env.VITE_API_BASE_URL + "/oauth2/authorization/google"
                      }}
                      className="flex items-center justify-center w-full gap-2 bg-white rounded-lg border border-gray-300 py-2 hover:bg-gray-100 cursor-pointer">
                      <GoogleIcon />
                      <p className="font-bold">Sign in with Google</p>
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
                      <p className="font-bold text-white">Sign in with Github</p>
                  </div>
              </div>

          </div>
          {/* Graphic Illustration */}
          <div className="w-full h-full bg-purple-600 p-12 rounded-xl hidden lg:flex">
              <img
                  src={LoginHero}
                  alt="Login Hero"
                  className="w-full h-full object-cover "
              />
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
                <Loader text="Recognizing the driver..." />
            </Backdrop>
        )}
    </div>
  );
};

export default LoginPage;
