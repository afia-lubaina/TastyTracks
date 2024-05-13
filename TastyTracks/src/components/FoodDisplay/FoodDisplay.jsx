import React, { useState, useEffect, useContext } from 'react';
import './FoodDisplay.css';
import axios from 'axios';
import { StoreContext } from '../../context/StoreContext.jsx';
import FoodItem from '../FoodItem/FoodItem.jsx';

const FoodDisplay = () => {
  const { foodList } = useContext(StoreContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  // Function to fetch search results from backend
  const fetchSearchResults = async (query) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/food/search/${query}`);
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };


  // Event handler to update search query
  const handleSearchInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.trim() !== '') {
      fetchSearchResults(query);
    } else {
      setSearchResults([]);
    }
  };

  // Function to render food items
  const renderFoodItems = () => {
    if (searchQuery.trim() === '') {
      // Display all food items if search query is empty
      return foodList.map((food, index) => (
        <FoodItem
          key={index}
          rest_id={food.rest_id} 
          item={food.item} 
          description={food.description}
          category={food.category}
          price={food.price}
          img_url={food.img_url} 
          rest_name={food.rest_name}
        />
      ));
    } else {
      // Display search results if search query is not empty
      return searchResults.map((food, index) => (
        <FoodItem
          key={index}
          rest_id={food.rest_id} 
          item={food.item} 
          description={food.description}
          category={food.category}
          price={food.price}
          img_url={food.img_url} 
          rest_name={food.rest_name}
        />
      ));
    }
  };

  return (
    <div className='food-display'>
      <div className='food-search'>
      <h2 className='food-search-header'>Search Food Items</h2>
      <input
        type='text'
        placeholder='Search food items...'
        value={searchQuery}
        onChange={handleSearchInputChange}
      />
      </div>
      <div className="food-display-list">
        {renderFoodItems()}
      </div>
    </div>
  );
};

export default FoodDisplay;
