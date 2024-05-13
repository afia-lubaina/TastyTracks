import React, { useContext } from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import { StoreContext } from '../../context/StoreContext';
import { useState } from 'react';

export default function FoodRating({ restId, item }) {
  const { ratings, updateRating } = useContext(StoreContext); // Access the ratings and updateRating function from the StoreContext
  const [value, setValue] = useState(ratings[`${restId}_${item}`]); // Initialize the value with the stored rating

  const handleRatingChange = (event, newValue) => {
    updateRating(restId, item, newValue); // Update the rating for the specific itemId
    setValue(newValue);
    console.log("your newValue is " +  newValue)
  };

  return (
    <Box>
      <Rating
        name={`rating-${restId}-${item}`} // Adjust the name attribute for uniqueness
        value={value ??0} // Use the local state value for Rating component
        onChange={handleRatingChange}
      />
    </Box>
  );
}
