// src/components/Reviews/ReviewCard.jsx
import React from 'react';
import { Star, Check, X, Calendar } from 'lucide-react';

const ReviewCard = ({ 
  reviewData,
  showCategories = true,
  compact = false 
}) => {
  const {
    reviewer,
    reviewerRole,
    overallRating,
    categories,
    reviewText,
    wouldRecommend,
    createdAt,
    isVerified = true
  } = reviewData;

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const renderStars = (rating, size = 16) => {
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={size}
            className={
              star <= rating
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-gray-300'
            }
          />
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div 
            className="w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold text-lg"
            style={{ backgroundColor: reviewer.avatarColor || '#6366f1' }}
          >
            {reviewer.initials || reviewer.name.substring(0, 2).toUpperCase()}
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">{reviewer.name}</h3>
            <p className="text-sm text-gray-600">{reviewerRole}</p>
          </div>
        </div>
        
        {isVerified && (
          <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
            <Check size={14} />
            Verified
          </span>
        )}
      </div>

      {/* Overall Rating */}
      <div className="mb-4 pb-4 border-b border-gray-100">
        <div className="flex items-center gap-3 mb-2">
          <Star className="fill-yellow-400 text-yellow-400" size={24} />
          <span className="text-3xl font-bold text-gray-800">
            {overallRating.toFixed(1)}
          </span>
          <span className="text-gray-600">Overall Rating</span>
        </div>
        {renderStars(overallRating, 20)}
      </div>

      {/* Category Ratings */}
      {showCategories && categories && !compact && (
        <div className="mb-4 space-y-2">
          {categories.map((category, index) => (
            <div key={index} className="flex items-center justify-between text-sm">
              <span className="text-gray-600 flex items-center gap-2">
                {category.icon && <category.icon size={16} className="text-indigo-600" />}
                {category.label}
              </span>
              {renderStars(category.rating, 14)}
            </div>
          ))}
        </div>
      )}

      {/* Review Text */}
      <div className="bg-gray-50 rounded-lg p-4 mb-4">
        <p className="text-gray-700 italic leading-relaxed">
          "{reviewText}"
        </p>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <div className="flex items-center gap-2 text-sm">
          {wouldRecommend !== null && (
            <span className={`flex items-center gap-1 font-medium ${
              wouldRecommend ? 'text-green-600' : 'text-red-600'
            }`}>
              {wouldRecommend ? (
                <>
                  <Check size={16} />
                  Would recommend
                </>
              ) : (
                <>
                  <X size={16} />
                  Not recommended
                </>
              )}
            </span>
          )}
        </div>
        
        <div className="flex items-center gap-1 text-sm text-gray-500">
          <Calendar size={14} />
          {formatDate(createdAt)}
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;