import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

const StarRating = ({ rating, setRating }) => {
  const [hover, setHover] = useState(0);

  return (
    <div style={{ display: "flex", gap: "6px" }}>
      {[...Array(5)].map((_, index) => {
        const value = index + 1;
        return (
          <FaStar
            key={index}
            size={32}
            style={{ cursor: "pointer", transition: "0.2s" }}
            color={value <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
            onMouseEnter={() => setHover(value)}
            onMouseLeave={() => setHover(0)}
            onClick={() => setRating(value)}
          />
        );
      })}
    </div>
  );
};

export default StarRating;
