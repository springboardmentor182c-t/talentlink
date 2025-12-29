import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Star,
  Check,
  Award,
  User,
  TrendingUp,
  Calendar,
  Share2,
  Download
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import ReviewCard from '../../components/Reviews/ReviewCard';

const API_BASE = 'http://127.0.0.1:8000/api';

const ReviewSummary = () => {
  const navigate = useNavigate();
  const { contractId } = useParams();

  const [loading, setLoading] = useState(true);
  const [summaryData, setSummaryData] = useState(null);

  useEffect(() => {
    fetchReviewSummary();
  }, [contractId]);

  const fetchReviewSummary = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        `${API_BASE}/reviews/contract/${contractId}/summary/`,
        { credentials: 'include' } // ✅ IMPORTANT (no token)
      );

      if (!res.ok) {
        throw new Error('Failed to fetch review summary');
      }

      const data = await res.json();
      setSummaryData(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching review summary:', error);
      setLoading(false);
    }
  };

  const handleShare = () => {
    const shareUrl = window.location.href;
    if (navigator.share) {
      navigator.share({
        title: 'Project Reviews',
        text: 'Check out these project reviews',
        url: shareUrl
      });
    } else {
      navigator.clipboard.writeText(shareUrl);
      alert('Link copied to clipboard!');
    }
  };

  const handleDownload = () => {
    alert('Download functionality will be added later');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading review summary...
      </div>
    );
  }

  if (!summaryData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Reviews not available yet
      </div>
    );
  }

  // ✅ role-based back navigation (UNCHANGED)
  const handleBack = () => {
    const role = localStorage.getItem('userRole');
    navigate(role === 'freelancer' ? '/freelancer/projects' : '/client/projects');
  };

  const project = summaryData?.project || {};

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Back Button */}
        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6"
        >
          <ArrowLeft size={20} />
          Back to Projects
        </button>

        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold">Project Reviews</h1>

            <div className="flex gap-2">
              <button
                onClick={handleShare}
                className="p-2 bg-gray-100 rounded-lg"
              >
                <Share2 size={20} />
              </button>
              <button
                onClick={handleDownload}
                className="p-2 bg-gray-100 rounded-lg"
              >
                <Download size={20} />
              </button>
            </div>
          </div>

          <p className="text-gray-600">
            {project?.title || 'Project'}
          </p>
        </div>

        {/* Reviews */}
        <div className="grid lg:grid-cols-2 gap-6">
          {summaryData?.clientReview && (
            <ReviewCard reviewData={summaryData.clientReview} />
          )}

          {summaryData?.freelancerReview && (
            <ReviewCard reviewData={summaryData.freelancerReview} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewSummary;
