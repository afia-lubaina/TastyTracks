import React from 'react';
import './ReservationForm.css';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import ResForm from './ResForm';
import { useState } from 'react';



const ReservationForm = () => {

    const [selectedDate, setSelectedDate] = useState(null);
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="reservation-container">
        <h1 className="reservation-title">Reservation</h1>
        <div className="reservation-grid">
          <form className="reservation-form">
            <div className="reservation-input">
              <label className="reservation-label" htmlFor="numberOfPeople">Number of People</label>
              <input className="reservation-input-field" id="numberOfPeople" type="number" name="numberOfPeople" required autoFocus />
            </div>
            <div className="reservation-input">
              <label className="reservation-label" htmlFor="date">Date</label>
               <input className="reservation-input-field" id="date" type="date" name="date" required />
          </div>
            <div className="reservation-input">
              <label className="reservation-label" htmlFor="time">Time</label>
              <input className="reservation-input-field" id="time" type="time" name="time" required />
            </div>
            <button type="submit" className="reservation-submit-button">Book Table</button>
          </form>
          <aside className="reservation-personal">
            <form className="reservation-input">
              <div>
                <label className="reservation-label" htmlFor="name">Name</label>
                <input className="reservation-input-field" id="name" type="text" name="name" required />
              </div>
              <div className="reservation-input">
                <label className="reservation-label" htmlFor="email">Email</label>
                <input className="reservation-input-field" id="email" type="email" name="email" required />
              </div>
            </form>
            <div className="reservation-instructions">
              <h2 className="reservation-instructions-title">Instructions</h2>
              <ul className="reservation-instructions-list">
                <li className="reservation-instruction-item">Please provide the number of people and select the date and time for your reservation.</li>
                <li className="reservation-instruction-item">All reservations are subject to availability.</li>
                <li className="reservation-instruction-item">Only one reservation is eligible for a person a day.</li>
              </ul>
            </div>
          </aside>
          <aside className="reservation-pic">
            <div className="reservation-image"></div>
          </aside>
        </div>
      </div>
    </LocalizationProvider>
  );
};

export default ReservationForm;
