import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav
      style={{
        width: "100%",
        background: "#1e1e1e",
        padding: "12px 20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        color: "white",
      }}
    >
      {/* Logo / Title */}
      <div style={{ fontSize: "20px", fontWeight: "bold" }}>
        Freelance Portal
      </div>

      {/* Menu Items */}
      <div style={{ display: "flex", gap: "20px" }}>
        <Link to="/" style={linkStyle}>Home</Link>
        <Link to="/client/dashboard" style={linkStyle}>Client Dashboard</Link>
        <Link to="/freelancer/dashboard" style={linkStyle}>Freelancer Dashboard</Link>
        <Link to="/submit-proposal" style={linkStyle}>Submit Proposal</Link>
      </div>
    </nav>
  );
};

// Common link style
const linkStyle = {
  color: "white",
  textDecoration: "none",
  fontSize: "16px",
};

export default Navbar;