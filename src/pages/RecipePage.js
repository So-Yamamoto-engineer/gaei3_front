import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {
  Button,
  Box,
  Typography,
  Input,
  CircularProgress,
  Card,
  CardContent,
  CardMedia
} from "@mui/material";

import Groq from "groq-sdk";

const groq = new Groq({ 
  apiKey: process.env.REACT_APP_GROQ_API_KEY,
  dangerouslyAllowBrowser: true
 });

async function getGroqChatCompletion(ingredients) {
  return groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: `
          Please generate a recipe in English using the following ingredients:["Carrot", "Pork", "Potato", "Cabbage"]. The output must strictly follow the JSON format below. Ensure that the JSON does not contain any newline characters or additional information outside this format:{"title": "Recipe Title","steps": ["Step 1 description","Step 2 description",...]}
        `,
      },
    ],
    model: "llama3-8b-8192",
  });
}

function RecipePage() {
    const location = useLocation();
    const props_meal = location.state?.meal;
    const [meal, setMeal] = useState(props_meal);
    const [loading, setLoading] = useState(true);
    const [recipe, setRecipe] = useState("");
    const [error, setError] = useState(null);

    const RecipeSteps = ({ recipe }) => {
      return (
        <Box sx={{ width: '90%', 
         }}>
          {recipe.steps.map((step, index) => (
            <Card key={index} sx={{ marginBottom: 2 }}>
              <CardContent>
                <Typography variant="h6" component="h2">
                  Step {index + 1}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {step}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      );
    };

    useEffect(() => {
        async function fetchRecipe() {
        try {
          const content = `{"title": ${meal.name},"steps": ["にんじんとじゃがいもを一口大に切ります。キャベツは細切りにし、豚肉も薄切りにします。", "大きなフライパンまたは中華鍋に大さじ2の油を入れて、中火から強火で熱します。豚肉を加え、約3〜4分間炒めて、豚肉に焼き色をつけます。", "フライパンまたは中華鍋に切ったにんじんとじゃがいもを加え、約5分間炒めて、柔らかくなるまで加熱します。", "キャベツをフライパンまたは中華鍋に加え、さらに2〜3分間炒めて、野菜がシャキっとするまで加熱します。", "塩とこしょうで味を調え、熱いうちにお召し上がりください！"]}`

          const titleRegex = /"title":\s*"(.*?)"/;
          const stepsRegex = /"steps":\s*\[(.*?)\]/s;

          // タイトル抽出
          const titleMatch = content.match(titleRegex);
          const title = titleMatch ? titleMatch[1] : null;

          // ステップ抽出と加工
          const stepsMatch = content.match(stepsRegex);
          const steps = stepsMatch
            ? stepsMatch[1]
                .split(/",\s*"/) // 配列内の要素を分割
                .map(step => step.replace(/(^"|"$|\n)/g, '').trim()) // 各ステップから不要な文字を削除
            : [];

          // console.log("Title:", typeof(title));
          // console.log("Steps:", typeof(steps));
          const resipe_think_result = {
            title: title,
            steps: steps
          };

          setRecipe(resipe_think_result);
        } catch (err) {
            console.error("Error fetching recipe:", err);
            setError("Failed to fetch recipe. Please try again later.");
        } finally {
            setLoading(false);
        }
        }

        fetchRecipe();
    }, []);

    return (
      <Box
        sx = {{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center', // テキストを中央揃えs
            mt:5,
            mb:40
        }}
      >
        {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 3 }}>
              <CircularProgress />
            </Box>
        ) : error ? (
            <Typography color="error">{error}</Typography>
        ) : (
          <>
            <Card sx={{ mb: 0.5, display: 'flex', flexDirection: 'row',
              border: '1px solid #828282',
              borderRadius: '0px',
              boxShadow: 'none', 
             }}>
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
            <RecipeSteps recipe={recipe} />
          </>
        )}
      </Box>
    );
}

export default RecipePage;
