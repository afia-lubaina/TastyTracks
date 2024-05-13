import React, { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import './ReviewPage.css';
import FoodRating from '../../components/FoodRating/FoodRating';
import axios from 'axios';
import { StoreContext } from '../../context/StoreContext';
import ReviewContainer from '../../components/ReviewContainer/ReviewContainer';

const ReviewPage = () => {
  const { item, restId } = useParams();
  const [reviewText, setReviewText] = useState('');
  const { ratings } = useContext(StoreContext);

  console.log("item "+item);
  console.log("restIdpppppppppp000000"+restId);

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  /* console.log("item "+item);
  console.log("restId "+restId); */

  const token =localStorage.getItem('token')
  console.log("token "+token);
  

  const handleSubmitReview = async (e) => {
    e.preventDefault();

    // Check if review text is empty
    if (reviewText.trim() === '') {
      setErrorMessage('Review text cannot be empty.');
      setTimeout(() => setErrorMessage(''), 2000); // Hide after 2 seconds
      return;
    }

      //review_id, item, rating, rest_id, review, time, user_id

    try {

      const formData = {
        user_id: 1,
        restId: 1,
        item: item, 
        review: reviewText,
        rating: 3,
        time: new Date().toISOString()
      };/* 
      console.log("your rating is " + ratings)
      console.log("your review is " + reviewText) */

      console.log("Form Data:", formData);


      
      const response = await axios.post('http://localhost:8080/api/review/save', formData, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      console.log("your response is " + response)

   
      setSuccessMessage('Review added successfully.');
      setTimeout(() => setSuccessMessage(''), 2000); 

      // Reset review text
      setReviewText('');
    } catch (error) {
      console.error('Error adding review:', error);
      setErrorMessage('Error adding review. Please try again.');
      setTimeout(() => setErrorMessage(''), 2000); // Hide after 2 seconds
    }
  };

  return (
    <div className='review-page'>
      <div className='review-img-write'>
        <img className="review-food-item-image" src={`http://localhost:8080/api/food/image/${item}/${restId}`} alt="" />
        <div className='write-review'>
          <h2 className='write-review-header'>Write a Review, help someone find good food.</h2>
          <h2 className='rate-header'>Rate out of 5</h2>
          <FoodRating restId={restId} item={item} />
          <div className='review-container'>
            <textarea
              className='review-input'
              placeholder='Write a review...'
              maxLength='500' // Limit the review to 500 characters
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
            />
            <button className='submit-review-button' onClick={handleSubmitReview}>Submit Review</button>
          </div>
          {/* Display word count */}
        </div>
      </div>
      <ReviewContainer item={item} restId={restId} />
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}
    </div>
  );
};

export default ReviewPage;
