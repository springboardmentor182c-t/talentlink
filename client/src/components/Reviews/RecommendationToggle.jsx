// src/components/Reviews/RecommendationToggle.jsx
import React from 'react';
import { ThumbsUp, ThumbsDown } from 'lucide-react';

const RecommendationToggle = ({ 
  checked, 
  onChange, 
  disabled = false,
  type = 'freelancer' // 'freelancer' or 'client'
}) => {
  const labels = {
    freelancer: {
      question: 'Would you recommend this freelancer to others?',
      yes: 'Yes, I would recommend',
      no: 'Not recommended'
    },
    client: {
      question: 'Would you work with this client again?',
      yes: 'Yes, I would work again',
      no: 'Would not work again'
    }
  };

  const text = labels[type];

  return (
    <div className={`rounded-lg p-5 transition-all ${
      disabled ? 'bg-gray-50 border border-gray-200' : 'bg-indigo-50 border border-indigo-200'
    }`}>
      <label className={`block font-semibold mb-4 ${
        disabled ? 'text-gray-600' : 'text-gray-800'
      }`}>
        {text.question}
      </label>
      
      <div className="flex gap-4">
        <button
          type="button"
          disabled={disabled}
          onClick={() => onChange(true)}
          className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-medium transition-all ${
            checked === true
              ? 'bg-green-500 text-white shadow-md'
              : disabled
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-green-500 hover:bg-green-50'
          }`}
        >
          <ThumbsUp size={20} />
          {text.yes}
        </button>
        
        <button
          type="button"
          disabled={disabled}
          onClick={() => onChange(false)}
          className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-medium transition-all ${
            checked === false
              ? 'bg-red-500 text-white shadow-md'
              : disabled
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-red-500 hover:bg-red-50'
          }`}
        >
          <ThumbsDown size={20} />
          {text.no}
        </button>
      </div>
      
      {disabled && (
        <p className="text-sm text-gray-500 mt-3 text-center italic">
          This choice is final and cannot be changed
        </p>
      )}
    </div>
  );
};

export default RecommendationToggle;