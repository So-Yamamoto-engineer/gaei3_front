import React, { useState } from 'react';
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
  const [selectedImageFile, setSelectedImageFile] = useState(null);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [prediction, setPrediction] = useState(null);  // 認識結果を格納する状態
  const [isConfirmButtonsVisible, setIsConfirmButtonsVisible] = useState(true);//確認ボタンを表示するか
  const [isThinkButtonsVisible, setisThinkButtonsVisible] = useState(false);//ボタンを表示するか

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
        const imageUrl = URL.createObjectURL(file);
        setSelectedImage(imageUrl);
        setSelectedImageFile(file); 
        setIsConfirmed(false);
    }
  };
  
  const handleConfirm = async () => {
    setIsConfirmed(true);

    // 画像が選ばれていなければエラーメッセージ
    if (!selectedImageFile) {
      alert("画像を選んでください");
      return;
    }

    setIsConfirmButtonsVisible(false); // ボタンを非表示にする

    // 画像ファイルをFormDataに追加
    const file = selectedImageFile;  // プレビュー画像をそのまま使用
    const formData = new FormData();
    formData.append('image', file);

    // Flaskサーバーに画像を送信して認識結果を受け取る
    // try {
    //   // console.log(file)
    //   const response = await fetch('http://127.0.0.1:5000/predict', {
    //     method: 'POST',
    //     body: formData,
    //   });
      
      const data = [
        "ニンジン",
        "豚肉",
        "じゃがいも",
        "玉ねぎ"
      ];

      if (data !== null) {
        setisThinkButtonsVisible(true);
      }

      // const data = await response.json();
      setPrediction(data);  // 認識結果を状態に保存
    // } catch (error) {
    //   console.error("Error during image recognition:", error);
    // }
  };

  const handleRetry = () => {
    setSelectedImage(null);
    setIsConfirmed(false);
    setIsConfirmButtonsVisible(true); // ボタンを再表示する
    setPrediction(null);  // 認識結果をリセット
    setisThinkButtonsVisible(false);
  };

  const handleThink = () => {
    navigate('/meals', { state: { prediction } });
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        mt: 12,
        mb:10
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
            <Typography variant="h5" component="h1" sx={{
              mb:5,
              fontWeight: 'bold',
            }}>
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
                        sx={{ display: 'none' }}
                    />
                </Button>
            ) : (
                <Box sx={{ textAlign: 'center' }}>
                    <img
                        src={selectedImage}
                        alt="Uploaded Preview"
                        style={{ maxWidth: '100%', maxHeight: '300px', marginBottom: '16px' }}
                    />
                    {isConfirmButtonsVisible && (
                      <Box
                      sx={{
                        display: "flex",
                        gap: 2,
                        justifyContent: "center",
                        marginTop: 2,
                      }}
                      >
                        <Box>
                          <Typography variant="h6">この写真でレシピを生成しますか</Typography>
                          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2 }}>
                            <Button variant="outlined" color="primary" onClick={handleConfirm} >
                              OK
                            </Button>
                            <Button variant="outlined" color="error" onClick={handleRetry}>
                              No
                            </Button>
                          </Box>
                        </Box>
                      </Box>
                    )}
                </Box>
            )}

            {/* 画像認識結果を表示 */}
            {prediction && (
              <Box sx={{ marginTop: 3 }}>
                <Typography variant="h6">認識結果</Typography>
                <ul>
                  {prediction.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
                {isThinkButtonsVisible && (
                  <Button variant="outlined" color="error" onClick={handleThink}>
                  料理を見る
                  </Button>
                )}
              </Box>
            )}
        </Box>
    </Box>
  );
}

export default UploadPage;
