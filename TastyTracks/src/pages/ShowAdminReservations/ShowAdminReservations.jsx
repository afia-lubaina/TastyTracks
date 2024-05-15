import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ShowAdminReservations.css';

const ShowAdminReservations = () => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/reservation/getAll');
        setReservations(response.data);
      } catch (error) {
        console.error('Error fetching reservations:', error);
      }
    };

    fetchReservations();
  }, []);

  return (
    <div className='show-admin-reservation-page'>
      <h1>Admin Reservations</h1>
      <div className='show-admin-reservation-container'>
        {reservations.map(reservation => (
          <div key={reservation.id} className='show-admin-reservation-card'>
            <p>User ID: {reservation.userId}</p>
            <p>Restaurant ID: {reservation.restId}</p>
            <p>Name: {reservation.name}</p>
            <p>Email: {reservation.email}</p>
            <p>No. of People: {reservation.no_of_people}</p>
            <p>Date: {reservation.date}</p>
            <p>Time: {reservation.time}</p>
            <button>Remove Reservation</button>
            {/* Add more details as needed */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowAdminReservations;
