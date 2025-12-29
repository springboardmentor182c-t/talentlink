import React from "react";
import {
  LayoutDashboard,
  FileText,
  Briefcase,
  MessageSquare,
  User,
  LogOut,
  DollarSign,
  Star,
  Settings,
  FolderKanban,
  ClipboardList,
  X,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const FreelancerSidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { icon: <LayoutDashboard className="w-5 h-5" />, label: "Dashboard Overview", path: "/freelancer" },
    { icon: <User className="w-5 h-5" />, label: "My Profile", path: "/freelancer/profile" },
    { icon: <FileText className="w-5 h-5" />, label: "My Proposals", path: "/freelancer/proposals" },
    { icon: <Briefcase className="w-5 h-5" />, label: "Active Contracts", path: "/freelancer/contracts" },
    { icon: <ClipboardList className="w-5 h-5" />, label: "Find Work", path: "/freelancer/jobs" },
    { icon: <DollarSign className="w-5 h-5" />, label: "Earnings", path: "/freelancer/earnings" },
    { icon: <MessageSquare className="w-5 h-5" />, label: "Messages", path: "/freelancer/messages" },
    { icon: <Star className="w-5 h-5" />, label: "Reviews & Ratings", path: "/freelancer/reviews-ratings" },
    { icon: <Settings className="w-5 h-5" />, label: "Settings", path: "/freelancer/profile/settings" },

  ];

  const handleClick = (path) => {
    navigate(path);
    onClose && onClose();
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userRole");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const isActive = (path) => {
    if (path === "/freelancer") return location.pathname === "/freelancer";
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      <div
        className={`fixed lg:static inset-y-0 left-0 z-50 h-screen lg:h-auto
          w-64 bg-gradient-to-b from-teal-600 to-teal-700 text-white shadow-xl
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-teal-500">
            <h1 className="text-lg font-bold tracking-wide">TalentLink</h1>
            <button
              onClick={onClose}
              className="lg:hidden hover:bg-teal-500 p-2 rounded"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          {/* Menu Items */}
          <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
            {menuItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleClick(item.path)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg
                  transition-all duration-200 ${
                  isActive(item.path)
                    ? "bg-white text-teal-700 shadow font-semibold"
                    : "text-teal-100 hover:bg-teal-500 hover:text-white"
                }`}
              >
                {item.icon}
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
          {/* Logout + Footer */}
          <div className="px-4 py-4 border-t border-teal-500">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg
              text-teal-100 hover:bg-red-500 hover:text-white transition-all"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Logout</span>
            </button>
            <div className="text-xs text-teal-200 text-center mt-3">
              © 2025 Talent Link
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FreelancerSidebar;
