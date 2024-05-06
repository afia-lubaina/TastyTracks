import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AddRestaurantItem.css';

const AddRestaurantItem = () => {
  const [restaurantFormData, setRestaurantFormData] = useState({
    name: '',
    email: '',
    image: null,
    password: '',
    address: '',
    description: '',
    phone: ''
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setRestaurantFormData({
        ...restaurantFormData,
        image: files[0]
      });
    } else {
      setRestaurantFormData({
        ...restaurantFormData,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if any field is empty
    if (Object.values(restaurantFormData).some(value => value === '' || value === null)) {
      setErrorMessage('Please fill up all fields.');
      setTimeout(() => setErrorMessage(''), 2000);
      return;
    }

    try {
      const formData = new FormData();
      formData.append('name', restaurantFormData.name);
      formData.append('email', restaurantFormData.email);
      formData.append('image', restaurantFormData.image);
      formData.append('password', restaurantFormData.password);
      formData.append('address', restaurantFormData.address);
      formData.append('description', restaurantFormData.description);
      formData.append('phone', restaurantFormData.phone);

      const response = await axios.post('http://localhost:8080/api/restaurant/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log("restaurant response " + response);

      setSuccessMessage('Restaurant added successfully.');
      setTimeout(() => setSuccessMessage(''), 2000);

      // Reset form fields
      setRestaurantFormData({
        name: '',
        email: '',
        image: null,
        password: '',
        address: '',
        description: '',
        phone: ''
      });
    } catch (error) {
      console.error('Error adding restaurant:', error);
      setErrorMessage('Error adding restaurant. Please try again.');
    }
  };

  return (
    <div className='add-restaurant-item-page'>
      <form className="restaurant-item-form">
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" value={restaurantFormData.name} onChange={handleChange} required />

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" value={restaurantFormData.email} onChange={handleChange} required />

        <label htmlFor="image">Upload Image:</label>
        <input type="file" id="image" name="image" onChange={handleChange} required />

        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" value={restaurantFormData.password} onChange={handleChange} required />

        <label htmlFor="address">Address:</label>
        <input type="text" id="address" name="address" value={restaurantFormData.address} onChange={handleChange} required />

        <label htmlFor="description">Description:</label>
        <input type="text" id="description" name="description" value={restaurantFormData.description} onChange={handleChange} required />

        <label htmlFor="phone">Phone:</label>
        <input type="text" id="phone" name="phone" value={restaurantFormData.phone} onChange={handleChange} required />

        <button type="submit" onClick={handleSubmit}>Add Restaurant</button>
      </form>
      {successMessage && <div className="success-message">{successMessage}</div>}
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </div>
  );
}

export default AddRestaurantItem;
