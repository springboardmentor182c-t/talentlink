import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaHome, FaUsers, FaFileAlt, FaSignOutAlt } from "react-icons/fa";
import { logout } from "./utils";

const logo = "/mnt/data/WhatsApp Image 2025-11-24 at 9.46.20 PM.jpeg";

export default function Sidebar() {
  const loc = useLocation();
  const nav = useNavigate();
  const menu = [
    { name: "Dashboard", to: "/dashboard", icon: <FaHome /> },
    { name: "Clients", to: "/clients", icon: <FaUsers /> },
    { name: "Reports", to: "/reports", icon: <FaFileAlt /> },
  ];

  function handleLogout() {
    logout();
    nav("/");
  }

  return (
    <aside className="sidebar">
      <div className="logo-row">
        <img src={logo} alt="logo" className="logo-img" />
        <div>
          <h2 className="logo-title">Client Panel</h2>
          <div className="logo-sub">Admin</div>
        </div>
      </div>

      <nav className="menu">
        {menu.map((m) => {
          const active = loc.pathname === m.to || loc.pathname === m.to + "/";
          return (
            <Link key={m.to} to={m.to} className={`menu-item ${active ? "active" : ""}`}>
              <span className="icon">{m.icon}</span>
              <span>{m.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="bottom">
        <button className="menu-item logout-btn" onClick={handleLogout}>
          <FaSignOutAlt /> <span style={{ marginLeft: 8 }}>Logout</span>
        </button>
      </div>
    </aside>
  );
}
