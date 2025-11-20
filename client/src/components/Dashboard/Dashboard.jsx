import React, { useState } from 'react';
import Navbar from '../../layout/Navbar';
import Sidebar from '../../layout/Sidebar';
import StatsCard from './StatsCard';
import BarChartPlaceholder from './BarChartPlaceholder';
import PieChartPlaceholder from './PieChartPlaceholder';
import RecentMessages from './RecentMessages';
import mockData from '../../data/mockDashboard.json';

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar onMenuClick={() => setSidebarOpen(true)} userName="John" />
        
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6">Welcome, John!</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              <StatsCard title="Total Candidates" value={mockData.totalCandidates} />
              <div className="lg:col-span-2">
                <BarChartPlaceholder data={mockData.candidatesByPosition} />
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <PieChartPlaceholder data={mockData.candidatesByStatus} />
              <RecentMessages messages={mockData.recentMessages} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;