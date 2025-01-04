// Header.js
import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { useUser } from '../context/UserContext'
import PersonIcon from '@mui/icons-material/Person';

function Header() {
  const { username, logout, login} = useUser();
  return (
    <AppBar position="fixed" sx={{backgroundColor: '#00224d', height: '8%'  }}>
      <Toolbar>
        <Typography variant="h6" sx={{fontSize: '25px', fontWeight: 'bold', flexGrow: 1}}>
            Let's Cooking
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
