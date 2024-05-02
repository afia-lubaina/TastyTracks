import React from 'react'
import { menu_list } from '../../assets/assets/assets';
import './ExploreMenu.css';


const ExploreMenu = ({menu_category,set_category}) => {
  return (
      <div className="explore-menu" id='explore-menu'>
      <h1>Explore Menu</h1>
      <p className='explore-menu-text'>Explore a delightful array of menus categorized to suit your taste preferences.</p>
      <div><hr /></div>
      <div className="explore-menu-list">
        {menu_list.map((item, index) => {
          return (
            <div onClick={() => set_category(prev => prev === item.menu_name ? "All" : item.menu_name)} className="explore-menu-item">
              <img className={menu_category === item.menu_name ? "active" : ""} src={item.menu_image} alt="" />
              <p>{item.menu_name}</p>
            </div>
            
        )})}
      </div>
      <div><hr /></div>
    </div>
  )
}

export default ExploreMenu
