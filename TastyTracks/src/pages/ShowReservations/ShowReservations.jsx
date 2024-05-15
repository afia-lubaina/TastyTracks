import React from 'react'
import './ShowReservations.css'
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';



const ShowReservations = () => {

    const [reservationList,setreservation_list]=useState([]);
  const { restId } = useParams();


  console.log("rest_id "+ restId);
  
  useEffect(() => {// Set restId based on
    
    window.scrollTo(0, 0);
    const fetchreservations = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/api/reservation/get/${restId}`);
          setreservation_list(response.data);
          console.log("Get reservation list "+ response.data);
    
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      fetchreservations();
  },[restId]);
  return (
    <div>
      <div className='reservation-header'>
      <h2>Reservations</h2>
      </div>
      {reservationList.length > 0 ? (
        reservationList.map((reservation, index) => (
          <div className='reservation' key={index}>
            <div className='reservation-items'>
              <div className='reservation-grid-items'>
                <div className='reservation-grid-item'>
                  <p className='item-caption'>Reservation Id:</p>
                  <p>{reservation.reservationId}</p>
                </div>
                <div className='reservation-grid-item'>
                  <p className='item-caption'>Name of Customer: </p>
                  <p>{reservation.name}</p>
                </div>
                <div className='reservation-grid-item'>
                  <p className='item-caption'>email: </p>
                  <p>{reservation.email}</p>
                </div>
                <div className='reservation-grid-item'>
                  <p className='item-caption'>reservation Time: </p>
                  <p>{reservation.time}</p>
                </div>
                <div className='reservation-grid-item'>
                  <p className='item-caption'>Number of People:</p>
                  <p>{reservation.no_of_people}</p>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className='reservation-not-found'>
        <p>No reservations found.</p>
        </div>
      )}
    </div>
  );
       
}

export default ShowReservations
