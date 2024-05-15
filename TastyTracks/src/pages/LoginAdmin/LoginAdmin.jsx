import React, { useState } from 'react';
import axios from 'axios';
import './LoginAdmin.css'; // Import CSS file

const LoginAdmin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    window.scrollTo(0, 0);
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/api/admin/login', { email, password });

      console.log("response daa"+response.data);
      console.log(response.data);
      // Store the token in local storage
      localStorage.setItem('token', JSON.stringify(response.data));
      console.log(localStorage.getItem('token'));
      console.log(localStorage.getItem('user'));

     // window.location.href = '/admin-page';
    } catch (error) {
      // Handle login error
      setErrorMessage('Invalid email or password. Please try again.');
    }
  };

  return (
    <div className="login-page">
        <div className="login-header">
             <h2>Login as Admin</h2>
        </div>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input 
            type="email" 
            id="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input 
            type="password" 
            id="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        <button type="submit" className="submit-button">Login</button>
      </form>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </div>
  );
};

export default LoginAdmin;
