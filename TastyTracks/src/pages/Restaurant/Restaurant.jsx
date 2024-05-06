import React from 'react'
import { useParams } from 'react-router-dom'
import { restaurant_list } from '../../assets/assets/assets';
import './Restaurant.css';
import RestaurantHeader from '../../components/RestaurantHeader/RestaurantHeader';
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu';
import { useEffect, useState } from 'react';
import CategorizedDisplay from '../../components/CategorizedDisplay/CategorizedDisplay';
import ReservationForm from '../../components/ReservationForm/ReservationForm';

const Restaurant = () => {
    const { restaurant_id } = useParams();

    useEffect(() => {
      window.scrollTo(0, 0);
  
    }, []);

    const filteredRestaurants = restaurant_list.filter(
        restaurant => restaurant.id === restaurant_id
    );
   
    const restaurant = restaurant_list.find(item => item.id === restaurant_id);
    const imageUrls = restaurant ? restaurant.restaurant_images : '';
    const name = restaurant ? restaurant.name : '';

    const [menu_category,set_category]=useState("All");

    const handleReservationSubmit = (bookingData) => {
      // Process reservation data, you can send it to backend or perform any other action
      console.log(bookingData);
    };
  return (
    <div className='restaurant-page'>
      <div className='restaurant-header'>
      <h2>{name}</h2>
      </div>
      <RestaurantHeader slides={imageUrls}/>
      <ReservationForm onSubmit={handleReservationSubmit} />
      <ExploreMenu menu_category={menu_category} set_category={set_category} />
      <CategorizedDisplay menu_category={menu_category} restaurant_id={restaurant_id}/>
    </div>
  )
}

export default Restaurant
