import React from 'react'
import { useParams } from 'react-router-dom'
import { restaurant_list } from '../../assets/assets/assets';
import './Restaurant.css';
import RestaurantHeader from '../../components/RestaurantHeader/RestaurantHeader';


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
      <RestaurantHeader slides={imageUrls}/>
      <div className='restaurant-description'>
        <p>{description}</p>
      </div>
      
    </div>
  )
}

export default Restaurant
