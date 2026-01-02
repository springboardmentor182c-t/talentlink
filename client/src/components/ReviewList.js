import React, { useEffect, useState } from 'react';
import { API } from '../api';
import ReactStars from 'react-rating-stars-component';

function ReviewList() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    API.get('/reviews').then((res) => setReviews(res.data)).catch(console.error);
  }, []);

  const handleDelete = async (id) => {
    await API.delete(`/reviews/${id}`);
    setReviews(reviews.filter(r => r._id !== id));
  };

  const handleEdit = async (review) => {
    const newComment = prompt('Edit comment:', review.comment);
    if (!newComment) return;
    const updated = await API.put(`/reviews/${review._id}`, { comment: newComment });
    setReviews(reviews.map(r => r._id === updated.data._id ? updated.data : r));
  };

  return (
    <div>
      <h3>All Reviews</h3>
      {reviews.map(r => (
        <div className="card" key={r._id}>
          <b>{r.name}</b>
          <ReactStars count={5} value={r.rating} edit={false} size={20} />
          <p>{r.comment}</p>
          <button onClick={() => handleEdit(r)}>Edit</button>
          <button onClick={() => handleDelete(r._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default ReviewList;
