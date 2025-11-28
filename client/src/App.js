// import React from 'react';
// import './App.css';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import ForgotPassword from './pages/ForgotPassword';
// import Login from './pages/Login';
// import Home from './pages/Home'; // Assuming you have this
// import Signup from './pages/Signup'; 
// import VerifyOtp from './pages/VerifyOtp';
// import ResetPassword from './pages/ResetPassword';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/verify-otp" element={<VerifyOtp />} />
//         <Route path="/forgot-password" element={<ForgotPassword />} />
//         <Route path="/reset-password" element={<ResetPassword />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;


// import React from "react";
// import "./App.css";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// /* ===== AuthFlow UI Pages ===== */
// import Home from "./pages/Home";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import VerifyOtp from "./pages/VerifyOtp";
// import ForgotPassword from "./pages/ForgotPassword";
// import ResetPassword from "./pages/ResetPassword";

// /* ===== Freelancer / Client Dashboard ===== */
// import ClientDashboard from "./freelancer_pages/client/ClientDashboard";
// import FreelancerDashboard from "./freelancer_pages/freelancer/FreelancerDashboard";

// /* Protected Route */
// import ProtectedRoute from "./freelancer_components/ProtectedRoute";

// /* ===== Notifications ===== */
// import NotificationHome from "./notifications/features/notifications/pages/NotificationsPage";
// import NotificationItem from "./notifications/features/notifications/components/NotificationItem";

// /* ===== Optional 404 Page ===== */
// import NotFound from "./freelancer_pages/NotFound"; // If you want

// function App() {
//   return (
//     <Router>
//       <Routes>
//         {/* ===================== */}
//         {/* PUBLIC AUTHFLOW ROUTES */}
//         {/* ===================== */}
//         <Route path="/" element={<Home />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/verify-otp" element={<VerifyOtp />} />
//         <Route path="/forgot-password" element={<ForgotPassword />} />
//         <Route path="/reset-password" element={<ResetPassword />} />

//         {/* ===================== */}
//         {/* PROTECTED CLIENT DASHBOARD */}
//         {/* ===================== */}
//         <Route
//           path="/client/*"
//           element={
//             <ProtectedRoute allowedRole="client">
//               <ClientDashboard />
//             </ProtectedRoute>
//           }
//         />

//         {/* ===================== */}
//         {/* PROTECTED FREELANCER DASHBOARD */}
//         {/* ===================== */}
//         <Route
//           path="/freelancer/*"
//           element={
//             <ProtectedRoute allowedRole="freelancer">
//               <FreelancerDashboard />
//             </ProtectedRoute>
//           }
//         />

//         {/* ===================== */}
//         {/* NOTIFICATIONS MODULE */}
//         {/* ===================== */}
//         <Route path="/notifications" element={<NotificationHome />} />
//         <Route path="/notifications/:id" element={<NotificationItem />} />

//         {/* ===================== */}
//         {/* 404 HANDLING */}
//         {/* ===================== */}
//         <Route path="/404" element={<NotFound />} />
//         <Route path="*" element={<Navigate to="/404" />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;



//latest if not remove 

import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

/* ===== AuthFlow UI Pages ===== */
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import VerifyOtp from "./pages/VerifyOtp";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

/* ===== Freelancer / Client Dashboard ===== */
import ClientDashboard from "./freelancer_pages/client/ClientDashboard";
import FreelancerDashboard from "./freelancer_pages/freelancer/FreelancerDashboard";

/* ===== Notifications ===== */
import NotificationHome from "./notifications/features/notifications/pages/NotificationsPage";
import NotificationItem from "./notifications/features/notifications/components/NotificationItem";

/* ===== Optional 404 Page ===== */
import NotFound from "./freelancer_pages/NotFound";

function App() {
  return (
    <Router>
      <Routes>
        {/* ===================== */}
        {/* PUBLIC AUTHFLOW ROUTES */}
        {/* ===================== */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* ===================== */}
        {/* DIRECT DASHBOARDS (NO LOGIN REQUIRED) */}
        {/* ===================== */}
        <Route path="/client" element={<ClientDashboard />} />
        <Route path="/freelancer" element={<FreelancerDashboard />} />

        {/* ===================== */}
        {/* NOTIFICATIONS */}
        {/* ===================== */}
        <Route path="/notifications" element={<NotificationHome />} />
        <Route path="/notifications/:id" element={<NotificationItem />} />

        {/* ===================== */}
        {/* NOT FOUND */}
        {/* ===================== */}
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
    </Router>
  );
}

export default App;
