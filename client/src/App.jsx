import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext.jsx";

// Layouts
import MainLayout from "./layout/MainLayout.jsx";
import FreelancerDashboardLayout from "./layout/FreelancerDashboardLayout.jsx";

// Components
import Dashboard from "./components/Dashboard/Dashboard.jsx";
import FreelancerDashboardHome from "./components/Dashboard/FreelancerDashboardHome.jsx";
import Login from "./components/Auth/Login.jsx";

// Pages
import Candidates from "./Pages/Candidates.jsx";
import Projects from "./Pages/Projects.jsx";
import Jobs from "./Pages/Jobs.jsx";
import Messages from "./Pages/Messages.jsx";
import Contracts from "./Pages/Contracts.jsx";
import Notifications from "./Pages/Notifications.jsx";
import ClientProfile from "./Pages/ClientProfile.jsx";
import ClientProfileCreateEdit from "./Pages/Profile/ClientProfileCreateEdit.jsx";
import Settings from "./Pages/Profile/Settings.jsx";
import Skills from "./Pages/Profile/Skills.jsx";
import Work from "./Pages/Profile/Work.jsx";
import Portfolio from "./Pages/Profile/Portfolio.jsx";
import ProjectProposal from "./Pages/ProjectProposal.jsx";
import Proposals from "./Pages/Proposals.jsx";
import FreelancerDashboard from "./Pages/FreelancerDashboard.jsx";
import FreelancerProfileCreateEdit from "./Pages/Profile/FreelancerProfileCreateEdit.jsx";
import FreelancerProfileView from "./Pages/Profile/FreelancerProfileView.jsx";
import PostNewProject from "./Pages/PostNewProject.jsx";
import ProjectDetails from "./Pages/ProjectDetails.jsx";
import EditProject from "./Pages/EditProject.jsx";

// Freelancer Dashboard Components
import FreelancerProposals from "./components/Dashboard/FreelancerProposals.jsx";
import FreelancerContracts from "./components/Dashboard/FreelancerContracts.jsx";
import FreelancerMyJobs from "./components/Dashboard/FreelancerMyJobs.jsx";
import FreelancerAnalytics from "./components/Dashboard/FreelancerAnalytics.jsx";

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { isAuthenticated, getUserRole, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(getUserRole())) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

// Role-based Layout Wrapper
const RoleBasedLayout = ({ children }) => {
  const { getUserRole } = useAuth();
  const userRole = getUserRole();

  if (userRole === 'freelancer') {
    return <FreelancerDashboardLayout>{children}</FreelancerDashboardLayout>;
  }

  return <MainLayout>{children}</MainLayout>;
};

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/unauthorized" element={<div>Unauthorized Access</div>} />

        {/* Client Routes (Default Layout) */}
        <Route
          path="/"
          element={
            <ProtectedRoute allowedRoles={['client']}>
              <RoleBasedLayout>
                <Dashboard />
              </RoleBasedLayout>
            </ProtectedRoute>
          }
        >
          {/* Client Dashboard Home */}
          <Route index element={<Dashboard />} />
          
          {/* Client-specific routes */}
          <Route path="candidates" element={<Candidates />} />
          <Route path="projects" element={<Projects />} />
          <Route path="jobs" element={<Jobs />} />
          <Route path="projects/new" element={<PostNewProject />} />
          <Route path="projects/:id" element={<ProjectDetails />} />
          <Route path="projects/:id/edit" element={<EditProject />} />
          <Route path="proposals" element={<Proposals />} />
          <Route path="messages" element={<Messages />} />
          <Route path="contracts" element={<Contracts />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="profile" element={<ClientProfile />} />
          <Route path="profile/create" element={<ClientProfileCreateEdit />} />
          <Route path="profile/settings" element={<Settings />} />
          <Route path="profile/skills" element={<Skills />} />
          <Route path="profile/work" element={<Work />} />
          <Route path="profile/portfolio" element={<Portfolio />} />
          <Route path="proposal/:id" element={<ProjectProposal />} />
        </Route>

        {/* Freelancer Routes (Freelancer Layout) */}
        <Route
          path="/freelancer"
          element={
            <ProtectedRoute allowedRoles={['freelancer']}>
              <RoleBasedLayout>
                <FreelancerDashboardHome />
              </RoleBasedLayout>
            </ProtectedRoute>
          }
        >
          {/* Freelancer Dashboard Home */}
          <Route index element={<FreelancerDashboardHome />} />
          
          {/* Freelancer-specific routes */}
          <Route path="proposals" element={<FreelancerProposals />} />
          <Route path="contracts" element={<FreelancerContracts />} />
          <Route path="my-jobs" element={<FreelancerMyJobs />} />
          <Route path="earnings" element={<div>Earnings Dashboard (Coming Soon)</div>} />
          <Route path="reviews" element={<div>Reviews & Ratings (Coming Soon)</div>} />
          <Route path="profile" element={<FreelancerProfileView />} />
          <Route path="profile/create" element={<FreelancerProfileCreateEdit />} />
          <Route path="profile/edit" element={<FreelancerProfileCreateEdit />} />
          <Route path="profile/view" element={<FreelancerProfileView />} />
          <Route path="profile/skills" element={<Skills basePath="/freelancer/profile" />} />
          <Route path="profile/work" element={<Work basePath="/freelancer/profile" />} />
          <Route path="profile/portfolio" element={<Portfolio basePath="/freelancer/profile" />} />
          <Route path="profile/settings" element={<Settings basePath="/freelancer/profile" />} />
          
          {/* Shared routes */}
          <Route path="messages" element={<Messages />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="projects/:id" element={<ProjectDetails />} />
          <Route path="proposal/:id" element={<ProjectProposal />} />
        </Route>

        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;