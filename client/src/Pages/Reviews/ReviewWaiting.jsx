import React, { useState, useEffect } from 'react';
import { ArrowLeft, Clock, Check, Star, AlertCircle, RefreshCw } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import ReviewCard from '../../components/Reviews/ReviewCard';

const API_BASE = 'http://127.0.0.1:8000/api';

const ReviewWaiting = () => {
  const navigate = useNavigate();
  const { contractId } = useParams();

  const [loading, setLoading] = useState(true);
  const [reviewData, setReviewData] = useState(null);
  const [bothSubmitted, setBothSubmitted] = useState(false);
  const [checking, setChecking] = useState(false);

  useEffect(() => {
    fetchReviewStatus();

    const interval = setInterval(() => {
      checkIfBothSubmitted();
    }, 30000);

    return () => clearInterval(interval);
  }, [contractId]);

  const fetchReviewStatus = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        `${API_BASE}/reviews/contract/${contractId}/status/`,
        { credentials: 'include' }
      );

      if (!res.ok) throw new Error('Failed to fetch review status');

      const data = await res.json();

      setReviewData(data);
      setBothSubmitted(!!data?.bothSubmitted);

      if (data?.bothSubmitted) {
        setTimeout(() => {
          navigate(`/reviews/summary/${contractId}`);
        }, 2000);
      }

      setLoading(false);
    } catch (error) {
      console.error('Error fetching review status:', error);
      setLoading(false);
    }
  };

  const checkIfBothSubmitted = async () => {
    try {
      setChecking(true);

      const res = await fetch(
        `${API_BASE}/reviews/contract/${contractId}/check-status/`,
        { credentials: 'include' }
      );

      if (!res.ok) throw new Error('Failed to check status');

      const data = await res.json();

      if (data?.bothSubmitted) {
        setBothSubmitted(true);
        setTimeout(() => {
          navigate(`/reviews/summary/${contractId}`);
        }, 2000);
      }

      setChecking(false);
    } catch (error) {
      console.error('Error checking status:', error);
      setChecking(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading review status...</p>
        </div>
      </div>
    );
  }

  if (!reviewData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md text-center">
          <AlertCircle className="text-red-500 mx-auto mb-4" size={48} />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Review Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            Unable to load review information.
          </p>
          <button
            onClick={() => navigate('/projects')}
            className="bg-indigo-600 text-white py-2 px-6 rounded-lg hover:bg-indigo-700"
          >
            Back to Projects
          </button>
        </div>
      </div>
    );
  }

  const project = reviewData.project || {};
  const myReview = reviewData.myReview || {};

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">

        {/* Back Button */}
        <button
          onClick={() => navigate('/projects')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6 transition-colors"
        >
          <ArrowLeft size={20} />
          Back to Projects
        </button>

        {/* Status Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="text-center">
            {bothSubmitted ? (
              <>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                  <Check className="text-green-600" size={32} />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Both Reviews Submitted!
                </h2>
                <p className="text-gray-600 mb-4">
                  Redirecting to full review summary...
                </p>
              </>
            ) : (
              <>
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                  <Clock className="text-yellow-600" size={32} />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Review Submitted Successfully!
                </h2>
                <div className="inline-block bg-yellow-50 text-yellow-700 px-4 py-2 rounded-full text-sm font-medium border border-yellow-200">
                  🕒 Waiting for {project?.otherParty?.name || 'other user'} to submit their review
                </div>
              </>
            )}
          </div>

          {/* Project Info */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold"
                style={{ backgroundColor: '#6366f1' }}
              >
                {project?.otherParty?.initials || '?'}
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">
                  {project?.title || 'Project'}
                </h3>
                <p className="text-sm text-gray-600">
                  {project?.otherParty?.name} · {project?.otherParty?.role}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Your Review Preview */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Your Review</h3>

            {myReview?.canEdit && (
              <button
                onClick={() => navigate(`/reviews/edit/${contractId}`)}
                className="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
              >
                Edit Review
              </button>
            )}
          </div>

          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <div className="flex items-center gap-3 mb-3">
              <Star className="fill-yellow-400 text-yellow-400" size={32} />
              <div>
                <span className="text-3xl font-bold text-gray-800">
                  {myReview?.overallRating || 0}
                </span>
                <p className="text-sm text-gray-600">Overall Rating</p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <p className="text-gray-700 italic">
              "{myReview?.reviewText || 'No review text'}"
            </p>
          </div>
        </div>

        {/* Check Status Button */}
        <div className="mt-6 text-center">
          <button
            onClick={checkIfBothSubmitted}
            disabled={checking}
            className="inline-flex items-center gap-2 bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
          >
            <RefreshCw size={18} className={checking ? 'animate-spin' : ''} />
            {checking ? 'Checking...' : 'Check Review Status'}
          </button>
          <p className="text-sm text-gray-500 mt-2">
            We automatically check every 30 seconds
          </p>
        </div>

      </div>
    </div>
  );
};

export default ReviewWaiting;
