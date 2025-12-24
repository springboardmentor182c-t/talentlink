import React from "react";
import StatsCard from "../StatsCard.jsx";
import BarChartPlaceholder from "../BarChartPlaceholder.jsx";
import PieChartPlaceholder from "../PieChartPlaceholder.jsx";
import RecentMessages from "../RecentMessages.jsx";
import { Users, TrendingUp, MessageSquare, CheckCircle } from "lucide-react";

// Mock Data
const mockDashboardData = {
  totalCandidates: 20,
  totalJobs: 8,
  activeProjects: 5,
  completedProjects: 24,
  candidatesByPosition: [
    { position: "Frontend", count: 30 },
    { position: "Backend", count: 25 },
    { position: "QA", count: 15 },
    { position: "DevOps", count: 28 },
  ],
  candidatesByStatus: {
    Applied: 45,
    Screening: 25,
    Interview: 20,
    Offer: 10,
  },
  recentMessages: [
    {
      name: "Alex Torres",
      message: "Great job on the update!",
      time: "10:24 AM",
      avatar: "AT",
    },
    {
      name: "Megan Simon",
      message: "When is the next class?",
      time: "2:47 AM",
      avatar: "MS",
    },
  ],
};

const Dashboard = () => {
  return (
    <main className="w-full min-h-screen bg-gray-50 p-3 sm:p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
            Welcome, John!
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mt-2">
            Here's your dashboard overview
          </p>
        </div>

        {/* Stats Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-6 md:mb-8">
          <StatsCard 
            title="Total Candidates" 
            value={mockDashboardData.totalCandidates}
            icon={Users}
            color="indigo"
          />
          <StatsCard 
            title="Active Projects" 
            value={mockDashboardData.activeProjects}
            icon={TrendingUp}
            color="blue"
          />
          <StatsCard 
            title="Active Jobs" 
            value={mockDashboardData.totalJobs}
            icon={CheckCircle}
            color="green"
          />
          <StatsCard 
            title="Completed" 
            value={mockDashboardData.completedProjects}
            icon={MessageSquare}
            color="yellow"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
          {/* Bar Chart - takes 2 columns on lg screens */}
          <div className="lg:col-span-2">
            <BarChartPlaceholder data={mockDashboardData.candidatesByPosition} />
          </div>

          {/* Pie Chart - takes 1 column */}
          <div className="w-full">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 h-full flex items-center justify-center">
              <PieChartPlaceholder data={mockDashboardData.candidatesByStatus} />
            </div>
          </div>
        </div>

        {/* Messages Section */}
        <div className="w-full">
          <RecentMessages messages={mockDashboardData.recentMessages} />
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
