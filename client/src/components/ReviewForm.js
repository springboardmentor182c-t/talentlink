import React, { useState } from 'react';
import { API } from '../api';
import ReactStars from 'react-rating-stars-component';

function ReviewForm() {
  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const submitReview = async (e) => {
    e.preventDefault();
    try {
      await API.post('/reviews', { name, rating, comment });
      setName('');
      setRating(5);
      setComment('');
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert('Error submitting review');
    }
  };

  return (
    <form className="card" onSubmit={submitReview}>
      <h3>Add Review</h3>
      <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
      <ReactStars count={5} value={rating} size={24} onChange={setRating} activeColor="#ffd700" />
      <textarea placeholder="Comment" value={comment} onChange={(e) => setComment(e.target.value)} />
      <button type="submit">Submit</button>
    </form>
  );
}

export default ReviewForm;
