import React from 'react';
import { Link } from 'react-router-dom'; // React Router を使って遷移
import '../styles/Header.css'

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <h1>AIレシピ提案システム</h1>
      </div>
      <nav className="nav">
        <ul>
          <li>
            <Link to="/">Let's Cooking</Link> {/* クリックするとトップページに遷移 */}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
