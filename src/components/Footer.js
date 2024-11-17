// src/components/Footer.js
import React from 'react';
import { Button, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Footer = () => {

    const navigate = useNavigate();

    const handleNavigateToLandingPage = () => {
    navigate('/'); // ランディングページへ遷移
    };


  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#f4f4f4',
        padding: 2,
        textAlign: 'center',
        boxShadow: '0 -2px 5px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Button
        variant="outlined"
        color="primary"
        onClick={handleNavigateToLandingPage}
        sx={{mb:1.7}}
      >
        トップに戻る
      </Button>
      <Typography variant="body2" sx={{ marginBottom: 1 }}>
        2024 画像映像コンテンツ3 【Let’s Cooking】
      </Typography>
    </Box>
  );
}




export default Footer;