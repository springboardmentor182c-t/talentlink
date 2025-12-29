// src/components/Reviews/StarRating.jsx
import React, { useState } from 'react';
import { Star } from 'lucide-react';

const StarRating = ({ 
  value, 
  onChange, 
  size = 32, 
  disabled = false,
  showLabel = true 
}) => {
  const [hover, setHover] = useState(0);
  const texts = ['Poor', 'Below Average', 'Good', 'Very Good', 'Excellent'];

  return (
    <div className="flex items-center gap-3">
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            disabled={disabled}
            onMouseEnter={() => !disabled && setHover(star)}
            onMouseLeave={() => !disabled && setHover(0)}
            onClick={() => !disabled && onChange(star)}
            className={`transition-transform ${
              disabled ? 'cursor-not-allowed' : 'hover:scale-110 cursor-pointer'
            }`}
          >
            <Star
              size={size}
              className={`${
                star <= (hover || value)
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'text-gray-300'
              } transition-colors ${disabled ? 'opacity-60' : ''}`}
            />
          </button>
        ))}
      </div>
      
      {showLabel && (
        <span className={`text-sm font-semibold min-w-[120px] ${
          disabled ? 'text-gray-400' : 'text-indigo-600'
        }`}>
          {hover > 0 ? texts[hover - 1] : value > 0 ? texts[value - 1] : 'Not rated'}
        </span>
      )}
    </div>
  );
};

export default StarRating;