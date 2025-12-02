import React from "react";

export default function Header() {
  return (
    <header className="header">
      <div className="header-left">
        <h1>Dashboard Overview</h1>
      </div>

      <div className="header-right">
        <input className="search" placeholder="Search clients, projects..." />
        <div className="profile-pill">Divya</div>
      </div>
    </header>
  );
}
