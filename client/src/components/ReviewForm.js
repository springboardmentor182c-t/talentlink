import React, { useState } from "react";
import StarRating from "./StarRating";

const ratingText = {
  1: "Poor",
  2: "Fair",
  3: "Good",
  4: "Very Good",
  5: "Excellent",
};

const ReviewForm = ({ addReview }) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!rating || !review) return;

    addReview({
      rating,
      review,
      time: new Date().toLocaleString(),
    });

    setRating(0);
    setReview("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <StarRating rating={rating} setRating={setRating} />

      {rating > 0 && (
        <p style={{ fontWeight: "bold", color: "#555", marginTop: "5px" }}>
          {ratingText[rating]}
        </p>
      )}

      <textarea
        placeholder="Write your review..."
        value={review}
        onChange={(e) =>
          e.target.value.length <= 200 && setReview(e.target.value)
        }
        rows={4}
        style={{
          width: "100%",
          marginTop: "10px",
          padding: "10px",
          borderRadius: "8px",
          border: "1px solid #ccc",
        }}
      />

      <p style={{ textAlign: "right", fontSize: "12px" }}>
        {review.length}/200
      </p>

      <button
        type="submit"
        disabled={!rating || !review}
        style={{
          padding: "10px 20px",
          backgroundColor: rating ? "#4CAF50" : "#ccc",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: rating ? "pointer" : "not-allowed",
        }}
      >
        Submit Review
      </button>
    </form>
  );
};

export default ReviewForm;
