import React, { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import './ReviewPage.css';
import FoodRating from '../../components/FoodRating/FoodRating';
import axios from 'axios';
import { StoreContext } from '../../context/StoreContext';
import ReviewContainer from '../../components/ReviewContainer/ReviewContainer';
import LoginPopup from '../../components/LoginPopup/LoginPopup';
import { useEffect } from 'react';


const ReviewPage = () => {
  const { item, restId } = useParams();
  const [reviewText, setReviewText] = useState('');
  const { ratings } = useContext(StoreContext);
  const [userId,setUserId]=useState(null);
  

  console.log("item "+item);
  console.log("restIdpppppppppp000000"+restId);

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  /* console.log("item "+item);
  console.log("restId "+restId); */

  


 /*  useEffect(() => {
    if (token !== null) {
      // Fetch userId from backend when token is not null
      const fetchUserId = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/api/user/${token}`);
          setUserId(response.data);
          console.log("response......data"+ response.data);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };

      fetchUserId();
    }
  }, [token]);  */
  

  const handleSubmitReview = async (e) => {
    e.preventDefault();

    /* if(token === null){ */

    // Check if review text is empty
    if (reviewText.trim() === '') {
      setErrorMessage('Review text cannot be empty.');
      setTimeout(() => setErrorMessage(''), 2000); // Hide after 2 seconds
      return;
    }
    let token = await localStorage.getItem('token')
    if(token != null) {
      token = JSON.parse(token)
    }
    console.log("token "+token);


      

      try {
        const response = await axios.get(`http://localhost:8080/api/user/${token}`);
        setUserId(response.data)
        console.log("response.data"+response.data)
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
      //review_id, item, rating, rest_id, review, time, user_id

    try {

      const formData = {
        user_id: userId,
        restId: restId,
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
      {/* {token === null && <LoginPopup setShowLogin={() => {}} />} */}
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
