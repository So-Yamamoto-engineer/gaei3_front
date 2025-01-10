import React, { useState } from 'react';
import { Box, Typography, FormControl, InputLabel, Select, MenuItem, Button, Slider, TextField, Chip } from '@mui/material';
import TimeSlider from '../components/TimeSlider'
import { useNavigate } from 'react-router-dom';
import { usePrediction } from '../context/PredictionContext';


const RecipeFilterPage = () => {
  const navigate = useNavigate();
  const { prediction, setPrediction } = usePrediction();

  const [flavor, setFlavor] = useState('');
  const [spiceLevel, setSpiceLevel] = useState('');
  const [cookingTime, setCookingTime] = useState(60);
  const [age, setAge] = useState('');
  const [ingredientsToPrioritize, setIngredientsToPrioritize] = useState('');
  const [allergicIngredients, setAllergicIngredients] = useState([]);
  const [inputValue, setInputValue] = useState('');


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

  // アレルギー関連 //////
    const handleAddAllergy = (e) => {
      if (e.key === 'Enter' && inputValue.trim() && !allergicIngredients.includes(inputValue)) {
        setAllergicIngredients([...allergicIngredients, inputValue]);
        setInputValue(''); // 入力フィールドをクリア
        e.preventDefault(); // ページリロードを防ぐ
      }
    };
  
    const handleDelete = (ingredientToDelete) => {
      setAllergicIngredients(allergicIngredients.filter((item) => item !== ingredientToDelete));
    };
  /////////////////////
  
  // フィルタリングされたレシピをLMMに投げるための関数（仮）
  
  const handleNavigateToMeals = () => {
    const filterData = {
      flavor,
      spiceLevel,
      cookingTime,
      age,
      ingredientsToPrioritize,
      allergicIngredients,
    };
    navigate('/meal' , {state: filterData })
    // LLMにフィルターデータを投げる処理を追加
    console.log("Filtered data sent to LLM: ", filterData);
  };

  return (
    <Box sx={{ padding: 3, mt:5, mb: 6}}>
      <Typography variant="h4" sx={{ fontWeight:"bold"}} gutterBottom>
        レシピ絞り込み
      </Typography>
      {prediction && (
        <FormControl fullWidth 
          sx={{ marginBottom: 2 }}>
          <InputLabel>優先して使う食材</InputLabel>
          <Select
            value={ingredientsToPrioritize}
            onChange={(e) => setIngredientsToPrioritize(e.target.value)}
            label="優先して使う食材"
          >
            {
              prediction.map((pred, index) => {
                return <MenuItem value={pred}>{pred}</MenuItem>
              })
            }
          </Select>
        </FormControl>
      )}
      
      {/* 料理のカテゴリー */}
      <FormControl fullWidth 
        sx={{ marginBottom: 2 }}>
        <InputLabel>味の特徴</InputLabel>
        <Select
          value={flavor}
          onChange={(e) => setFlavor(e.target.value)}
          label="料理のカテゴリー"
        >
          <MenuItem value="salty">しょっぱい</MenuItem>
          <MenuItem value="sweet">甘い</MenuItem>
          <MenuItem value="bitter">苦い</MenuItem>
        </Select>
      </FormControl>
      
      {/* スパイスレベル */}
      <FormControl fullWidth 
        sx={{ marginBottom: 2 }}>
        <InputLabel>からさ</InputLabel>
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

      {/* スパイスレベル */}
      <FormControl fullWidth 
        sx={{ marginBottom: 2 }}>
        <InputLabel>対象者</InputLabel>
        <Select
          value={age}
          onChange={(e) => setAge(e.target.value)}
          label="対象者"
        >
          <MenuItem value="Elderly people (menus focusing on soft ingredients and easy digestion)">高齢者</MenuItem>
          <MenuItem value="Infants and toddlers (menus considering baby food and allergy-friendly options)">乳幼児</MenuItem>
          <MenuItem value="Pregnant women (menus with balanced nutrition, avoiding caffeine and raw foods)">妊婦</MenuItem>
          <MenuItem value="People on a diet (menus with low calories and low carbohydrates)">ダイエット中の人</MenuItem>
          <MenuItem value="Athletes and active individuals (menus high in protein and designed for energy replenishment)">スポーツ選手・運動する人</MenuItem>
          <MenuItem value="People with allergies (menus excluding specific allergens)">アレルギー持ちの人</MenuItem>
          <MenuItem value="People recovering from illness (menus low in salt and gentle on digestion)">病気療養中の人</MenuItem>
          <MenuItem value="Children (menus tailored to elementary-aged kids with selective preferences)">子ども</MenuItem>
          <MenuItem value="Busy individuals (menus that can be prepared quickly)">忙しい人</MenuItem>
          <MenuItem value="Vegans and vegetarians (menus excluding animal-based ingredients)">ビーガン・ベジタリアン</MenuItem>
          <MenuItem value="People seeking gluten-free options (menus without wheat)">グルテンフリーを求める人</MenuItem>
          <MenuItem value="People with diabetes (menus designed for blood sugar management)">糖尿病の人</MenuItem>
          <MenuItem value="People focusing on muscle training (menus high in protein and low in fat)">筋トレ中の人</MenuItem>
          <MenuItem value="For large groups (sharing-friendly, large-plate menus)">大人数向け</MenuItem>
          <MenuItem value="People living alone (menus in small portions and easy to store)">ひとり暮らしの人</MenuItem>
        </Select>
      </FormControl>

      <Box>
        {/* アレルギー食材入力フィールド */}
        <TextField
          fullWidth
          label="アレルギー食材を入力"
          placeholder="食材を入力してEnterを押してください"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleAddAllergy}
          sx={{ marginBottom: 2 }}
        />

        {/* アレルギー食材リスト */}
        <Typography variant="subtitle1">アレルギー食材リスト:</Typography>
          <Box sx={{ marginTop: 1,  maxHeight: 100, overflow: "auto", borderRadius: 1, }}>
          {allergicIngredients.map((ingredient, index) => (
            <Typography key={index} variant="body1">
              ・ {ingredient}
            </Typography>
          ))}
        </Box>
      </Box>
      

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
        sx={{
          color: "black",
          borderColor: "black",
        }}
      />
    </Box>
      
      {/* フィルター適用ボタン */}
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 3,  }}>
        <Button variant="outlined" color="primary" onClick={handleNavigateToMeals}
        sx={{
          color: "black",
          borderColor: "black",
        }}
        >
          絞り込んでレシピを表示
        </Button>
      </Box>
    </Box>
  );
};

export default RecipeFilterPage;