import React from 'react';
import './FoodDisplay.css';
import { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext.jsx';
import FoodItem from '../FoodItem/FoodItem.jsx';

const FoodDisplay = () => {
  const { foodList } = useContext(StoreContext);
  console.log("food list:  "+foodList.item);
  return (
    <div className='food-display'>
      <h2>Top dishes of the month</h2>
      <div className="food-display-list">
        {foodList.map((ix, index) => (
          <FoodItem
            key={index}//rest_id, item, category, description, img_url, price, rest_name
            id={ix.rest_id} 
            item={ix.item} 
            description={ix.description}
            category={ix.category}
            price={ix.price}
            image={ix.img_url} 
            rest_name={ix.rest_name}
          />
        ))}
      </div>
    </div>
  );
};

export default FoodDisplay;
