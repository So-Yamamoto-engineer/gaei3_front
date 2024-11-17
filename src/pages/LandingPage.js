import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Button,
    Box,
    Typography
  } from "@mui/material";

function LandingPage() {
  const navigate = useNavigate();

  const handleNavigateToUpload = () => {
    navigate('/upload');
  };

  return (
    <Box
        sx = {{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh', // 画面全体の高さをカバー
            textAlign: 'center', // テキストを中央揃え
            backgroundColor: '#dcf9fc', // 薄い水色
        }}
    >
        <Typography  
            variant="h1" 
            component="h1" 
            sx={{ fontSize: '3rem', color: 'Black', fontWeight: 'bold' }}
        >
            Let’s Cooking
        </Typography>
        <Box sx={{ mt:10 }}>
            <Button 
                variant="outlined"
                onClick={handleNavigateToUpload}
                sx={{
                    fontSize: '1.5rem', // 文字サイズを大きく
                    padding: '16px 32px', // 内側の余白を調整
                    borderWidth: '2px', // 枠線を太く
                }}
            >
                料理を作る
            </Button>
        </Box>
    </Box>
  );
}

export default LandingPage;
