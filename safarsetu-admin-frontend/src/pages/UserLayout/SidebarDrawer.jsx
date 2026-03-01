import React from 'react';
import {
    Avatar,
    Box,
    Chip,
    Divider,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    Tooltip,
    Typography
} from "@mui/material";
import CarRentalIcon from '@mui/icons-material/CarRental';
import {alpha} from "@mui/system";
import {NavConstants, secondaryConstants} from "./NavConstants.jsx";
import {useLocation, useNavigate} from "react-router";
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import {isActive} from "./utils.js";
import toast from "react-hot-toast";

const SidebarDrawer = () => {
    const navItemsList = NavConstants;
    const secondaryNavItems = secondaryConstants
    const location = useLocation();
    const navigate = useNavigate();


    const handleNavPathChange = (path) => {
        navigate(path);
    }

    const handleLogout = () => {
        localStorage.removeItem("token")
        toast.success("Logout successful");
        navigate("/", {replace: true});
    }

  return (
    <Box
        sx={{
            height: "100%",
            display: 'flex',
            flexDirection: 'column',
            background: 'linear-gradient(180deg, #450a0a 0%, #1a0505 100%)',
            color: 'white',
            position: 'relative',
            overflow: 'hidden',
        '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '300px',
            background: 'radial-gradient(circle at 50% 0%, rgba(99, 102, 241, 0.15) 0%, transparent 100%)',
            pointerEvents: 'none',
        },
    }}


    >
        <Box sx={{p:3, display: "flex", alignItems: 'center', gap:2, position: 'relative', zIndex: 1}}>
            <Box>
                <Avatar
                    sx={{
                        width: 48,
                        height: 48,
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        fontWeight: 'bold',
                        fontSize: '1.3rem',
                        boxShadow: '0 8px 24px rgba(102, 126, 234, 0.4)'
                    }}
                >
                    <CarRentalIcon />
                </Avatar>
            </Box>
            <Box>
                <Typography
                    variant="h6"
                    sx={{
                        letterSpacing: 1,
                        background: "linear-gradient(135deg, #ffffff 0%, #e0e7ff 100%)",
                        backgroundClip: "text",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent" }}>
                    Safar Setu
                </Typography>
                <Typography
                    variant="caption"
                    sx={{
                        letterSpacing: 0.7,
                        opacity: 0.7,
                        fontWeight: 500,
                        textTransform: 'uppercase',
                    }}
                >
                    Admin Panel
                </Typography>
            </Box>
        </Box>
        {/*  Main Navigation Bar  */}
        <List sx={{ flexGrow: 1, overflowY: 'auto',
            '&::-webkit-scrollbar': { width: '4px' },
            '&::-webkit-scrollbar-track': { background: 'transparent' },
            '&::-webkit-scrollbar-thumb': { background: 'rgba(255,255,255,0.2)', borderRadius: '4px' },
        }}>
            {/* Primary List Items */}
            {navItemsList.map((item, index) => {
                const active = isActive(item.path, location)
                return (
                    <ListItem
                        onClick={() => handleNavPathChange(item.path)}
                        key={index}
                    >
                        <Tooltip title={item.description} placement="right">
                            <ListItemButton
                                sx={{
                                    borderRadius: 2.5,
                                    py: 1.5,
                                    px: 2,
                                    transition: 'all 0.4s cubic-bezire(0.4, 0, 0.2, 1)',
                                    position: 'relative',
                                    bgcolor: active
                                        ? 'linear-gradient(135deg, rgba(220, 38, 38, 0.25) 0%, rgba(153, 27, 27, 0.25) 100%)'
                                        : 'transparent',
                                    border: active ? '1px solid rgba(220, 38, 38, 0.3)' : '1px solid transparent',
                                    backdropFilter: active ? 'blur(10px)' : 'none',
                                    '&:hover': {
                                            bgcolor: active
                                                ? alpha('#ef4444', 0.3)
                                                : 'rgba(255,255,255,0.08)',
                                            transform: 'translateX(6px)',
                                            border: '1px solid rgba(255,255,255,0.08)',
                                        },
                                }}
                            >
                                <ListItemIcon
                                    sx={{ color: active ? '#f87171' : 'rgba(255, 255, 255, 0.7)' }}
                                >{item.icon}</ListItemIcon>
                                {item.title}
                            </ListItemButton>
                        </Tooltip>
                    </ListItem>
                )
            })}
            <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.05)", mx:3 }} />
            {/* Secondary List Items */}
            {secondaryNavItems.map((item, index) => {
                const active = isActive(item.path, location)
                return (
                    <ListItem
                        onClick={() => handleNavPathChange(item.path)}
                        key={index}
                    >
                        <Tooltip title={item.description} placement="right">
                            <ListItemButton
                                sx={{
                                    borderRadius: 2.5,
                                    py: 1.5,
                                    px: 2,
                                    transition: 'all 0.4s cubic-bezire(0.4, 0, 0.2, 1)',
                                    position: 'relative',
                                    bgcolor: active
                                        ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.25) 0%, rgba(168, 85, 247, 0.25) 100%)'
                                        : 'transparent',
                                    border: active ? '1px solid rgba(99, 102, 241, 0.3)' : '1px solid transparent',
                                    backdropFilter: active ? 'blur(10px)' : 'none',
                                    '&:hover': {
                                        bgcolor: active
                                            ? alpha('#ef4444', 0.3)
                                            : 'rgba(255,255,255,0.08)',
                                        transform: 'translateX(6px)',
                                        border: '1px solid rgba(255,255,255,0.08)',
                                    },
                                }}
                            >
                                <ListItemIcon
                                    sx={{ color: active ? '#f87171' : 'rgba(255, 255, 255, 0.7)' }}
                                >{item.icon}</ListItemIcon>
                                {item.title}
                            </ListItemButton>
                        </Tooltip>
                    </ListItem>
                )
            })}
            {/* Logout Button */}
            <Box sx={{p:2, mt:-1}}>
                <ListItemButton
                    onClick={handleLogout}
                    sx={{
                        borderRadius: 2.5,
                        py: 1.5,
                        px: 2,
                        background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.15) 0%, rgba(220, 38, 38, 0.15) 100%)',
                        border: '1px solid rgba(239, 68, 68, 0.2)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.25) 0%, rgba(220, 38, 38, 0.25) 100%)',
                            border: '1px solid rgba(239, 68, 68, 0.4)',
                            transform: 'translateY(-2px)',
                            boxShadow: '0 8px 24px rgba(239, 68, 68, 0.25)'
                        },
                    }}>
                    <ListItemIcon
                        sx={{color:  'red', transition: 'all 0.3s ease' }}
                        onClick={handleLogout}
                    >
                        <MeetingRoomIcon/>
                    </ListItemIcon>
                    Logout
                </ListItemButton>

                {/*  About Developer  */}
                <Chip sx={{mt:1, fontWeight:'bold', justifyItems:'center'}} label="© SafarSetu Vaishnav Gupta" color="info" variant="outlined"/>

            </Box>

        </List>

    </Box>
  );
};

export default SidebarDrawer;
