// src/components/Footer.js
import React from 'react';
import { Button, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import LogoutIcon from '@mui/icons-material/Logout';
import ChecklistRtlIcon from '@mui/icons-material/ChecklistRtl';

const Footer = () => {

    const navigate = useNavigate();

    const handleNavigateToLandingPage = () => {
      navigate('/');
    };

    const handleNavigateToUploadPage = () => {
      navigate('/upload');
    };

    const handleNavigateToAllPage = () => {
      navigate('/all');
    };

    const handleNavigateToShoppingListPage = () => {
      navigate('/shopping-list');
    };

    


  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 1.3,
        backgroundColor: '#ffffff',
        
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center", 
        
        boxShadow: '0 -1px 2px rgba(0, 0, 0, 0.1)',
      }}
    >
      <RestaurantIcon onClick={handleNavigateToUploadPage} sx={{ fontSize: 40 }}/>
      <ImportContactsIcon onClick={handleNavigateToAllPage}sx={{ fontSize: 40 }}/>
      <ChecklistRtlIcon onClick={handleNavigateToShoppingListPage} sx={{ fontSize: 40 }}/>
      <LogoutIcon onClick={handleNavigateToLandingPage} sx={{ fontSize: 40 }}/>
    </Box>
  );
}

export default Footer;