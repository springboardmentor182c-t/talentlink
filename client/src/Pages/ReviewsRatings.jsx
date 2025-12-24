import React, { useState, useEffect } from 'react';
import { Star, TrendingUp, Filter, Calendar, User, MessageSquare, ThumbsUp } from 'lucide-react';
import { freelancerDashboardService } from '../services/freelancerDashboardService';

const ReviewsRatings = () => {
  const [reviewsData, setReviewsData] = useState({
    averageRating: 0,
    totalReviews: 0,
    ratingDistribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
    reviews: [],
    recentReviews: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterRating, setFilterRating] = useState(0);
  const [sortBy, setSortBy] = useState('date');
  const [filteredReviews, setFilteredReviews] = useState([]);

  useEffect(() => {
    const fetchReviewsData = async () => {
      try {
        setLoading(true);
        const reviewsResponse = await freelancerDashboardService.getFreelancerReviews();
        
        setReviewsData({
          averageRating: reviewsResponse.averageRating || 0,
          totalReviews: reviewsResponse.totalReviews || 0,
          ratingDistribution: reviewsResponse.ratingDistribution || { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
          reviews: reviewsResponse.reviews || [],
          recentReviews: reviewsResponse.recentReviews || []
        });
        setFilteredReviews(reviewsResponse.reviews || []);
      } catch (err) {
        console.error("Failed to fetch reviews data:", err);
        setError("Failed to load reviews and ratings.");
      } finally {
        setLoading(false);
      }
    };

    fetchReviewsData();
  }, []);

  useEffect(() => {
    let filtered = [...reviewsData.reviews];
    
    if (filterRating > 0) {
      filtered = filtered.filter(review => review.rating === filterRating);
    }
    
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.date) - new Date(a.date);
        case 'rating':
          return b.rating - a.rating;
        case 'helpful':
          return (b.helpfulCount || 0) - (a.helpfulCount || 0);
        default:
          return 0;
      }
    });
    
    setFilteredReviews(filtered);
  }, [reviewsData.reviews, filterRating, sortBy]);

  const renderStars = (rating, size = 'w-5 h-5') => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`${size} ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
          />
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex-1 p-6 bg-gray-100 min-h-screen">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-8 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
          <div className="h-48 bg-gray-200 rounded mb-8"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-6 bg-gray-100 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Reviews & Ratings</h1>
        <p className="text-gray-600">Manage your client feedback and reputation</p>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Average Rating</p>
              <div className="flex items-center">
                <p className="text-2xl font-bold text-gray-900 mr-2">{reviewsData.averageRating.toFixed(1)}</p>
                {renderStars(Math.round(reviewsData.averageRating), 'w-4 h-4')}
              </div>
            </div>
            <div className="p-3 bg-yellow-50 rounded-lg">
              <Star className="h-6 w-6 text-yellow-500 fill-current" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Total Reviews</p>
              <p className="text-2xl font-bold text-gray-900">{reviewsData.totalReviews}</p>
              <p className="text-sm text-gray-500 mt-1">All time reviews</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <MessageSquare className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">5-Star Reviews</p>
              <p className="text-2xl font-bold text-gray-900">{reviewsData.ratingDistribution[5]}</p>
              <p className="text-sm text-gray-500 mt-1">Excellent feedback</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Response Rate</p>
              <p className="text-2xl font-bold text-gray-900">98%</p>
              <p className="text-sm text-gray-500 mt-1">Above average</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <ThumbsUp className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Rating Distribution */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Rating Distribution</h2>
        <div className="space-y-3">
          {[5, 4, 3, 2, 1].map((rating) => {
            const count = reviewsData.ratingDistribution[rating] || 0;
            const percentage = reviewsData.totalReviews > 0 ? (count / reviewsData.totalReviews) * 100 : 0;
            return (
              <div key={rating} className="flex items-center">
                <div className="flex items-center w-20">
                  {renderStars(rating, 'w-4 h-4')}
                  <span className="ml-2 text-sm font-medium text-gray-700">{rating}</span>
                </div>
                <div className="flex-1 mx-4">
                  <div className="bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-yellow-400 h-2 rounded-full" 
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
                <span className="text-sm text-gray-600 w-12 text-right">{count}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Filters and Sort */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center">
              <Filter className="h-5 w-5 text-gray-500 mr-2" />
              <select 
                value={filterRating} 
                onChange={(e) => setFilterRating(Number(e.target.value))}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm"
              >
                <option value={0}>All Ratings</option>
                <option value={5}>5 Stars</option>
                <option value={4}>4 Stars</option>
                <option value={3}>3 Stars</option>
                <option value={2}>2 Stars</option>
                <option value={1}>1 Star</option>
              </select>
            </div>
            <div className="flex items-center">
              <Calendar className="h-5 w-5 text-gray-500 mr-2" />
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm"
              >
                <option value="date">Sort by Date</option>
                <option value="rating">Sort by Rating</option>
                <option value="helpful">Sort by Helpful</option>
              </select>
            </div>
          </div>
          <p className="text-sm text-gray-600">{filteredReviews.length} review{filteredReviews.length !== 1 ? 's' : ''}</p>
        </div>
      </div>

      {/* Individual Reviews */}
      <div className="space-y-4">
        {filteredReviews.length > 0 ? (
          filteredReviews.map((review, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center mr-3">
                    <User className="h-5 w-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{review.clientName}</p>
                    <p className="text-sm text-gray-500">{review.date}</p>
                  </div>
                </div>
                {renderStars(review.rating)}
              </div>
              <p className="text-gray-700 mb-4">"{review.comment}"</p>
              {review.projectTitle && (
                <p className="text-sm text-gray-500 mb-4">Project: {review.projectTitle}</p>
              )}
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center">
                  <ThumbsUp className="h-4 w-4 mr-1" />
                  <span>{review.helpfulCount || 0} found this helpful</span>
                </div>
                <button className="text-blue-600 hover:text-blue-800">
                  Respond to review
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white p-12 rounded-lg shadow-sm border border-gray-200 text-center">
            <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No reviews match your current filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewsRatings;