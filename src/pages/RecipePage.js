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
import { GoogleGenerativeAI } from '@google/generative-ai';


// {
//   "name": "カレー",
//   "difficulty": "簡単",
//   "time": 1,
//   "calorie": "多い",
//   "image": "/curry.png"
// },

// import Groq from "groq-sdk";

// const groq = new Groq({ 
//   apiKey: process.env.REACT_APP_GROQ_API_KEY,
//   dangerouslyAllowBrowser: true
//  });

// async function getGroqChatCompletion(ingredients) {
//   return groq.chat.completions.create({
//     messages: [
//       {
//         role: "user",
//         content: `
//           Please generate a recipe in English using the following ingredients:["Carrot", "Pork", "Potato", "Cabbage"]. The output must strictly follow the JSON format below. Ensure that the JSON does not contain any newline characters or additional information outside this format:{"title": "Recipe Title","steps": ["Step 1 description","Step 2 description",...]}
//         `,
//       },
//     ],
//     model: "llama3-8b-8192",
//   });
// }

function RecipePage() {
    const location = useLocation();
    const props_meal = location.state?.meal;
    const [meal, setMeal] = useState(props_meal);
    const [loading, setLoading] = useState(true);
    const [recipe, setRecipe] = useState("");
    const [error, setError] = useState(null);

    const RecipeSteps = ({ recipe }) => {
      if (!Array.isArray(recipe)) {
        return <Typography variant="body1">Invalid recipe format.</Typography>;
      }
    
      return (
        <Box sx={{ width: '90%' }}>
          {recipe.map((step, index) => (
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
      const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      setMeal(props_meal);
      const mealData = {
        name: meal.name,
        calorie: meal.calorie,
        difficulty: meal.difficulty,
        time: meal.time,
        image: meal.image
      };
      const prompt = `
      次の料理情報に基づいてレシピを考案してください。
料理情報
{
"name":${mealData.name},
"difficulty": ${mealData.difficulty},
"time": ${mealData.time},
"calorie":${mealData.calorie},
"image": "/curry.png"
},
レシピは以下のステップごとに分け、順番に配列として出力してください。

例: ["ステップ1の内容", "ステップ2の内容", "ステップ3の内容", ...]

出力形式:
- ステップごとの手順を順番に並べた配列
- 各手順は簡潔に説明してください
- 食材や調理方法に関しても言及してください
      `;

      // async function fetchRecipe() {
      // try {
      //   const result = await model.generateContent(prompt);
      //   const result_txt = result.response.text()
      //   console.log(result_txt)
      //   const resipe_think_result = result_txt.replace(/```json|```/g, '');
      //   console.log(resipe_think_result)

      //   setRecipe(resipe_think_result);
      // } catch (err) {
      //     console.error("Error fetching recipe:", err);
      //     setError("Failed to fetch recipe. Please try again later.");
      // } finally {
      //     setLoading(false);
      // }
      // }

      async function fetchRecipe() {
        try {
          const result = await model.generateContent(prompt);
          const result_txt = result.response.text();
          const jsonString = result_txt.replace(/```json|```/g, '');
          console.log(jsonString);
          
          // Ensure the result is in the correct array format
          const recipeArray = JSON.parse(jsonString); // Assuming the output is in JSON format
          
          setRecipe(recipeArray); // Set recipe to the array
        } catch (err) {
          console.error("Error fetching recipe:", err);
          setError("Failed to fetch recipe");
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
            <Card sx={{ mb: 1, display: 'flex', flexDirection: 'row',
              border: '1px solid #828282',
              borderRadius: '0px',
              boxShadow: 'none', 
             }}>
              <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flex: 5}}>
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
