import React, {useState} from 'react';
import {
    AppBar,
    Box,
    Button,
    Chip,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Toolbar
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {useNavigate} from "react-router";
import CarRentalIcon from "@mui/icons-material/CarRental";

const NavbarHome = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const navigate = useNavigate();

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const menuItems = [
        {name:"Dashboard", path:"/dashboard"},
        {name:"Saathi AI", path:"/saathi-ai"},
        {name:"About Us", path:"/about-us"},
        {name:"Contact", path:"/"},
    ];
  return (
      <>
    <AppBar
        position="fixed"
        sx={{
            width: "100%",
            backdropFilter: "blur(8px)",
            background: "white",
            color: 'white',
            boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
    }}>
        <Toolbar className="py-2 px-6 flex items-center justify-between">
            {/* Logo */}
            <div className="flex flex-row items-center cursor-pointer" onClick={() => navigate('/')} >
                <div className="p-3 bg-blue-600 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300">
                    <CarRentalIcon className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold  bg-gradient-to-br from-indigo-400 to-blue-600 bg-clip-text text-transparent ml-2">Safar Setu</h2>
            </div>
            <div className="hidden flex-row gap-2 md:flex">
                {
                    menuItems.map((item) => {
                        return <p key={item.name} className="text-gray-600 font-semibold hover:text-black p-2 cursor-pointer hover:bg-indigo-100 hover:rounded-lg transition-all duration-300">{item.name}</p>
                    })
                }
            </div>
            <div className="hidden md:flex flex-row gap-4 ">
                <Button sx={{fontWeight: "bold", color:"#155dfc"}} variant="outlined" onClick={() => navigate("/login")}>Login</Button >
                <Button sx={{fontWeight: "bold", backgroundColor: "#155dfc"}} variant="contained" onClick={() => navigate("/sign-up")}>Sign Up</Button>
            </div>

            <IconButton
                edge="end"
                color="inherit"
                onClick={handleDrawerToggle}
                sx={{ display: { md: "none" }, color: "#155dfc" }}
            >
                <MenuIcon />
            </IconButton>
        </Toolbar>
    </AppBar>
          <Drawer
            anchor="right"
            open={mobileOpen}
            onClose={handleDrawerToggle}
          >
            <Box sx={{ width: 250 }} role="presentation" onClick={handleDrawerToggle}>
                <List>
                    {menuItems.map((items) => (
                        <ListItemButton key={items.name} onClick={() => navigate(items.path)}>
                            <ListItemText primary={items.name} />
                        </ListItemButton>
                    ))}

                    <ListItem>
                        <Button sx={{fontWeight: "bold", color:"#155dfc"}} variant="outlined" onClick={() => navigate('/login')}>Login</Button >
                    </ListItem>

                    <ListItem>
                        <Button sx={{fontWeight: "bold", }} variant="contained" onClick={() => navigate('/sign-up')}>Sign Up</Button >
                    </ListItem>

                    <ListItem>
                        <Chip sx={{mt:1, fontWeight:'bold', justifyItems:'center'}} label="© Safar Setu Vaishnav Gupta" color="info" variant="outlined"/>
                    </ListItem>
                </List>
            </Box>
          </Drawer>
     </>
  );
};

export default NavbarHome;
