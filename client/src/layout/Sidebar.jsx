import React from "react";
import {
  Menu,
  X,
  Briefcase,
  MessageSquare,
  Users,
  FolderKanban,
  FileText,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { icon: <Menu className="w-5 h-5" />, label: "Dashboard", path: "/" },
    { icon: <Users className="w-5 h-5" />, label: "Candidates", path: "/candidates" },
    { icon: <Briefcase className="w-5 h-5" />, label: "Jobs", path: "/jobs" },
    { icon: <FolderKanban className="w-5 h-5" />, label: "My Projects", path: "/projects" },
    { icon: <FileText className="w-5 h-5" />, label: "Contracts", path: "/contracts" },
    { icon: <MessageSquare className="w-5 h-5" />, label: "Messages", path: "/messages" },
  ];

  const handleClick = (path) => {
    navigate(path);
    onClose && onClose();
  };

  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed lg:static inset-y-0 left-0 z-50
          w-64 bg-gradient-to-b from-indigo-600 to-indigo-700 text-white shadow-xl
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-6 border-b border-indigo-500">
            <h1 className="text-xl font-bold tracking-wide">Talent Link</h1>
            <button
              onClick={onClose}
              className="lg:hidden hover:bg-indigo-500 p-1 rounded transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Menu Items */}
          <nav className="flex-1 p-4 space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleClick(item.path)}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-lg
                  transition-all duration-200
                  ${
                    isActive(item.path)
                      ? "bg-white text-indigo-700 shadow-md font-semibold"
                      : "text-indigo-100 hover:bg-indigo-500 hover:text-white"
                  }
                `}
              >
                {item.icon}
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-indigo-500">
            <div className="text-xs text-indigo-200 text-center">
              © 2024 Talent Link
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
