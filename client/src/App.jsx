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
      

      {/* 🔐 Client Dashboard routes (WITH MainLayout) */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Dashboard />} />

        <Route path="candidates" element={<Candidates />} />
        <Route path="projects" element={<Projects />} />
        <Route path="projects/new" element={<PostNewProject />} />
        <Route path="projects/:id" element={<ProjectDetails />} />
        <Route path="projects/:id/edit" element={<EditProject />} />

        <Route path="messages" element={<Messages />} />
        <Route path="contracts" element={<Contracts />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="profile" element={<ClientProfile />} />
      </Route>

    </Routes>
  );
}

export default App;
