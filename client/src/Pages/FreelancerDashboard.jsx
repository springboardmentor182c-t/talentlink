import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { DollarSign, Briefcase, TrendingUp } from "lucide-react";
import BarChartPlaceholder from "../components/BarChartPlaceholder.jsx";

const FreelancerDashboard = () => {
  const { user } = useAuth();

  // Mock data for freelancer stats
  const freelancerStats = {
    totalEarnings: "₹0",
    activeContracts: 0,
    monthlyEarnings: [
      { month: "Aug", amount: 25000 },
      { month: "Sep", amount: 32000 },
      { month: "Oct", amount: 28000 },
      { month: "Nov", amount: 35000 },
      { month: "Dec", amount: 28000 },
    ]
  };

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-indigo-600 rounded-xl p-8 text-white relative overflow-hidden shadow-lg">
        <div className="relative z-10">
          <h2 className="text-3xl font-bold mb-2">
            Welcome back, Full Stack Developer!
          </h2>
          <p className="text-indigo-100 opacity-90">
            Here's what's happening with your freelance business today.
          </p>
        </div>
        {/* Decorative background circle */}
        <div className="absolute top-[-50px] right-[-50px] w-64 h-64 bg-indigo-500 rounded-full opacity-20 blur-3xl"></div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500 mb-1">Total Earnings</p>
            <h3 className="text-3xl font-bold text-gray-900">{freelancerStats.totalEarnings}</h3>
          </div>
          <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
            <DollarSign className="w-6 h-6 text-green-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500 mb-1">Active Contracts</p>
            <h3 className="text-3xl font-bold text-gray-900">{freelancerStats.activeContracts}</h3>
          </div>
          <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
            <Briefcase className="w-6 h-6 text-blue-600" />
          </div>
        </div>
      </div>

      {/* Monthly Earnings Chart */}
      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-gray-900 font-sans">Monthly Earnings</h3>
          <TrendingUp className="w-5 h-5 text-green-500" />
        </div>
        
        <div className="h-[300px] w-full">
           {/* Reusing BarChartPlaceholder but for Monthly Earnings */}
           <div className="text-center mb-4 text-gray-500 font-medium">Candidates By Position</div>
           <BarChartPlaceholder />
        </div>
        <p className="text-xs text-gray-400 mt-4 text-center">Earnings trend over last 5 months</p>
      </div>
    </div>
  );
};

export default FreelancerDashboard;