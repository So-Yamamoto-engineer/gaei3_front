import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  Box, 
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Typography,
 } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import LanguageIcon from '@mui/icons-material/Language';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LockIcon from '@mui/icons-material/Lock';
import EmailIcon from '@mui/icons-material/Email';
import EditIcon from '@mui/icons-material/Edit';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import SettingsIcon from '@mui/icons-material/Settings';
import { useNavigate } from 'react-router-dom';


function HistoryPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const [loading, setLoading] = useState(true);
    const [mealsInfo, setMealsInfo] = useState([]);
    const [error, setError] = useState(null);
    const handleNavigateToPastMeals = (meal) => {
        navigate('/pastMeals');
    };
    const handleNavigateToPopularMeals = (meal) => {
      navigate('/popularMeals');
    };
    const handleNavigateToBalance = (meal) => {
      navigate('/balance');
    };

    return (
      <Box
        sx={{
            mt: 7,
            mb: 40,
        }}
      >
        <List>
          {/* 料理設定系 */}
          <ListItem button onClick={handleNavigateToPastMeals} sx={{ borderBottom: '1px solid #e0e0e0' }}>
            <ListItemIcon>
              <ArrowForwardIosIcon sx={{ color: 'primary.main', fontSize: 30 }} />
            </ListItemIcon>
            <ListItemText primary="過去の料理を見る" />
          </ListItem>
          <ListItem button onClick={handleNavigateToPopularMeals} sx={{ borderBottom: '1px solid #e0e0e0' }}>
            <ListItemIcon>
              <ArrowForwardIosIcon sx={{ color: 'primary.main', fontSize: 30 }} />
            </ListItemIcon>
            <ListItemText primary="人気のレシピを見る" />
          </ListItem>
          <ListItem button onClick={handleNavigateToBalance} sx={{ mb: 3 }}>
            <ListItemIcon>
              <ArrowForwardIosIcon sx={{ color: 'primary.main', fontSize: 30 }} />
            </ListItemIcon>
            <ListItemText primary="バランス" />
          </ListItem>

          {/* 個人設定系 */}
          <Typography sx={{ml: 2}}>
                個人設定
          </Typography>
          <ListItem >
          {/* <ListItem button onClick={handleNavigateToSettingsIcon}> */}
            <ListItemIcon>
              <SettingsIcon sx={{ color: 'primary.main', fontSize: 30 }} />
            </ListItemIcon>
            <ListItemText primary="環境設定" />
          </ListItem>
          {/* <ListItem button onClick={handleNavigateToChangeName}> */}
          <ListItem>
            <ListItemIcon>
              <EditIcon sx={{ color: 'primary.main', fontSize: 30 }} />
            </ListItemIcon>
            <ListItemText primary="名称変更" />
          </ListItem>
          {/* <ListItem button onClick={handleNavigateToChangeEmail}> */}
          <ListItem>
            <ListItemIcon>
              <EmailIcon sx={{ color: 'primary.main', fontSize: 30 }} />
            </ListItemIcon>
            <ListItemText primary="メールアドレス変更" />
          </ListItem>
          {/* <ListItem button onClick={handleNavigateToChangePassword}> */}
          <ListItem>
            <ListItemIcon>
              <LockIcon sx={{ color: 'primary.main', fontSize: 30 }} />
            </ListItemIcon>
            <ListItemText primary="パスワード変更" />
          </ListItem>
          {/* <ListItem button onClick={handleNavigateToNotificationSettingsIcon}> */}
          <ListItem>
            <ListItemIcon>
              <NotificationsIcon sx={{ color: 'primary.main', fontSize: 30 }} />
            </ListItemIcon>
            <ListItemText primary="通知設定" />
          </ListItem>
          {/* <ListItem button onClick={handleNavigateToLanguageSettingsIcon}> */}
          <ListItem>
            <ListItemIcon>
              <LanguageIcon sx={{ color: 'primary.main', fontSize: 30 }} />
            </ListItemIcon>
            <ListItemText primary="言語設定" />
          </ListItem>
          {/* <ListItem button onClick={handleNavigateToDeleteAccount}> */}
          <ListItem>
            <ListItemIcon>
              <DeleteIcon sx={{ color: 'primary.main', fontSize: 30 }} />
            </ListItemIcon>
            <ListItemText primary="アカウント削除" />
          </ListItem>
          {/* <ListItem button onClick={handleNavigateToPrivacyPolicy}> */}
          <ListItem>
            <ListItemText primary="プライバシーポリシー・利用規約" />
          </ListItem>
        </List>

      </Box>
    );
}

export default HistoryPage;