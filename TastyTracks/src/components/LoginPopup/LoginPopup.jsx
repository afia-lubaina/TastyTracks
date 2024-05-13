import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './LoginPopup.css';
import { assets } from '../../assets/assets/assets';
import { useNavigate } from 'react-router-dom';




const LoginPopup = ({ setShowLogin }) => {

   
    const navigate = useNavigate();
    const [step, setStep] = useState('select'); // Step state to manage different steps
    const [the_user, set_theuser]= useState(null);
    const [loginOption, setLoginOption] = useState(null); 
    const [rest_stat,setRest_stat]=useState(false); //  option state
    const [signinOption, setSigninOption] = useState(null); //  option state
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        img_url: '',
        restaurantName: '',
        restaurantLocation: ''
    });


    // useEffect(() => {
    //     if (rest_stat && step !== 'signup_as_user'){
    //       navigate('/add-restaurant-item');
    //       setShowLogin(false);

    //     }
    //   }, [rest_stat, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Handle form submission based on the current step and login option
        if (step === 'login') {
            try {
                if (the_user === 'user') {
                    // Handle user login
                } else if (the_user === 'restaurant_owner') {
                    // Handle restaurant owner login
                }
            } catch (error) {
                console.error('Error:', error);
                // Handle error
            }
        } else if (step === 'signup') {
            try {
                if (the_user==='restaurant_owner'){/* 
                    navigate('/add-restaurant-item'); */

                }
            } catch (error) {
                console.error('Error:', error);
                // Handle error
            }
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Function to handle selecting login option
    const handleLoginOption = (option) => {
        if(option == 'restaurant_owner') {
            setStep('login_as_restaurant_owner')
            setShowLogin(false);
            navigate('/login-rest-owner');
            
        }
        else {
            setShowLogin(false);
            setStep('login_as_user')
            navigate('/login-user');
        }
        set_theuser(option); // Move to login/sign up as user or restaurant owner step
        console.log("option "+option);
        
    };

    const handleSignupOption = (option) => {

        if(option==='restaurant_owner'){
            
            setShowLogin(false);
            setStep('signup_as_restaurant_owner'); // Move to signup step
            navigate('/add-restaurant-item');
        }
        else if(option==='user'){
            setStep('signup_as_user'); // Move to signup step
            navigate('/signup-user');
            console.log("inside"); // Move to login/sign up as user or restaurant owner step
            console.log("option "+option);
            console.log("step "+step);
            set_theuser(option);
        } 
        console.log("option "+option);
    };/* 

    localStorage.setItem("token", JSON.stringify(response))   // after getting response from : /login
    localStorage.getItem("token", JSON.parse("token"))  // add it to the header when sending request to the backend */


    return (
        <div className='login-popup'>
            {step === 'select' && (
                <div className='login-popup-container'>
                    <div className='login-popup-title'>
                        <h2 style={{ color: 'rgb(225, 74, 99)' }}>Choose Action</h2>
                        <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt='' />
                    </div>
                    <button onClick={() => setStep('login')}>Login</button>
                    <button onClick={() => setStep('signup')}>Sign Up</button>
                </div>
            )}
            {(step === 'login' ) && (
                <div className='login-popup-container'>
                    <div className='login-popup-title'>
                        
                    <img className='back-icon' onClick={() => setStep('select')} src={assets.back} alt='' />
                        <h2 style={{ color: 'rgb(225, 74, 99)' }}>Login</h2>
                        <img onClick={() =>  setShowLogin(false)} src={assets.cross_icon} alt='' />
                    </div>
                    <button onClick={() => handleLoginOption('user')}>Login as User</button>
                    <button onClick={() => handleLoginOption('restaurant_owner')}>Login as Restaurant Owner</button>
                </div>
            )}
            {(step === 'signup') && (
                <div className='login-popup-container'>
                    <div className='login-popup-title'>
                        
                    <img className='back-icon' onClick={() => setStep('select')} src={assets.back} alt='' />
                        <h2 style={{ color: 'rgb(225, 74, 99)' }}>SignUp</h2>
                        <img onClick={() =>  setShowLogin(false)} src={assets.cross_icon} alt='' />
                    </div>
                    <button onClick={() => handleSignupOption('user')}>SignUp as User</button>
                    <button onClick={() => handleSignupOption('restaurant_owner')}>SignUp as Restaurant Owner</button>
                </div>
            )}
            {(step==='login_as_user') && (
                console.log(step),
                <form className='login-popup-container' onSubmit={handleSubmit}>
                <div className='login-popup-title'>
                        
                <img className='back-icon' onClick={() => setStep('login')} src={assets.back} alt='' />
                        <h2 style={{ color: 'rgb(225, 74, 99)' }}>Login</h2>
                        <img onClick={() =>  setShowLogin(false)} src={assets.cross_icon} alt='' />
                 </div>
                
                <div className='login-popup-inputs'>
                    <input type='text' placeholder='Email' name='email' value={formData.email} onChange={handleChange} required />
                    <input type='password' placeholder='Password' name='password' value={formData.password} onChange={handleChange} required />
                </div>
                <button type='submit'>Login as User</button>
            </form>)
            }
            {(step==='login_as_restaurant_owner') && (
                console.log(step),
                <form className='login-popup-container' onSubmit={handleSubmit}>
                <div className='login-popup-title'>
                        
                <img className='back-icon' onClick={() => setStep('login')} src={assets.back} alt='' />
                        <h2 style={{ color: 'rgb(225, 74, 99)' }}>Login</h2>
                        <img onClick={() =>  setShowLogin(false)} src={assets.cross_icon} alt='' />
                 </div>
                
                <div className='login-popup-inputs'>
                    <input type='text' placeholder='Email' name='email' value={formData.email} onChange={handleChange} required />
                    <input type='password' placeholder='Password' name='password' value={formData.password} onChange={handleChange} required />
                </div>
                <button type='submit'>Login as Restaurant Owner</button>
            </form>)
            }
            {(step==='signup_as_user') && (
                console.log(step),
                <form className='login-popup-container' onSubmit={handleSubmit}>
                <div className='login-popup-title'>
                        
                         <img className='back-icon' onClick={() => setStep('signup')} src={assets.back} alt='' />        
                        <h2 style={{ color: 'rgb(225, 74, 99)' }}>Signup</h2>
                        <img onClick={() =>  setShowLogin(false)} src={assets.cross_icon} alt='' />
                 </div>
                <div className='login-popup-inputs'>
                    <input type='text' placeholder='Email' name='email' value={formData.email} onChange={handleChange} required />
                    <input type='password' placeholder='Password' name='password' value={formData.password} onChange={handleChange} required />
                </div>
                <button type='submit'>SignUp as {the_user==='user'?'User':'Restaurant Owner'}</button>
            </form>)
            }
        </div>
    );
};

export default LoginPopup;
