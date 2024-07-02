import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ role }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Employee Management
        </Typography>
        <Button color="inherit" onClick={() => navigate('/')}>Home</Button>
        {role === 'Employer' && <Button color="inherit" onClick={() => navigate('/register')}>Register Employee</Button>}
        <Button color="inherit" onClick={handleLogout}>SignOut</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
