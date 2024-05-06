import React, { useState } from 'react';
import axios from 'axios';
import './LoginPopup.css';
import { assets } from '../../assets/assets/assets';

const LoginPopup = ({ setShowLogin }) => {
    const [currState, setCurrState] = useState('Sign Up');
    const [formData,setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        img_url: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (currState === 'Sign Up') {
              var response=   await axios.post('http://localhost:8080/api/user/register', formData);
              console.log(response);
                // Handle sign up success
            } else {
                await axios.post('your_login_api_endpoint', formData);
                // Handle login success
            }
        } catch (error) {
            console.error('Error:', error);
            // Handle error
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <div className='login-popup'>
            <form className='login-popup-container' onSubmit={handleSubmit}>
                <div className='login-popup-title'>
                    <h2 style={{ color: 'rgb(225, 74, 99)' }}>{currState}</h2>
                    <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt='' />
                </div>
                <div className='login-popup-inputs'>
                    {currState === 'Login' ? null : (
                        <input type='text' placeholder='First Name' name='firstName' value={formData.firstName} onChange={handleChange} required />
                    )}
                    {currState === 'Login' ? null : (
                        <input type='text' placeholder='Last Name' name='lastName' value={formData.lastName} onChange={handleChange} required />
                    )}
                    <input type='text' placeholder='Email' name='email' value={formData.email} onChange={handleChange} required />
                    <input type='text' placeholder='Phone' name='phone' value={formData.phone} onChange={handleChange} required />
                    <input type='password' placeholder='Password' name='password' value={formData.password} onChange={handleChange} required />
                    <input type='text' placeholder='Image URL' name='img_url' value={formData.img_url} onChange={handleChange} required />
                </div>
                <button type='submit'>{currState === 'Sign Up' ? 'Create Account' : 'Login'}</button>
                <div className='login-popup-condition'>
                    <input type='checkbox' required />
                    <p>I agree to the terms and conditions</p>
                </div>
                {currState === 'Login' ? (
                    <p>
                        Create a new account? <span onClick={() => setCurrState('Sign Up')}>Click here</span>
                    </p>
                ) : (
                    <p>
                        Already have an account? <span onClick={() => setCurrState('Login')}>Login here</span>
                    </p>
                )}
            </form>
        </div>
    );
};

export default LoginPopup;
