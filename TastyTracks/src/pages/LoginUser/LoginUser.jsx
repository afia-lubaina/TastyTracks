import React, { useState } from 'react';
import axios from 'axios';
import './LoginUser.css'; // Import CSS file

const LoginUser = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/login', { email, password });

      // Store the token in local storage
      localStorage.setItem('token', JSON.stringify(response.data.token));
      localStorage.setItem('user', JSON.stringify(response.data.user));

      window.location.href = '/';
    } catch (error) {
      // Handle login error
      setErrorMessage('Invalid email or password. Please try again.');
    }
  };

  return (
    <div className="login-page">
        <div className="login-header">
             <h2>Login</h2>
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

export default LoginUser;
