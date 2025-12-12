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
import ProjectProposal from "./Pages/ProjectProposal.jsx";
import Proposals from "./Pages/Proposals.jsx";
import FreelancerDashboard from "./Pages/FreelancerDashboard.jsx";
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
        <Route path="proposal/:id" element={<ProjectProposal />} />
        <Route path="freelancer" element={<FreelancerDashboard />} />
      </Route>
    </Routes>
  );
}

export default App;
