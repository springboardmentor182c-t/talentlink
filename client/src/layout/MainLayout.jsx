import React, { useState } from "react";
import Sidebar from "./Sidebar.jsx";
import Navbar from "./Navbar.jsx";
import { Outlet } from "react-router-dom";
import { NotificationProvider } from "../contexts/NotificationContext.jsx";

const MainLayout = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen w-full bg-white">
      {/* Main Layout with Sidebar and Content */}
      <div className="flex flex-1 w-full">
    <NotificationProvider>
      <div className="flex min-h-screen w-full bg-white">
        {/* Sidebar */}
        <Sidebar isOpen={isOpen} onClose={() => setIsOpen(false)} />

        {/* Main content */}
        <div className="flex flex-col flex-1 w-full">
          <Navbar onMenuClick={() => setIsOpen(!isOpen)} />

          {/* Page Content (Routing Outlet) */}
          <div className="flex-1 overflow-y-auto w-full p-6 bg-gray-50">
            <Outlet />
          </div>
        </div>
      </div>
    </NotificationProvider>
  );
};

export default MainLayout;
