import React, { useState } from 'react';
import { Box, Typography, FormControl, InputLabel, Select, MenuItem, Button, Slider } from '@mui/material';
import TimeSlider from '../components/TimeSlider'
import { useNavigate } from 'react-router-dom';


const RecipeFilterPage = () => {
  const navigate = useNavigate();
  const [flavor, setFlavor] = useState('');
  const [spiceLevel, setSpiceLevel] = useState('');
  const [cookingTime, setCookingTime] = useState(60);

  const marks = [
    {
      value: 0,
      label: '0分',
    },
    {
      value: 30,
      label: '30分',
    },
    {
      value: 60,
      label: '60分',
    },
    {
      value: 90,
      label: '90分',
    },
    {
      value: 120,
      label: '120分',
    },
  ];
  function valuetext(value) {
    return `${value}分`;
  }
  
  // フィルタリングされたレシピをLMMに投げるための関数（仮）
  
  const handleNavigateToMeals = () => {
    const filterData = {
      flavor,
      spiceLevel,
      cookingTime
    };

    navigate('/meal' , {state: filterData })
    // LLMにフィルターデータを投げる処理を追加
    console.log("Filtered data sent to LLM: ", filterData);
  };

  return (
    <Box sx={{ padding: 3, mt:10}}>
      <Typography variant="h4" gutterBottom>
        レシピ絞り込み
      </Typography>
      
      {/* 料理のカテゴリー */}
      <FormControl fullWidth sx={{ marginBottom: 2 }}>
        <InputLabel>料理のカテゴリー</InputLabel>
        <Select
          value={flavor}
          onChange={(e) => setFlavor(e.target.value)}
          label="料理のカテゴリー"
        >
          <MenuItem value="salty">しょっぱい</MenuItem>
          <MenuItem value="sweet">甘い</MenuItem>
          <MenuItem value="spicy">辛い</MenuItem>
        </Select>
      </FormControl>
      
      {/* スパイスレベル */}
      <FormControl fullWidth sx={{ marginBottom: 2 }}>
        <InputLabel>スパイス</InputLabel>
        <Select
          value={spiceLevel}
          onChange={(e) => setSpiceLevel(e.target.value)}
          label="スパイスレベル"
        >
          <MenuItem value="mild">マイルド</MenuItem>
          <MenuItem value="medium">中辛</MenuItem>
          <MenuItem value="hot">辛口</MenuItem>
        </Select>
      </FormControl>
      
      {/* 調理時間のスライダー */}
      <Typography variant="h6" gutterBottom>調理時間</Typography>
      <Box sx={{ width: 300 }}>
      <Slider
        aria-label="Restricted values"
        defaultValue={60}
        getAriaValueText={valuetext}
        step={null}
        valueLabelDisplay="auto"
        valueLabelFormat={(value) => `${value}分`} // 表示形式を指定
        marks={marks} // マークを設定
        min={0} // 最小値を0分に設定
        max={120} // 最大値を120分に設定
        value={cookingTime}
        onChange={(e) => setCookingTime(e.target.value)}
      />
    </Box>
      
      {/* フィルター適用ボタン */}
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 3 }}>
        <Button variant="contained" color="primary" onClick={handleNavigateToMeals}>
          絞り込んでレシピを表示
        </Button>
      </Box>
    </Box>
  );
};

export default RecipeFilterPage;