import React, { useContext } from "react";
import "./FoodItem.css";
import { assets } from "../../assets/assets/assets";
import { StoreContext } from "../../context/StoreContext";
import FoodRating from "../FoodRating/FoodRating";


const FoodItem = ({ rest_id, item, category, description, img_url, price, rest_name }) => {
  const { cartItems, addToCart, removeFromCart } = useContext(StoreContext);
console.log("food item "+rest_id);


  return (
    <div className="food-item">
      <div className="food-item-image-container">
        <img className="food-item-image" src={"http://localhost:8080/api/food/image/"+item+"/"+rest_id} alt="" />
        {!cartItems[`${rest_id}_${item}`] ? (
          <img className="add" onClick={() => addToCart(rest_id,item)} src={assets.add_icon_white} alt="" />
        ) : (
          <div className="food-item-counter">
            <img onClick={() => removeFromCart(rest_id,item)} src={assets.remove_icon_red} alt="" />
            <p>{cartItems[`${rest_id}_${item}`]}</p>
            <img onClick={() => addToCart(rest_id,item)} src={assets.add_icon_green} alt="" />
          </div>
        )}
      </div>
      <div className="food-item-info">
        <div className="food-item-name">
          <p>{item}</p>
          <FoodRating itemId={rest_id} />
        </div>
        <p className="food-item-restaurant">{rest_name}</p>
        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">Tk. {price}</p>
      </div>
    </div>
  );
};

export default FoodItem;
