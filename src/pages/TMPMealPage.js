import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Typography, CircularProgress, Card, CardContent } from "@mui/material";
import Groq from "groq-sdk";
import { useNavigate } from 'react-router-dom';

const groq = new Groq({ 
  apiKey: process.env.REACT_APP_GROQ_API_KEY,
  dangerouslyAllowBrowser: true
});

// async function getMealNames(ingredients) {
//   // LLM API にリクエストを送信
//   return groq.chat.completions.create({
//     messages: [
//       {
//         role: "user",
//         content: `
//           Please generate 3 meal names using the following ingredients: ["Carrot", "Pork", "Potato", "Cabbage"]. The output must strictly follow the JSON format below:{"mealsInfo": ["Meal 1 name", "Meal 2 name", "Meal 3 name"]}
//         `,
//       },
//     ],
//     model: "llama3-8b-8192",
//   });
// }

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
                // LLM からデータを取得する（例として ingredients をハードコード）
                // const ingredients = ["Carrot", "Pork", "Potato", "Cabbage"];
                // const response = await getMealNames(ingredients);
                // const content = response.choices[0]?.message?.content || "{}";

                // // JSON データから料理名を抽出
                // const mealsInfoMatch = content.match(/"mealsInfo":\s*\[(.*?)\]/s);
                // const mealsInfo = mealsInfoMatch
                //     ? mealsInfoMatch[1]
                //         .split(/",\s*"/) // 配列内の要素を分割
                //         .map(meal => meal.replace(/(^"|"$|\n)/g, '').trim()) // 不要な文字を削除
                //     : [];
							const gotMealsInfo = [
								{
									name: "カレー",
									difficulty: "簡単",
									time: 1
								},
								{
									name: "ラーメン",
									difficulty: "難しい",
									time: 1.5
								},
								{
									name: "寿司",
									difficulty: "普通",
									time: 2
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
                <Typography variant="h5" sx={{ mb: 4, fontWeight: 'bold',  textAlign: 'center' ,color: 'text.secondary'  }}>
                    提案された料理
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                  {/* 料理名、難易度、時間の表頭 */}
                  <Typography variant="body1" sx={{ fontWeight: 'bold', textAlign: 'center', flex: 1 }}>
                    料理名
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 'bold', textAlign: 'center', flex: 1 }}>
                    難易度
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 'bold', textAlign: 'center', flex: 1 }}>
                    時間
                  </Typography>
                </Box>
                {mealsInfo.map((meal, index) => (
                  <Card key={index} sx={{ marginBottom: 2 ,cursor: 'pointer'}} onClick={() => handleCardClick(meal)}>
                    <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body1" sx={{ textAlign: 'center', flex: 1 }}>
                      {meal.name}
                    </Typography>
                    <Typography variant="body1" sx={{ textAlign: 'center', flex: 1 }}>
                      {meal.difficulty}
                    </Typography>
                    <Typography variant="body1" sx={{ textAlign: 'center', flex: 1 }}>
                      {meal.time} 時間
                    </Typography>
                  </Box>
                    </CardContent>
                  </Card>
                ))}
            </Box>
          )}
        </Box>
    );
}

export default MealPage;