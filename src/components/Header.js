// Header.js
import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

function Header() {
  return (
    <AppBar position="sticky" sx={{backgroundColor: '#ade9ff', height: '80px'  }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'center', height: '100%' }}>
        <Typography variant="h6" sx={{fontSize: '35px', fontWeight: 'bold' }}>
            Let's Cooking
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
