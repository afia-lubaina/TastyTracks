import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets/assets'
import { Link } from 'react-router-dom'


const Footer = () => {
  return (
   <footer className="footer-container">
       <div className='footer' id='footer'>
      <div className='footer-content'>
        <div className='footer-content-left'>
            <img src={assets.Tasty_logo2} alt='' />
            <p>The purpose of the TastyTracks: Food Discovery and Delivery Application is to provide users with a convenient and enjoyable platform for discovering, exploring, and ordering food from a variety of restaurants. This system aims to streamline the process of finding restaurants, browsing menus, placing orders, and booking tables, enhancing the overall dining experience for both customers and restaurant owners.</p>
            <div className='footer-social-icons'>
                <img src={assets.facebook_icon} alt='' />
                <img src={assets.twitter_icon} alt='' />
                <img src={assets.linkedin_icon} alt='' />
             </div>
        </div>
        <div className='footer-content-center'>
            <h2>COMPANY</h2>
            <ul>
                <li>Home</li>
                <li>About</li>
                <li>Services</li>
                <li>Projects</li>
            </ul>
        </div>
        <div className='footer-content-right'>
            <h2>GET IN TOUCH</h2>
            <ul>
                <li>+880175778345</li>
                <li>contact@TastyTracks.com</li>
            <Link to='/add-food-item'>
            <li className='add-food-item'>Add Food Item</li>
          </Link>
          <Link to='/add-restaurant-item'>
            <li className='add-restaurant-item'>Add Restaurants</li>
          </Link>
            </ul>
            
        </div>
        </div>
        <hr/>
        <p className="footer-copyright">Copyright 2024 © TastyTracks.com- All Right Reserved.</p> 
    </div>
    </footer>
  )
}

export default Footer
