import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export function Sidebar() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("dashboard");

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="w-40 bg-sidebar min-h-screen flex flex-col p-5 gap-8">
      <div className="flex gap-1 bg-white/30 p-1 rounded-lg">
        <button
          onClick={() => setActiveTab("freelancer")}
          className={`flex-1 px-2 py-1.5 text-xs font-bold rounded transition-colors whitespace-nowrap ${
            activeTab === "freelancer"
              ? "bg-white text-sidebar-foreground shadow-sm"
              : "text-sidebar-foreground hover:bg-white/20"
          }`}
        >
          Freelancer
        </button>
        <button
          onClick={() => setActiveTab("dashboard")}
          className={`flex-1 px-2 py-1.5 text-xs font-bold rounded transition-colors whitespace-nowrap ${
            activeTab === "dashboard"
              ? "bg-white text-sidebar-foreground shadow-sm"
              : "text-sidebar-foreground hover:bg-white/20"
          }`}
        >
          Dashboard
        </button>
      </div>

      <nav className="flex flex-col gap-3">
        <Link
          to="/"
          className={`px-4 py-3 rounded-lg text-sm font-medium transition-all ${
            isActive("/")
              ? "bg-white text-sidebar-foreground shadow-sm"
              : "text-sidebar-foreground hover:bg-white/20"
          }`}
        >
          Find Projects
        </Link>
        <Link
          to="/saved"
          className={`px-4 py-3 rounded-lg text-sm font-medium transition-all ${
            isActive("/saved")
              ? "bg-white text-sidebar-foreground shadow-sm"
              : "text-sidebar-foreground hover:bg-white/20"
          }`}
        >
          Saved Projects
        </Link>
        <Link
          to="/"
          className={`px-4 py-3 rounded-lg text-sm font-medium transition-all ${
            isActive("/dashboard")
              ? "bg-white text-sidebar-foreground shadow-sm"
              : "text-sidebar-foreground hover:bg-white/20"
          }`}
        >
          Dashboard
        </Link>
        <Link
          to="/settings"
          className={`px-4 py-3 rounded-lg text-sm font-medium transition-all ${
            isActive("/settings")
              ? "bg-white text-sidebar-foreground shadow-sm"
              : "text-sidebar-foreground hover:bg-white/20"
          }`}
        >
          Settings
        </Link>
      </nav>
    </div>
  );
}
