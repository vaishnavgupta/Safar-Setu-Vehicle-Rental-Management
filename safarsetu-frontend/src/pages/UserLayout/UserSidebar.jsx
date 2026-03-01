import React from 'react';
import {Box, Drawer} from "@mui/material";
import SidebarDrawer from "./SidebarDrawer.jsx";

const UserSidebar = () => {
    const drawerWidth = "240px";
  return (
    <Box component="nav" sx={{width: {md:drawerWidth}, flexShrink:{md: 0}}} >
        {/*  Desktop Drawer  */}
        <Drawer variant='permanent'
                sx={{
                    display:{xs: 'none', md:"block"},
                    "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                border: 'none',
                        width: drawerWidth,
                        overflowY: 'auto',
                        height: '100vh',

            },
        }}
        open
        >
            <SidebarDrawer />
        </Drawer>
    </Box>
  );
};

export default UserSidebar;
