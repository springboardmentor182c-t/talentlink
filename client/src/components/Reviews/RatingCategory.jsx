// src/components/Reviews/RatingCategory.jsx
import React from 'react';
import StarRating from './StarRating';

const RatingCategory = ({ 
  icon: Icon, 
  label, 
  value, 
  onChange, 
  disabled = false,
  required = false 
}) => {
  return (
    <div className="mb-5 pb-5 border-b border-gray-100 last:border-b-0">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-2">
          {Icon && <Icon size={20} className="text-indigo-600" />}
          <span className={`font-medium ${disabled ? 'text-gray-500' : 'text-gray-700'}`}>
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </span>
        </div>
      </div>
      
      <StarRating 
        value={value} 
        onChange={onChange} 
        disabled={disabled}
        size={28}
      />
    </div>
  );
};

export default RatingCategory;