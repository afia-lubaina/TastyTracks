import React, { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './ReviewPage.css';
import FoodRating from '../../components/FoodRating/FoodRating';
import axios from 'axios';
import { StoreContext } from '../../context/StoreContext';
import ReviewContainer from '../../components/ReviewContainer/ReviewContainer';
import LoginPopup from '../../components/LoginPopup/LoginPopup';

const ReviewPage = () => {
  const { item, restId } = useParams();
  const { ratings } = useContext(StoreContext);
  const [reviewText, setReviewText] = useState('');
  const [userId, setUserId] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [userType, setUserType] = useState(null);

  useEffect(() => {
    const fetchUserId = async () => {
      window.scrollTo(0, 0);
      let token = await localStorage.getItem('token');
      let userType = await localStorage.getItem('user');
      console.log("Inside Review Page User Type:", userType);
      setUserType(userType);
      if (token !== null) {
        token = JSON.parse(token);
        try {
          const response = await axios.get(`http://localhost:8080/api/user/${token}`);
          setUserId(response.data);
          console.log("User ID:", response.data);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    fetchUserId();
  }, []); // Empty dependency array ensures this effect runs only once on component mount

  const handleSubmitReview = async (e) => {
    e.preventDefault();

    if(userType !=='user'){
        setErrorMessage('Please login to add a review.');
        setTimeout(() => setErrorMessage(''), 3000); // Hide after 2 seconds
        console.log("error message"+errorMessage)
        return;
    }
    else{

    // Check if review text is empty
    if (reviewText.trim() === '') {
      setErrorMessage('Review text cannot be empty.');
      setTimeout(() => setErrorMessage(''), 3000); // Hide after 2 seconds
      return;
    }

    try {
      const formData = {
        user_id: userId,
        restId: restId,
        item: item,
        review: reviewText,
        rating: 3,
        time: new Date().toISOString()
      };

      const response = await axios.post('http://localhost:8080/api/review/save', formData, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      console.log("Response:", response);
      setSuccessMessage('Review added successfully.');
      setTimeout(() => setSuccessMessage(''), 3000); 

      // Reset review text
      setReviewText('');
    } catch (error) {
      console.error('Error adding review:', error);
      setErrorMessage('Error adding review. Please try again.');
      setTimeout(() => setErrorMessage(''), 3000); // Hide after 2 seconds
    }
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
       
            {errorMessage && <div className="review-error-message">{errorMessage}</div>}
            {successMessage && <div className="review-success-message">{successMessage}</div>}
          </div>
        </div>
      </div>
      <ReviewContainer item={item} restId={restId} />
      
    </div>
  );
};

export default ReviewPage;
