import React from 'react'
import './FoodDisplay.css'
import { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext.jsx'
import FoodItem from '../FoodItem/FoodItem.jsx'

const FoodDisplay = ({category}) => {
 
  const {food_list}=useContext(StoreContext);
  return (
    <div className='food-display' id='food-display'>
        <h2>Top recent dishes</h2>
        <div className="food-display-list">
          {
            food_list.map((item,index)=>{ 
              return <FoodItem key={index} id={item.id} name={item.name} price={item.price} description={item.description} image={item.image} />
          })}
        </div>
    </div>
  )
}

export default FoodDisplay
