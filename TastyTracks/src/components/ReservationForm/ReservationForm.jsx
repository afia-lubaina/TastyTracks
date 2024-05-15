import React, { useState, useEffect } from 'react';
import './ReservationForm.css';
import { useParams } from 'react-router-dom';
import { StoreContext } from "../../context/StoreContext";
import { useContext } from 'react';
import axios from 'axios';

const ReservationForm = () => {
  const { restaurant_id } = useParams();
  const [userId, setUserId] = useState(null);
  
  const { userType } = useContext(StoreContext); 
  console.log("User Type: inside reservation", userType);
  const [reservationFormData, setReservationFormData] = useState({
    userId: '1',
    restId: restaurant_id,
    name: '',
    email: '',
    no_of_people: '',
    date: '',
    time: ''
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchUserId = async () => {
      try {
        let token = await localStorage.getItem('token');
        if (token !== null) {
          token = JSON.parse(token);
          const response = await axios.get(`http://localhost:8080/api/user/${token}`);
          setUserId(response.data);
          console.log("User ID:", response.data);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserId();
  }, []); // Empty dependency array ensures this effect runs only once on component mount

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReservationFormData({
      ...reservationFormData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(userType !== 'user') {
      setErrorMessage('Please login to make a reservation.');
      setTimeout(() => setErrorMessage(''), 3000);
    }else{

    try {
      const formData = {
        userId: userId,
        restId: restaurant_id,
        name: reservationFormData.name,
        email: reservationFormData.email,
        no_of_people: reservationFormData.no_of_people,
        date: reservationFormData.date,
        time: reservationFormData.time
      };

      console.log(formData);

      const response = await axios.post('http://localhost:8080/api/reservation/save', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log("Response data:", response.data);

      setSuccessMessage('Reservation added successfully.');
      setTimeout(() => setSuccessMessage(''), 2000);

      // Reset form fields
      setReservationFormData({
        userId: '1',
        restId: restaurant_id,
        name: '',
        email: '',
        no_of_people: '',
        date: '',
        time: ''
      });
    } catch (error) {
      console.error('Error adding reservation:', error);
      setErrorMessage('Error adding reservation. Please try again.');
      setTimeout(() => setErrorMessage(''), 2000);
    }
  }
  };

  return (
    <div className="reservation-page">
      <div className='reservation-container'>
        <div className="reservation-header">
          <h2>Reservation</h2>
        </div>
        <form className="reservation-form" onSubmit={handleSubmit}>
          <div className="reservation-input">
            <label className="reservation-label" htmlFor="no_of_people">Number of People</label>
            <input className="reservation-input-field" id="no_of_people" type="number" name="no_of_people" value={reservationFormData.no_of_people} onChange={handleChange} required autoFocus />
          </div>
          <div className="reservation-input">
            <label className="reservation-label" htmlFor="date">Date</label>
            <input className="reservation-input-field" id="date" type="date" value={reservationFormData.date} onChange={handleChange} name="date" required />
          </div>
          <div className="reservation-input">
            <label className="reservation-label" htmlFor="time">Time</label>
            <input className="reservation-input-field" id="time" type="time" name="time" value={reservationFormData.time} onChange={handleChange} required />
          </div>
          <div>
            <label className="reservation-label" htmlFor="name">Name</label>
            <input className="reservation-input-field" id="name" type="text" name="name" value={reservationFormData.name} onChange={handleChange} required />
          </div>
          <div className="reservation-input">
            <label className="reservation-label" htmlFor="email">Email</label>
            <input className="reservation-input-field" id="email" type="email" name="email" value={reservationFormData.email} onChange={handleChange} required />
          </div>
          <aside className="reservation-instructions">
            <h2 className="reservation-instructions-title">Instructions</h2>
            <ul className="reservation-instructions-list">
              <li className="reservation-instruction-item">Please provide the number of people and select the date and time for your reservation.</li>
              <li className="reservation-instruction-item">All reservations are subject to availability.</li>
              <li className="reservation-instruction-item">Only one reservation is eligible for a person a day.</li>
            </ul>
          </aside>
          <button type="submit" className="reservation-submit-button">Book Table</button>
        </form>
      </div>
      {successMessage && <div className="reserve-success-message">{successMessage}</div>}
      {errorMessage && <div className="reserve-error-message">{errorMessage}</div>}
    </div>
  );
};

export default ReservationForm;
