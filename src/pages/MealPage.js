import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Typography, CircularProgress, Card, CardContent, CardMedia } from "@mui/material";
import Groq from "groq-sdk";
import { useNavigate } from 'react-router-dom';

const groq = new Groq({ 
  apiKey: process.env.REACT_APP_GROQ_API_KEY,
  dangerouslyAllowBrowser: true
});

function MealPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const prediction = location.state?.prediction || [];
    const flavor = location.state?.flavor || ""; 
    const spiceLevel = location.state?.spiceLevel || ""; 
    const cookingTime = location.state?.cookingTime || 0; 
		console.log(prediction, flavor , spiceLevel, cookingTime)

    const [loading, setLoading] = useState(true);
    const [mealsInfo, setMealsInfo] = useState([]);
    const [error, setError] = useState(null);
    const handleCardClick = (meal) => {
        navigate('/recipe', { state: { meal: meal } });
    };

    useEffect(() => {
        async function fetchMealNames() {
            try {
							const gotMealsInfo = [
                {
                  name: "カレー",
                  difficulty: "簡単",
                  time: 1,
                  calorie: "多い",
                  image: "/curry.png"
                },
                {
                  name: "ラーメン",
                  difficulty: "難しい",
                  time: 1.5,
                  calorie: "普通",
                  image: "/ramen.png"
                },
                {
                  name: "寿司",
                  difficulty: "普通",
                  time: 2,
                  calorie: "少ない",
                  image: "/susi.png"
                }
              ];              

              setMealsInfo(gotMealsInfo);
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