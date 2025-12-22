import React, { useState } from "react";
import RoleBasedNavbar from "./RoleBasedNavbar.jsx";
import FreelancerSidebar from "./FreelancerSidebar.jsx";
import { Outlet } from "react-router-dom";

const FreelancerDashboardLayout = ({ userRole = "freelancer", userName = "John Doe" }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-gray-50">
      {/* Sidebar */}
      <FreelancerSidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)}
        userName={userName}
      />

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 w-full overflow-hidden">
        {/* Navbar */}
        <RoleBasedNavbar 
          onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
          userRole={userRole}
          userName={userName}
        />

        {/* Page Content (Routing Outlet) */}
        <div className="flex-1 overflow-y-auto w-full">
          <div className="p-4 sm:p-6 lg:p-8">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreelancerDashboardLayout;