import React from 'react';
import {Box, Toolbar} from "@mui/material";
import {Outlet} from "react-router";
import UserSidebar from "./UserSidebar.jsx";
import Navbar from "./Navbar.jsx";

const UserLayout = () => {

    const drawerWidth = 240;

  return (
    <Box sx={{display:'flex', minHeight: '100vh', bgcolor: 'white'}} >
        {/*  App Bar  */}
        <Navbar />

        {/*  Profile Menu (Auth) */}

        {/*  User Sidebar Drawer  */}
        <UserSidebar />

        {/*  Main Content  */}
        <Box component="main" sx={{flexGrow: 1, width: {md: `calc(100% - ${drawerWidth}px)`}, minHeight: "100vh"} }>
            <Toolbar />
            <Box>
                <Outlet/>
            </Box>
        </Box>
    </Box>
  );
};

export default UserLayout;
