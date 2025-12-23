import React, { useState } from "react";
import Sidebar from "./Sidebar.jsx";
import Navbar from "./Navbar.jsx";
import RoleBasedNavbar from "./RoleBasedNavbar.jsx";
import { Outlet } from "react-router-dom";
import { NotificationProvider } from "../contexts/NotificationContext.jsx";
import { useAuth } from "../contexts/AuthContext";

const MainLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();

  return (
    <NotificationProvider>
      <div className="flex h-screen w-full overflow-hidden bg-white">
        {/* Sidebar */}
        <Sidebar isOpen={isOpen} onClose={() => setIsOpen(false)} />

        {/* Main Content Area */}
        <div className="flex flex-col flex-1 w-full overflow-hidden">
          {/* Navbar - Role based: Freelancer gets new UI, Client/Anonymous gets old UI */}
          {user?.role === 'freelancer' ? (
            <RoleBasedNavbar onMenuClick={() => setIsOpen(!isOpen)} />
          ) : (
            <Navbar onMenuClick={() => setIsOpen(!isOpen)} />
          )}

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
