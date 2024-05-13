import React, { useContext, useEffect, useState } from 'react';
import './Cart.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cartItems, removeFromCart } = useContext(StoreContext);
  const [foodItems, setFoodItems] = useState([]);
  const [isChecked,setIsChecked] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);
  const [currRestId, setCurrRestId] = useState(null);

  const handleChange = (index,restId) => {
    
    if(currRestId!==null &&
      restId !== currRestId){
      alert("You can only order from one restaurant at a time");
      console.log("Current rest id "+currRestId);
    }
    else{
    setCheckedItems(prevState => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
  }
};

  useEffect(() => {
    axios.get('http://localhost:8080/api/food/all')
      .then(response => {
        setFoodItems(response.data);
        setCheckedItems(response.data.map(() => false));
      })
      .catch(error => {
        console.error('Error fetching food items:', error);
      });
  }, []);

  return (
    <div className='cart'>
      <div className='cart-items'>
        <div className='cart-items-title'>
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
          <p>Add to checkout</p>
        </div>
        <br/>
        <hr/>
        {foodItems.map((item, index) => {
  const cartItemId = `${item.rest_id}_${item.item}`; // Assuming item.id uniquely identifies each item

  if (cartItems[cartItemId] > 0) {
    return (
      <div key={index}>
        <div className='cart-items-title cart-items-item'>
          <img src={"http://localhost:8080/api/food/image/"+item.item+"/"+item.rest_id} alt=""/>
          <p>{item.item}</p>
          <p>{item.price}</p>
          <p>{cartItems[cartItemId]}</p>
          <p>Tk. {item.price * cartItems[cartItemId]}</p>
          <p onClick={() => removeFromCart(cartItemId)} className='cross'>x</p>
          <Link to={`/checkout/${item.item}/${item.rest_id}/1`}>
          <button onClick={() => handleChange(index,item.rest_id)}>Order</button>
          </Link>
        </div>
        <hr/>
      </div>
    );
  }
})}

</div>
      <div className='cart-bottom'>
        <div className="cart-promocode"></div>
          <div>
            <p>If you have a promocode, enter it here.</p>
            <div className='cart-promocode-input'>
              <input type='text' placeholder='Enter Promocode'/>
              <button>Apply</button>
              </div>
          </div>
      </div>
    </div>
  );
}

export default Cart;
