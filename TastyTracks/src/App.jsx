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


const App = () => {
  const [showLogin, setShowLogin] = useState(false)

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
      </Routes>
    </div>
    <Footer/>
    </>

  )
}

export default App
