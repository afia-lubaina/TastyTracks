import React from 'react'
import { useParams } from 'react-router-dom'
import LocationHeader from '../../components/LocationHeader/LocationHeader';
import { restaurant_list } from '../../assets/assets/assets';
import './Restaurant.css';





const Restaurant = () => {
    const { restaurant_id } = useParams();

    const filteredRestaurants = restaurant_list.filter(
        restaurant => restaurant.id === restaurant_id
    );
   
    const restaurant = restaurant_list.find(item => item.id === restaurant_id);
    const imageUrls = restaurant ? restaurant.restaurant_images : '';
    const name = restaurant ? restaurant.name : '';
    const description = restaurant ? restaurant.description : '';

  return (
    <div className='restaurant-page'>
      <h2>{restaurant.name}</h2>
      <LocationHeader slides={imageUrls} description={description} />
      


      
    </div>
  )
}

export default Restaurant
