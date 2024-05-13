import React from 'react'
import  { useContext } from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import { StoreContext } from '../../context/StoreContext';
import { useState } from 'react';

const StaticRating = ({restId,item}) => {
   const { ratings} = useContext(StoreContext);
   const ratingKey = `${restId}_${item}`;
   const ratingValue = ratings[ratingKey] ?? 0;
   return (
    <Box>
      <Rating
        name={`rating-${restId}-${item}`} // Adjust the name attribute for uniqueness
        value={ratingValue} 
      />
    </Box>
  );
}

export default StaticRating
