import React, { useState } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets/assets';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ConfirmationPopup from '../ConfirmationPopup/ConfirmationPopup';
import { useEffect } from 'react';


const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const [userId, setUserId] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false); // State to control confirmation popup

  useEffect(() => {
    const fetchUserId = async () => {
      let token = await localStorage.getItem('token');
      let userType = await localStorage.getItem('user');
      console.log("Inside Navbar User Type:", userType);
      if (token !== null && userType !== null) {
     
          token = JSON.parse(token);
        try {
          let apiUrl;
          // Determine the API endpoint based on the user type
          if (userType === 'admin') {
            apiUrl = `http://localhost:8080/api/admin/${token}`;
          } else if (userType === 'restaurant') {
            apiUrl = `http://localhost:8080/api/restaurant/${token}`;
          } else {
            apiUrl = `http://localhost:8080/api/user/${token}`;
          }
          
          console.log("API URL:", apiUrl);
          // Fetch user data based on the determined API endpoint
          const response = await axios.get(apiUrl);
          setUserId(response.data);
          console.log("User ID:", response.data);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };
  
    fetchUserId();
  }, []);
  

  const handleLogout = () => {
    // Display confirmation popup
    setShowConfirmation(true);
  };

  const handleConfirmLogout = () => {
    // Remove user token from localStorage
    localStorage.setItem('token', null);
    localStorage.setItem('user', undefined);
    window.location.href = '/';
    setUserId(null);
    console.log("Logged Out User ID:", userId);
    // Hide confirmation popup
    setShowConfirmation(false);
  };

  const handleCancelLogout = () => {
    // Hide confirmation popup
    setShowConfirmation(false);
  };

  return (
    <nav className='Navbar'>
      <div className='navbar-content'>
        <Link to='/'><img src={assets.Tasty_logo2} alt="" className="logo" /></Link>
        <ul className='navbar-menu'>
          <Link to='/' onClick ={()=>setMenu("home")} className={menu==="home"?"active":""}>home</Link>
          <Link to='/cart' onClick ={()=>setMenu("cart")} className={menu==="cart"?"active":""}>cart</Link>
          <a href='#footer' onClick ={()=>setMenu("contact-us")} className={menu==="contact-us"?"active":""}>contact us</a>
        </ul>
        <div className="navbar-right">
          <Link to='/cart'><img src={assets.basket_icon} alt="" /></Link>
          <div className="dot"></div>
          {userId !== null ? (
            // If userId is not null, show logout button
            <button onClick={handleLogout}>Logout</button>
          ) : (
            // If userId is null, show sign in button
            <button onClick={() => setShowLogin(true)}>Sign in</button>
          )}
        </div>
      </div>
      {showConfirmation && (
        <ConfirmationPopup 
          onConfirm={handleConfirmLogout} 
          onCancel={handleCancelLogout} 
        />
      )}
    </nav>
  )
}

export default Navbar;
