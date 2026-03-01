import React, {useEffect, useState} from 'react';
import {AppBar, Avatar, IconButton, Toolbar, Tooltip, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {useLocation, useNavigate} from "react-router";
import {NavConstants} from "./NavConstants.jsx";
import {isActive} from "./utils.js";
import SettingsIcon from '@mui/icons-material/Settings';


const Navbar = ({handleDrawerToggle}) => {

    const drawerWidth = 240;
    const location = useLocation();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    // const getUserProfile = async () => {
    //
    //     try {
    //         const response = await getProfile();
    //         setUser(response.data);
    //         console.log(response.data);
    //     }
    //     catch(e) {
    //         console.log(e);
    //         toast.error("Error fetching user profile");
    //     }
    // }

    // useEffect(() => {
    //     getUserProfile()
    // }, []);

    return (
        <AppBar position="fixed" sx={{
            width: {md: `calc(100% - ${drawerWidth}px)`},
            ml: {md: `${drawerWidth}px` },
            // Updated to shades of red with 0.8 opacity for the glass effect
            background: "linear-gradient(135deg, rgba(239, 68, 68, 0.8), rgba(185, 28, 28, 0.8))",
            backdropFilter: "blur(8px)",
            color: 'white',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        }}>
        <Toolbar>
                <IconButton
                    color="inherit"
                    edge="start"
                    onClick={handleDrawerToggle}
                    sx={{mr:2, display: {md:'none'}}} >
                    <MenuIcon/>
                </IconButton>
                <Typography
                    variant="h6"
                    noWrap={true}
                    component="div"
                    sx={{ flexGrow: 1, fontWeight: 600,  }}
                >
                    {NavConstants.find((item) => isActive(item.path, location))?.title || "Dashboard" }
                </Typography>


                <Tooltip title="Settings">
                    <IconButton sx={{color: 'black', ml: 2}}>
                        <SettingsIcon />
                    </IconButton>
                </Tooltip>

                <Tooltip title="Account">
                    <IconButton sx={{ ml: 2}}
                                onClick={() => {navigate('/profile')}}
                    >
                        <Avatar src={user?.profileImageUrl} sx={{ width:36, height: 36 }} >
                            {user?.fullName?.charAt(0)}
                        </Avatar>
                    </IconButton>
                </Tooltip>

            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
