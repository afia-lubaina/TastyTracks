import React, { useState } from 'react'; 
import axios from 'axios';
import './AddFoodItem.css';
import { useEffect } from 'react';
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu';
import CategorizedDisplay from '../../components/CategorizedDisplay/CategorizedDisplay';

const AddFoodItem = () => {

  
  const [menu_category,set_category]=useState("All");
  const [showForm, setShowForm] = useState(false);
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

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
      
      // Close the form
      setShowForm(false);
    } catch (error) {
      console.error('Error adding food item:', error);
      // Show error message
      setErrorMessage('Error adding food item. Please try again.');
      setTimeout(() => setErrorMessage(''), 2000); // Hide after 3 seconds
    }
  };

  return (
    <div className='add-food-item-page'>
      {/* Circular button with plus icon */}
      <button className="add-button" onClick={toggleForm}>
        Add Item
      </button>
      
      {showForm && (
        <form className="food-item-form">
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

          <label htmlFor="item">Item:</label>
          <input type="text" id="item" name="item" value={foodformData.item} onChange={handleChange} required />

          <button type="submit" onClick={handleSubmit}>Add</button>
        </form>
      )}

      {showPopup && (
        <div className="popup">
          <p>Please fill up all fields.</p>
          <button onClick={() => setShowPopup(false)}>OK</button>
        </div>
      )}

      
      <ExploreMenu menu_category={menu_category} set_category={set_category} />
      <CategorizedDisplay menu_category={menu_category} className='addcat'/>

      {successMessage && <div className="success-message">{successMessage}</div>}
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </div>
  );
}

export default AddFoodItem;
