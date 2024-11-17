// src/components/Footer.js
import React from 'react';
import { useNavigate } from 'react-router-dom';  // navigateを使ってトップに戻るためにインポート
import { Link } from 'react-router-dom'; // React Router を使って遷移

const Footer = () => {
  const navigate = useNavigate();

  const handleBackToTop = () => {
    navigate('/');  // トップページ（ホーム）に戻る
  };

  return (
    <footer className="header">
        <h1>AIレシピ提案システム</h1>
      <nav className="nav">
        <ul>
          <li>
            <Link to="/">Let's Cooking</Link> {/* クリックするとトップページに遷移 */}
          </li>
        </ul>
      </nav>
    </footer>
  );
};

export default Footer;
