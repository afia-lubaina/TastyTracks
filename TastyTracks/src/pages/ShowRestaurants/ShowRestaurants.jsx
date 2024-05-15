import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ShowRestaurants.css'; // Import the CSS file

const ShowRestaurants = () => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/restaurant/get');
        setRestaurants(response.data);
      } catch (error) {
        console.error('Error fetching restaurants:', error);
      }
    };

    fetchRestaurants();
  }, []);

  return (
    <div className='restaurant-page'>
      <h1>Restaurants</h1>
      <div className="restaurant-container">
        {restaurants.map(restaurant => (
          <div key={restaurant.id} className="restaurant-card">
            <h2>{restaurant.restaurantName}</h2>
            <p>Email: {restaurant.email}</p>
            <p>Address: {restaurant.address}</p>
            <p>Phone: {restaurant.phone}</p>
            {/* Add more details as needed */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowRestaurants;
