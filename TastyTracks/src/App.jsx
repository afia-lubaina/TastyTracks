import React from 'react'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import LoginPopup from './components/LoginPopup/LoginPopup'
import { useState } from 'react'
import Footer from './components/Footer/Footer'
import LocationPage from './pages/LocationPage/LocationPage'
import Restaurant from './pages/Restaurant/Restaurant'
import { StoreContext } from './context/StoreContext'
import { useContext } from 'react'
import AddFoodItem from './pages/AddFoodItem/AddFoodItem'
import AddRestaurantItem from './pages/AddRestaurantItem/AddRestaurantItem'
import ReviewPage from './pages/ReviewPage/ReviewPage'
import CheckOutPage from './pages/CheckOutPage/CheckOutPage'
import LoginUser from './pages/LoginUser/LoginUser'
import LoginRestOwner from './components/LoginRestOwner/LoginRestOwner'
import SignUpUser from './pages/SignUpUser/SignUpUser'



const App = () => {
  const [showLogin, setShowLogin] = useState(false)
  const { ratings, updateRating } = useContext(StoreContext);

  return (
    <>
    {showLogin?<LoginPopup setShowLogin={setShowLogin}/>:<></>}
    <div className='App'>
      <Navbar setShowLogin={setShowLogin}/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/cart' element={<Cart/>} />
        <Route path='/order' element={<PlaceOrder/>} />
        <Route path='/location/:location_name' element={<LocationPage/>} />
        <Route path='/restaurant/:restaurant_id' element={<Restaurant/>} />
        <Route path='/add-food-item/:rest_Id' element={<AddFoodItem/>} />
        <Route path='/add-restaurant-item' element={<AddRestaurantItem/>}/>
        <Route path='/api/review/get/:item/:restId' element={<ReviewPage/>} />
        <Route path='/checkout/:item/:restId/:quantity' element={<CheckOutPage/>} />
        <Route path='/login-user' element={<LoginUser/>} />
        <Route path='login-rest-owner' element={<LoginRestOwner/>} />
        <Route path='signup-user' element={<SignUpUser/>} />
      </Routes>
    </div>
    <Footer/>
    </>

  )
}

export default App
