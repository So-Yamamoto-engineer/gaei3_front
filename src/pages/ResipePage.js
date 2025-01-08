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
} from "@mui/material";

import Groq from "groq-sdk";

const groq = new Groq({ 
  apiKey: process.env.REACT_APP_GROQ_API_KEY,
  dangerouslyAllowBrowser: true
 });

async function getGroqChatCompletion(ingredients) {

// [
//   title: "カレー",
//   steps:[
//       1: "野菜をきる",
//       2: "野菜炒める",
//       3: "水を200ml入れる",
//       4: "煮詰める",
//       5: "ルーを入れる",
//       6: "完成",
//   ]
// ]
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

function ResultPage() {
    const location = useLocation();
    const mealName = location.state?.mealName || "料理名がありません"; // 受け取る
    const [loading, setLoading] = useState(true);
    const [recipe, setRecipe] = useState("");
    const [error, setError] = useState(null);

    const RecipeSteps = ({ recipe }) => {
      return (
        <Box sx={{ width: '80%', margin: '0 auto' }}>
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
          // サーバーからデータを取得する（例として ingredients をハードコード）
          // const ingredients = ["ニンジン", "豚肉", "じゃがいも", "玉ねぎ"];
          // const chatCompletion = await getGroqChatCompletion(ingredients);
          // const content = chatCompletion.choices[0]?.message?.content || "No recipe found.";

          const content = `"{"title": ${mealName},"steps": ["Chop the carrot and potato into bite-sized pieces. Cut the cabbage into thin strips. Slice the pork into thin strips as well.", "Heat 2 tablespoons of oil in a large skillet or wok over medium-high heat. Add the pork and stir-fry until browned, about 3-4 minutes.", "Add the chopped carrot and potato to the skillet or wok. Stir-fry for about 5 minutes, or until they start to soften.", "Add the cabbage to the skillet or wok and stir-fry for another 2-3 minutes, or until the vegetables are tender-crisp.", "Season with salt and pepper to taste. Serve hot and enjoy!"]}`

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
            // height: '100vh', // 画面全体の高さをカバー
            textAlign: 'center', // テキストを中央揃えs
            mt:10,
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
            <Typography sx={{ mt: 2, mb:2, fontWeight: 'bold'}}>{recipe.title}</Typography>
            <RecipeSteps recipe={recipe} />
          </>
        )}
      </Box>
    );
}

export default ResultPage;
