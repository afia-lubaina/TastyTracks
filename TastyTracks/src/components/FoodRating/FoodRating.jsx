import React, { useContext } from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import { StoreContext } from '../../context/StoreContext';
import { useState } from 'react';


export default function FoodRating({ itemId}) {
  const { ratings, updateRating } = useContext(StoreContext); // Access the ratings and updateRating function from the StoreContext
  const [value, setValue] = useState(0);

  const handleRatingChange = (event, newValue) => {
    updateRating(itemId, newValue); // Update the rating for the specific itemId
    setValue(newValue);
    console.log("your newValue is " +  newValue)
  };

  return (
    <Box>
      <Rating
        name={`rating-${itemId}`}
        value={ratings[itemId]} // Set the initial value based on the stored rating for the item
        onChange={handleRatingChange}
      />
    </Box>
  );
}
