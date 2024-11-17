import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import UploadPage from './pages/UploadPage';
import Footer from './components/Footer';
import Header from './components/Header';
import { useLocation } from 'react-router-dom';

function App() {
  const location = useLocation(); 
  const shouldShowHeaderFooter = location.pathname !== "/";

  return (
    <>
        {shouldShowHeaderFooter && <Header />}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/upload" element={<UploadPage />} />
        </Routes>
        {shouldShowHeaderFooter && <Footer />}
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
