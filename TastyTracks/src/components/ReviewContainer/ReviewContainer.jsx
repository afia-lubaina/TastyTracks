import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ReviewContainer.css';

const ReviewContainer = ({ item, restId }) => {
  const [reviews, setReviews] = useState([]);
  console.log("item00000000 "+item);
  console.log("restId0000000 "+restId);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/review/get/${item}/${restId}`);
        setReviews(response.data);
        console.log(response.data);
      } catch (error) {/* 
        localStorage.setItem("token","1233");
        localStorage.getItem("token"); */
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, [item, restId]);

  return (
    <div className="review-container-contents">
      <div className="review-container-header">
        <h2>Reviews</h2>
        </div>
      <div className="posted-review-container">
      {reviews.length === 0 ? (
        <p>No reviews available</p>
      ) : (
        <ul>
          {reviews.map(review => (
            <li key={review.review_id}>
              <p>Rating: {review.rating}</p>
              <p>Review: {review.review}</p>
              <p>User ID: {review.user_id}</p>
              <p>Time: {review.time}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
    </div>
  );
};

export default ReviewContainer;


/* private long orderId;
private String foodItem;
private long restId;
private long userId;
private LocalDateTime orderTime;
private LocalDateTime deliveryTime;
private String paymentStatus; */