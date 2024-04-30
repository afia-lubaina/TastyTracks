import React from 'react';
import './LocationHeader.css';
import ImageSlider from '../ImageSlider/ImageSlider';
import SlickSlider from '../SlickSlider/SlickSlider';

const LocationHeader = ({ slides, title, description }) => {
  return (
    <div className="location-header">
        <ImageSlider slides={slides} />
      <div className="location-header-contents">
        <p>{description}</p>
      </div>
    </div>
  );
};

export default LocationHeader;
