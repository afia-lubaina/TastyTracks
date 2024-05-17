import React, { useEffect } from 'react'
import './OrderItem.css'
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';


const OrderItem = () => {

   const [orderList,setOrder_list]=useState([]);
   // const [rest_id,setRestId]=useState(1);

  
   const { restId } = useParams();


    console.log("rest_id "+ restId);
  

 
  

  useEffect(() => {// Set restId based on
    
    window.scrollTo(0, 0);
    const fetchOrders = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/api/order/get/${restId}`);
          setOrder_list(response.data);
          console.log("Get order list "+ response.data);
    
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      fetchOrders();
  },[restId]);


  const handleStatusUpdate = (event) => {
    // Change the button text to "Completed"
    event.target.innerText = 'Completed';
    // Disable the button after click
    event.target.disabled = true;
  };

  


    return (
        <div>
        {orderList.length > 0 ? (
          orderList.map((order,index) => (
            console.log("order item "+order.foodItem),
            <div className='order' key={index}>
              <div className='order-items'>
                <img src={`http://localhost:8080/api/food/image/${order.foodItem}/${restId}`} alt={order.item} />
                <div className='order-grid-items'>
                  <div className='order-grid-item'>
                    <p className='item-caption'>Item:</p>
                    <p>{order.foodItem}</p>
                  </div>
                  <div className='order-grid-item'>
                    <p className='item-caption'>Order Time: </p>
                    <p>{order.orderTime}</p>
                  </div>
                  <div className='order-grid-item'>
                    <p className='item-caption'>Delivery Time:</p>
                    <p>{order.deliveryTime}</p>
                  </div>
                    
                    <div className='order-grid-item'>
                        <p className='item-caption'>Address:</p>
                        <p>house no 37,road no 11, garrison, dhaka cantonment.</p>
                    </div>
                    <div className="order-grid-item">
                    <p className='item-caption'>Payment Status:</p>
                     <button onClick={handleStatusUpdate}>Pending</button>
                     </div>

                </div>
              </div>
            </div>
          ))
        ) : (
            <div className='reservation-not-found'>
            <p>No Orders found.</p>
            </div>
          )}
        </div>
    );
}

export default OrderItem
