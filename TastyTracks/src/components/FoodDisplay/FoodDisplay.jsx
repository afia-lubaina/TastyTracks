import React from 'react'
import './FoodDisplay.css'
import { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext.jsx'
import FoodItem from '../FoodItem/FoodItem.jsx'


const FoodDisplay = () => {
 
  const {food_list}=useContext(StoreContext);
  return (
    <div className='food-display' >
        <h2>Top dishes of month</h2>
          <div className="food-display-list">
            {
              food_list.map((item,index)=>{ 
                {console.log(item.category)}
                {console.log(item.id)}
                return <FoodItem key={index} id={item.id} name={item.name} description={item.description} price={item.price}  image={item.image}  />
            })}
          </div>
    </div>
  )
}

export default FoodDisplay
