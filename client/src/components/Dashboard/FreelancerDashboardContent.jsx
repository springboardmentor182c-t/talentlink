import React, { useState, useEffect } from 'react';
import StatsCard from '../StatsCard';
import BarChartPlaceholder from '../BarChartPlaceholder';
import MonthlyEarningsChart from '../MonthlyEarningsChart';
import PieChartPlaceholder from '../PieChartPlaceholder';
import { IndianRupee, Briefcase, Star } from 'lucide-react';
import { freelancerDashboardService } from '../../services/freelancerDashboardService';

const FreelancerDashboardContent = ({ profile }) => {
  const [stats, setStats] = useState({
    totalEarnings: 0,
    pendingPayments: 0,
    activeContracts: 0,
    totalReviews: 0,
  });
  const [averageRating, setAverageRating] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [monthlyEarnings, setMonthlyEarnings] = useState([]);
  const [loadingStats, setLoadingStats] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoadingStats(true);
        const data = await freelancerDashboardService.getFreelancerStats();
        const reviewsData = await freelancerDashboardService.getFreelancerReviews();
        const monthlyEarningsData = await freelancerDashboardService.getMonthlyEarnings();
        setStats({
          totalEarnings: data.totalEarnings || 0,
          pendingPayments: data.pendingPayments || 0,
          activeContracts: data.activeContracts || 0,
          totalReviews: data.totalReviews || 0,
        });
        setAverageRating(reviewsData.averageRating || 0);
        setReviews(reviewsData.reviews || []);
        setMonthlyEarnings(monthlyEarningsData || []);
      } catch (err) {
        console.error("Failed to fetch freelancer dashboard stats:", err);
        setError("Failed to load dashboard stats.");
      } finally {
        setLoadingStats(false);
      }
    };

    fetchStats();
  }, []);
  return (
    <div className="flex-1 p-6 bg-gray-100 min-h-screen">
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Welcome back, {profile?.title || ''}!</h2>
        <p className="text-gray-600">Here's what's happening with your freelance business today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <StatsCard title="Total Earnings" value={loadingStats ? '...' : `₹${stats.totalEarnings}`} icon={IndianRupee} loading={loadingStats} />
        <StatsCard title="Pending Payments" value={loadingStats ? '...' : `₹${stats.pendingPayments}`} icon={IndianRupee} loading={loadingStats} />
        <StatsCard title="Active Contracts" value={loadingStats ? '...' : stats.activeContracts} icon={Briefcase} loading={loadingStats} />
        <StatsCard title="Total Reviews" value={loadingStats ? '...' : stats.totalReviews} icon={Star} loading={loadingStats} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Monthly Earnings</h3>
          <MonthlyEarningsChart data={monthlyEarnings} loading={loadingStats} />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Candidates By Position</h3>
          <PieChartPlaceholder />
        </div>
      </div>

      {/* Reviews and Ratings Section Placeholder */}
      <div className="bg-white p-6 rounded-lg shadow-md mt-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Reviews and Ratings</h3>
        {loadingStats ? (
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        ) : (
          <div className="mb-4">
            <p className="text-lg font-semibold text-gray-700">Average Rating: {averageRating.toFixed(1)} <Star className="h-5 w-5 inline-block text-yellow-400" fill="currentColor" /></p>
            {reviews.length > 0 ? (
              <ul className="mt-2 space-y-2">
                {reviews.map((review, index) => (
                  <li key={index} className="bg-gray-50 p-3 rounded-md">
                    <p className="font-medium text-gray-800">{review.clientName} - <span className="text-yellow-500">{'★'.repeat(review.rating)}</span></p>
                    <p className="text-gray-600 text-sm">"{review.comment}"</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600">No reviews yet.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FreelancerDashboardContent;
