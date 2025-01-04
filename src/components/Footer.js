// src/components/Footer.js
import React from 'react';
import { Button, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import LogoutIcon from '@mui/icons-material/Logout';

const Footer = () => {

    const navigate = useNavigate();

    const handleNavigateToLandingPage = () => {
      navigate('/');
    };

    const handleNavigateToUploadPage = () => {
      navigate('/upload');
    };

    const handleNavigateToHistoryPage = () => {
      navigate('/history');
    };


  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 1.3,
        backgroundColor: '#edf5ff',
        
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center", 
        
        boxShadow: '0 -2px 5px rgba(0, 0, 0, 0.1)',
      }}
    >
      <RestaurantIcon onClick={handleNavigateToUploadPage} sx={{ fontSize: 40 }}/>
      <ImportContactsIcon onClick={handleNavigateToHistoryPage}sx={{ fontSize: 40 }}/>
      <LogoutIcon onClick={handleNavigateToLandingPage} sx={{ fontSize: 40 }}/>
    </Box>
  );
}

export default Footer;