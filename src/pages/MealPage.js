import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Typography, CircularProgress, Card, CardContent, CardMedia } from "@mui/material";
// import Groq from "groq-sdk";
import { useNavigate } from 'react-router-dom';
import { GoogleGenerativeAI } from '@google/generative-ai';

import { usePrediction } from '../context/PredictionContext';


function MealPage() {
    const navigate = useNavigate();
    const location = useLocation();
    
    // const prediction = location.state?.prediction || [];
    const { prediction, setPrediction } = usePrediction();
    const flavor = location.state?.flavor || ""; 
    const spiceLevel = location.state?.spiceLevel || ""; 
    const cookingTime = location.state?.cookingTime || 0; 

    const [loading, setLoading] = useState(true);
    const [mealsInfo, setMealsInfo] = useState([]);
    const [error, setError] = useState(null);
    const handleCardClick = (meal) => {
        navigate('/recipe', { state: { meal: meal } });
    };

    useEffect(() => {
      const genAI = new GoogleGenerativeAI("AIzaSyDg0NHIkQTXDhGP2_vZf-tBhyO9Dafs_GI");
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      let prompt = `
    以下のJSON形式で、与えられた食材データ(${prediction})を基に作れる料理を提案してください。
    `;
  
  // Conditionally add flavor, spiceLevel, and cookingTime if they are not empty or 0
  if (flavor) {
    prompt += `この時、${flavor}`;
  }
  if (spiceLevel) {
    prompt += `、${spiceLevel}`;
  }
  if (cookingTime > 0) {
    prompt += `、${cookingTime}時間`;
  }

  prompt += `を考慮してください。
    各料理は名前、難易度（簡単、普通、難しいのいずれか）、所要時間（時間単位で）、カロリー量（"多い"、"普通"、"少ない"のいずれか）、およびイメージ画像のパスを含む必要があります。
    以下は出力例です。imageはあなたは考えず必ず"/curry.png"にしてください。それ以外のname,difficulty,time,calorieはあなたが考えて。
    [
      {
        "name": "カレー",
        "difficulty": "簡単",
        "time": 1,
        "calorie": "多い",
        "image": "/curry.png"
      },
      {
        "name": "豚汁",
        "difficulty": "普通",
        "time": 1.5,
        "calorie": "普通",
        "image": "/tonjiru.png"
      },
      {
        "name": "肉じゃが",
        "difficulty": "簡単",
        "time": 1,
        "calorie": "少ない",
        "image": "/nikujaga.png"
      }
    ]
  `;
      
        async function fetchMealNames() {
            try {
              const result = await model.generateContent(prompt);
              const jsonString = result.response.text().replace(/```json|```/g, '');
              const gotMealsInfo = JSON.parse(jsonString);
              // const response = await getGroqChatCompletion(prediction); // 入力としてpredictionを使用
              // const generatedMeals = response.choices[0].message.content; // JSONとしてパース
							// console.log(generatedMeals)
              // const gotMealsInfo = [
              //   {
              //     name: "カレー",
              //     difficulty: "簡単",
              //     time: 1,
              //     calorie: "多い",
              //     image: "/curry.png"
              //   },
              //   {
              //     name: "ラーメン",
              //     difficulty: "難しい",
              //     time: 1.5,
              //     calorie: "普通",
              //     image: "/ramen.png"
              //   },
              //   {
              //     name: "寿司",
              //     difficulty: "普通",
              //     time: 2,
              //     calorie: "少ない",
              //     image: "/susi.png"
              //   }
              // ];              

              setMealsInfo(gotMealsInfo);
              // setMealsInfo(generatedMeals);
            } catch (err) {
              console.error("Error fetching meal names:", err);
              setError("Failed to fetch meal names. Please try again later.");
            } finally {
              setLoading(false);
            }
        }

        fetchMealNames();
    }, []);

    return (
        <Box
          sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              mt: 10,
              mb: 40,
          }}
        >
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 3 }}>
                <CircularProgress />
            </Box>
          ) : error ? (
            <Typography color="error">{error}</Typography>
          ) : (
            <Box sx={{ width: '80%', margin: '0 auto' }}>
                {mealsInfo.map((meal, index) => (
                  <Card key={index} sx={{ marginBottom: 2, cursor: 'pointer', display: 'flex', flexDirection: 'row' }} onClick={() => handleCardClick(meal)}>
                    <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flex: 5 }}>
                      <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
                        {meal.name}
                      </Typography>
                      <Typography variant="body1" sx={{ marginBottom: 0.5 }}>
                        難易度: {meal.difficulty}
                      </Typography>
                      <Typography variant="body1" sx={{ marginBottom: 0.5 }}>
                        時間: {meal.time} 時間
                      </Typography>
                      <Typography variant="body1" sx={{ marginBottom: 0.5 }}>
                        Kcal: {meal.calorie}
                      </Typography>
                    </CardContent>
                    
                    <Box sx={{ flex: 5 }}>
                      <CardMedia
                        component="img"
                        src={meal.image || '/curry.png'} // ダミー画像のパスを指定
                        alt={meal.name}
                        sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </Box>
                  </Card>
                ))}
            </Box>
          )}
        </Box>
    );
}

export default MealPage;