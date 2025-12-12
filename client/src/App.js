import React from "react";
import "./App.css";

function App() {
  return (
    <div className="dashboard">

      <header className="header">Client Dashboard</header>

      <div className="section">
        <h2>Active Projects</h2>

        <div className="card">
          <h3>Website Redesign</h3>
          <p>Start Date: 2024-11-10</p>
          <span className="status ongoing">Ongoing</span>
        </div>

        <div className="card">
          <h3>Mobile App UI</h3>
          <p>Start Date: 2024-10-20</p>
          <span className="status completed">Completed</span>
        </div>
      </div>

      <div className="section">
        <h2>Proposals</h2>

        <div className="card">
          <h3>Marketing Strategy Plan</h3>
          <p>Submitted: 2024-12-01</p>
          <span className="status pending">Pending</span>
        </div>
      </div>

      <div className="section">
        <h2>Contracts</h2>

        <div className="card">
          <h3>Logo Design Contract</h3>
          <p>Created: 2024-09-14</p>
          <span className="status active">Active</span>
        </div>
      </div>

    </div>
  );
}

export default App;
