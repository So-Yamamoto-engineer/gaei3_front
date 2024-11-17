import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {
    Button,
    Box,
    Typography,
    Input,
  } from "@mui/material";

function UploadPage() {
  const navigate = useNavigate();

  const handleNavigateToUpload = () => {
    navigate('/upload');
  };

  const [selectedImage, setSelectedImage] = useState(null);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
        const imageUrl = URL.createObjectURL(file);
        setSelectedImage(imageUrl);
        setIsConfirmed(false);
    }
  }
  
  const handleConfirm = () => {
    setIsConfirmed(true);
  }

  const handleRetry = () => {
    setSelectedImage(null);
  }
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh', // 全体の高さをカバー
        backgroundColor: '#e3f7fa', // 薄い水色
        pt:3
      }}
    >
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
            }}
        >
            <Typography variant="h4" component="h1" sx={{mb:5}}>
                写真をアップロード<br/>してください
            </Typography>

            {!selectedImage ? (
                <Button
                    variant="outlined"
                    component="label"
                    startIcon={<CloudUploadIcon />}
                    sx={{
                    padding: '10px 20px',
                    }}
                >
                    ファイルを選択
                    <Input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        sx={{ display: 'none' }} // ボタンがクリックされたときにのみ表示される
                    />
                </Button>
            ) : (
                <Box sx={{ textAlign: 'center' }}>
                    <img
                        src={selectedImage}
                        alt="Uploaded Preview"
                        style={{ maxWidth: '100%', maxHeight: '300px', marginBottom: '16px' }}
                    />
                    <Typography variant="h6">これでいいですか？</Typography>
                    <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', marginTop: 2 }}>
                        <Button variant="outlined" color="primary" onClick={handleConfirm}>
                        OK
                        </Button>
                        <Button variant="outlined" color="error" onClick={handleRetry}>
                        No
                        </Button>
                    </Box>
                </Box>
            )}
        </Box>
    </Box>
  );
}

export default UploadPage;
