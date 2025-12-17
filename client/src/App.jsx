import React from "react";
import { Routes, Route } from "react-router-dom";

import MainLayout from "./layout/MainLayout.jsx";
import Dashboard from "./components/Dashboard/Dashboard.jsx";

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

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        {/* Dashboard */}
        <Route index element={<Dashboard />} />

        {/* Main sections */}
        <Route path="candidates" element={<Candidates />} />
        <Route path="projects" element={<Projects />} />
        <Route path="jobs" element={<Jobs />} />

        {/* Projects routes (your feature) */}
        <Route path="projects/new" element={<PostNewProject />} />
        <Route path="projects/:id" element={<ProjectDetails />} />
        <Route path="projects/:id/edit" element={<EditProject />} />

        {/* Keep other existing routes from main */}
        <Route path="proposals" element={<Proposals />} />

        <Route path="messages" element={<Messages />} />
        <Route path="contracts" element={<Contracts />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="profile" element={<ClientProfile />} />
        <Route path="profile/create" element={<ClientProfileCreateEdit />} />
        <Route path="client/profile" element={<ClientProfile />} />
        <Route path="client/profile/view" element={<ClientProfile />} />
        <Route path="client/profile/edit" element={<ClientProfileCreateEdit />} />
        <Route path="profile/settings" element={<Settings />} />
        <Route path="profile/skills" element={<Skills />} />
        <Route path="profile/work" element={<Work />} />
        <Route path="profile/portfolio" element={<Portfolio />} />

        {/* Client profile subpages (mirror freelancer pattern) */}
        <Route path="client/profile/skills" element={<Skills basePath="/client/profile" />} />
        <Route path="client/profile/work" element={<Work basePath="/client/profile" />} />
        <Route path="client/profile/portfolio" element={<Portfolio basePath="/client/profile" />} />
        <Route path="client/profile/settings" element={<Settings basePath="/client/profile" />} />
        <Route path="proposal/:id" element={<ProjectProposal />} />
        <Route path="freelancer" element={<FreelancerDashboard />} />
        {/* Freelancer profile CRUD (UI only) */}
        <Route path="freelancer/profile" element={<FreelancerProfileView />} />
        <Route path="freelancer/profile/create" element={<FreelancerProfileCreateEdit />} />
        <Route path="freelancer/profile/edit" element={<FreelancerProfileCreateEdit />} />
        <Route path="freelancer/profile/view" element={<FreelancerProfileView />} />
        {/* Freelancer profile subpages reuse the same components but pass basePath for correct links */}
        <Route path="freelancer/profile/skills" element={<Skills basePath="/freelancer/profile" />} />
        <Route path="freelancer/profile/work" element={<Work basePath="/freelancer/profile" />} />
        <Route path="freelancer/profile/portfolio" element={<Portfolio basePath="/freelancer/profile" />} />
        <Route path="freelancer/profile/settings" element={<Settings basePath="/freelancer/profile" />} />
      </Route>
    </Routes>
  );
}

export default App;
