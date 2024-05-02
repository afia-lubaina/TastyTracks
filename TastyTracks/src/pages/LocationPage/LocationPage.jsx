import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { restaurant_list } from '../../assets/assets/assets';
import RestaurantItem from '../../components/RestaurantItem/RestaurantItem';
import './LocationPage.css';
import LocationHeader from '../../components/LocationHeader/LocationHeader';
import { location_list } from '../../assets/assets/assets';




const LocationPage = () => {
  const { location_name } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);

  }, []);

  const filteredRestaurants = restaurant_list.filter(
    restaurant => restaurant.category === location_name
  );

  const location = location_list.find(item => item.location_name === location_name);
  const imageUrls = location ? location.locationHeader_images : '';
  const description = location ? location.description : '';

  return (
    <main className="location">
      <LocationHeader slides={imageUrls} title={`Restaurants in ${location_name}`} description={description} />
      <h2>Restaurants in {location_name}</h2>
      <div className="restaurant-list">
        {filteredRestaurants.map(restaurant => (
          <RestaurantItem key={restaurant.id} restaurant={restaurant}  />
        ))}
      </div>      
    </main>
  );
};

export default LocationPage;
