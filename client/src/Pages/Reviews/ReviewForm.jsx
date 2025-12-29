import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Award,
  MessageSquare,
  Clock,
  ThumbsUp,
  DollarSign,
  Target
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import RatingCategory from '../../components/Reviews/RatingCategory';
import ReviewTextarea from '../../components/Reviews/ReviewTextarea';
import RecommendationToggle from '../../components/Reviews/RecommendationToggle';

const API_BASE = 'http://127.0.0.1:8000/api';

const ReviewForm = () => {
  const navigate = useNavigate();
  const { contractId } = useParams();

  const [loading, setLoading] = useState(true);
  const [projectData, setProjectData] = useState(null);

  const [formData, setFormData] = useState({
    ratings: {
      quality: 0,
      communication: 0,
      timeliness: 0,
      professionalism: 0,
      overall: 0
    },
    reviewText: '',
    wouldRecommend: null
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  // ============================
  // ROLE BASED CATEGORIES
  // ============================
  const clientCategories = [
    { key: 'quality', label: 'Quality of Work', icon: Award },
    { key: 'communication', label: 'Communication', icon: MessageSquare },
    { key: 'timeliness', label: 'On-time Delivery', icon: Clock },
    { key: 'professionalism', label: 'Professionalism', icon: ThumbsUp }
  ];

  const freelancerCategories = [
    { key: 'quality', label: 'Payment Timeliness', icon: DollarSign },
    { key: 'communication', label: 'Communication', icon: MessageSquare },
    { key: 'timeliness', label: 'Requirement Clarity', icon: Target },
    { key: 'professionalism', label: 'Professionalism', icon: ThumbsUp }
  ];

  useEffect(() => {
    fetchContractData();
  }, [contractId]);

  const fetchContractData = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        `${API_BASE}/contracts/contracts/${contractId}/`,
        { credentials: 'include' }
      );

      if (!res.ok) throw new Error('Failed to load contract');

      const contract = await res.json();

      setProjectData({
        id: contract.id,
        title: contract.title || 'Contract',
        completedAt: contract.completed_at,
        status: contract.status,
        userRole: contract.my_role || 'client',
        otherParty: {
          name: contract.other_party_name || 'User',
          role: contract.other_party_role || 'freelancer',
          initials: contract.other_party_name
            ? contract.other_party_name.charAt(0).toUpperCase()
            : '?'
        }
      });

      setLoading(false);
    } catch (error) {
      console.error(error);
      alert('Unable to load contract details');
      setLoading(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    Object.entries(formData.ratings).forEach(([key, value]) => {
      if (value === 0) newErrors[key] = 'Required';
    });

    if (formData.reviewText.length < 20) {
      newErrors.reviewText = 'Minimum 20 characters';
    }

    if (formData.wouldRecommend === null) {
      newErrors.wouldRecommend = 'Required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setSubmitting(true);

      const res = await fetch(`${API_BASE}/reviews/`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contract: contractId,
          ratings: formData.ratings,
          review_text: formData.reviewText,
          would_recommend: formData.wouldRecommend
        })
      });

      if (!res.ok) throw new Error('Submission failed');

      navigate(`/reviews/waiting/${contractId}`);
    } catch (error) {
      console.error(error);
      alert('Failed to submit review');
    } finally {
      setSubmitting(false);
    }
  };

  const categories =
    projectData?.userRole === 'client'
      ? clientCategories
      : freelancerCategories;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!projectData || projectData.status !== 'completed') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Reviews are allowed only after contract completion
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">

        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 mb-6"
        >
          <ArrowLeft size={20} />
          Back
        </button>

        <form onSubmit={handleSubmit}>
          <div className="bg-white rounded-xl shadow-lg p-6">

            <h2 className="text-xl font-bold mb-4">Rate Your Experience</h2>

            {categories.map(cat => (
              <RatingCategory
                key={cat.key}
                icon={cat.icon}
                label={cat.label}
                value={formData.ratings[cat.key]}
                onChange={(v) =>
                  setFormData(prev => ({
                    ...prev,
                    ratings: { ...prev.ratings, [cat.key]: v }
                  }))
                }
              />
            ))}

            <RatingCategory
              icon={Award}
              label="Overall Rating"
              value={formData.ratings.overall}
              onChange={(v) =>
                setFormData(prev => ({
                  ...prev,
                  ratings: { ...prev.ratings, overall: v }
                }))
              }
            />

            <ReviewTextarea
              value={formData.reviewText}
              onChange={(v) =>
                setFormData(prev => ({ ...prev, reviewText: v }))
              }
            />

            <RecommendationToggle
              checked={formData.wouldRecommend}
              onChange={(v) =>
                setFormData(prev => ({ ...prev, wouldRecommend: v }))
              }
              type={projectData.userRole === 'client' ? 'freelancer' : 'client'}
            />

            <button
              type="submit"
              disabled={submitting}
              className="mt-4 w-full bg-indigo-600 text-white py-3 rounded-lg"
            >
              {submitting ? 'Submitting...' : 'Submit Review'}
            </button>

          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewForm;
