import React from 'react';
import './UpdateFoodItemForm.css';
import { useState } from "react";
import axios from 'axios';
import { assets } from '../../assets/assets/assets';
import { useEffect } from 'react';


const UpdateFoodItemForm = ({ onCancel ,item, rest_id}) => {


  
  const [restaurant, setRestaurant] = useState({});


  useEffect(() => {
    window.scrollTo(0, 0);

  }, []);

  useEffect(() => {
    fetchData(); // Call fetchData here
    window.scrollTo(0, 0);
}, []);
  


  const [foodFormData, setFoodFormData] = useState({
    rest_id: '',
    rest_name: '',
    item: '',
    price: '',
    description: '',
    img: null,
    category: ''
  });

  console.log("item "+item);



  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFoodFormData({
        ...foodFormData,
        img_url : files[0] // Assuming you only allow selecting one image file
      });
    } else {
      setFoodFormData({
        ...foodFormData,
        [name]: value
      });
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/restaurant/getOne/${rest_id}`);
      setRestaurant(response.data);
      console.log("Get rest list "+ restaurant.name);

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      /* const formData = new FormData();
      formData.append('rest_id', 1);
      formData.append('rest_name', "Cozy Cafe");
      formData.append('item', foodFormData.item);
      formData.append('price', foodFormData.price);
      formData.append('description', foodFormData.description);
      formData.append('image', null);
      formData.append('category', "Salad"); */

      const formData = {
        rest_id: 1,
        rest_name: "Cozy Cafe",
        item: foodFormData.item,
        price: foodFormData.price,
        description: foodFormData.description,
        img_url: "C:/Users/User/TastyTracks/TastyTracks/src/assets/assets/" + foodFormData.img_url.name,
        category: "Salad"
      }
      console.log(formData)
      
      const restId = rest_id;
      await axios.put(`http://localhost:8080/api/food/update/${item}/${restId}`, formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log("item00 "+item);
    } catch (error) {
      console.error('Error updating food item:', error);
    }
  };


  return (
    <div className="popup">
      <p>Update Food Item Form</p>
      {(<form className="update-food-item-form">

          <label htmlFor="price">Price:</label>
          <input type="text" id="price" name="price" value={foodFormData.price} onChange={handleChange} required />

          <label htmlFor="description">Description:</label>
          <input type="text" id="description" name="description" value={foodFormData.description} onChange={handleChange} required />

          <label htmlFor="image">Upload Image:</label>
          <input type="file" id="image" name="image" onChange={handleChange} required />

          <button type="submit" onClick={handleSubmit}>Add</button>
          </form>
        )
      }
      <img src={assets.cross_icon} alt="Close" onClick={onCancel} />
      
      
    </div>
  );
};

export default UpdateFoodItemForm;
