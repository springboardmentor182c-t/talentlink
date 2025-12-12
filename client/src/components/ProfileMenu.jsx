import React from "react";
import { ChevronDown, User, Settings, LogOut, Briefcase } from "lucide-react";

const ProfileMenu = ({ isOpen, setIsOpen, menuRef, buttonRef }) => {
  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 transition-colors"
      >
        <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center">
          <span className="text-white text-sm font-medium">JD</span>
        </div>
        <span className="text-sm font-medium text-gray-700 hidden sm:block">
          John Doe
        </span>
        <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform ${
          isOpen ? "rotate-180" : ""
        }`} />
      </button>

      {isOpen && (
        <div
          ref={menuRef}
          className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200"
        >
          <div className="px-4 py-2 border-b border-gray-200">
            <p className="text-sm font-medium text-gray-900">John Doe</p>
            <p className="text-xs text-gray-500">john.doe@example.com</p>
          </div>
          
          <a
            href="#"
            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            <User className="h-4 w-4 mr-3" />
            Profile
          </a>
          
          <a
            href="#"
            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            <Briefcase className="h-4 w-4 mr-3" />
            My Projects
          </a>
          
          <a
            href="#"
            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            <Settings className="h-4 w-4 mr-3" />
            Settings
          </a>
          
          <div className="border-t border-gray-200">
            <a
              href="#"
              className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50"
            >
              <LogOut className="h-4 w-4 mr-3" />
              Sign Out
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;