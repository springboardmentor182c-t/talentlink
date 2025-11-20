import React from "react";
import { Search, Bell, User, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navbar = ({ onMenuClick, userName = "John" }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white border-b border-gray-200 px-4 lg:px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left: menu + search */}
        <div className="flex items-center gap-4 flex-1">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>

          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Right: icons */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <button
            onClick={() => navigate("/notifications")}
            className="p-2 hover:bg-gray-100 rounded-full relative transition-colors"
          >
            <Bell className="w-6 h-6 text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          </button>

          {/* Profile */}
          <button
            onClick={() => navigate("/profile")}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <User className="w-6 h-6 text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
