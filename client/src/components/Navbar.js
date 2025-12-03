import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={{
      display: "flex",
      justifyContent: "space-between",
      padding: "15px 20px",
      background: "#e3e3e3",
      alignItems: "center"
    }}>
      <h2>TalentLink</h2>

      <div style={{ display: "flex", gap: "20px" }}>
        <Link to="/">Home</Link>
        <Link to="/freelancer-dashboard">Dashboard</Link>

        {/* Submit Proposal Button */}
        <Link to="/submit-proposal">
          <button style={{
            padding: "8px 14px",
            borderRadius: "6px",
            border: "none",
            fontWeight: "bold",
            cursor: "pointer"
          }}>
            Submit Proposal
          </button>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;