import React, { useContext } from "react";
import "./FoodItem.css";
import { assets } from "../../assets/assets/assets";
import { StoreContext } from "../../context/StoreContext";
import FoodRating from "../FoodRating/FoodRating";
import { Link } from "react-router-dom";
import StaticRating from "../StaticRating/StaticRating";

const FoodItem = ({ rest_id, item, category, description, img_url, price, rest_name }) => {
  const { cartItems, addToCart, removeFromCart } = useContext(StoreContext);
  const { userType } = useContext(StoreContext); 
  const restId = rest_id;

  const handleCartClick = () => {
    if (userType === 'user') {
      if (!cartItems[`${rest_id}_${item}`]) {
        addToCart(rest_id, item);
      } else {
        removeFromCart(rest_id, item);
      }
    } else {
      console.log("Please login to add items to the cart.");
    }
  };

  
  const handleAddCartClick = () => {
    if (userType === 'user') {
        addToCart(rest_id, item);
      
    } else {
      console.log("Please login to add items to the cart.");
    }
  };

  const handleRemoveCartClick = () => {
    if (userType === 'user') {
        removeFromCart(rest_id, item);
      
    } else {
      console.log("Please login to add items to the cart.");
    }
  }

  return (
    <div className="food-item">
      <div className="food-item-image-container">
        <img className="food-item-image" src={"http://localhost:8080/api/food/image/"+item+"/"+rest_id} alt="" />
        {!cartItems[`${rest_id}_${item}`] ? (
          <img className="add" onClick={handleCartClick} src={assets.add_icon_white} alt="" />
        ) : (
          <div className="food-item-counter">
            <img onClick={handleRemoveCartClick} src={assets.remove_icon_red} alt="" />
            <p>{cartItems[`${rest_id}_${item}`]}</p>
            <img onClick={handleAddCartClick} src={assets.add_icon_green} alt="" />
          </div>
        )}
      </div>
      <div className="food-item-info">
        <div className="food-item-name">
          <p>{item}</p>
          <StaticRating restId={rest_id} item={item} />
        </div>
        <p className="food-item-restaurant">{rest_name}</p>
        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">Tk. {price}</p>
        
        <Link to={`/api/review/get/${item}/${restId}`}>
        <p className="review">review</p>
        </Link>
      </div>
    </div>
  );
};

export default FoodItem;
