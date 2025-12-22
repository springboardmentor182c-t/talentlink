import React, { useState, useEffect } from "react";
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  FileText, 
  Clock, 
  DollarSign, 
  Star,
  CheckCircle,
  AlertCircle,
  Calendar,
  Briefcase,
  Search
} from "lucide-react";
import StatsCard from "./StatsCard.jsx";
import RecentProjects from "./RecentProjects.jsx";
import EarningsChart from "./EarningsChart.jsx";
import ActivityFeed from "./ActivityFeed.jsx";
import LoadingSpinner from "../LoadingSpinner.jsx";
import AnalyticsWidget from "./AnalyticsWidget.jsx";
import ChartWidget from "./ChartWidget.jsx";
import ActivityTimeline from "./ActivityTimeline.jsx";
import PerformanceMetrics from "./PerformanceMetrics.jsx";
import { freelancerService } from "../../services/freelancerService.js";

const FreelancerDashboardHome = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const data = await freelancerService.getDashboardData();
      setDashboardData(data);
    } catch (err) {
      const errorMessage = err.message || 'Failed to load dashboard data';
      setError(errorMessage);
      console.error("Error fetching dashboard data:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Error Loading Dashboard</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={fetchDashboardData}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const stats = dashboardData?.stats || {
    totalEarnings: 2450,
    activeProjects: 3,
    completedProjects: 28,
    proposalsSent: 15,
    clientRating: 4.9,
    totalHours: 156,
    pendingPayments: 850,
    upcomingDeadlines: 2
  };

  const recentProjects = dashboardData?.recentProjects || [
    {
      id: 1,
      title: "React Dashboard Development",
      client: "Tech Corp",
      status: "in_progress",
      budget: "$1,200",
      deadline: "2024-01-15",
      progress: 75
    },
    {
      id: 2,
      title: "Mobile App UI Design",
      client: "StartupXYZ",
      status: "completed",
      budget: "$800",
      deadline: "2024-01-10",
      progress: 100
    },
    {
      id: 3,
      title: "API Integration Project",
      client: "DevStudio",
      status: "pending",
      budget: "$1,500",
      deadline: "2024-01-20",
      progress: 25
    }
  ];

  const StatCard = ({ title, value, icon: Icon, color = "blue", prefix = "", suffix = "", trend = null }) => {
    const colorClasses = {
      blue: "bg-blue-100 text-blue-600",
      green: "bg-green-100 text-green-600",
      yellow: "bg-yellow-100 text-yellow-600",
      red: "bg-red-100 text-red-600",
      indigo: "bg-indigo-100 text-indigo-600",
      purple: "bg-purple-100 text-purple-600"
    };

    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">
              {prefix}{value}{suffix}
            </p>
            {trend && (
              <p className={`text-sm mt-1 ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {trend > 0 ? '+' : ''}{trend}% from last month
              </p>
            )}
          </div>
          <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
            <Icon className="w-6 h-6" />
          </div>
        </div>
      </div>
    );
  };

  const activities = dashboardData?.recentActivities || [
    {
      id: 1,
      type: "project_completed",
      title: "Project completed successfully",
      description: "React Dashboard Development finished and approved by client",
      timestamp: "2 hours ago",
      icon: CheckCircle,
      color: "text-green-600"
    },
    {
      id: 2,
      type: "payment_received",
      title: "Payment received",
      description: "$1,200 for Mobile App UI Design project",
      timestamp: "1 day ago",
      icon: DollarSign,
      color: "text-blue-600"
    },
    {
      id: 3,
      type: "new_proposal",
      title: "New proposal submitted",
      description: "Submitted proposal for API Integration Project",
      timestamp: "2 days ago",
      icon: FileText,
      color: "text-purple-600"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Freelancer Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage your projects and track your progress</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2">
            <Briefcase className="w-4 h-4" />
            Find Work
          </button>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Submit Proposal
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Earnings"
          value={stats.totalEarnings.toLocaleString()}
          prefix="$"
          icon={DollarSign}
          color="green"
          trend={12}
        />
        <StatCard
          title="Active Projects"
          value={stats.activeProjects}
          icon={Briefcase}
          color="yellow"
        />
        <StatCard
          title="Client Rating"
          value={stats.clientRating}
          suffix="/5.0"
          icon={Star}
          color="blue"
        />
        <StatCard
          title="Total Hours"
          value={stats.totalHours}
          icon={Clock}
          color="purple"
        />
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Monthly Revenue"
          value={Math.round(stats.totalEarnings * 1.2)}
          prefix="$"
          icon={DollarSign}
          color="green"
          trend={12}
        />
        <StatCard
          title="Job Success Rate"
          value={92}
          suffix="%"
          icon={CheckCircle}
          color="blue"
          trend={3}
        />
        <StatCard
          title="Response Time"
          value={2.4}
          suffix="h"
          icon={Clock}
          color="purple"
        />
        <StatCard
          title="Repeat Clients"
          value={18}
          icon={Users}
          color="indigo"
          trend={5}
        />
      </div>

      {/* Performance Metrics */}
      <PerformanceMetrics />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Projects */}
        <div className="lg:col-span-2">
          <RecentProjects 
            projects={recentProjects}
            title="Recent Projects"
            onViewAll={() => console.log("View all projects")}
          />
        </div>

        {/* Activity Feed */}
        <div className="space-y-6">
          <ActivityFeed 
            activities={activities}
            title="Recent Activity"
            onViewAll={() => console.log("View all activities")}
          />
        </div>
      </div>

      {/* Charts and Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartWidget
          title="Project Applications"
          data={[
            { label: "Jan", value: 15 },
            { label: "Feb", value: 22 },
            { label: "Mar", value: 18 },
            { label: "Apr", value: 28 },
            { label: "May", value: 32 },
            { label: "Jun", value: 25 }
          ]}
          color="indigo"
        />

        <ChartWidget
          title="Client Satisfaction"
          data={[
            { label: "5★", value: 45 },
            { label: "4★", value: 32 },
            { label: "3★", value: 15 },
            { label: "2★", value: 6 },
            { label: "1★", value: 2 }
          ]}
          color="green"
        />
      </div>

      {/* Activity Timeline */}
      <ActivityTimeline />

      {/* Earnings Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <EarningsChart 
          title="Monthly Earnings"
          data={dashboardData?.earningsData || [
            { month: "Jan", earnings: 1200 },
            { month: "Feb", earnings: 1800 },
            { month: "Mar", earnings: 2200 },
            { month: "Apr", earnings: 1900 },
            { month: "May", earnings: 2400 },
            { month: "Jun", earnings: 2100 }
          ]}
        />

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full flex items-center gap-3 p-3 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors text-left">
              <Search className="w-5 h-5 text-indigo-600" />
              <div>
                <p className="font-medium text-gray-900">Find New Work</p>
                <p className="text-sm text-gray-600">Browse available projects</p>
              </div>
            </button>
            
            <button className="w-full flex items-center gap-3 p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors text-left">
              <FileText className="w-5 h-5 text-green-600" />
              <div>
                <p className="font-medium text-gray-900">Submit Proposal</p>
                <p className="text-sm text-gray-600">Apply for a project</p>
              </div>
            </button>
            
            <button className="w-full flex items-center gap-3 p-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors text-left">
              <Clock className="w-5 h-5 text-purple-600" />
              <div>
                <p className="font-medium text-gray-900">Track Time</p>
                <p className="text-sm text-gray-600">Log working hours</p>
              </div>
            </button>
            
            <button className="w-full flex items-center gap-3 p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors text-left">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              <div>
                <p className="font-medium text-gray-900">View Analytics</p>
                <p className="text-sm text-gray-600">Performance insights</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreelancerDashboardHome;