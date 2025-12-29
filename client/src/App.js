import React, { useEffect, useState } from "react";
import ReviewForm from "./components/ReviewForm";
import ReviewList from "./components/ReviewList";

function App() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("reviews"));
    if (stored) setReviews(stored);
  }, []);

  const addReview = (review) => {
    const updated = [review, ...reviews];
    setReviews(updated);
    localStorage.setItem("reviews", JSON.stringify(updated));
  };

  return (
    <div style={{ width: "500px", margin: "40px auto", fontFamily: "Arial" }}>
      <h2 style={{ textAlign: "center" }}>Review & Rating System</h2>
      <ReviewForm addReview={addReview} />
      <ReviewList reviews={reviews} setReviews={setReviews} />
    </div>
  );
}

export default App;
