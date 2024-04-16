import React from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets/assets'
import { useState } from 'react'



const LoginPopup = ({setShowLogin}) => {

    const [currState, setCurrState] = useState('Sign Up')
  return (
    <div className='login-popup'>
        <form className='login-popup-container' >
            <div className='login-popup-title'>
              <h2 style={{ color: 'rgb(225, 74, 99)' }}>{currState}</h2>
                <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" />
            </div>
            <div className='login-popup-inputs'>
                {currState==="Login"?<></>:<input type="text" placeholder='Name' required/>}
                <input type="text" placeholder='Email' required/>
                <input type="password" placeholder='Password' required/>
            </div>
            <button>{currState==="Sign Up"?"Create Account ": "Login"}</button>
            <div className='login-popup-condition'>
                <input type="checkbox" required/>
                <p>I agree to the terms and conditions</p>
            </div>{
            currState==="Login"?
            <p>Create a new account? <span onClick={()=>setCurrState("Sign Up")}>Click here</span></p>:
            <p>Already have an account? <span onClick={()=>setCurrState("Login")}>Login here</span></p>}
            

        </form>
    </div>
  )
}

export default LoginPopup
