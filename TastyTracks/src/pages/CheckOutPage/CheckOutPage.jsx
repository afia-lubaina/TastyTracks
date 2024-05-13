import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './CheckOutPage.css';
import axios from 'axios';

const CheckOutPage = () => {
  const { item, restId, quantity } = useParams();
  console.log('item:', item);
  console.log('restId:', restId);
  console.log('quantity:', quantity);
  const [foodItem, setFoodItem] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8080/api/food/get/${item}/${restId}`)
      .then(response => {
        setFoodItem(response.data);
        console.log('Item details fetched successfully:', response.data);
      })
      .catch(error => {
        console.error('Error fetching item details:', error);
      });
  }, [item, restId]);

  if (!foodItem) {
    return <div>Loading...</div>;
  }

  // Calculate delivery time
  const orderTime = new Date();
  const deliveryTime = new Date(orderTime);
  deliveryTime.setDate(deliveryTime.getDate() + 1); // Adding 1 day

  // Calculate total price
  const totalPrice = foodItem.price * quantity;

  // Format date and time using toLocaleString
  const formattedOrderTime = orderTime.toLocaleString('en-US', { dateStyle: 'short', timeStyle: 'short' });
  const formattedDeliveryTime = deliveryTime.toLocaleString('en-US', { dateStyle: 'short', timeStyle: 'short' });


  const formData = new FormData();









  
  return (
    <div className='checkout'>
      <div className='checkout-items'>
        <img src={`http://localhost:8080/api/food/image/${item}/${restId}`} alt={foodItem.item} /> 
        <div className='order-grid-items'>
          <div className='order-grid-item'>
            <p className='item-caption'>Item:</p>
            <p>{item}</p>
          </div>
          <div className='order-grid-item'>
            <p className='item-caption'>Price: </p>
            <p>{foodItem.price}</p>
          </div>
          <div className='order-grid-item'>
            <p className='item-caption'>Quantity:</p>
            <p> {quantity}</p>
          </div>
          <div className='order-grid-item'>
            <p className='item-caption'>Total: </p>
            <p>{totalPrice}</p>
          </div>
          <div className='order-grid-item'>
            <p className='item-caption'>Order Time: </p>
            <p>{formattedOrderTime}</p>
          </div>
          <div className='order-grid-item'>
            <p className='item-caption'>Delivery Time:</p>
            <p> {formattedDeliveryTime}</p>
          </div>
          <div className='order-grid-item'>
            <p className='item-caption'>Delivery Address:</p>
            <p>1234 Elm Street, Springfield, IL 62701</p>
          </div>
          <div className='order-grid-item'>
            <p className='item-caption'>Delivery Status:</p>
            <p>Pending.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOutPage;
