import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CategorizedDisplay.css';
import { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext.jsx';
import FoodItem from '../FoodItem/FoodItem.jsx';
import RestaurantFoodItem from '../RestaurantFoodItem/RestaurantFoodItem.jsx';

const CategorizedDisplay = ({ menu_category, restaurant_id }) => {
  // Set up state for the fetched data
  const [resfood, setResfood] = useState([]);

  // Fetch data when the component mounts or when restaurant_id changes
  useEffect(() => {
    fetchData();
  }, [restaurant_id]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/food/rest/${restaurant_id}`);
      setResfood(response.data);
      console.log("Get rest list ", response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className='category-display'>
      <div className="category-display-list">
        {resfood.map((item, index) => {
          if (menu_category === "All" || menu_category === item.category)
            return (
              <RestaurantFoodItem
                key={index}
                rest_id={item.rest_id}
                category={item.category}
                item={item.item}
                description={item.description}
                price={item.price}
                img_url={item.img_url}
                rest_name={item.rest_name}
              />
            );
        })}
      </div>
    </div>
  );
};

export default CategorizedDisplay;
