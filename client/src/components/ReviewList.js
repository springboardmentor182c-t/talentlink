import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

const ReviewList = ({ reviews, setReviews }) => {
  const [sortType, setSortType] = useState("latest");

  if (reviews.length === 0)
    return <p style={{ fontStyle: "italic" }}>No reviews yet.</p>;

  const sortedReviews = [...reviews].sort((a, b) => {
    if (sortType === "highest") return b.rating - a.rating;
    if (sortType === "lowest") return a.rating - b.rating;
    return 0;
  });

  const avgRating =
    reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;

  const deleteReview = (index) => {
    if (!window.confirm("Delete this review?")) return;
    const newReviews = reviews.filter((_, i) => i !== index);
    setReviews(newReviews);
    localStorage.setItem("reviews", JSON.stringify(newReviews));
  };

  const countStars = (star) =>
    reviews.filter((r) => r.rating === star).length;

  return (
    <div>
      {/* Average */}
      <h3>Average Rating: {avgRating.toFixed(1)} / 5</h3>

      {/* Distribution */}
      {[5, 4, 3, 2, 1].map((s) => (
        <p key={s}>
          {s} ⭐ : {countStars(s)}
        </p>
      ))}

      {/* Sort */}
      <select
        onChange={(e) => setSortType(e.target.value)}
        style={{ margin: "10px 0" }}
      >
        <option value="latest">Latest</option>
        <option value="highest">Highest Rating</option>
        <option value="lowest">Lowest Rating</option>
      </select>

      {/* Reviews */}
      {sortedReviews.map((rev, index) => (
        <div
          key={index}
          style={{
            background: "#f9f9f9",
            padding: "10px",
            borderRadius: "8px",
            marginBottom: "10px",
          }}
        >
          <div>
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                color={i < rev.rating ? "#ffc107" : "#e4e5e9"}
              />
            ))}
          </div>

          <p>{rev.review}</p>
          <p style={{ fontSize: "12px", color: "#777" }}>{rev.time}</p>

          <button
            onClick={() => deleteReview(index)}
            style={{
              background: "#ff4d4d",
              color: "white",
              border: "none",
              padding: "5px 10px",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default ReviewList;
