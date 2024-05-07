import React, { useContext } from "react";
import "./FoodItem.css";
import { assets } from "../../assets/assets/assets";
import { StoreContext } from "../../context/StoreContext";
import FoodRating from "../FoodRating/FoodRating";
import axios from 'axios';
import { useEffect, useState } from "react";


const FoodItem = ({ rest_id, item, category, description, img_url, price, rest_name }) => {
  const { cartItems, addToCart, removeFromCart } = useContext(StoreContext);
console.log("food item "+rest_id);
  //console.log("food item "+img_url);

  ///image/{item}/{restId}

  // const [image, setImage] = useState('');


  // useEffect(() => {
  //   async function fetchImageData() {
  //     try {
  //       const response = await axios.get(`http://localhost:8080/api/food/image/item/rest_id`, {
  //         responseType: 'arraybuffer' // Set the response type to arraybuffer
  //       });
  //       const blob = new Blob([response.data], { type: 'image/jpeg' }); // Create a blob from the arraybuffer
  //       const imageUrl = URL.createObjectURL(blob); // Create a blob URL
  //       setImage(imageUrl);
  //     } catch (error) {
  //       console.error('Error fetching image:', error);
  //     }
  //   }
  //   fetchImageData();
  // }, [item, rest_id]);
  

  return (
    <div className="food-item">
      <div className="food-item-image-container">
        <img className="food-item-image" width={40} height={40} src={"http://localhost:8080/api/food/image/"+item+"/"+rest_id} alt="" />
        {!cartItems[rest_id] ? (
          <img className="add" onClick={() => addToCart(rest_id)} src={assets.add_icon_white} alt="" />
        ) : (
          <div className="food-item-counter">
            <img onClick={() => removeFromCart(rest_id)} src={assets.remove_icon_red} alt="" />
            <p>{cartItems[rest_id]}</p>
            <img onClick={() => addToCart(rest_id)} src={assets.add_icon_green} alt="" />
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
        <p className="food-item-category">Category: {category}</p>
      </div>
    </div>
  );
};

export default FoodItem;
