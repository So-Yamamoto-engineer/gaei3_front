import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Card,
  CardContent,
} from "@mui/material";
import { useUser } from "../context/UserContext"; // UserContextをインポート

const HistoryPage = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { username } = useUser(); // Contextからuser_idを取得

  useEffect(() => {
    if (!username) {
      console.warn("ユーザーがログインしていません");
      setLoading(false);
      return;
    }

    // 特定ユーザーのレシピを取得
    fetch(`http://localhost:5000/api/users/${username}/recipes`) // usernameをAPIエンドポイントに使用
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch recipes");
        }
        return response.json();
      })
      .then((data) => {
        setRecipes(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user recipes:", error);
        setLoading(false);
      });
  }, [username]);

  if (loading) {
    return (
      <Box
        sx={{
          mt: 6,
          textAlign: "center",
        }}
      >
        <CircularProgress />
        <Typography variant="h6" style={{ marginTop: "1rem" }}>
          Loading...
        </Typography>
      </Box>
    );
  }

  if (!recipes.length) {
    return (
      <Box
        sx={{
          mt: 8,
          textAlign: "center",
        }}
      >
        <Typography variant="h5" color="text.secondary">
          レシピが見つかりませんでした
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 8, textAlign: "center" }}>
      <Typography variant="h4" gutterBottom>
        あなたの過去のレシピ
      </Typography>
      <Box
        display="flex"
        flexWrap="wrap"
        justifyContent="space-around"
        gap={2}
        mt={3}
      >
        {recipes.map((recipe) => (
          <Card
            key={recipe.id}
            sx={{
              width: "300px",
              boxShadow: 3,
              borderRadius: "8px",
            }}
          >
            <CardContent>
              <Typography variant="h6">{recipe.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                {recipe.description}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default HistoryPage;
