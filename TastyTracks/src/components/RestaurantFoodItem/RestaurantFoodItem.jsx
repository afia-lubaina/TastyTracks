import React, { useContext, useState } from "react";
import "./RestaurantFoodItem.css";
import { assets } from "../../assets/assets/assets";
import { StoreContext } from "../../context/StoreContext";
import FoodRating from "../FoodRating/FoodRating";
import axios from 'axios';
import DeleteConfirmationPopup from "../DeleteConfirmationPopup/DeleteConfirmationPopup";
import UpdateFoodItemForm from "../UpdateFoodItemForm/UpdateFoodItemForm";


const RestaurantFoodItem = ({ rest_id, item, category, description, img_url, price, rest_name, isVisible, isResVisible }) => {
  const { cartItems, addToCart, removeFromCart } = useContext(StoreContext);
  const [isDeleted, setIsDeleted] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  
  const handleDeleteFood = async () => {
    try {
      const restId = rest_id;
      setIsDeleted(true);
      await axios.delete(`http://localhost:8080/api/food/delete/${item}/${restId}`, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log('Food item deleted successfully');
    } catch (error) {
      console.error('Error deleting food item:', error);
    }
  };

  const handleUpdateFood = async (formData) => {
    try {
      const restId = rest_id;
      await axios.put(`http://localhost:8080/api/food/update/${item}/${restId}`, formData, {
      });
      console.log('Food item updated successfully');
    } catch (error) {
      console.error('Error updating food item:', error);
    }
  };

  const handleUpdateBox = () => {
    setShowUpdateForm(true);
  };

  const handleDeleteConfirmation = () => {
    setShowDeletePopup(true);
  };

  const handleCancelDelete = () => {
    setShowDeletePopup(false);
  };

  if (isDeleted) {
    return null; // Don't render the component if it's deleted
  }

  const showUpdatePopup = () => {
    setShowUpdateForm(true); 
  }

  const handleCancelUpdate = () => {
    setShowUpdateForm(false);
  }

  return (
    <div className="restaurant-food-item">
      <div className="restaurant-food-item-image-container">
        <img className="restaurant-food-item-image" src={"http://localhost:8080/api/food/image/" + item + "/" + rest_id} alt="" />
        {isResVisible && (!cartItems[`${rest_id}_${item}`] ? (
          <img className="add" onClick={() => addToCart(rest_id, item)} src={assets.add_icon_white} alt="" />
        ) : (
          <div className="food-item-counter">
            <img onClick={() => removeFromCart(rest_id, item)} src={assets.remove_icon_red} alt="" />
            <p>{cartItems[`${rest_id}_${item}`]}</p>
            <img onClick={() => addToCart(rest_id, item)} src={assets.add_icon_green} alt="" />
          </div>
        ))}
      </div>
      <div className="restaurant-food-item-info">
        <div className="restaurant-food-item-name">
          <p>{item}</p>
          <FoodRating itemId={rest_id} item={item} />
        </div>
        <p className="restaurant-food-item-restaurant">{rest_name}</p>
        <p className="restaurant-food-item-desc">{description}</p>
        <p className="restaurant-food-item-price">Tk. {price}</p>
      </div>
      {isVisible && (
        <div className="buttons-container">
          <button className="delete-button" onClick={handleDeleteConfirmation}>Delete Item</button>
          <button className="update-button"  onClick={handleUpdateBox}>Update Item</button>
        </div>
      )}
      {showDeletePopup && (
        <DeleteConfirmationPopup onCancel={handleCancelDelete} onDelete={handleDeleteFood} />
      )}
      {showUpdateForm && (<UpdateFoodItemForm onCancel={handleCancelUpdate} item={item} rest_id={rest_id} />
      )}
    </div>
  );
};

export default RestaurantFoodItem;
