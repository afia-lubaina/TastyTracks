import React from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets/assets';
import { useState } from 'react';
import { Link } from 'react-router-dom';


const Navbar = ({setShowLogin}) => {

  const [menu, setMenu] = useState("home")

  return (
    <nav className='Navbar'>
      <div className='navbar-content'>
      <img src={assets.Tasty_logo2} alt="" className="logo" />
      <ul className='navbar-menu'>
        <li onClick ={()=>setMenu("home")} className={menu==="home"?"active":""}>home</li>
        <li onClick ={()=>setMenu("menu")} className={menu==="menu"?"active":""}>menu</li>
        <li onClick ={()=>setMenu("mobile-app")} className={menu==="mobile-app"?"active":""}>mobile-app</li>
        <li onClick ={()=>setMenu("contact-us")} className={menu==="contact-us"?"active":""}>contact us</li>
        </ul>
        <div className="navbar-right">
           <img src={assets.search_icon} alt="" />
           <div className="navbar-search-icon">
                <img src={assets.basket_icon} alt="" />
                <div className="dot"></div>    
           </div>
           <button onClick={()=>setShowLogin(true)}>Sign in</button>
        </div>
    </div>
    </nav>
  )
}

export default Navbar
