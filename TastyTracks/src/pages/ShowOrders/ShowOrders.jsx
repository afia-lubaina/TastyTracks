import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ShowOrders.css'; // Import the CSS file

const ShowOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/order/getAll');
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

/* 
  private long orderId;
  private String foodItem;
  private long restId;
  private long userId;
  private LocalDateTime orderTime;
  private LocalDateTime deliveryTime;
  private String paymentStatus;
 */
  return (
    <div className='order-page'>
      <h1>Orders</h1>
      <div className="order-container">
        {orders.map(order => (
          <div key={order.id} className="order-card">
            <h2>{order.orderId}</h2>
            <p>User ID: {order.orderId}</p>
            <p>Order Date: {order.orderTime}</p>
            <p>Order Status: {order.paymentStatus}</p>
            <p>Delivery Date: {order.deliveryTime}</p>
            <p>Item: {order.foodItem}</p>
            <button>Remove Order</button>
            {/* Add more details as needed */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowOrders;
