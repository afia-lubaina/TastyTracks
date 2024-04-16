import React from 'react';
import './ExploreLocation.css';
import { location_list } from '../../assets/assets/assets';
import { useState } from 'react';

const ExploreLocation = ({ category, setCategory }) => { 
  return (
    <div className="explore-location" id='explore-location'>
      <h1>Explore Restaurants</h1>
      <p className='explore-location-text'>Choose restaurants based on popular locations around Dhaka city. Browse restaurants accordingly.</p>
      <div className="explore-location-list">
        {location_list.map((item, index) => (
          <div key={index} onClick={() => setCategory(prev => prev === item.location_name ? "All" : item.location_name)} className="explore-location-item">
            <img className={category === item.location_name ? "active" : ""} src={item.location_image} alt="" />
            <p>{item.location_name}</p>
          </div>
        ))}
      </div>
      <div><hr /></div>
    </div>
  );
}

export default ExploreLocation;
