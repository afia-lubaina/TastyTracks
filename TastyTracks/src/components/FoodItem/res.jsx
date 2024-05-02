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
