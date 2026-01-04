import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

/* ===== Context Providers ===== */
import { UserProvider } from "./context/UserContext";
import { ProjectProvider } from "./context/ProjectContext";

/* ===== Auth Pages ===== */
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import VerifyOtp from "./pages/VerifyOtp";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import OAuthSuccess from "./pages/OAuthSuccess";

/* ===== Client Pages ===== */
import ClientLayout from "./freelancer_layouts/ClientLayout";
import ClientDashboard from "./freelancer_pages/client/ClientDashboard";
import ClientProjects from "./freelancer_pages/client/ClientProjects";
import ClientFinancials from "./freelancer_pages/client/ClientFinancials";
import ClientDocuments from "./freelancer_pages/client/ClientDocuments";
import ClientMessages from "./freelancer_pages/client/ClientMessages";
import ClientSettings from "./freelancer_pages/client/ClientSettings";
import ClientHelp from "./freelancer_pages/client/ClientHelp";

/* ===== Freelancer Pages ===== */
import FreelancerDashboard from "./freelancer_pages/freelancer/FreelancerDashboard";
import Projects from "./freelancer_pages/freelancer/Projects";
import Accounting from "./freelancer_pages/freelancer/Accounting";
import Expenses from "./freelancer_pages/freelancer/Expenses";
import Inquiry from "./freelancer_pages/freelancer/Inquiry";
import Contracts from "./freelancer_pages/freelancer/Contracts";
import CalendarPage from "./freelancer_pages/freelancer/CalendarPage";
import Clients from "./freelancer_pages/freelancer/Clients";
import Reports from "./freelancer_pages/freelancer/Reports";
import Settings from "./freelancer_pages/freelancer/Settings";

/* ===== Notifications ===== */
import NotificationHome from "./notifications/features/notifications/pages/NotificationsPage";
import NotificationItem from "./notifications/features/notifications/components/NotificationItem";

/* ===== 404 ===== */
import NotFound from "./freelancer_pages/NotFound";

function App() {
  return (
    <UserProvider>
      <ProjectProvider>
        <Router>
          <Routes>

            {/* ===== PUBLIC ROUTES ===== */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/verify-otp" element={<VerifyOtp />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />

            {/* ===== OAUTH CALLBACK ===== */}
            <Route path="/oauth/success" element={<OAuthSuccess />} />

            {/* ===== CLIENT ROUTES ===== */}
            <Route path="/client" element={<ClientLayout />}>
              <Route index element={<ClientDashboard />} />
              <Route path="dashboard" element={<ClientDashboard />} />
              <Route path="projects" element={<ClientProjects />} />
              <Route path="financials" element={<ClientFinancials />} />
              <Route path="documents" element={<ClientDocuments />} />
              <Route path="messages" element={<ClientMessages />} />
              <Route path="settings" element={<ClientSettings />} />
              <Route path="help" element={<ClientHelp />} />
            </Route>

            {/* ===== FREELANCER ROUTES ===== */}
            <Route path="/freelancer" element={<FreelancerDashboard />} />
            <Route path="/freelancer/projects" element={<Projects />} />
            <Route path="/freelancer/accounting" element={<Accounting />} />
            <Route path="/freelancer/expenses" element={<Expenses />} />
            <Route path="/freelancer/inquiry" element={<Inquiry />} />
            <Route path="/freelancer/contracts" element={<Contracts />} />
            <Route path="/freelancer/calendar" element={<CalendarPage />} />
            <Route path="/freelancer/clients" element={<Clients />} />
            <Route path="/freelancer/reports" element={<Reports />} />
            <Route path="/freelancer/settings" element={<Settings />} />

            {/* ===== NOTIFICATIONS ===== */}
            <Route path="/notifications" element={<NotificationHome />} />
            <Route path="/notifications/:id" element={<NotificationItem />} />

            {/* ===== 404 ===== */}
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404" />} />

          </Routes>
        </Router>
      </ProjectProvider>
    </UserProvider>
  );
}

export default App;
