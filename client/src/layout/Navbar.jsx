import React from "react";
import { Search, Bell, User, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navbar = ({ onMenuClick, userName = "John" }) => {
  const navigate = useNavigate();

  const goToNotifications = () => {
    navigate("/notifications");
  };

  const goToProfile = () => {
    navigate("/profile");
  };

  return (
    <header className="bg-white border-b border-gray-200 px-4 lg:px-6 py-4">
      <div className="flex items-center justify-between gap-4">
        {/* Left: hamburger + search */}
        <div className="flex items-center gap-4 flex-1">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
          >
            <Menu className="w-6 h-6" />
          </button>

          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Right: notifications + profile */}
        <div className="flex items-center gap-4">
          <button
            className="p-2 hover:bg-gray-100 rounded-full relative"
            onClick={goToNotifications}
          >
            <Bell className="w-6 h-6 text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          </button>

          <button
            className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-full"
            onClick={goToProfile}
          >
            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
              <User className="w-5 h-5 text-indigo-600" />
            </div>
            <span className="hidden sm:inline text-sm font-medium text-gray-700">
              {userName}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
