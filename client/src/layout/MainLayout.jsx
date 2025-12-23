import React, { useState } from "react";
import { ClientSidebar } from "./ClientSidebar.jsx";
import FreelancerSidebar from "./FreelancerSidebar.jsx";
import Navbar from "./Navbar.jsx";
import { useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { NotificationProvider } from "../contexts/NotificationContext.jsx";

const MainLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <NotificationProvider>
      <div className="flex h-screen w-full overflow-hidden bg-white">
        {/* Sidebar: use FreelancerSidebar for /freelancer routes, Sidebar for /client */}
        {location.pathname.startsWith("/freelancer") ? (
          <FreelancerSidebar isOpen={isOpen} onClose={() => setIsOpen(false)} />
        ) : (
          <ClientSidebar isOpen={isOpen} onClose={() => setIsOpen(false)} />
        )}

        {/* Main Content Area */}
        <div className="flex flex-col flex-1 w-full overflow-hidden">
          {/* Navbar */}
          <Navbar onMenuClick={() => setIsOpen(!isOpen)} />

          {/* Page Content (Routing Outlet) */}
          <div className="flex-1 overflow-y-auto w-full bg-gray-50">
            <div className="p-4 sm:p-6 lg:p-8">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </NotificationProvider>
  );
};

export default MainLayout;
