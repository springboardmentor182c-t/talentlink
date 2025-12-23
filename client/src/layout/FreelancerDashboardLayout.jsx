import React, { useState } from "react";
import RoleBasedNavbar from "./RoleBasedNavbar.jsx";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";
import { 
  Briefcase, 
  FileText, 
  DollarSign, 
  TrendingUp, 
  MessageSquare, 
  Settings, 
  User, 
  Home,
  Clock,
  Star,
  Award
} from "lucide-react";

const FreelancerDashboardLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Freelancer-specific sidebar navigation
  const freelancerSidebarItems = [
    {
      section: "Work",
      items: [
        { icon: Home, label: "Dashboard Overview", path: "/freelancer" },
        { icon: FileText, label: "My Proposals", path: "/freelancer/proposals" },
        { icon: Clock, label: "Active Contracts", path: "/freelancer/contracts" },
        { icon: Briefcase, label: "My Jobs", path: "/freelancer/my-jobs" },
      ]
    },
    {
      section: "Analytics",
      items: [
        { icon: DollarSign, label: "Earnings", path: "/freelancer/earnings" },
        { icon: Star, label: "Reviews & Ratings", path: "/freelancer/reviews" },
      ]
    },
    {
      section: "Profile",
      items: [
        { icon: User, label: "My Profile", path: "/freelancer/profile" },
        { icon: Award, label: "Skills & Portfolio", path: "/freelancer/profile/skills" },
        { icon: Settings, label: "Settings", path: "/freelancer/profile/settings" },
      ]
    },
    {
      section: "Communication",
      items: [
        { icon: MessageSquare, label: "Messages", path: "/messages" },
      ]
    }
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-gray-50">
      {/* Freelancer-specific Sidebar */}
      <div className={`${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out`}>
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-indigo-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{user?.name || 'Freelancer'}</h3>
                <p className="text-sm text-gray-500 capitalize">{user?.role}</p>
              </div>
            </div>
            
            {/* Quick Stats */}
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="bg-green-50 p-3 rounded-lg">
                <p className="text-xs text-green-600 font-medium">Active</p>
                <p className="text-lg font-bold text-green-700">{user?.activeContracts || 0}</p>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-xs text-blue-600 font-medium">Rating</p>
                <p className="text-lg font-bold text-blue-700">{user?.rating || 'N/A'}</p>
              </div>
            </div>
          </div>

          {/* Navigation Sections */}
          <nav className="flex-1 overflow-y-auto p-4">
            {freelancerSidebarItems.map((section, sectionIndex) => (
              <div key={sectionIndex} className="mb-6">
                <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-3">
                  {section.section}
                </h4>
                <ul className="space-y-1">
                  {section.items.map((item, itemIndex) => (
                    <li key={itemIndex}>
                      <button
                        onClick={() => handleNavigation(item.path)}
                        className={`w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                          location.pathname === item.path 
                            ? 'bg-indigo-100 text-indigo-700' 
                            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                        }`}
                      >
                        <item.icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-gray-200">
            <div className="text-xs text-gray-500 text-center">
              <p>Freelancer Dashboard</p>
              <p className="mt-1">v1.0.0</p>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 w-full overflow-hidden">
        {/* Role-based Navbar */}
        <RoleBasedNavbar onMenuClick={() => setIsOpen(!isOpen)} />

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto w-full">
          <div className="p-6">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreelancerDashboardLayout;