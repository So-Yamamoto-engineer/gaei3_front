// Header.js
import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { useUser } from '../context/UserContext'
import PersonIcon from '@mui/icons-material/Person';
import LocalDiningIcon from '@mui/icons-material/LocalDining';

function Header() {
  const { username, logout, login} = useUser();
  return (
    <AppBar position="fixed" sx={{backgroundColor: 'black', height: '8%', boxShadow: '0 4px 7px rgba(0, 0, 0, 0.1)' }}>
      <Toolbar>
        <LocalDiningIcon/>
        <Typography variant="h6" sx={{fontSize: '25px', fontWeight: 'bold', flexGrow: 1, ml: 1}}>
            Let's Cook
        </Typography>
        <PersonIcon />
          <Typography variant="h6" sx={{fontSize: '19px', marginLeft: 1 }}>
            { username ? (
              username
              ) : (
                "Unknown"
            )}
          </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
