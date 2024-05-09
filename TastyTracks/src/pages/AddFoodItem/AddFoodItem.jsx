import React, { useState } from 'react'; 
import './AddFoodItem.css';
import { restaurant_list } from '../../assets/assets/assets';
import { useEffect } from 'react';
import RestaurantHeader from '../../components/RestaurantHeader/RestaurantHeader';
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu';
import CategorizedDisplay from '../../components/CategorizedDisplay/CategorizedDisplay';
import ReservationForm from '../../components/ReservationForm/ReservationForm';
import axios from 'axios';
import { useParams } from 'react-router-dom';


const AddFoodItem = () => {

  
  const [menu_category,set_category]=useState("All");
  const [foodformData, setfoodformData] = useState({
    rest_name: '',
    price: '',
    description: '',
    image: null, 
    category: '',
    item: '',
    rest_id: 1
  });
  const [showPopup, setShowPopup] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');


  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setfoodformData({
        ...foodformData,
        image: files[0] // Assuming you only allow selecting one image file
      });
    } else {
      setfoodformData({
        ...foodformData,
        [name]: value
      });
    }
  };

  const { rest_Id } = useParams();
    const [restaurant, setRestaurant] = useState({});
    console.log("restaurant id "+rest_Id);
    
    useEffect(() => {
      fetchData(); // Call fetchData here
      window.scrollTo(0, 0);
  }, []);
  

    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/restaurant/getOne/${rest_Id}`);
        setRestaurant(response.data);
        console.log("Get rest list "+ restaurant.name);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const restaurant_list_item = restaurant_list.find(item => item.name === restaurant.name);
    const imgUrls = restaurant_list_item ? restaurant_list_item.restaurant_images : '';
    console.log("restaurant img"+imgUrls);

  //////////////////////////////////////////////////////////////////////////


  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if any field is empty
    if (Object.values(foodformData).some(value => value === '' || value === null)) {
      setShowPopup(true);
      return;
    }

    try {
      const formData = new FormData();
      formData.append('rest_name', foodformData.rest_name);
      formData.append('price', foodformData.price);
      formData.append('description', foodformData.description);
      formData.append('image', foodformData.image);
      formData.append('category', foodformData.category);
      formData.append('item', foodformData.item);
      formData.append('rest_id', 1);  

      var response = await axios.post('http://localhost:8080/api/food/save', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      // Assuming your API returns some data
      console.log("Y0 "+response.data); 
      console.log("Y1 "+response);
      
      // Show success message
      setSuccessMessage('Food item added successfully.');
      setTimeout(() => setSuccessMessage(''), 2000); // Hide after 3 seconds

      // Reset form fields
      setfoodformData({
        rest_name: '',
        price: '',
        description: '',
        image: null, 
        category: '',
        item: '',
        rest_id: 1
      });
      
    } catch (error) {
      console.error('Error adding food item:', error);
      // Show error message
      setErrorMessage('Error adding food item. Please try again.');
      setTimeout(() => setErrorMessage(''), 2000); // Hide after 3 seconds
    }
     

    ////////////////////////////////////////////////////////////////////////
    
  };

  return (
    <div className='add-food-item-page'>
      <div className='restaurant-header'>
          <h2>{restaurant.name}</h2>
      </div>
      
      <h1 className='add-food-item-header'>Add Food Item</h1>
      
      { (
        <form className="food-item-form">
          <label htmlFor="item">Item Name:</label>
          <input type="text" id="item" name="item" value={foodformData.item} onChange={handleChange} required />

          <label htmlFor="rest_name">Restaurant Name:</label>
          <input type="text" id="rest_name" name="rest_name" value={foodformData.rest_name} onChange={handleChange} required />

          <label htmlFor="price">Price:</label>
          <input type="text" id="price" name="price" value={foodformData.price} onChange={handleChange} required />

          <label htmlFor="description">Description:</label>
          <input type="text" id="description" name="description" value={foodformData.description} onChange={handleChange} required />

          <label htmlFor="image">Upload Image:</label>
          <input type="file" id="image" name="image" onChange={handleChange} required />

          <label htmlFor="category">Category:</label>
          <input type="text" id="category" name="category" value={foodformData.category} onChange={handleChange} required />

          <button type="submit" onClick={handleSubmit}>Add</button>
        </form>
      )}

      {showPopup && (
        <div className="popup">
          <p>Please fill up all fields.</p>
          <button onClick={() => setShowPopup(false)}>OK</button>
        </div>
      )}

      
      
      {imgUrls && <RestaurantHeader slides={imgUrls}/>}
      <ExploreMenu menu_category={menu_category} set_category={set_category} />
      <CategorizedDisplay menu_category={menu_category} restaurant_id={rest_Id}/>


      {successMessage && <div className="success-message">{successMessage}</div>}
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </div>
  );
}

export default AddFoodItem;
