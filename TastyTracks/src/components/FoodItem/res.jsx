import { Stack } from "@mui/material";
import React from "react";
import { DatePicker } from "@mui/x-date-pickers";
import { useState } from "react";
import './ResForm.css'
import { TextField } from "@mui/material";


const ResForm = () => {

    const [selectedDate, setSelectedDate] = useState(null);
    console.log(selectedDate);
  return (
    <Stack spacing={4} sx={{width:'30rem'}} >
        <DatePicker 
            Label="Date Picker"
            renderInput={(params) => <TextField {...params} />}
            value={selectedDate}
            onChange={(newValue) => setSelectedDate(newValue)}
            className="custom-date-picker"
            
             slotProps={{ textField: { size: '20px' } }}
        />
      
    </Stack>
  )
}

export default ResForm


{/* {!cartItems[rest_id] ? (
          <img className="add" onClick={() => addToCart(rest_id)} src={assets.add_icon_white} alt="" />
        ) : (
          <div className="food-item-counter">
            <img onClick={() => removeFromCart(rest_id)} src={assets.remove_icon_red} alt="" />
            <p>{cartItems[rest_id]}</p>
            <img onClick={() => addToCart(rest_id)} src={assets.add_icon_green} alt="" />
          </div>
        )} */}