// client/src/App.js

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// ---------- Import Your Existing Pages -----------
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

// ---------- Import Notification Page -----------
import NotificationsPage from "./features/notifications/pages/NotificationsPage";

function App() {
  return (
    <Router>
      <Routes>
        {/* -------- Default Routes -------- */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* -------- Notifications Route -------- */}
        <Route path="/notifications" element={<NotificationsPage />} />
      </Routes>
    </Router>
  );
}

export default App;