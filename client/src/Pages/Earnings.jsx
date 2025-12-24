import React, { useState, useEffect } from 'react';
import { IndianRupee, TrendingUp, TrendingDown, Calendar, Clock, CheckCircle } from 'lucide-react';
import { freelancerDashboardService } from '../services/freelancerDashboardService';

const Earnings = () => {
  const [earningsData, setEarningsData] = useState({
    totalEarnings: 0,
    thisMonthEarnings: 0,
    lastMonthEarnings: 0,
    pendingPayments: 0,
    paymentHistory: [],
    monthlyBreakdown: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEarningsData = async () => {
      try {
        setLoading(true);
        // Fetch both stats and monthly earnings for comprehensive earnings data
        const [statsResponse, monthlyResponse] = await Promise.all([
          freelancerDashboardService.getFreelancerStats(),
          freelancerDashboardService.getMonthlyEarnings()
        ]);
        
        setEarningsData({
          totalEarnings: statsResponse.totalEarnings || 0,
          thisMonthEarnings: statsResponse.thisMonthEarnings || 0,
          lastMonthEarnings: statsResponse.lastMonthEarnings || 0,
          pendingPayments: statsResponse.pendingPayments || 0,
          paymentHistory: statsResponse.paymentHistory || [],
          monthlyBreakdown: monthlyResponse || []
        });
      } catch (err) {
        console.error("Failed to fetch earnings data:", err);
        setError("Failed to load earnings data.");
      } finally {
        setLoading(false);
      }
    };

    fetchEarningsData();
  }, []);

  const monthGrowth = earningsData.lastMonthEarnings > 0 
    ? ((earningsData.thisMonthEarnings - earningsData.lastMonthEarnings) / earningsData.lastMonthEarnings * 100).toFixed(1)
    : 0;

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
          <div className="h-64 bg-gray-200 rounded mb-8"></div>
          <div className="h-48 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-6 bg-gray-100 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Earnings</h1>
        <p className="text-gray-600">Track your income, payments, and financial performance</p>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Total Earnings</p>
              <p className="text-2xl font-bold text-gray-900">₹{earningsData.totalEarnings.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-indigo-50 rounded-lg">
              <IndianRupee className="h-6 w-6 text-indigo-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">This Month</p>
              <p className="text-2xl font-bold text-gray-900">₹{earningsData.thisMonthEarnings.toLocaleString()}</p>
              <p className={`text-sm ${monthGrowth >= 0 ? 'text-green-600' : 'text-red-600'} flex items-center mt-1`}>
                {monthGrowth >= 0 ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
                {Math.abs(monthGrowth)}% vs last month
              </p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <Calendar className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Pending Payments</p>
              <p className="text-2xl font-bold text-gray-900">₹{earningsData.pendingPayments.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-yellow-50 rounded-lg">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Payment History</p>
              <p className="text-2xl font-bold text-gray-900">{earningsData.paymentHistory.length}</p>
              <p className="text-sm text-gray-500 mt-1">Completed payments</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <CheckCircle className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Monthly Earnings Chart */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Monthly Earnings Trend</h2>
        {earningsData.monthlyBreakdown.length > 0 ? (
          <div className="space-y-3">
            {earningsData.monthlyBreakdown.map((month, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-700">{month.month}</span>
                <span className="font-bold text-gray-900">₹{month.earnings.toLocaleString()}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-8">No monthly earnings data available</p>
        )}
      </div>

      {/* Payment History */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Payment History</h2>
        {earningsData.paymentHistory.length > 0 ? (
          <div className="space-y-3">
            {earningsData.paymentHistory.map((payment, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-700">{payment.projectTitle}</p>
                  <p className="text-sm text-gray-500">{payment.date}</p>
                </div>
                <span className="font-bold text-green-600">+₹{payment.amount.toLocaleString()}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-8">No payment history available</p>
        )}
      </div>
    </div>
  );
};

export default Earnings;