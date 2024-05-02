import React from 'react'
import './CategorizedDisplay.css'
import { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext.jsx'
import FoodItem from '../FoodItem/FoodItem.jsx'



const CategorizedDisplay = ({menu_category}) => {
 
  const {food_list}=useContext(StoreContext);
  return (
    <div className='category-display' >
          <div className="category-display-list">
            {
              food_list.map((item,index)=>{ 
                if(menu_category==="All" || menu_category===item.category)
                return <FoodItem key={index} id={item.id} name={item.name} description={item.description} price={item.price}  image={item.image} rating={item.rating}/>
            })}
          </div>
    </div>
  )
}

export default CategorizedDisplay
