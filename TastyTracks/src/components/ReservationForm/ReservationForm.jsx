import React from 'react';
import './ReservationForm.css';
import { useParams } from 'react-router-dom'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import ResForm from './ResForm';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';




const ReservationForm = () => {


 /*  const [rest_Id, setRest_Id] = useState(null); */

 const { restaurant_id } = useParams();

  const [ReservationFormData, setReservationFormData] = useState({
    userId:'1',
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
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setReservationFormData({
        ...ReservationFormData,
        image: files[0]
      });
    } else {
      setReservationFormData({
        ...ReservationFormData,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if any field is empty
    /* if (Object.values(ReservationFormData).some(value => value === '' || value === null)) {
      setErrorMessage('Please fill up all fields.');
      setTimeout(() => setErrorMessage(''), 2000);
      return;
    } */

    try {
      const formData = new FormData();
      formData.append('name', ReservationFormData.name);
      formData.append('email', ReservationFormData.email);
      formData.append('no_of_people', ReservationFormData.no_of_people);
      formData.append('date', ReservationFormData.date);
      formData.append('time', ReservationFormData.time);
      formData.append('userId', 1);
      formData.append('restId',1);

      formData.forEach((value, key) => {
        console.log(`${key}: ${value}`);
      });



      const response = await axios.post('http://localhost:8080/api/reservation/save', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });


      setSuccessMessage('Restaurant added successfully.');
      setTimeout(() => setSuccessMessage(''), 2000);

      // Reset form fields
      setReservationFormData({
        userId:'1',
        restId: restaurant_id,
        name: '',
        email: '',
        no_of_people: '',
        date: '',
        time: ''

      });

      
    } catch (error) {
      console.error('Error adding restaurant:', error);
      setErrorMessage('Error adding restaurant. Please try again.');
      setTimeout(() => setErrorMessage(''), 2000); 
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
    <input className="reservation-input-field" id="no_of_people" type="number" name="no_of_people" value={ReservationFormData.no_of_people} onChange={handleChange} required autoFocus />
  </div>
  <div className="reservation-input">
    <label className="reservation-label" htmlFor="date">Date</label>
    <input className="reservation-input-field" id="date" type="date" value={ReservationFormData.date} onChange={handleChange} name="date" required />
  </div>
  <div className="reservation-input">
    <label className="reservation-label" htmlFor="time">Time</label>
    <input className="reservation-input-field" id="time" type="time" name="time" value={ReservationFormData.time} onChange={handleChange} required />
  </div>
  <div>
    <label className="reservation-label" htmlFor="name">Name</label>
    <input className="reservation-input-field" id="name" type="text" name="name" value={ReservationFormData.name} onChange={handleChange} required />
  </div>
  <div className="reservation-input">
    <label className="reservation-label" htmlFor="email">Email</label>
    <input className="reservation-input-field" id="email" type="email" name="email" value={ReservationFormData.email} onChange={handleChange} required />
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


        {successMessage && <div className="success-message">{successMessage}</div>}
        {errorMessage && <div className="error-message">{errorMessage}</div>}
      </div>
  );
};

export default ReservationForm;
