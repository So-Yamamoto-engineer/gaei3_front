import {React, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Button,
    Box,
    Typography,
    TextField,
    Link,
    Stack
  } from "@mui/material";
import axios from 'axios';
import { useUser } from '../context/UserContext'
import LocalDiningIcon from '@mui/icons-material/LocalDining';

function LandingPage() {
  const navigate = useNavigate();
  const {login} = useUser();

  const handleNavigateToUpload = () => {
    navigate('/upload');
  };

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  
  const handleLogin = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/login', {
        username,
        password,
      });
    //   setMessage(response.data.message);
      handleNavigateToUpload();
      login(username)
    } catch (error) {
      const message =
      error.response && error.response.data && error.response.data.message
        ? error.response.data.message
        : "ログイン中にエラーが発生しました。";
      setMessage(message); // エラーメッセージを表示
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
            boxShadow: 'inset 0 0 20px rgba(0, 0, 0, 0.5), inset 0 0 30px rgba(0, 0, 0, 0.3)',
            // background: 'linear-gradient(to right, black, white)',  // グラデーションの背景
        }}
    >
          <LocalDiningIcon sx={{mb:2, fontSize: '100px'}}/>
        <Typography  
            variant="h1" 
            component="h1" 
            sx={{ mb: 5, fontSize: '3rem', color: 'Black', fontWeight: 'bold' }}
        >
          Let’s Cook
        </Typography>

        <Box sx={{
            width: '80%'
        }}>
            <TextField
                label="Username"
                fullWidth
                margin="normal"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder='ユーザー名'
            />
            <TextField
                label="Password"
                type="password"
                fullWidth
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='パスワード'
            />
            <Button variant="outlined" fullWidth onClick={handleLogin}
            sx={{
              mt: 2,
              color: "black",
              borderColor: "black",
            }}
            >
                ログイン
            </Button>
            <Typography variant="body2" color="error" align="center" sx={{ m: 1.7 }}>
                {message}
            </Typography>
            <Stack my={2} direction="row" justifyContent="end" spacing={1}>
                <Typography variant="body2">
                    まだ登録されてない方は
                    <Link href="/register" underline="hover">
                        こちら
                    </Link>
                </Typography>
            </Stack>
        </Box>
    </Box>
  );
}

export default LandingPage;
