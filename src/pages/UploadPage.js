import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {
  Button,
  Box,
  Typography,
  Input,
  List,
  ListItem
} from "@mui/material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';


function UploadPage() {
  const navigate = useNavigate();

  const handleNavigateToUpload = () => {
    navigate('/upload');
  };

  const handleNavigateToFilter = () => {
    navigate('/filter');
  };

  const handleNavigateToMeals = () => {
    navigate('/meal', { state: { prediction } });
  }

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

    const file = selectedImageFile;  // プレビュー画像をそのまま使用
    const formData = new FormData();
    formData.append('image', file);

    // Flaskサーバーに画像を送信して認識結果を受け取る
    try {
      // console.log(file)
      const response = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        body: formData,
      });
      
      // const data = [
      //   "ニンジン",
      //   "豚肉",
      //   "じゃがいも",
      //   "玉ねぎ"
      // ];

      console.log(response)
      const data = await response.json();
      
      if (data !== null) {
        console.log(data)
        setisThinkButtonsVisible(true);
        if (data.error == null){
          setPrediction(data);  // 認識結果を状態に保存
        }else{
          setPrediction(data.error);
        }
      }
    } catch (error) {
      console.error("Error during image recognition:", error);
    }
  };

  const handleRetry = () => {
    setSelectedImage(null);
    setIsConfirmed(false);
    setIsConfirmButtonsVisible(true); // ボタンを再表示する
    setPrediction(null);  // 認識結果をリセット
    setisThinkButtonsVisible(false);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        mt: 8,
        mb:10
      }}
    >
        <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              textAlign: 'center',
            }}
        >
            {!selectedImage ? (
              <Box 
              sx={{
                mt:20
              }}
              >
                <Typography variant="h5" component="h1"
                sx={{
                  fontWeight: 'bold',
                }}>
                    写真をアップロード<br/>してください
                </Typography>
                <Button
                    variant="outlined"
                    component="label"
                    startIcon={<CloudUploadIcon sx={{ color:"black" }}/>}
                    sx={{
                      mt: 4, 
                      pl: 4,
                      pr: 4,
                      pt: 2,
                      pb: 2,
                      color: "black",
                      borderColor: "black",
                    }}
                >
                    ファイルを選択
                    <Input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        sx={{ display: 'none'}}
                    />
                </Button>
              </Box>
            ) : (
                <Box sx={{ textAlign: 'center', mt: 2, ml: 2, mr: 2 }}>
                  <img
                      src={selectedImage}
                      alt="Uploaded Preview"
                      style={{ maxWidth: '100%', maxHeight: '300px', marginBottom: '16px',  borderRadius: '8px' }}
                  />
                  {isConfirmButtonsVisible && (
                    <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      marginTop: 1,
                    }}
                    >
                      <Box>
                        <Typography variant="h6">この写真でレシピを生成しますか</Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2, mt: 1 }}>
                          <Button variant="outlined" onClick={handleConfirm}
                            sx={{
                              color: "black",
                              borderColor: "black",
                            }}
                          >
                            はい
                          </Button>
                          <Button variant="outlined" onClick={handleRetry}
                            sx={{
                              color: "black",
                              borderColor: "black",
                            }}
                          >
                            いいえ
                          </Button>
                        </Box>
                      </Box>
                    </Box>
                  )}
                </Box>
            )}

            {/* 画像認識結果を表示 */}
            {prediction && (
              <Box>
                  {/* <Typography variant="h6" sx={{fontWeight: 'bold'}}>認識結果</Typography>
                  <List sx={{border: "3px solid #333", mb: 2, ml: 2, mr: 2, borderTop: "none"}}>
                    {prediction.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </List> */}
                  <Box sx={{ position: "relative", mb: 4, ml: 2, mr: 2 }}>
                    {/* ボーダー付きのリスト */}
                    <List sx={{ border: "3px solid #333", m: 0 }}>
                      {prediction.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </List>

                    {/* 「認識結果」テキスト */}
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: "bold",
                        position: "absolute",
                        top: "-14px", 
                        left: "17%", 
                        transform: "translateX(-50%)",
                        backgroundColor: "#fff",
                        px: 1,
                      }}
                    >
                      認識結果
                    </Typography>
                  </Box>

                {isThinkButtonsVisible && (
                  <Box 
                    sx={{ 
                      display: 'flex',flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 2
                    }}>
                    <Button variant="outlined" color="error" onClick={handleNavigateToFilter}
                      sx={{
                        color: "black",
                        borderColor: "black",
                        width: "70%"
                      }}
                    >
                      <ArrowForwardIosIcon sx={{ fontSize: "small", position: "absolute", left: "10px" }} />
                      条件を絞ってから料理を見る
                    </Button>
                    <Button variant="outlined" color="error" onClick={handleNavigateToMeals}
                      sx={{
                        color: "black",
                        borderColor: "black",
                        width: "70%"
                      }}
                    >
                      <ArrowForwardIosIcon sx={{ fontSize: "small", position: "absolute", left: "10px" }} />
                      すぐに料理を見る
                    </Button>
                  </Box>
                )}
              </Box>
            )}
        </Box>
    </Box>
  );
}

export default UploadPage;
