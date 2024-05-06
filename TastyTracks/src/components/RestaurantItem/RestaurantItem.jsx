import React from 'react';
import { Link } from 'react-router-dom';
import './RestaurantItem.css';


const RestaurantItem = ({ restaurant }) => {
  return (
    <div className="restaurant-item">
      <Link to={`/restaurant/${restaurant.rest_Id}`}>
        <div className="restaurant-item-container">
            <img src={"http://localhost:8080/api/restaurant/image/"+restaurant.rest_Id} alt="" className="restaurant-image" />
          <div className="restaurant-info">
              <p className='restaurant-name'>{restaurant.name}</p>
            <p className='desc'>{restaurant.description}</p>
          </div>
        </div>
        </Link>
    </div>
  );
};

export default RestaurantItem;
