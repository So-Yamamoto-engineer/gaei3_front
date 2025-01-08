import React, { useState } from "react";
import { Box, TextField, Button, List, ListItem, ListItemText, Checkbox, Typography } from "@mui/material";

function ShoppingList() {
  const [items, setItems] = useState([]); // 買い物リストの状態
  const [inputValue, setInputValue] = useState(""); // 入力欄の状態

  // アイテムを追加する関数
  const addItem = () => {
    if (inputValue.trim() === "") return; // 空白を防ぐ
    const newItem = {
      id: Date.now(), // 一意のIDを生成
      name: inputValue,
      isChecked: false,
    };
    setItems([newItem, ...items]);
    setInputValue(""); // 入力欄をリセット
  };

  // チェックボックスの状態を切り替える関数
  const toggleCheck = (id) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, isChecked: !item.isChecked } : item
      )
    );
  };

  // チェックがついているアイテムを削除する関数
  const clearCheckedItems = () => {
    setItems((prevItems) => prevItems.filter((item) => !item.isChecked));
  };

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 8, textAlign: "center", pr:2, pl:2}}>
      {/* タイトル */}
      <Typography variant="h4" gutterBottom sx={{
        fontWeight: "bold"
      }}>
        買い物リスト
      </Typography>

      {/* 食材を追加するフォーム */}
      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        <TextField
          label="食材を追加"
          variant="outlined"
          fullWidth
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <Button variant="outlined" color="" onClick={addItem}
          sx={{
            color: "black",
            borderColor: "black",
          }}
        >
          追加
        </Button>
      </Box>

      {/* 買い物リスト */}
      <List
        sx={{
          maxHeight: 320, // リストの高さを固定
          overflow: "auto", // スクロールを有効化
          borderRadius: 1, // 角を丸める
        }}
      >
        {items.map((item) => (
          <ListItem key={item.id} sx={{ display: "flex", alignItems: "center" }}>
            <Checkbox
              checked={item.isChecked}
              onChange={() => toggleCheck(item.id)}
            />
            <ListItemText
              primary={item.name}
            />
          </ListItem>
        ))}
      </List>

      {/* チェックを消すボタン */}
      {items.length==0 ? null :
        <Button
        variant="outlined"
        onClick={clearCheckedItems}
        sx={{ 
          mt: 3,
          borderColor: 'red',
          color: "black",
          borderColor: "black",
        }}
        >
        チェックした食材を消す
        </Button>
      }
    </Box>
  );
}

export default ShoppingList;
