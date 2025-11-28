import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

import Dashboard from "./pages/Dashboard";
import Clients from "./pages/Clients";
import Reports from "./pages/Reports";

import "./index.css";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* LOGIN PAGE FIRST */}
        <Route path="/" element={<Login />} />

        {/* MAIN DASHBOARD LAYOUT */}
        <Route
          path="/dashboard"
          element={
            <div className="app">
              <Sidebar />
              <div className="main-area">
                <Header />
                <Dashboard />
              </div>
            </div>
          }
        />

        <Route
          path="/clients"
          element={
            <div className="app">
              <Sidebar />
              <div className="main-area">
                <Header />
                <Clients />
              </div>
            </div>
          }
        />

        <Route
          path="/reports"
          element={
            <div className="app">
              <Sidebar />
              <div className="main-area">
                <Header />
                <Reports />
              </div>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}
