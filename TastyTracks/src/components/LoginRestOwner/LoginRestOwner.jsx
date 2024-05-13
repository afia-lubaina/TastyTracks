import React, { useState } from 'react';
import axios from 'axios';
import './LoginRestOwner.css'; // Import CSS file

const LoginRestOwner = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/api/restaurant/login', { email, password });
      console.log("response daa"+response.data);
      console.log(response.data);
      // Store the token in local storage
      localStorage.setItem('token', JSON.stringify(response.data));

      console.log(localStorage.getItem('token'));
      /* const token = JSON.parse(localStorage.getItem("token"));
      console.log("token:", token); */
      // Optionally, you can store the user data as well
      //localStorage.setItem('user', JSON.stringify(response.data.user));
    } catch (error) {
      setErrorMessage('Invalid email or password. Please try again.');
    }
  };

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
