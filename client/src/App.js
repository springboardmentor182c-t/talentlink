


// import React from "react";
// import "./App.css";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// /* ===== Context Provider ===== */
// import { UserProvider } from "./context/UserContext";

// /* ===== AuthFlow UI Pages ===== */
// import Home from "./pages/Home";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import VerifyOtp from "./pages/VerifyOtp";
// import ForgotPassword from "./pages/ForgotPassword";
// import ResetPassword from "./pages/ResetPassword";

// /* ===== Client Dashboard Pages & Layout ===== */
// import ClientLayout from "./freelancer_layouts/ClientLayout"; 
// import ClientDashboard from "./freelancer_pages/client/ClientDashboard";

// import ClientFinancials from "./freelancer_pages/client/ClientFinancials";
// import ClientProjects from "./freelancer_pages/client/ClientProjects";
// import ClientDocuments from "./freelancer_pages/client/ClientDocuments";
// import ClientMessages from "./freelancer_pages/client/ClientMessages";
// import ClientSettings from "./freelancer_pages/client/ClientSettings";
// import ClientHelp from "./freelancer_pages/client/ClientHelp";

// /* ===== Freelancer Dashboard Pages ===== */
// import FreelancerDashboard from "./freelancer_pages/freelancer/FreelancerDashboard";
// import Accounting from "./freelancer_pages/freelancer/Accounting";
// import Expenses from "./freelancer_pages/freelancer/Expenses";
// import Projects from "./freelancer_pages/freelancer/Projects";
// import Inquiry from "./freelancer_pages/freelancer/Inquiry";
// import Contracts from "./freelancer_pages/freelancer/Contracts";
// import CalendarPage from "./freelancer_pages/freelancer/CalendarPage";
// import Clients from "./freelancer_pages/freelancer/Clients";
// import Reports from "./freelancer_pages/freelancer/Reports";
// import Settings from "./freelancer_pages/freelancer/Settings";

// /* ===== Notifications ===== */
// import NotificationHome from "./notifications/features/notifications/pages/NotificationsPage";
// import NotificationItem from "./notifications/features/notifications/components/NotificationItem";

// /* ===== Optional 404 Page ===== */
// import NotFound from "./freelancer_pages/NotFound";

// function App() {
//   return (
//     <UserProvider>
//       <Router>
//         <Routes>
//           {/* ===================== */}
//           {/* PUBLIC AUTHFLOW ROUTES */}
//           {/* ===================== */}
//           <Route path="/" element={<Home />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/signup" element={<Signup />} />
//           <Route path="/verify-otp" element={<VerifyOtp />} />
//           <Route path="/forgot-password" element={<ForgotPassword />} />
//           <Route path="/reset-password" element={<ResetPassword />} />

//           {/* ===================== */}
//           {/* CLIENT PORTAL ROUTES */}
//           {/* ===================== */}
//           <Route path="/client" element={<ClientLayout />}>
//              <Route index element={<ClientDashboard />} />
//              <Route path="dashboard" element={<ClientDashboard />} />

//              <Route path="projects" element={<ClientProjects />} />
//              <Route path="financials" element={<ClientFinancials />} />
//             <Route path="documents" element={<ClientDocuments />} />
//             <Route path="messages" element={<ClientMessages />} />
//            <Route path="settings" element={<ClientSettings />} />
//             <Route path="help" element={<ClientHelp />} />
             
//              {/* New Sidebar Routes (Placeholders) */}
//              <Route path="projects" element={<div style={phStyle}>My Projects Page</div>} />
//              <Route path="financials" element={<div style={phStyle}>Financials & Invoices</div>} />
//              <Route path="documents" element={<div style={phStyle}>Documents Repository</div>} />
//              <Route path="messages" element={<div style={phStyle}>Messages Inbox</div>} />
//              <Route path="settings" element={<div style={phStyle}>Account Settings</div>} />
//              <Route path="help" element={<div style={phStyle}>Help Center & Support</div>} />
             
//              {/* Profile is now in Navbar, but keeping route just in case */}
//              <Route path="profile" element={<div style={phStyle}>User Profile</div>} />
//           </Route>

//           {/* ===================== */}
//           {/* FREELANCER ROUTES */}
//           {/* ===================== */}
//           <Route path="/freelancer" element={<FreelancerDashboard />} />
//           <Route path="/freelancer/accounting" element={<Accounting />} />
//           <Route path="/freelancer/expenses" element={<Expenses />} />
//           <Route path="/freelancer/projects" element={<Projects />} />
//           <Route path="/freelancer/inquiry" element={<Inquiry />} />
//           <Route path="/freelancer/contracts" element={<Contracts />} />
//           <Route path="/freelancer/calendar" element={<CalendarPage />} />
//           <Route path="/freelancer/clients" element={<Clients />} />
//           <Route path="/freelancer/reports" element={<Reports />} />
//           <Route path="/freelancer/settings" element={<Settings />} />

//           {/* ===================== */}
//           {/* NOTIFICATIONS & 404 */}
//           {/* ===================== */}
//           <Route path="/notifications" element={<NotificationHome />} />
//           <Route path="/notifications/:id" element={<NotificationItem />} />
//           <Route path="/404" element={<NotFound />} />
//           <Route path="*" element={<Navigate to="/404" />} />
//         </Routes>
//       </Router>
//     </UserProvider>
//   );
// }

// // Simple Placeholder Style for new pages
// const phStyle = {
//   padding: '40px',
//   fontSize: '24px',
//   fontWeight: 'bold',
//   color: '#475569'
// };

// export default App;



// import React from "react";
// import "./App.css";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// /* ===== Context Provider ===== */
// import { UserProvider } from "./context/UserContext";

// /* ===== AuthFlow UI Pages ===== */
// import Home from "./pages/Home";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import VerifyOtp from "./pages/VerifyOtp";
// import ForgotPassword from "./pages/ForgotPassword";
// import ResetPassword from "./pages/ResetPassword";

// /* ===== Client Dashboard Pages & Layout ===== */
// import ClientLayout from "./freelancer_layouts/ClientLayout"; 
// import ClientDashboard from "./freelancer_pages/client/ClientDashboard";
// import ClientFinancials from "./freelancer_pages/client/ClientFinancials";
// import ClientProjects from "./freelancer_pages/client/ClientProjects";
// import ClientDocuments from "./freelancer_pages/client/ClientDocuments";
// import ClientMessages from "./freelancer_pages/client/ClientMessages";
// import ClientSettings from "./freelancer_pages/client/ClientSettings";
// import ClientHelp from "./freelancer_pages/client/ClientHelp";

// /* ===== Freelancer Dashboard Pages ===== */
// import FreelancerDashboard from "./freelancer_pages/freelancer/FreelancerDashboard";
// import Accounting from "./freelancer_pages/freelancer/Accounting";
// import Expenses from "./freelancer_pages/freelancer/Expenses";
// import Projects from "./freelancer_pages/freelancer/Projects";
// import Inquiry from "./freelancer_pages/freelancer/Inquiry";
// import Contracts from "./freelancer_pages/freelancer/Contracts";
// import CalendarPage from "./freelancer_pages/freelancer/CalendarPage";
// import Clients from "./freelancer_pages/freelancer/Clients";
// import Reports from "./freelancer_pages/freelancer/Reports";
// import Settings from "./freelancer_pages/freelancer/Settings";

// /* ===== Notifications ===== */
// import NotificationHome from "./notifications/features/notifications/pages/NotificationsPage";
// import NotificationItem from "./notifications/features/notifications/components/NotificationItem";

// /* ===== Optional 404 Page ===== */
// import NotFound from "./freelancer_pages/NotFound";

// function App() {
//   return (
//     <UserProvider>
//       <Router>
//         <Routes>
//           {/* ===================== */}
//           {/* PUBLIC AUTHFLOW ROUTES */}
//           {/* ===================== */}
//           <Route path="/" element={<Home />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/signup" element={<Signup />} />
//           <Route path="/verify-otp" element={<VerifyOtp />} />
//           <Route path="/forgot-password" element={<ForgotPassword />} />
//           <Route path="/reset-password" element={<ResetPassword />} />

//           {/* ===================== */}
//           {/* CLIENT PORTAL ROUTES */}
//           {/* ===================== */}
//           <Route path="/client" element={<ClientLayout />}>
//              {/* Default route redirects to dashboard or renders dashboard */}
//              <Route index element={<ClientDashboard />} />
             
//              {/* Real Components */}
//              <Route path="dashboard" element={<ClientDashboard />} />
//              <Route path="projects" element={<ClientProjects />} />
//              <Route path="financials" element={<ClientFinancials />} />
//              <Route path="documents" element={<ClientDocuments />} />
//              <Route path="messages" element={<ClientMessages />} />
//              <Route path="settings" element={<ClientSettings />} />
//              <Route path="help" element={<ClientHelp />} />
             
//              {/* Profile placeholder (Keep only if you don't have a component yet) */}
//              <Route path="profile" element={<div style={phStyle}>User Profile</div>} />
//           </Route>

//           {/* ===================== */}
//           {/* FREELANCER ROUTES */}
//           {/* ===================== */}
//           <Route path="/freelancer" element={<FreelancerDashboard />} />
//           <Route path="/freelancer/accounting" element={<Accounting />} />
//           <Route path="/freelancer/expenses" element={<Expenses />} />
//           <Route path="/freelancer/projects" element={<Projects />} />
//           <Route path="/freelancer/inquiry" element={<Inquiry />} />
//           <Route path="/freelancer/contracts" element={<Contracts />} />
//           <Route path="/freelancer/calendar" element={<CalendarPage />} />
//           <Route path="/freelancer/clients" element={<Clients />} />
//           <Route path="/freelancer/reports" element={<Reports />} />
//           <Route path="/freelancer/settings" element={<Settings />} />

//           {/* ===================== */}
//           {/* NOTIFICATIONS & 404 */}
//           {/* ===================== */}
//           <Route path="/notifications" element={<NotificationHome />} />
//           <Route path="/notifications/:id" element={<NotificationItem />} />
//           <Route path="/404" element={<NotFound />} />
//           <Route path="*" element={<Navigate to="/404" />} />
//         </Routes>
//       </Router>
//     </UserProvider>
//   );
// }

// // Simple Placeholder Style for new pages (Only used for Profile now)
// const phStyle = {
//   padding: '40px',
//   fontSize: '24px',
//   fontWeight: 'bold',
//   color: '#475569'
// };

// export default App;








import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

/* ===== Context Providers ===== */
import { UserProvider } from "./context/UserContext";
import { ProjectProvider } from "./context/ProjectContext"; // <--- NEW: Enables data sharing

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
import ClientProjects from "./freelancer_pages/client/ClientProjects";
import ClientFinancials from "./freelancer_pages/client/ClientFinancials";
import ClientDocuments from "./freelancer_pages/client/ClientDocuments";
import ClientSettings from "./freelancer_pages/client/ClientSettings";
import ClientHelp from "./freelancer_pages/client/ClientHelp";

/* ===== Freelancer Dashboard Pages ===== */
import FreelancerDashboard from "./freelancer_pages/freelancer/FreelancerDashboard";
import Projects from "./freelancer_pages/freelancer/Projects"; // Ensure this is the new Freelancer Project page
import Accounting from "./freelancer_pages/freelancer/Accounting";
import Expenses from "./freelancer_pages/freelancer/Expenses";
import Inquiry from "./freelancer_pages/freelancer/Inquiry";
import Contracts from "./freelancer_pages/freelancer/Contracts";
import CalendarPage from "./freelancer_pages/freelancer/CalendarPage";
import Clients from "./freelancer_pages/freelancer/Clients";
import Reports from "./freelancer_pages/freelancer/Reports";
import Settings from "./freelancer_pages/freelancer/Settings";

/* ===== Messaging ===== */
import Messages from "./components/Messages";

/* ===== Notifications ===== */
import NotificationHome from "./notifications/features/notifications/pages/NotificationsPage";
import NotificationItem from "./notifications/features/notifications/components/NotificationItem";

/* ===== Optional 404 Page ===== */
import NotFound from "./freelancer_pages/NotFound";

function App() {
  return (
    <UserProvider>
      <ProjectProvider> {/* <--- Wraps App so Clients & Freelancers see the same data */}
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
               
               {/* Real Client Components */}
               <Route path="dashboard" element={<ClientDashboard />} />
               <Route path="projects" element={<ClientProjects />} />
               <Route path="financials" element={<ClientFinancials />} />
               <Route path="documents" element={<ClientDocuments />} />
               <Route path="messages" element={<Messages userRole="client" />} />
               <Route path="settings" element={<ClientSettings />} />
               <Route path="help" element={<ClientHelp />} />
               
               {/* Profile placeholder */}
               <Route path="profile" element={<div style={phStyle}>User Profile</div>} />
            </Route>

            {/* ===================== */}
            {/* FREELANCER ROUTES */}
            {/* ===================== */}
            <Route path="/freelancer" element={<FreelancerDashboard />} />
            <Route path="/freelancer/messages" element={<Messages userRole="freelancer" />} />
            <Route path="/freelancer/projects" element={<Projects />} />
            <Route path="/freelancer/accounting" element={<Accounting />} />
            <Route path="/freelancer/expenses" element={<Expenses />} />
            <Route path="/freelancer/inquiry" element={<Inquiry />} />
            <Route path="/freelancer/contracts" element={<Contracts />} />
            <Route path="/freelancer/calendar" element={<CalendarPage />} />
            <Route path="/freelancer/clients" element={<Clients />} />
            <Route path="/freelancer/reports" element={<Reports />} />
            <Route path="/freelancer/settings" element={<Settings />} />

            {/* ===================== */}
            {/* NOTIFICATIONS & 404 */}
            {/* ===================== */}
            <Route path="/notifications" element={<NotificationHome />} />
            <Route path="/notifications/:id" element={<NotificationItem />} />
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404" />} />
          </Routes>
        </Router>
      </ProjectProvider>
    </UserProvider>
  );
}

// Simple Placeholder Style
const phStyle = {
  padding: '40px',
  fontSize: '24px',
  fontWeight: 'bold',
  color: '#475569'
};

export default App;