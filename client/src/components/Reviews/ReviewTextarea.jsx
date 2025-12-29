// src/components/Reviews/ReviewTextarea.jsx
import React from 'react';

const ReviewTextarea = ({ 
  value, 
  onChange, 
  placeholder, 
  disabled = false,
  minLength = 20,
  maxLength = 500 
}) => {
  const characterCount = value.length;
  const isValid = characterCount >= minLength;
  const showMinWarning = characterCount > 0 && characterCount < minLength;

  return (
    <div>
      <label className="block text-gray-700 font-semibold mb-2">
        Written Review <span className="text-red-500">*</span>
      </label>
      
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        maxLength={maxLength}
        className={`w-full border rounded-lg p-3 h-32 transition-all focus:outline-none ${
          disabled 
            ? 'bg-gray-50 text-gray-600 cursor-not-allowed border-gray-200' 
            : 'bg-white border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent'
        } ${showMinWarning ? 'border-red-300' : ''}`}
      />
      
      <div className="flex justify-between items-center mt-2">
        <div className="text-sm">
          {showMinWarning && (
            <span className="text-red-500 font-medium">
              Minimum {minLength} characters required
            </span>
          )}
          {isValid && (
            <span className="text-green-600 font-medium">
              ✓ Valid review length
            </span>
          )}
        </div>
        
        <span className={`text-sm ${
          characterCount >= maxLength 
            ? 'text-red-500 font-semibold' 
            : characterCount >= maxLength * 0.9 
            ? 'text-orange-500' 
            : 'text-gray-500'
        }`}>
          {characterCount}/{maxLength}
        </span>
      </div>
      
      {disabled && (
        <p className="text-sm text-gray-500 mt-2 italic">
          ⚠️ Reviews cannot be edited after the editing period expires
        </p>
      )}
    </div>
  );
};

export default ReviewTextarea;