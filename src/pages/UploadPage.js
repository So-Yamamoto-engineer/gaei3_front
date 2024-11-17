// src/pages/UploadPage.js
import React, { useState } from 'react';
import PhotoCard from '../components/PhotoCard';  // 作成したカードコンポーネントをインポート
import '../styles/UploadPage.css';  // スタイルのインポート
import Header from '../components/Header';
import Footer from '../components/Footer';

const UploadPage = () => {
  const [image, setImage] = useState(null); // アップロードされた画像の状態
  const [isConfirmed, setIsConfirmed] = useState(false); // 確認ボタンの状態

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);  // base64形式で画像を状態にセット
      };
      reader.readAsDataURL(file);  // ファイルをbase64に変換して読み込む
    }
  };

  const handleConfirm = () => {
    setIsConfirmed(true); // 確認したので状態を更新
  };

  const handleCancel = () => {
    setImage(null);  // 変更するため、画像をリセット
  };

  return (
    <div className="upload-page">
      <Header/>
      <h2>写真をアップロード</h2>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="file-input"
      />

      {image && !isConfirmed && (
        <PhotoCard
          image={image}  // base64形式の画像データを渡す
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}

      {isConfirmed && <p>写真が確認されました！</p>}
      <Footer/>
    </div>
  );
};

export default UploadPage;
