// src/components/PhotoCard.js
import React from 'react';
import '../styles/PhotoCard.css'; // スタイルの追加

const PhotoCard = ({ image, onConfirm, onCancel }) => {
  return (
    <div className="photo-card">
      <img src={image} alt="Uploaded" className="photo-card-image" />  {/* base64形式で画像を表示 */}
      <div className="photo-card-buttons">
        <button onClick={onConfirm} className="btn-confirm">この写真で決定</button>
        <button onClick={onCancel} className="btn-cancel">写真を変更</button>
      </div>
    </div>
  );
};

export default PhotoCard;
