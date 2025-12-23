import React from "react";
import { Search, Bell, User, Menu, Briefcase, DollarSign, TrendingUp, FileText, Settings, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const RoleBasedNavbar = ({ onMenuClick }) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    const result = await logout();
    if (result.success) {
      navigate('/login');
    }
  };

  const goToNotifications = () => {
    navigate("/notifications");
  };

  const goToProfile = () => {
    if (user?.role === 'freelancer') {
      navigate("/freelancer/profile");
    } else {
      navigate("/profile");
    }
  };

  const goToDashboard = () => {
    if (user?.role === 'freelancer') {
      navigate("/freelancer");
    } else {
      navigate("/");
    }
  };

  const goToContracts = () => {
    navigate("/contracts");
  };

  const goToProposals = () => {
    navigate("/proposals");
  };

  const goToProjects = () => {
    navigate("/projects");
  };

  const goToSettings = () => {
    if (user?.role === 'freelancer') {
      navigate("/freelancer/profile/settings");
    } else {
      navigate("/profile/settings");
    }
  };

  // Freelancer-specific navigation items
  const freelancerNavItems = [
    // Navigation items removed as requested
  ];

  // Client-specific navigation items
  const clientNavItems = [
    { icon: Briefcase, label: 'Projects', action: goToProjects },
    { icon: FileText, label: 'Proposals', action: goToProposals },
    { icon: DollarSign, label: 'Contracts', action: goToContracts },
    { icon: TrendingUp, label: 'Analytics', action: () => navigate('/analytics') },
  ];

  const navItems = user?.role === 'freelancer' ? freelancerNavItems : clientNavItems;

  return (
    <header className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-3 sm:py-4 sticky top-0 z-30">
      <div className="flex items-center justify-between gap-4 max-w-full">
        {/* Left: hamburger + logo + role-specific nav */}
        <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg flex-shrink-0"
          >
            <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Logo */}
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-indigo-600 cursor-pointer" onClick={goToDashboard}>
              TalentLink
            </h1>
            <span className="px-2 py-1 text-xs font-medium bg-indigo-100 text-indigo-700 rounded-full capitalize">
              {user?.role}
            </span>
          </div>

          {/* Role-specific navigation - Desktop */}
          <nav className="hidden lg:flex items-center gap-1 ml-8">
            {navItems.map((item, index) => (
              <button
                key={index}
                onClick={item.action}
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Right: search + notifications + profile */}
        <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
          {/* Search */}
          <div className="relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search projects, clients..."
              className="w-48 pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Notifications */}
          <button
            className="p-2 hover:bg-gray-100 rounded-full relative transition-colors"
            onClick={goToNotifications}
            title="Notifications"
          >
            <Bell className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          </button>

          {/* Profile Dropdown */}
          <div className="relative group">
            <button
              className="flex items-center gap-2 p-1 sm:p-2 hover:bg-gray-100 rounded-lg transition-colors"
              onClick={goToProfile}
              title="Profile"
            >
              <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                <User className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600" />
              </div>
              <span className="hidden sm:inline text-xs sm:text-sm font-medium text-gray-700">
                {user?.name || 'User'}
              </span>
            </button>

            {/* Dropdown Menu */}
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="py-1">
                <button
                  onClick={goToProfile}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                >
                  <User className="w-4 h-4" />
                  View Profile
                </button>
                <button
                  onClick={goToSettings}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                >
                  <Settings className="w-4 h-4" />
                  Settings
                </button>
                <hr className="my-1" />
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="lg:hidden mt-2 border-t border-gray-200 pt-2">
        <div className="flex items-center justify-around">
          {navItems.map((item, index) => (
            <button
              key={index}
              onClick={item.action}
              className="flex flex-col items-center gap-1 p-2 text-gray-600 hover:text-gray-900"
            >
              <item.icon className="w-5 h-5" />
              <span className="text-xs">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};

export default RoleBasedNavbar;