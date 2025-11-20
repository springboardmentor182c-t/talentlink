import React from "react";
import { Routes, Route } from "react-router-dom";

import Dashboard from "./components/Dashboard/Dashboard";
import Candidates from "./components/Pages/Candidates";
import Jobs from "./components/Pages/Jobs";
import Messages from "./components/Pages/Messages";
import Notifications from "./components/Pages/Notifications";
import ClientProfile from "./components/Pages/ClientProfile";
import "./App.css";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/candidates" element={<Candidates />} />
      <Route path="/candidates/:id" element={<Candidates />} />
      <Route path="/jobs" element={<Jobs />} />
      <Route path="/jobs/:id" element={<Jobs />} />
      <Route path="/messages" element={<Messages />} />
      <Route path="/notifications" element={<Notifications />} />
      <Route path="/profile" element={<ClientProfile />} />
    </Routes>
  );
}
