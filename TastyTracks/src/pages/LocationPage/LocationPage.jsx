import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { restaurant_list } from '../../assets/assets/assets';
import RestaurantItem from '../../components/RestaurantItem/RestaurantItem';
import './LocationPage.css';
import LocationHeader from '../../components/LocationHeader/LocationHeader';
import { location_list } from '../../assets/assets/assets';
import axios from 'axios';

const LocationPage = () => {
  const { location_name } = useParams();
  console.log("Location name is "+ location_name);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchData();
  }, []);



  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/restaurant/location/${location_name}`);
      setFilteredRestaurants(response.data);
      console.log("Get rest list "+ response.data);
      console.log("Get rest list "+ response.data.location_name);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const location = location_list.find(item => item.location_name === location_name);
  const imageUrls = location ? location.locationHeader_images : '';
  const description = location ? location.description : '';

  return (
    <main className="location">
      <LocationHeader slides={imageUrls} title={`Restaurants in ${location_name}`} description={description} />
      <h2>Restaurants in {location_name}</h2>
      <div className="restaurant-list">
        {filteredRestaurants.map(restaurant => (
          <RestaurantItem key={restaurant.rest_Id} restaurant={restaurant} />
        ))}
      </div>      
    </main>
  );
};

export default LocationPage;
