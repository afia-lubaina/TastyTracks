import React from 'react';
import { Link } from 'react-router-dom';
import './RestaurantItem.css';


const RestaurantItem = ({ restaurant }) => {
  return (
    <div className="restaurant-item">
      <Link to={`/restaurant/${restaurant.id}`}>
        <div className="restaurant-item-container">
            <img src={restaurant.image} alt="" className="restaurant-image" />
          <div className="restaurant-info">
              <p className='restaurant-name'>{restaurant.name}</p>
            <p className='desc'>{restaurant.description}</p>
            <p className='rating'>Rating: {restaurant.rating}</p>
            <p>{restaurant.location}</p>
          </div>
        </div>
        </Link>
    </div>
  );
};

export default RestaurantItem;
