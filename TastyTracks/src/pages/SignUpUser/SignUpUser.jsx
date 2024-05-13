import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './SignUpUser.css';

const SignUpUser = () => {
  const navigate = useNavigate();/* 
  const [rest_Id, setRest_Id] = useState(null); */

  //user_id, acc_created, address, email, first_name, gender, img_url, last_name, password, phone

  const [UserFormData, setUserFormData] = useState({
    acc_created:'',
    address:'',
    email:'',
    first_name:'',
    gender:'',
    image:null,
    last_name:'',
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
      setUserFormData({
        ...UserFormData,
        image: files[0]
      });
    } else {
      setUserFormData({
        ...UserFormData,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // // Check if any field is empty
    // if (Object.values(UserFormData).some(value => value === '' || value === null)) {
    //   setErrorMessage('Please fill up all fields.');
    //   setTimeout(() => setErrorMessage(''), 2000);
    //   return;
    // }


    //user_id, acc_created, address, email, first_name, gender, img_url, last_name, password, phone
    try {
      const formData = new FormData();
      formData.append('acc_created', UserFormData.acc_created);
      formData.append('address', UserFormData.address);
      formData.append('email', UserFormData.email);
      formData.append('first_name', UserFormData.first_name);
      formData.append('gender', UserFormData.gender);
      formData.append('image',UserFormData.image);
      formData.append('last_name', UserFormData.last_name);
      formData.append('password', UserFormData.password);
      formData.append('phone', UserFormData.phone);
      
      formData.forEach((value, key) => {
        console.log(`${key}: ${value}`);
      });


      const response = await axios.post('http://localhost:8080/api/user/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      /* 
      setRest_Id(response.data); */
      localStorage.setItem('token', response.data);
      console.log("response.data",response.data)
      console.log(localStorage.getItem('token'))
      //window.location.href = '/login-rest-owner'

      setSuccessMessage('Restaurant added successfully.');
      setTimeout(() => setSuccessMessage(''), 2000);
      setSuccess_stat(true);

      // Reset form fields
      setUserFormData({
        acc_created:'',
        address:'',
        email:'',
        first_name:'',
        gender:'',
        image:null,
        last_name:'',
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
      navigate('/login-user');
    }
  }, [success_stat,navigate]);

  return (

    <div className='sign-up-user'>
    <div className='sign-up-user-header'>
      <h2>Sign Up as User</h2>
    </div>
    <form className="sign-up-form" onSubmit={handleSubmit}>
      <label htmlFor="first_name">First Name:</label>
      <input type="text" id="first_name" name="first_name" value={UserFormData.first_name} onChange={handleChange} required />

      <label htmlFor="last_name">Last Name:</label>
      <input type="text" id="last_name" name="last_name" value={UserFormData.last_name} onChange={handleChange} required />

      <label htmlFor="email">Email:</label>
      <input type="email" id="email" name="email" value={UserFormData.email} onChange={handleChange} required />

      <label htmlFor="password">Password:</label>
      <input type="password" id="password" name="password" value={UserFormData.password} onChange={handleChange} required />

      <label htmlFor="gender">Gender:</label>
      <select id="gender" name="gender" value={UserFormData.gender} onChange={handleChange} required>
        <option value="">Select Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>

      <label htmlFor="address">Address:</label>
      <input type="text" id="address" name="address" value={UserFormData.address} onChange={handleChange} required />

      <label htmlFor="phone">Phone:</label>
      <input type="text" id="phone" name="phone" value={UserFormData.phone} onChange={handleChange} required />

      <label htmlFor="acc_created">Account Created:</label>
      <input type="date" id="acc_created" name="acc_created" value={UserFormData.acc_created} onChange={handleChange} required />

      <label htmlFor="image">Upload Image:</label>
      <input type="file" id="image" name="image" onChange={handleChange} required />

      <button type="submit">Sign Up</button>
    </form>


      {successMessage && <div className="success-message">{successMessage}</div>}
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </div>
  );
}

export default SignUpUser;
