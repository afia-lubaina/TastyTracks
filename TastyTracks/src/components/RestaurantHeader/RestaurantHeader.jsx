import React from 'react';
import './RestaurantHeader.css';
import SlickSlider from '../SlickSlider/SlickSlider';

const RestaurantHeader = ({ slides, title, description }) => {
  return (
    <div className="restaurant-header-imp">
        <SlickSlider slides={slides} />
    </div>
  );
};

export default RestaurantHeader;
