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
      <Link to='/'><img src={assets.Tasty_logo2} alt="" className="logo" /></Link>
      <ul className='navbar-menu'>
        <Link to='/' onClick ={()=>setMenu("home")} className={menu==="home"?"active":""}>home</Link>{/* 
        <a href='#explore-menu' onClick ={()=>setMenu("menu")} className={menu==="menu"?"active":""}>menu</a>
        <a href='#app-download' onClick ={()=>setMenu("mobile-app")} className={menu==="mobile-app"?"active":""}>mobile-app</a> */}
        <Link to='/cart' onClick ={()=>setMenu("cart")} className={menu==="cart"?"active":""}>cart</Link>
        <a href='#footer' onClick ={()=>setMenu("contact-us")} className={menu==="contact-us"?"active":""}>contact us</a>
        </ul>
        <div className="navbar-right">
                <Link to='/cart'><img src={assets.basket_icon} alt="" /></Link>
                <div className="dot"></div>   
                <button onClick={()=>setShowLogin(true)}>Sign in</button>
        </div>
    </div>
    </nav>
  )
}

export default Navbar
