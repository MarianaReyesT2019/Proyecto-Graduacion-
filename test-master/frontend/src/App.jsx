import {React, useState} from 'react'
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Home } from './pages/Home';
import { Users } from './pages/Users';
import { ControlPostura } from './pages/ControlPostura';
import { Bodega } from './pages/Bodega';
import { Gallinas } from './pages/Gallinas';
import { Galpones } from './pages/Galpones';
import { Ventas } from './pages/Ventas';
import { Logout } from './pages/Logout';

import MenuIcon from '@mui/icons-material/Menu';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import HomeIcon from '@mui/icons-material/Home';
import GroupIcon from '@mui/icons-material/Group';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import StorefrontIcon from '@mui/icons-material/Storefront';
import HouseIcon from '@mui/icons-material/House';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import EggIcon from '@mui/icons-material/Egg';
import LogoutIcon from '@mui/icons-material/Logout';

import { Drawer, List, ListItem, ListItemText, Typography, AppBar, Toolbar, IconButton, ListItemIcon } from '@mui/material';

import "./App.css";

function App() {
  const [openDrawer, setOpenDrawer] = useState(false);

  const toggleDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  return (
    <BrowserRouter>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={toggleDrawer}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 2 }}>
            Granja el Porvenir
          </Typography>
          <IconButton color="inherit" component={NavLink} to="/logout">
            Logout
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={openDrawer} onClose={toggleDrawer} >
        <List>
          <ListItem button component={NavLink} to="/" onClick={toggleDrawer}>
            <ListItemIcon><LoginIcon /></ListItemIcon>
            <ListItemText primary="Login" />
          </ListItem>
          <ListItem button component={NavLink} to="/register" onClick={toggleDrawer}>
            <ListItemIcon><PersonAddIcon /></ListItemIcon>
            <ListItemText primary="Register" />
          </ListItem>
          <ListItem button component={NavLink} to="/home" onClick={toggleDrawer}>
            <ListItemIcon><HomeIcon /></ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button component={NavLink} to="/users" onClick={toggleDrawer}>
            <ListItemIcon><GroupIcon /></ListItemIcon>
            <ListItemText primary="Usuarios" />
          </ListItem>
          <ListItem button component={NavLink} to="/control-postura" onClick={toggleDrawer}>
            <ListItemIcon><ControlPointIcon /></ListItemIcon>
            <ListItemText primary="Control Postura" />
          </ListItem>
          <ListItem button component={NavLink} to="/bodega" onClick={toggleDrawer}>
            <ListItemIcon><StorefrontIcon /></ListItemIcon>
            <ListItemText primary="Bodega" />
          </ListItem>
          <ListItem button component={NavLink} to="/gallinas" onClick={toggleDrawer}>
            <ListItemIcon><EggIcon /></ListItemIcon>
            <ListItemText primary="Gallinas" />
          </ListItem>
          <ListItem button component={NavLink} to="/galpones" onClick={toggleDrawer}>
            <ListItemIcon><HouseIcon /></ListItemIcon>
            <ListItemText primary="Galpones" />
          </ListItem>
          <ListItem button component={NavLink} to="/ventas" onClick={toggleDrawer}>
            <ListItemIcon><AttachMoneyIcon /></ListItemIcon>
            <ListItemText primary="Ventas" />
          </ListItem>
        </List>
      </Drawer>

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/control-postura" element={<ControlPostura />} />
        <Route path="/bodega" element={<Bodega />} />
        <Route path="/gallinas" element={<Gallinas />} />
        <Route path="/galpones" element={<Galpones />} />
        <Route path="/ventas" element={<Ventas />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="*" element={<h2>Page not found</h2>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
