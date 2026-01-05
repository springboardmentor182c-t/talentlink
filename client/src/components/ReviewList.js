import React, { useEffect, useState } from 'react';
import { API } from '../api';
import ReactStars from 'react-rating-stars-component';

function ReviewList() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    API.get('/reviews')
      .then((res) => setReviews(res.data))
      .catch(console.error);
  }, []);

  return (
    <div>
      <h3>All Reviews</h3>
      {reviews.map(r => (
        <div className="card" key={r.id}>
          <b>{r.name}</b>
          <ReactStars count={5} value={r.rating} edit={false} size={20} />
          <p>{r.comment}</p>
        </div>
      ))}
    </div>
  );
}

export default ReviewList;
