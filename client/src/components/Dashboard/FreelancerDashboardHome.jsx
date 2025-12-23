import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  DollarSign, 
  Briefcase, 
  Star, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Users,
  Award,
  Calendar,
  FileText
} from 'lucide-react';
import StatsCard from '../StatsCard.jsx';
import BarChartPlaceholder from '../BarChartPlaceholder.jsx';
import PieChartPlaceholder from '../PieChartPlaceholder.jsx';
import { freelancerService } from '../../services/freelancerService.js';

const FreelancerDashboardHome = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mock API data - kept for reference but not used
  // const mockDashboardData = {
  //   stats: {
  //     totalEarnings: 125000,
  //     activeContracts: 3,
  //     completedProjects: 24,
  //     averageRating: 4.8,
  //     proposalsSubmitted: 15,
  //     profileViews: 234
  //   },
  //   recentProjects: [
  //     {
  //       id: 1,
  //       title: "React Dashboard Development",
  //       client: "Tech Corp",
  //       budget: 50000,
  //       deadline: "2024-01-15",
  //       status: "in_progress"
  //     },
  //     {
  //       id: 2,
  //       title: "Mobile App UI Design",
  //       client: "StartupXYZ",
  //       budget: 30000,
  //       deadline: "2024-01-20",
  //       status: "completed"
  //     }
  //   ],
  //   earningsData: [
  //     { month: 'Aug', earnings: 25000 },
  //     { month: 'Sep', earnings: 32000 },
  //     { month: 'Oct', earnings: 28000 },
  //     { month: 'Nov', earnings: 35000 },
  //     { month: 'Dec', earnings: 28000 }
  //   ],
  //   skillsAnalytics: [
  //     { name: 'React', value: 35, projects: 12 },
  //     { name: 'Node.js', value: 25, projects: 8 },
  //     { name: 'UI/UX', value: 20, projects: 6 },
  //     { name: 'Python', value: 20, projects: 6 }
  //   ],
  //   upcomingDeadlines: [
  //     {
  //       id: 1,
  //       project: "E-commerce Website",
  //       deadline: "2024-01-10",
  //       daysLeft: 3
  //     },
  //     {
  //       id: 2,
  //       project: "API Integration",
  //       deadline: "2024-01-12",
  //       daysLeft: 5
  //     }
  //   ]
  // };

  // Fetch dashboard data from API
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        // Call the freelancer service to get dashboard data
        const response = await freelancerService.getDashboardData();
        
        if (response.success) {
          setDashboardData(response.data);
        } else {
          setError(response.error || 'Failed to load dashboard data');
        }
      } catch (err) {
        setError('Failed to load dashboard data');
        console.error('Error fetching dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-8 bg-gray-200 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-red-500" />
            <p className="text-red-800">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  const { stats, recentProjects, earningsData, skillsAnalytics, upcomingDeadlines } = dashboardData;

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Welcome back, {stats.name || 'Freelancer'}!</h1>
        <p className="text-indigo-100">Here's what's happening with your freelance business today.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Earnings"
          value={`₹${stats.totalEarnings.toLocaleString()}`}
          icon={DollarSign}
          trend={{ value: 12.5, isPositive: true }}
          color="green"
        />
        <StatsCard
          title="Active Contracts"
          value={stats.activeContracts}
          icon={Briefcase}
          trend={{ value: 2, isPositive: true }}
          color="blue"
        />
        <StatsCard
          title="Completed Projects"
          value={stats.completedProjects}
          icon={CheckCircle}
          trend={{ value: 8, isPositive: true }}
          color="purple"
        />
        <StatsCard
          title="Average Rating"
          value={stats.averageRating}
          icon={Star}
          trend={{ value: 0.2, isPositive: true }}
          color="yellow"
          suffix="/5.0"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Earnings Chart */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Monthly Earnings</h3>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <BarChartPlaceholder data={[
            { position: 'Aug', count: 25000 },
            { position: 'Sep', count: 32000 },
            { position: 'Oct', count: 28000 },
            { position: 'Nov', count: 35000 },
            { position: 'Dec', count: 28000 }
          ]} />
          <p className="text-sm text-gray-500 mt-2">Earnings trend over last 5 months</p>
        </div>

        {/* Skills Analytics */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Skills Distribution</h3>
            <Award className="w-5 h-5 text-purple-500" />
          </div>
          <PieChartPlaceholder data={{
            React: 35,
            'Node.js': 25,
            'UI/UX': 20,
            Python: 20
          }} />
          <p className="text-sm text-gray-500 mt-2">Projects by skill category</p>
        </div>
      </div>

      {/* Recent Projects & Upcoming Deadlines */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Projects */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Recent Projects</h3>
            <Briefcase className="w-5 h-5 text-blue-500" />
          </div>
          <div className="space-y-3">
            {recentProjects.map((project) => (
              <div key={project.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{project.title}</p>
                  <p className="text-sm text-gray-500">{project.client}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">₹{project.budget.toLocaleString()}</p>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    project.status === 'completed' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {project.status.replace('_', ' ')}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 text-center text-sm text-indigo-600 hover:text-indigo-800 font-medium">
            View All Projects →
          </button>
        </div>

        {/* Upcoming Deadlines */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Upcoming Deadlines</h3>
            <Calendar className="w-5 h-5 text-orange-500" />
          </div>
          <div className="space-y-3">
            {upcomingDeadlines.map((deadline) => (
              <div key={deadline.id} className="flex items-center justify-between p-3 bg-orange-50 rounded-lg border border-orange-200">
                <div>
                  <p className="font-medium text-gray-900">{deadline.project}</p>
                  <p className="text-sm text-gray-500">Due: {deadline.deadline}</p>
                </div>
                <div className="text-right">
                  <span className={`text-sm font-medium ${
                    deadline.daysLeft <= 3 ? 'text-red-600' : 'text-orange-600'
                  }`}>
                    {deadline.daysLeft} days left
                  </span>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 text-center text-sm text-indigo-600 hover:text-indigo-800 font-medium">
            View Calendar →
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="flex flex-col items-center p-4 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors">
            <Briefcase className="w-6 h-6 text-indigo-600 mb-2" />
            <span className="text-sm font-medium text-indigo-900">Find Work</span>
          </button>
          <button className="flex flex-col items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
            <FileText className="w-6 h-6 text-green-600 mb-2" />
            <span className="text-sm font-medium text-green-900">Submit Proposal</span>
          </button>
          <button className="flex flex-col items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
            <Users className="w-6 h-6 text-purple-600 mb-2" />
            <span className="text-sm font-medium text-purple-900">Network</span>
          </button>
          <button className="flex flex-col items-center p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors">
            <Award className="w-6 h-6 text-orange-600 mb-2" />
            <span className="text-sm font-medium text-orange-900">Update Skills</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FreelancerDashboardHome;