import React, { useState } from 'react';
import axios from 'axios';
import './LoginRestOwner.css'; // Import CSS file
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const LoginRestOwner = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [success_stat, setSuccess_stat] = useState(false);
  
  const [restId, setRestId] = useState(null);


/*   useEffect(() => {
    const fetchUserId = async () => {
      let token = await localStorage.getItem('token');
      console.log("tomom"+token)
      if (token !== null) {
        token = JSON.parse(token);
        console.log("token--"+token)
        try {
          const response = await axios.get(`http://localhost:8080/api/restaurant/${token}`);
          setRestId(response.data);
          console.log("User ID:", response.data);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    fetchUserId();
  }, []);  */

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/api/restaurant/login', { email, password });
      console.log("inside rest owner token:"+response.data);
      localStorage.setItem('token', JSON.stringify(response.data));
      
      console.log("user"+localStorage.getItem('user'));
      console.log("token"+localStorage.getItem('token'));
      setSuccessMessage('Please wait');
      setTimeout(() => setSuccessMessage(''), 2000);
    } catch (error) {
      setErrorMessage('Invalid email or password. Please try again.');
    }


    let token = await localStorage.getItem('token');
      console.log("tomom"+token)
      if (token !== null) {
        token = JSON.parse(token);
        console.log("token--"+token)
        try {
          const response = await axios.get(`http://localhost:8080/api/restaurant/${token}`);
          setRestId(response.data);
          setSuccess_stat(true);
          console.log("User ID:", response.data);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }

      }




  };

  useEffect(() => {
    if (success_stat) {
      navigate(`/add-food-item/${restId}`);
    }
  }, [success_stat, restId, navigate]);

  return (
    <div className="login-rest-owner">
      <div className="login-rest-owner-header">
             <h2>Login as Restaurant Owner</h2>
        </div>
      <form onSubmit={handleSubmit} className="login-form-rest-owner">
        <div>
          <label htmlFor="email">Email:</label>
          <input 
            type="email" 
            id="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input 
            type="password" 
            id="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        <button type="submit" className="login-button-rest-owner">Login</button>
      </form>
      {errorMessage && <div className="error-message-rest-owner">{errorMessage}</div>}
    </div>
  );
};

export default LoginRestOwner;
