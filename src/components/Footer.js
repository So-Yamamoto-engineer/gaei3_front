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
        position: 'sticky',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 2,
        textAlign: 'center',
        backgroundColor: '#ade9ff',
        boxShadow: '0 -2px 5px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Button
        variant="outlined"
        color="primary"
        onClick={handleNavigateToLandingPage}
        sx={{mb:1.2}}
      >
        トップに戻る
      </Button>
      <Typography variant="body2">
        2024 画像映像コンテンツ3
      </Typography>
    </Box>
  );
}

export default Footer;