import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import StatsCard from "../StatsCard.jsx";
import BarChartPlaceholder from "../BarChartPlaceholder.jsx";
import PieChartPlaceholder from "../PieChartPlaceholder.jsx";
import RecentMessages from "../RecentMessages.jsx";
import { Users, TrendingUp, MessageSquare, CheckCircle } from "lucide-react";
import { messagingAPI } from "../../services/api.js";
import profileService from '../../services/profileService.js';
import api from '../../services/api.js';

const Dashboard = () => {
  const [recentMessages, setRecentMessages] = useState([]);
  const [loadingMessages, setLoadingMessages] = useState(true);
  const [currentUserId, setCurrentUserId] = useState(null);

  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(true);

  const [stats, setStats] = useState({
    totalCandidates: 0,
    totalProjects: 0,
    activeProjects: 0,
    completedProjects: 0,
    candidatesByPosition: [],
    candidatesByStatus: {},
  });
  const [loadingStats, setLoadingStats] = useState(true);
  const [statsError, setStatsError] = useState(null);

  useEffect(() => {
    const loadStats = async () => {
      setLoadingStats(true);
      setStatsError(null);
      try {
        const [freelancersRes, projectsRes] = await Promise.all([
          api.get('/api/profile/freelancer-profile/'),
          api.get('/api/projects/')
        ]);

        const freelancers = Array.isArray(freelancersRes.data) ? freelancersRes.data : (freelancersRes.data.results || []);
        const projects = Array.isArray(projectsRes.data) ? projectsRes.data : (projectsRes.data.results || []);

        const totalCandidates = freelancers.length;
        const totalProjects = projects.length;
        const activeProjects = projects.filter(p => p.status === 'active').length;
        const completedProjects = projects.filter(p => p.status === 'completed').length;

        const positionCounts = { Frontend:0, Backend:0, QA:0, DevOps:0, Other:0 };
        freelancers.forEach(f => {
          const skills = (f.skills || '').toLowerCase();
          if (skills.includes('react') || skills.includes('frontend') || skills.includes('javascript')) positionCounts.Frontend++;
          else if (skills.includes('node') || skills.includes('backend') || skills.includes('django') || skills.includes('python') || skills.includes('rails')) positionCounts.Backend++;
          else if (skills.includes('qa') || skills.includes('testing') || skills.includes('tester')) positionCounts.QA++;
          else if (skills.includes('devops') || skills.includes('docker') || skills.includes('kubernetes')) positionCounts.DevOps++;
          else positionCounts.Other++;
        });
        const candidatesByPosition = Object.entries(positionCounts).map(([position,count]) => ({ position, count }));

        const statusCounts = { Applied:0, Screening:0, Interview:0, Offer:0 };
        freelancers.forEach(f => {
          const c = Number(f.profile_completeness || 0);
          if (c < 25) statusCounts.Applied++;
          else if (c < 50) statusCounts.Screening++;
          else if (c < 75) statusCounts.Interview++;
          else statusCounts.Offer++;
        });

        setStats({ totalCandidates, totalProjects, activeProjects, completedProjects, candidatesByPosition, candidatesByStatus: statusCounts });
      } catch (err) {
        console.error('Failed to load dashboard stats', err);
        setStatsError('Failed to load stats');
      } finally {
        setLoadingStats(false);
      }
    };

    loadStats();
  }, []);
  
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

  // Load profile for current user (client or freelancer)
  useEffect(() => {
    const loadProfile = async () => {
      setLoadingProfile(true);
      try {
        const userData = localStorage.getItem('user');
        if (!userData) {
          setProfile(null);
          return;
        }
        const user = JSON.parse(userData);
        if (user.role === 'client') {
          const p = await profileService.client.getProfile();
          setProfile(p);
        } else if (user.role === 'freelancer') {
          const p = await profileService.freelancer.getProfile();
          setProfile(p);
        }
      } catch (err) {
        console.error('Failed to load profile for dashboard:', err);
        setProfile(null);
      } finally {
        setLoadingProfile(false);
      }
    };

    loadProfile();
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
        <div className="flex items-start justify-between mb-6 md:mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
              {`Welcome${profile?.first_name ? `, ${profile.first_name}` : ''}!`}
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mt-2">
              Here's your dashboard overview
            </p>
          </div>
          <div className="ml-4">
            {loadingProfile ? (
              <button className="px-4 py-2 bg-gray-400 text-white rounded">Loading...</button>
            ) : profile ? (
              <button
                onClick={() => {
                  const userData = localStorage.getItem('user');
                  const role = userData ? JSON.parse(userData).role : null;
                  if (role === 'freelancer') navigate('/freelancer/profile/edit');
                  else navigate('/client/profile/edit');
                }}
                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
              >
                Edit Profile
              </button>
            ) : (
              <button
                onClick={() => {
                  const userData = localStorage.getItem('user');
                  const role = userData ? JSON.parse(userData).role : null;
                  if (role === 'freelancer') navigate('/freelancer/profile/create');
                  else navigate('/profile/create');
                }}
                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
              >
                Create Profile
              </button>
            )}
          </div>
        </div>

        {/* Stats Cards Grid */}
        {statsError && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded">
            <strong>Failed to load dashboard stats.</strong> Please check server logs or try again.
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-6 md:mb-8">
          <StatsCard 
            title="Total Candidates" 
            value={loadingStats ? '...' : stats.totalCandidates}
            icon={Users}
            color="indigo"
          />
          <StatsCard 
            title="Active Projects" 
            value={loadingStats ? '...' : stats.activeProjects}
            icon={TrendingUp}
            color="blue"
          />
          <StatsCard 
            title="Active Jobs" 
            value={loadingStats ? '...' : stats.totalProjects}
            icon={CheckCircle}
            color="green"
          />
          <StatsCard 
            title="Completed" 
            value={loadingStats ? '...' : stats.completedProjects}
            icon={MessageSquare}
            color="yellow"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
          {/* Bar Chart - takes 2 columns on lg screens */}
          <div className="lg:col-span-2">
            <BarChartPlaceholder data={stats.candidatesByPosition} />
          </div>

          {/* Pie Chart - takes 1 column */}
          <div className="w-full">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 h-full flex items-center justify-center">
              <PieChartPlaceholder data={stats.candidatesByStatus} />
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
