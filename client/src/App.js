import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

/* ===== Context Provider ===== */
import { UserProvider } from "./context/UserContext";

/* ===== AuthFlow UI Pages ===== */
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import VerifyOtp from "./pages/VerifyOtp";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

/* ===== Client Dashboard Pages & Layout ===== */
import ClientLayout from "./freelancer_layouts/ClientLayout"; 
import ClientDashboard from "./freelancer_pages/client/ClientDashboard";
import ClientFinancials from "./freelancer_pages/client/ClientFinancials";
import ClientProjects from "./freelancer_pages/client/ClientProjects";
import ClientDocuments from "./freelancer_pages/client/ClientDocuments";
import ClientSettings from "./freelancer_pages/client/ClientSettings";
import ClientHelp from "./freelancer_pages/client/ClientHelp";

/* ===== Freelancer Dashboard Pages ===== */
import FreelancerDashboard from "./freelancer_pages/freelancer/FreelancerDashboard";
import Accounting from "./freelancer_pages/freelancer/Accounting";
import Expenses from "./freelancer_pages/freelancer/Expenses";
import Projects from "./freelancer_pages/freelancer/Projects";
import Inquiry from "./freelancer_pages/freelancer/Inquiry";
import Contracts from "./freelancer_pages/freelancer/Contracts";
import CalendarPage from "./freelancer_pages/freelancer/CalendarPage";
import ClientsFreelancer from "./freelancer_pages/freelancer/Clients";
import ReportsFreelancer from "./freelancer_pages/freelancer/Reports";
import SettingsFreelancer from "./freelancer_pages/freelancer/Settings";

/* ===== Messaging ===== */
import Messages from "./components/Messages";

/* ===== Notifications ===== */
import NotificationHome from "./notifications/features/notifications/pages/NotificationsPage";
import NotificationItem from "./notifications/features/notifications/components/NotificationItem";

/* ===== Optional 404 Page ===== */
import NotFound from "./freelancer_pages/NotFound";

const phStyle = { padding: "2rem", textAlign: "center", fontSize: "1.5rem" };

export default function App() {
  return (
    <UserProvider>
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
          {/* CLIENT PORTAL ROUTES */}
          {/* ===================== */}
          <Route path="/client" element={<ClientLayout />}>
            <Route index element={<ClientDashboard />} />
            <Route path="dashboard" element={<ClientDashboard />} />
            <Route path="projects" element={<ClientProjects />} />
            <Route path="financials" element={<ClientFinancials />} />
            <Route path="documents" element={<ClientDocuments />} />
            <Route path="messages" element={<Messages userRole="client" />} />
            <Route path="settings" element={<ClientSettings />} />
            <Route path="help" element={<ClientHelp />} />
            <Route path="profile" element={<div style={phStyle}>User Profile</div>} />
          </Route>

          {/* ===================== */}
          {/* FREELANCER ROUTES */}
          {/* ===================== */}
          <Route path="/freelancer" element={<FreelancerDashboard />} />
          <Route path="/freelancer/projects" element={<Projects />} />
          <Route path="/freelancer/accounting" element={<Accounting />} />
          <Route path="/freelancer/expenses" element={<Expenses />} />
          <Route path="/freelancer/inquiry" element={<Inquiry />} />
          <Route path="/freelancer/contracts" element={<Contracts />} />
          <Route path="/freelancer/calendar" element={<CalendarPage />} />
          <Route path="/freelancer/clients" element={<ClientsFreelancer />} />
          <Route path="/freelancer/reports" element={<ReportsFreelancer />} />
          <Route path="/freelancer/settings" element={<SettingsFreelancer />} />

          {/* ===================== */}
          {/* NOTIFICATIONS & 404 */}
          {/* ===================== */}
          <Route path="/notifications" element={<NotificationHome />} />
          <Route path="/notifications/:id" element={<NotificationItem />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}
