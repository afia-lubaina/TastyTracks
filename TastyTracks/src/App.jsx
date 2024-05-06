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
        <Route path='/add-food-item' element={<AddFoodItem/>} />
        <Route path='/add-restaurant-item' element={<AddRestaurantItem/>}/>
        
      </Routes>
    </div>
    <Footer/>
    </>

  )
}

export default App
