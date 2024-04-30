import React from 'react';
import './LocationHeader.css';

const LocationHeader = ({ imageUrl, title, description }) => {
  return (
    <div className="location-header" style={{ backgroundImage: `url(${imageUrl})` }}>
      <div className="location-header-contents">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default LocationHeader;
