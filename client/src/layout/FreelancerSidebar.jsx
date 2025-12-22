import React from "react";
import {
  BarChart3,
  Search,
  Briefcase,
  FileText,
  MessageSquare,
  User,
  Settings,
  HelpCircle,
  Clock,
  CheckCircle,
  DollarSign,
  Star,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const FreelancerSidebar = ({ isOpen, onClose, userName = "John Doe" }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const freelancerMenuItems = [
    {
      icon: BarChart3,
      label: "Dashboard",
      path: "/freelancer/dashboard",
      description: "Overview & Stats",
    },
    {
      icon: Search,
      label: "Find Work",
      path: "/freelancer/find-work",
      description: "Browse Projects",
    },
    {
      icon: Briefcase,
      label: "My Jobs",
      path: "/freelancer/my-jobs",
      description: "Active Projects",
      badge: "2",
    },
    {
      icon: FileText,
      label: "Proposals",
      path: "/freelancer/proposals",
      description: "Submitted Bids",
      badge: "5",
    },
    {
      icon: CheckCircle,
      label: "Contracts",
      path: "/freelancer/contracts",
      description: "Active Contracts",
      badge: "1",
    },
    {
      icon: Clock,
      label: "Time Tracker",
      path: "/freelancer/time-tracker",
      description: "Work Hours",
    },
    {
      icon: DollarSign,
      label: "Earnings",
      path: "/freelancer/earnings",
      description: "Revenue & Stats",
    },
    {
      icon: Star,
      label: "Reviews",
      path: "/freelancer/reviews",
      description: "Client Feedback",
    },
    {
      icon: MessageSquare,
      label: "Messages",
      path: "/freelancer/messages",
      description: "Client Communication",
      badge: "3",
    },
    {
      icon: User,
      label: "Profile",
      path: "/freelancer/profile",
      description: "Portfolio & Skills",
    },
    {
      icon: Settings,
      label: "Settings",
      path: "/freelancer/settings",
      description: "Account Preferences",
    },
    {
      icon: HelpCircle,
      label: "Help & Support",
      path: "/freelancer/help",
      description: "Get Assistance",
    },
  ];

  const handleClick = (path) => {
    navigate(path);
    onClose && onClose();
  };

  const isActive = (path) => {
    if (path === "/freelancer/dashboard") {
      return location.pathname === "/freelancer/dashboard" || location.pathname === "/freelancer";
    }
    return location.pathname.startsWith(path);
  };

  const getTotalNotifications = () => {
    return freelancerMenuItems.reduce((total, item) => {
      return total + (parseInt(item.badge) || 0);
    }, 0);
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Desktop Sidebar */}
      <div className={`hidden lg:flex lg:flex-col lg:w-64 bg-white border-r border-gray-200 min-h-screen transition-all duration-300`}>
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
              <Briefcase className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <h2 className="font-semibold text-gray-900">{userName}</h2>
              <p className="text-sm text-gray-600">Freelancer</p>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {freelancerMenuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            
            return (
              <button
                key={item.path}
                onClick={() => handleClick(item.path)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg
                  transition-all duration-200 text-left group relative
                  ${active
                    ? 'bg-indigo-100 text-indigo-700 border border-indigo-200 font-semibold'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <Icon className={`w-5 h-5 ${active ? 'text-indigo-600' : 'text-gray-500'}`} />
                <div className="flex-1">
                  <span className="font-medium text-sm">{item.label}</span>
                  <p className="text-xs text-gray-500 mt-0.5">{item.description}</p>
                </div>
                
                {item.badge && (
                  <span className={`px-2 py-1 text-xs font-bold rounded-full ${
                    active 
                      ? "bg-indigo-600 text-white" 
                      : "bg-red-500 text-white"
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200">
          <div className="text-xs text-gray-500 text-center">
            <p>Freelancer Panel v1.0</p>
            <p className="mt-1">© 2024 TalentLink</p>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:hidden ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-indigo-600" />
              </div>
              <div>
                <h2 className="font-semibold text-gray-900">{userName}</h2>
                <p className="text-sm text-gray-600">Freelancer</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="lg:hidden hover:bg-gray-100 p-2 rounded-lg transition-colors"
            >
              <BarChart3 className="w-5 h-5 rotate-45" />
            </button>
          </div>

          {/* Menu Items */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {freelancerMenuItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              
              return (
                <button
                  key={item.path}
                  onClick={() => handleClick(item.path)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg
                    transition-all duration-200 text-left group relative
                    ${active
                      ? 'bg-indigo-100 text-indigo-700 border border-indigo-200 font-semibold'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${active ? 'text-indigo-600' : 'text-gray-500'}`} />
                  <div className="flex-1">
                    <span className="font-medium text-sm">{item.label}</span>
                    <p className="text-xs text-gray-500 mt-0.5">{item.description}</p>
                  </div>
                  
                  {item.badge && (
                    <span className={`px-2 py-1 text-xs font-bold rounded-full ${
                      active 
                        ? "bg-indigo-600 text-white" 
                        : "bg-red-500 text-white"
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200">
            <div className="text-xs text-gray-500 text-center">
              <p>Freelancer Panel v1.0</p>
              <p className="mt-1">© 2024 TalentLink</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FreelancerSidebar;