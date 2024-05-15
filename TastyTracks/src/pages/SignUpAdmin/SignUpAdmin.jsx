import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './SignUpAdmin.css';

const SignUpAdmin = () => {
  const navigate = useNavigate();/* 
  const [rest_Id, setRest_Id] = useState(null); */

  //user_id, acc_created, address, email, firstName, gender, image, lastName, password, phone

  const [AdminFormData, setAdminFormData] = useState({
    
    address:'',
    email:'',
    firstName:'',
    gender:'',
    image:null,
    lastName:'',
    password:'',
    phone:''
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [success_stat, setSuccess_stat] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setAdminFormData({
        ...AdminFormData,
        image: files[0]
      });
    } else {
      setAdminFormData({
        ...AdminFormData,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // // Check if any field is empty
    // if (Object.values(AdminFormData).some(value => value === '' || value === null)) {
    //   setErrorMessage('Please fill up all fields.');
    //   setTimeout(() => setErrorMessage(''), 2000);
    //   return;
    // }


    //user_id, acc_created, address, email, firstName, gender, image, lastName, password, phone
    try {
      const formData = new FormData();
      formData.append('address', AdminFormData.address);
      formData.append('email', AdminFormData.email);
      formData.append('firstName', AdminFormData.firstName);
      formData.append('gender', AdminFormData.gender);
      formData.append('image',AdminFormData.image);
      formData.append('lastName', AdminFormData.lastName);
      formData.append('password', AdminFormData.password);
      formData.append('phone', AdminFormData.phone);
      
      formData.forEach((value, key) => {
        console.log(`${key}: ${value}`);
      });


      const response = await axios.post('http://localhost:8080/api/admin/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      /* 
      setRest_Id(response.data); */
      localStorage.setItem('token',response.data);
      localStorage.setItem('user','admin');
      console.log("response.data",response.data)
      console.log(localStorage.getItem('token'))
      //window.location.href = '/login-rest-owner'

      setSuccessMessage('Restaurant added successfully.');
      setTimeout(() => setSuccessMessage(''), 2000);
      setSuccess_stat(true);

      // Reset form fields
      setAdminFormData({
        
        address:'',
        email:'',
        firstName:'',
        gender:'',
        image:null,
        lastName:'',
        password:'',
        phone:''
        });

      
    } catch (error) {
      console.error('Error adding restaurant:', error);
      setErrorMessage('Error adding restaurant. Please try again.');
      setTimeout(() => setErrorMessage(''), 2000); 
    }
  };

  useEffect(() => {
    if (success_stat) {/* 
      navigate(`/add-food-item/${rest_Id}`); */
      navigate('/login-admin');
    }
  }, [success_stat,navigate]);

  return (

    <div className='sign-up-user'>
    <div className='sign-up-user-header'>
      <h2>Sign Up as Admin</h2>
    </div>
    <form className="sign-up-form" onSubmit={handleSubmit}>
      <label htmlFor="firstName">First Name:</label>
      <input type="text" id="firstName" name="firstName" value={AdminFormData.firstName} onChange={handleChange} required />

      <label htmlFor="lastName">Last Name:</label>
      <input type="text" id="lastName" name="lastName" value={AdminFormData.lastName} onChange={handleChange} required />

      <label htmlFor="email">Email:</label>
      <input type="email" id="email" name="email" value={AdminFormData.email} onChange={handleChange} required />

      <label htmlFor="password">Password:</label>
      <input type="password" id="password" name="password" value={AdminFormData.password} onChange={handleChange} required />

      <label htmlFor="gender">Gender:</label>
      <select id="gender" name="gender" value={AdminFormData.gender} onChange={handleChange} required>
        <option value="">Select Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>

      <label htmlFor="address">Address:</label>
      <input type="text" id="address" name="address" value={AdminFormData.address} onChange={handleChange} required />

      <label htmlFor="phone">Phone:</label>
      <input type="text" id="phone" name="phone" value={AdminFormData.phone} onChange={handleChange} required />


      <label htmlFor="image">Upload image:</label>
      <input type="file" id="image" name="image" onChange={handleChange} required />

      <button type="submit">Sign Up</button>
    </form>


      {successMessage && <div className="success-message">{successMessage}</div>}
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </div>
  );
}

export default SignUpAdmin;
