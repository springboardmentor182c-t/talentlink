import React, { useState, useEffect } from 'react';
import { TrendingUp, DollarSign, Star, Award, Calendar, Target } from 'lucide-react';
import BarChartPlaceholder from '../BarChartPlaceholder.jsx';
import PieChartPlaceholder from '../PieChartPlaceholder.jsx';

const FreelancerAnalytics = () => {
  const [analyticsData, setAnalyticsData] = useState({
    earnings: [],
    skills: {},
    performance: {},
    loading: true
  });

  useEffect(() => {
    // Simulate loading data
    const loadAnalyticsData = async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setAnalyticsData({
        earnings: [
          { position: 'Frontend Developer', count: 12 },
          { position: 'React Developer', count: 8 },
          { position: 'Full Stack Developer', count: 6 },
          { position: 'UI/UX Designer', count: 4 },
          { position: 'Backend Developer', count: 3 }
        ],
        skills: {
          'JavaScript': 85,
          'React': 78,
          'Node.js': 72,
          'CSS': 68,
          'TypeScript': 65,
          'MongoDB': 58
        },
        performance: {
          totalEarnings: 245000,
          completedProjects: 33,
          activeProjects: 5,
          averageRating: 4.8,
          clientSatisfaction: 96,
          onTimeDelivery: 92
        },
        loading: false
      });
    };

    loadAnalyticsData();
  }, []);

  const statsCards = [
    {
      title: "Total Earnings",
      value: analyticsData.loading ? "..." : `₹${analyticsData.performance?.totalEarnings?.toLocaleString() || 0}`,
      icon: DollarSign,
      color: "green"
    },
    {
      title: "Completed Projects",
      value: analyticsData.loading ? "..." : analyticsData.performance?.completedProjects || 0,
      icon: Award,
      color: "blue"
    },
    {
      title: "Active Projects",
      value: analyticsData.loading ? "..." : analyticsData.performance?.activeProjects || 0,
      icon: Target,
      color: "indigo"
    },
    {
      title: "Average Rating",
      value: analyticsData.loading ? "..." : `${analyticsData.performance?.averageRating || 0}/5.0`,
      icon: Star,
      color: "yellow"
    }
  ];

  const getColorClasses = (color) => {
    const colorMap = {
      green: 'bg-green-50 text-green-600',
      blue: 'bg-blue-50 text-blue-600',
      indigo: 'bg-indigo-50 text-indigo-600',
      yellow: 'bg-yellow-50 text-yellow-600'
    };
    return colorMap[color] || colorMap.indigo;
  };

  if (analyticsData.loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics Dashboard</h1>
        <p className="text-gray-600">Track your performance and earnings</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statsCards.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-600 mb-1">{stat.title}</h3>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-lg ${getColorClasses(stat.color)}`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Earnings Chart */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Earnings by Position</h3>
            <DollarSign className="w-5 h-5 text-gray-400" />
          </div>
          <BarChartPlaceholder data={analyticsData.earnings} />
        </div>

        {/* Skills Analytics */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Skills Proficiency</h3>
            <TrendingUp className="w-5 h-5 text-gray-400" />
          </div>
          <PieChartPlaceholder data={analyticsData.skills} />
        </div>
      </div>

      {/* Additional Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Client Satisfaction</h3>
            <Star className="w-5 h-5 text-gray-400" />
          </div>
          <div className="flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">
                {analyticsData.performance?.clientSatisfaction || 0}%
              </div>
              <p className="text-sm text-gray-600">Based on {analyticsData.performance?.completedProjects || 0} completed projects</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">On-Time Delivery</h3>
            <Calendar className="w-5 h-5 text-gray-400" />
          </div>
          <div className="flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">
                {analyticsData.performance?.onTimeDelivery || 0}%
              </div>
              <p className="text-sm text-gray-600">Projects delivered on or before deadline</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreelancerAnalytics;