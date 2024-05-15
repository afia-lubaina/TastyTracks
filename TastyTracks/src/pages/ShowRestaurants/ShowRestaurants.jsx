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

/*   private long rest_Id;
  private String name=" ";
  private  String email=" ";
  private String img_url;
  private String password=" ";
  private String address;
  private String description;
  private String phone;
 */
  return (
    <div className='restaurant-page'>
      <h1>Restaurants Owners</h1>
      <div className="restaurant-container">
        {restaurants.map(restaurant => (
          <div key={restaurant.id} className="restaurant-card">
            <h2>{restaurant.name}</h2>
            <p>Email: {restaurant.email}</p>
            <p>Address: {restaurant.address}</p>
            <p>Phone: {restaurant.description}</p>
            <p>Phone: {restaurant.phone}</p>
            <button>Remove Restaurant</button>
            {/* Add more details as needed */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowRestaurants;
