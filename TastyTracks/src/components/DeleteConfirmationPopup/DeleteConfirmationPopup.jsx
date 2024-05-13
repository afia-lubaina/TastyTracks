import React from 'react';
import './DeleteConfirmationPopup.css';
import { assets } from '../../assets/assets/assets';

const DeleteConfirmationPopup = ({ onCancel, onDelete }) => {
  return (
    <div className="delete-confirmation-popup">
      <div className="delete-confirmation-popup-container">
        <div className="delete-confirmation-popup-title">
          <span>Confirmation</span>
          <img src={assets.cross_icon} alt="Close" onClick={onCancel} />
        </div>
        <p>Are you sure you want to delete this item?</p>
        <div className="delete-confirmation-popup-buttons">
          <button onClick={onDelete}>Yes</button>
          <button onClick={onCancel}>No</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationPopup;
