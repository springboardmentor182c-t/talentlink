import React from "react";
import {
  Menu,
  X,
  MessageSquare,
  Users,
  FolderKanban,
  FileText,
  Briefcase,
  User,
  LogOut,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

export const ClientSidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const menuItems = [
    { icon: <Menu className="w-5 h-5" />, label: "Dashboard", path: "/client" },
    { icon: <Users className="w-5 h-5" />, label: "Candidates", path: "/candidates" },
    { icon: <FolderKanban className="w-5 h-5" />, label: "My Projects", path: "/projects" },
    { icon: <FileText className="w-5 h-5" />, label: "Contracts", path: "/contracts" },
    { icon: <MessageSquare className="w-5 h-5" />, label: "Messages", path: "/client/messages" },
  ];
  const handleClick = (path) => {
    if (["/candidates", "/jobs", "/projects", "/contracts", "/messages", "/profile"].some(p => path === p || path.startsWith(p + "/"))) {
      navigate(`/client${path}`);
    } else if (path === "/client" || path.startsWith("/client/")) {
      navigate(path);
    } else {
      navigate(path);
    }
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
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={onClose} />
      )}
      <div className={`fixed lg:static inset-y-0 left-0 z-50 h-screen lg:h-auto w-64 bg-gradient-to-b from-indigo-600 to-indigo-700 text-white shadow-xl transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between px-6 py-4 border-b border-indigo-500">
            <h1 className="text-lg font-bold tracking-wide">Talent Link</h1>
            <button onClick={onClose} className="lg:hidden hover:bg-indigo-500 p-2 rounded">
              <X className="w-5 h-5" />
            </button>
          </div>
          <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
            {menuItems.map((item) => (
              <button key={item.label} onClick={() => handleClick(item.path)} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${isActive(item.path) ? "bg-white text-indigo-700 shadow font-semibold" : "text-indigo-100 hover:bg-indigo-500 hover:text-white"}`}>
                {item.icon}
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
          <div className="px-4 py-4 border-t border-indigo-500">
            <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-indigo-100 hover:bg-red-500 hover:text-white transition-all">
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Logout</span>
            </button>
            <div className="text-xs text-indigo-200 text-center mt-3">© 2025 Talent Link</div>
          </div>
        </div>
      </div>
    </>
  );
};
