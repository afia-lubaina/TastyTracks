import React from 'react'
import { useParams } from 'react-router-dom'
import { restaurant_list } from '../../assets/assets/assets';
import './Restaurant.css';
import RestaurantHeader from '../../components/RestaurantHeader/RestaurantHeader';
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu';
import { useEffect, useState } from 'react';
import CategorizedDisplay from '../../components/CategorizedDisplay/CategorizedDisplay';
import ReservationForm from '../../components/ReservationForm/ReservationForm';
import axios from 'axios';


const Restaurant = () => {
    const { restaurant_id } = useParams();
    const [restaurant, setRestaurant] = useState({});
    
  

    useEffect(() => {
      window.scrollTo(0, 0);
  
    }, []);

    useEffect(() => {
      fetchData(); // Call fetchData here
      window.scrollTo(0, 0);
  }, []);
  

    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/restaurant/getOne/${restaurant_id}`);
        setRestaurant(response.data);
        console.log("Get rest list "+ restaurant.name);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const restaurant_list_item = restaurant_list.find(item => item.name === restaurant.name);
    const imgUrls = restaurant_list_item ? restaurant_list_item.restaurant_images : '';
    console.log("restaurant img"+imgUrls);

    const [menu_category,set_category]=useState("All");

    const handleReservationSubmit = (bookingData) => {
      // Process reservation data, you can send it to backend or perform any other action
      console.log(bookingData);
    };
  return (
    <div className='restaurant-page'>
      <div className='restaurant-header'>
      <h2>{restaurant.name}</h2>
      </div>
      {imgUrls && <RestaurantHeader slides={imgUrls}/>}
      <ReservationForm onSubmit={handleReservationSubmit} />
      <ExploreMenu menu_category={menu_category} set_category={set_category} />
      <CategorizedDisplay menu_category={menu_category} restaurant_id={restaurant_id} isVisible={false} isResVisible={true}/>
    </div>
  )
}

export default Restaurant
