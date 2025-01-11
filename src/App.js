import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import UploadPage from './pages/UploadPage';
import RecipePage from './pages/RecipePage';
import MealPage from './pages/MealPage';
import RegisterPage from './pages/RegisterPage';
import AllPage from './pages/AllPage';
import HistoryPage from './pages/HistoryPage';
import RecipeFilterPage from './pages/RecipeFilterPage';
import ShoppingListPage from './pages/ShoppingListPage';
import SettingPage from './pages/SettingPage';

import { UserProvider } from './context/UserContext';
import { PredictionProvider } from './context/PredictionContext';



import Footer from './components/Footer';
import Header from './components/Header';
import { useLocation } from 'react-router-dom';

function App() {
  const location = useLocation(); 
  const shouldShowHeaderFooter = ()  => {
    if (location.pathname !== "/" && location.pathname !== "/register"){
      return true;
    }
  }
  return (
    <>
      <UserProvider>
      <PredictionProvider>
        {shouldShowHeaderFooter() && <Header />}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/upload" element={<UploadPage />} />
          <Route path="/meal" element={<MealPage />} />
          <Route path="/recipe" element={<RecipePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/all" element={<AllPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/filter" element={<RecipeFilterPage />} />
          <Route path="/shopping-list" element={<ShoppingListPage />} />
          <Route path="/setting" element={<SettingPage />} />
        </Routes>
        {shouldShowHeaderFooter() && <Footer />}
      </PredictionProvider>
      </UserProvider>
    </>
  );
}

function AppWrapper() {
  // useLocationはRouter内でのみ利用可能なので、AppをRouterでラップ
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
