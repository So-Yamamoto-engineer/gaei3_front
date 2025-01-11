// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import CloudUploadIcon from '@mui/icons-material/CloudUpload';
// import {
//   Button,
//   Box,
//   Typography,
//   Input,
//   List,
//   ListItem
// } from "@mui/material";
// import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

// import { usePrediction } from '../context/PredictionContext';

// function UploadPage() {
//   const navigate = useNavigate();

//   const handleNavigateToUpload = () => {
//     navigate('/upload');
//   };

//   const handleNavigateToFilter = () => {
//     navigate('/filter');
//   };

//   const handleNavigateToMeals = () => {
//     navigate('/meal', { state: { prediction } });
//   }

//   const [selectedImage, setSelectedImage] = useState(null);
//   const [selectedImageFile, setSelectedImageFile] = useState(null);
//   const [isConfirmed, setIsConfirmed] = useState(false);
//   const { prediction, setPrediction } = usePrediction();
//   // const [prediction, setPrediction] = useState(null);  // 認識結果を格納する状態
//   const [isConfirmButtonsVisible, setIsConfirmButtonsVisible] = useState(true);//確認ボタンを表示するか
//   const [isThinkButtonsVisible, setisThinkButtonsVisible] = useState(false);//ボタンを表示するか

//   useEffect(() => {
//     setPrediction(null); // Reset the prediction on page load
//   }, [setPrediction]); 

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//         const imageUrl = URL.createObjectURL(file);
//         setSelectedImage(imageUrl);
//         setSelectedImageFile(file); 
//         setIsConfirmed(false);
//     }
//   };
  
//   const handleConfirm = async () => {
//     setIsConfirmed(true);

//     // 画像が選ばれていなければエラーメッセージ
//     if (!selectedImageFile) {
//       alert("画像を選んでください");
//       return;
//     }

//     setIsConfirmButtonsVisible(false); // ボタンを非表示にする

//     const file = selectedImageFile;  // プレビュー画像をそのまま使用
//     const formData = new FormData();
//     formData.append('image', file);

//     // Flaskサーバーに画像を送信して認識結果を受け取る
//     try {
//       // console.log(file)
//       const response = await fetch('http://127.0.0.1:5000/predict', {
//         method: 'POST',
//         body: formData,
//       });
      
//       // const data = [
//       //   "ニンジン",
//       //   "豚肉",
//       //   "じゃがいも",
//       //   "玉ねぎ"
//       // ];

//       console.log(response)
//       const data = await response.json();
//       console.log(data)
//       if (data !== null) {
//         console.log(data)
//         setisThinkButtonsVisible(true);
//         if (data.error == null){
//           setPrediction(data);  // 認識結果を状態に保存
//         }else{
//           setPrediction(data.error);
//         }
//       }
//     } catch (error) {
//       console.error("Error during image recognition:", error);
//     }
//   };

//   const handleRetry = () => {
//     setSelectedImage(null);
//     setIsConfirmed(false);
//     setIsConfirmButtonsVisible(true); // ボタンを再表示する
//     setPrediction(null);  // 認識結果をリセット
//     setisThinkButtonsVisible(false);
//   };

//   return (
//     <Box
//       sx={{
//         display: 'flex',
//         flexDirection: 'column',
//         minHeight: '100vh',
//         mt: 8,
//         mb:10
//       }}
//     >
//         <Box
//             sx={{
//               display: 'flex',
//               flexDirection: 'column',
//               justifyContent: 'center',
//               textAlign: 'center',
//             }}
//         >
//             {!selectedImage ? (
//               <Box 
//               sx={{
//                 mt:20
//               }}
//               >
//                 <Typography variant="h5" component="h1"
//                 sx={{
//                   fontWeight: 'bold',
//                 }}>
//                     写真をアップロード<br/>してください
//                 </Typography>
//                 <Button
//                     variant="outlined"
//                     component="label"
//                     startIcon={<CloudUploadIcon sx={{ color:"black" }}/>}
//                     sx={{
//                       mt: 4, 
//                       pl: 4,
//                       pr: 4,
//                       pt: 2,
//                       pb: 2,
//                       color: "black",
//                       borderColor: "black",
//                     }}
//                 >
//                     ファイルを選択
//                     <Input
//                         type="file"
//                         accept="image/*"
//                         onChange={handleFileChange}
//                         sx={{ display: 'none'}}
//                     />
//                 </Button>
//               </Box>
//             ) : (
//                 <Box sx={{ textAlign: 'center', mt: 2, ml: 2, mr: 2 }}>
//                   <img
//                       src={selectedImage}
//                       alt="Uploaded Preview"
//                       style={{ maxWidth: '100%', maxHeight: '300px', marginBottom: '16px',  borderRadius: '8px' }}
//                   />
//                   {isConfirmButtonsVisible && (
//                     <Box
//                     sx={{
//                       display: "flex",
//                       justifyContent: "center",
//                       marginTop: 1,
//                     }}
//                     >
//                       <Box>
//                         <Typography variant="h6">この写真でレシピを生成しますか</Typography>
//                         <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2, mt: 1 }}>
//                           <Button variant="outlined" onClick={handleConfirm}
//                             sx={{
//                               color: "black",
//                               borderColor: "black",
//                             }}
//                           >
//                             はい
//                           </Button>
//                           <Button variant="outlined" onClick={handleRetry}
//                             sx={{
//                               color: "black",
//                               borderColor: "black",
//                             }}
//                           >
//                             いいえ
//                           </Button>
//                         </Box>
//                       </Box>
//                     </Box>
//                   )}
//                 </Box>
//             )}

//             {/* 画像認識結果を表示 */}
//             {prediction && (
//               <Box>
//                   {/* <Typography variant="h6" sx={{fontWeight: 'bold'}}>認識結果</Typography>
//                   <List sx={{border: "3px solid #333", mb: 2, ml: 2, mr: 2, borderTop: "none"}}>
//                     {prediction.map((item, index) => (
//                       <li key={index}>{item}</li>
//                     ))}
//                   </List> */}
//                   <Box sx={{ position: "relative", mb: 4, ml: 2, mr: 2 }}>
//                     {/* ボーダー付きのリスト */}
//                     <List sx={{ border: "3px solid #333", m: 0 }}>
//                       {prediction.map((item, index) => (
//                         <li key={index}>{item}</li>
//                       ))}
//                     </List>

//                     {/* 「認識結果」テキスト */}
//                     <Typography
//                       variant="h6"
//                       sx={{
//                         fontWeight: "bold",
//                         position: "absolute",
//                         top: "-14px", 
//                         left: "17%", 
//                         transform: "translateX(-50%)",
//                         backgroundColor: "#fff",
//                         px: 1,
//                       }}
//                     >
//                       認識結果
//                     </Typography>
//                   </Box>

//                 {isThinkButtonsVisible && (
//                   <Box 
//                     sx={{ 
//                       display: 'flex',flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 2
//                     }}>
//                     <Button variant="outlined" color="error" onClick={handleNavigateToFilter}
//                       sx={{
//                         color: "black",
//                         borderColor: "black",
//                         width: "70%"
//                       }}
//                     >
//                       <ArrowForwardIosIcon sx={{ fontSize: "small", position: "absolute", left: "10px" }} />
//                       条件を絞ってから料理を見る
//                     </Button>
//                     <Button variant="outlined" color="error" onClick={handleNavigateToMeals}
//                       sx={{
//                         color: "black",
//                         borderColor: "black",
//                         width: "70%"
//                       }}
//                     >
//                       <ArrowForwardIosIcon sx={{ fontSize: "small", position: "absolute", left: "10px" }} />
//                       すぐに料理を見る
//                     </Button>
//                   </Box>
//                 )}
//               </Box>
//             )}
//         </Box>
//     </Box>
//   );
// }

// export default UploadPage;



import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Grid, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { usePrediction } from '../context/PredictionContext';
import { useNavigate } from 'react-router-dom';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const UploadPage = () => {
  const [imageFiles, setImageFiles] = useState([]); // ファイルを配列で管理
  const [previewUrls, setPreviewUrls] = useState([]); // プレビュー用URLを配列で管理
  const { prediction, setPrediction } = usePrediction(); // PredictionContext から取得

  const navigate = useNavigate();

  const handleNavigateToFilter = () => {
    navigate('/filter');
  };

  const handleNavigateToMeals = () => {
    navigate('/meal', { state: { prediction } });
  }

  // ページロード時に prediction をリセット
  useEffect(() => {
    setPrediction(null);
  }, [setPrediction]);

  // ファイル選択時の処理
  const handleFileChange = (event) => {
    const files = Array.from(event.target.files); // 選択されたファイルを配列に変換
    setImageFiles((prevFiles) => [...prevFiles, ...files]); // 新しいファイルを追加
    const newPreviewUrls = files.map((file) => URL.createObjectURL(file)); // プレビュー用URLを作成
    setPreviewUrls((prevUrls) => [...prevUrls, ...newPreviewUrls]); // 新しいプレビューを追加
  };

  // プレビュー用URLの解放
  // useEffect(() => {
  //   return () => {
  //     previewUrls.forEach((url) => URL.revokeObjectURL(url)); // メモリ解放
  //   };
  // }, [previewUrls]);

  // 画像削除処理
  const handleDelete = (index) => {
    setImageFiles((prevFiles) => prevFiles.filter((_, i) => i !== index)); // 該当のファイルを削除
    setPreviewUrls((prevUrls) => prevUrls.filter((_, i) => i !== index)); // 該当のプレビューURLを削除

    // PredictionContext の prediction の該当部分を削除
    setPrediction((prevPrediction) => {
      if (!prevPrediction) return null; // まだ結果がない場合
      return prevPrediction.filter((_, i) => i !== index);
    });
  };

  // 推測処理
  // const handlePredict = async () => {
  //   const results = [];
  //   for (const file of imageFiles) {
  //     const formData = new FormData();
  //     formData.append("file", file); // ファイルをFormDataに追加
  //     try {
  //       const response = await fetch("http://127.0.0.1:5000/predict", {
  //         method: "POST",
  //         body: formData,
  //       });
  //       console.log(response)
  //       if (!response.ok) {
  //         throw new Error("リクエスト失敗");
  //       }
  //       const data = await response.json(); // 食材名の配列を取得
  //       if (data !== null) {
  //         if (data.error == null){
  //           results.push(data); // 結果を配列に追加
  //         }else{
  //           setPrediction(data.error);
  //         }
  //       }
  //     } catch (error) {
  //       console.error("エラー:", error);
  //       results.push(["エラーが発生しました"]); // エラー時の結果
  //     }
  //   }
  //   setPrediction(results); // PredictionContext の prediction を更新
  // };
  const handlePredict = async () => {
    const results = [];
    for (const file of imageFiles) {
      const formData = new FormData();
      formData.append("image", file); // サーバーが期待する "image" をキーとして指定
  
      try {
        const response = await fetch("http://127.0.0.1:5000/predict", {
          method: "POST",
          body: formData,
        });
  
        console.log(response);
        if (!response.ok) {
          throw new Error("リクエスト失敗");
        }
  
        const data = await response.json(); // 食材名の配列を取得
        if (data !== null) {
          if (data.error == null) {
            results.push(data); // 結果を配列に追加
          } else {
            setPrediction(data.error);
          }
        }
      } catch (error) {
        console.error("エラー:", error);
        results.push(["エラーが発生しました"]); // エラー時の結果
      }
    }
    setPrediction(results); // PredictionContext の prediction を更新
  };
  

  return (
    <Box sx={{
      p: 1,
      mt: 8,
      mt: imageFiles.length > 0 ? 8 : 35, 
      mb: 10,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      // minHeight: '100vh',
      maxHeight: "100vh",
      overflow: 'auto',
      }}>
      {/* ファイル選択ボタン */}
      <Button variant="outlined" component="label"
      sx={{
        color: "black",
        borderColor: "black",
        width: "100%",
        pt: imageFiles.length > 0 ? 1 : 5, 
        pb: imageFiles.length > 0 ? 1 : 5, 
      }}
      >
        ファイルを選択
        <input
          type="file"
          accept="image/*"
          multiple
          hidden
          onChange={handleFileChange}
        />
      </Button>

      {/* プレビュー表示 */}
      {previewUrls.length > 0 && (
        <Box sx={{ mt: 4 }}>
          <Grid container spacing={2}>
            {previewUrls.map((url, index) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                key={index}
                sx={{ display: 'flex', alignItems: 'center' }}
              >
                <img
                  src={url}
                  alt={`Preview ${index}`}
                  style={{
                    width: '100px',
                    height: 'auto',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                    marginRight: '16px',
                  }}
                />
                <IconButton
                  color="error"
                  onClick={() => handleDelete(index)}
                  aria-label="delete"
                >
                  <DeleteIcon />
                </IconButton>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {/* 推測ボタン */}
      {imageFiles.length > 0 && (
        <Box sx={{ mt: 4 }}>
          <Button variant="outlined" color="primary" onClick={handlePredict}
          sx={{
            color: "black",
            borderColor: "black",
          }}
          >
            推測する
          </Button>
        </Box>
      )}

      {/* 認識結果表示 */}
      {prediction && prediction.length > 0 && (
        <>
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom sx={{fontWeight: "bold"}} >
            認識結果
          </Typography>
          <ul>
            {prediction.map((result, index) => (
              <li key={index}>
                 {index + 1}個目のファイル: {result.join(", ")}
              </li>
            ))}
          </ul>
        </Box>
        <Box 
          sx={{ 
            display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 2
          }}>
          <Button variant="outlined" color="error" onClick={handleNavigateToFilter}
            sx={{
              color: "black",
              borderColor: "black",
              pl:2
            }}
          >
            <ArrowForwardIosIcon sx={{ fontSize: "small", position: "absolute", left: "1px"}} />
              条件を絞ってから料理を見る
          </Button>
          <Button variant="outlined" color="error" onClick={handleNavigateToMeals}
            sx={{
              color: "black",
              borderColor: "black",
              pl:2
            }}
          >
            <ArrowForwardIosIcon sx={{ fontSize: "small", position: "absolute", left: "1px" }} />
            すぐに料理を見る
          </Button>
        </Box>

      </>
      )}
    </Box>
  );
};

export default UploadPage;
