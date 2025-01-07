import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import UploadPage from './pages/UploadPage';
import ResipePage from './pages/ResipePage';
import MealPage from './pages/MealPage';
import RegisterPage from './pages/RegisterPage';
import AllPage from './pages/AllPage';
import HistoryPage from './pages/HistoryPage';
import { UserProvider } from './context/UserContext';

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
        {shouldShowHeaderFooter() && <Header />}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/upload" element={<UploadPage />} />
          <Route path="/meals" element={<MealPage />} />
          <Route path="/recipe" element={<ResipePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/all" element={<AllPage />} />
          <Route path="/history" element={<HistoryPage />} />
        </Routes>
        {shouldShowHeaderFooter() && <Footer />}
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
