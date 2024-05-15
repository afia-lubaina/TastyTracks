import React, { useState } from 'react';
import './ConfirmationPopup.css';
import { assets } from '../../assets/assets/assets';


const ConfirmationPopup = ({ onConfirm, onCancel }) => {
  return (
    <div className="logout-confirmation-popup">
      <div className="logout-confirmation-popup-container">
        <div className="logout-confirmation-popup-title">
          <span>Confirmation</span>
        </div>
        <p>Are you sure you want to logout ?</p>
        <div className="logout-confirmation-popup-buttons">
          <button onClick={onConfirm}>Yes</button>
          <button onClick={onCancel}>No</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPopup;
