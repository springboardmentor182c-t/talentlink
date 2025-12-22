import React from "react";
import { Routes, Route } from "react-router-dom";

import MainLayout from "./layout/MainLayout.jsx";
import Dashboard from "./components/Dashboard/Dashboard.jsx";

// 🔓 Auth pages
import Login from "./Pages/Login.jsx";
import Signup from "./Pages/Signup.jsx";
import ForgotPassword from "./Pages/ForgotPassword.jsx";
import OtpVerify from "./Pages/OtpVerify.jsx";
import ResetPassword from "./Pages/ResetPassword.jsx";

// 📄 Dashboard pages
import Candidates from "./Pages/Candidates.jsx";
import Projects from "./Pages/Projects.jsx";
import Messages from "./Pages/Messages.jsx";
import Contracts from "./Pages/Contracts.jsx";
import Notifications from "./Pages/Notifications.jsx";
import ClientProfile from "./Pages/ClientProfile.jsx";

// Profile & proposals (Group-A existing)
import ClientProfileCreateEdit from "./Pages/Profile/ClientProfileCreateEdit.jsx";
import Settings from "./Pages/Profile/Settings.jsx";
import Skills from "./Pages/Profile/Skills.jsx";
import Work from "./Pages/Profile/Work.jsx";
import Portfolio from "./Pages/Profile/Portfolio.jsx";
import ProjectProposal from "./Pages/ProjectProposal.jsx";
import Proposals from "./Pages/Proposals.jsx";

// Freelancer
import FreelancerDashboard from "./Pages/FreelancerDashboard.jsx";
import FreelancerProfileCreateEdit from "./Pages/Profile/FreelancerProfileCreateEdit.jsx";
import FreelancerProfileView from "./Pages/Profile/FreelancerProfileView.jsx";

// Projects
import PostNewProject from "./Pages/PostNewProject.jsx";
import ProjectDetails from "./Pages/ProjectDetails.jsx";
import EditProject from "./Pages/EditProject.jsx";

function App() {
  return (
    <Routes>
      {/* 🔓 Public routes (NO sidebar) */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/otp-verify" element={<OtpVerify />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* 🔐 Dashboard routes (WITH MainLayout) */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Dashboard />} />

        <Route path="candidates" element={<Candidates />} />
        <Route path="projects" element={<Projects />} />
        

        {/* Projects */}
        <Route path="projects/new" element={<PostNewProject />} />
        <Route path="projects/:id" element={<ProjectDetails />} />
        <Route path="projects/:id/edit" element={<EditProject />} />

        {/* Proposals */}
        <Route path="proposals" element={<Proposals />} />
        <Route path="proposal/:id" element={<ProjectProposal />} />

        {/* Communication */}
        <Route path="messages" element={<Messages />} />
        <Route path="contracts" element={<Contracts />} />
        <Route path="notifications" element={<Notifications />} />

        {/* Client profile */}
        <Route path="profile" element={<ClientProfile />} />
        <Route path="profile/create" element={<ClientProfileCreateEdit />} />
        <Route path="client/profile" element={<ClientProfile />} />
        <Route path="client/profile/view" element={<ClientProfile />} />
        <Route path="client/profile/edit" element={<ClientProfileCreateEdit />} />

        <Route path="profile/settings" element={<Settings />} />
        <Route path="profile/skills" element={<Skills />} />
        <Route path="profile/work" element={<Work />} />
        <Route path="profile/portfolio" element={<Portfolio />} />

        {/* Client profile subpages */}
        <Route path="client/profile/skills" element={<Skills basePath="/client/profile" />} />
        <Route path="client/profile/work" element={<Work basePath="/client/profile" />} />
        <Route path="client/profile/portfolio" element={<Portfolio basePath="/client/profile" />} />
        <Route path="client/profile/settings" element={<Settings basePath="/client/profile" />} />

        {/* Freelancer */}
        <Route path="freelancer" element={<FreelancerDashboard />} />
        <Route path="freelancer/profile" element={<FreelancerProfileView />} />
        <Route path="freelancer/profile/create" element={<FreelancerProfileCreateEdit />} />
        <Route path="freelancer/profile/edit" element={<FreelancerProfileCreateEdit />} />
        <Route path="freelancer/profile/view" element={<FreelancerProfileView />} />

        <Route path="freelancer/profile/skills" element={<Skills basePath="/freelancer/profile" />} />
        <Route path="freelancer/profile/work" element={<Work basePath="/freelancer/profile" />} />
        <Route path="freelancer/profile/portfolio" element={<Portfolio basePath="/freelancer/profile" />} />
        <Route path="freelancer/profile/settings" element={<Settings basePath="/freelancer/profile" />} />
      </Route>
    </Routes>
  );
}

export default App;
