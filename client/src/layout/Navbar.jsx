import React from "react";
import { Search, Bell, User, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navbar = ({ onMenuClick, userName = "" }) => {
  const navigate = useNavigate();

  const goToNotifications = () => {
    navigate("/notifications");
  };

  const goToProfile = () => {
    navigate("/profile");
  };

  return (
    <header className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-3 sm:py-4 sticky top-0 z-30">
      <div className="flex items-center justify-between gap-4 max-w-full">
        {/* Left: hamburger + search */}
        <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg flex-shrink-0"
          >
            <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          <div className="relative flex-1 max-w-xs sm:max-w-sm md:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
            <input
              type="text"
              placeholder="Search"
              className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Right: notifications + profile */}
        <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
          <button
            className="p-2 hover:bg-gray-100 rounded-full relative transition-colors"
            onClick={goToNotifications}
            title="Notifications"
          >
            <Bell className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          </button>

          <button
            className="flex items-center gap-2 p-1 sm:p-2 hover:bg-gray-100 rounded-lg transition-colors"
            onClick={goToProfile}
            title="Profile"
          >
            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
              <User className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600" />
            </div>
            {userName ? (
              <span className="hidden sm:inline text-xs sm:text-sm font-medium text-gray-700">
                {userName}
              </span>
            ) : null}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
