// src/components/Register.js

import React, { useState } from 'react';
import { 
    TextField, Button, Typography, Box,
    Link,
    Stack
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext'

    

const RegisterPage = () => {
    const navigate = useNavigate();
    const handleNavigateToUpload = () => {
        navigate('/upload');
    };
    const {login} = useUser();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/register', {
        username,
        password,
      });
    //   console.log(response)
    //   setMessage(response.data.message);
    handleNavigateToUpload();
    login(username)
    } catch (error) {
      setMessage(error.response.data.message);
    }
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
        }}
    >
        <Typography  
            variant="h1" 
            component="h1" 
            sx={{ mb: 5, fontSize: '3rem', color: 'Black', fontWeight: 'bold' }}
        >
            Let’s Cooking
        </Typography>

        <Box sx={{
            width: '80%'
        }}>
            <Typography variant="h4" gutterBottom>
                新規登録
            </Typography>
            <TextField
                label="Username"
                fullWidth
                margin="normal"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
                label="Password"
                type="password"
                fullWidth
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <Button variant="contained" color="primary" fullWidth onClick={handleRegister}>
                Register
            </Button>
            <Typography variant="body2" color="error" align="center">
                {message}
            </Typography>
        </Box>
    </Box>
  );
};

export default RegisterPage;