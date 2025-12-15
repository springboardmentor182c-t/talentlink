import React, { useState, useEffect } from "react";
import StatsCard from "../StatsCard.jsx";
import BarChartPlaceholder from "../BarChartPlaceholder.jsx";
import PieChartPlaceholder from "../PieChartPlaceholder.jsx";
import RecentMessages from "../RecentMessages.jsx";
import { Users, TrendingUp, MessageSquare, CheckCircle } from "lucide-react";
import { messagingAPI } from "../../services/api.js";

// Mock Data for other sections
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
};

const Dashboard = () => {
  const [recentMessages, setRecentMessages] = useState([]);
  const [loadingMessages, setLoadingMessages] = useState(true);
  const [currentUserId, setCurrentUserId] = useState(null);

  // Get current user ID from localStorage
  useEffect(() => {
    try {
      const userData = localStorage.getItem("user");
      if (userData) {
        const user = JSON.parse(userData);
        setCurrentUserId(user.id);
      }
    } catch (err) {
      console.error("Error parsing user data:", err);
    }
  }, []);

  // Fetch recent messages from API
  useEffect(() => {
    const fetchRecentMessages = async () => {
      setLoadingMessages(true);
      try {
        const conversations = await messagingAPI.getConversations();

        // Transform conversations to recent messages format
        const messages = conversations
          .filter(conv => conv.last_message) // Only include conversations with messages
          .map(conv => {
            // Get the other participant's name
            const otherParticipant = conv.participants?.find(
              p => p.id !== currentUserId
            );
            const name = otherParticipant?.username || "Unknown";
            const avatar = name.substring(0, 2).toUpperCase() || "U";

            // Format time
            const date = new Date(conv.last_message.created_at);
            const now = new Date();
            const diffMs = now - date;
            const diffMins = Math.floor(diffMs / 60000);
            const diffHours = Math.floor(diffMs / 3600000);
            const diffDays = Math.floor(diffMs / 86400000);

            let time = "Unknown";
            if (diffMins < 1) time = "Just now";
            else if (diffMins < 60) time = `${diffMins}m ago`;
            else if (diffHours < 24) time = `${diffHours}h ago`;
            else if (diffDays < 7) time = `${diffDays}d ago`;
            else time = date.toLocaleDateString();

            return {
              name,
              message: conv.last_message.text,
              time,
              avatar,
            };
          })
          .slice(0, 5); // Get only the first 5 recent messages

        setRecentMessages(messages);
      } catch (err) {
        console.error("Failed to fetch recent messages:", err);
        setRecentMessages([]);
      } finally {
        setLoadingMessages(false);
      }
    };

    if (currentUserId) {
      fetchRecentMessages();
    }
  }, [currentUserId]);
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
          {loadingMessages ? (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
              <p className="text-gray-500">Loading messages...</p>
            </div>
          ) : (
            <RecentMessages messages={recentMessages} />
          )}
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
