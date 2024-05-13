import React, { useState } from 'react'
import './Home.css'
import Header from '../../components/Header/Header'
import ExploreLocation from '../../components/ExploreLocation/ExploreLocation'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
import Footer from '../../components/Footer/Footer'

const Home = () => {

  

  const [category,setCategory]=useState("All");
  return (
    <div className='home-container'>
      <Header />
      <ExploreLocation category={category} setCategory={setCategory} />
      <FoodDisplay/>
    </div>
  )
}

export default Home
