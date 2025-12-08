import { Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout.jsx";
import Dashboard from "./components/Dashboard/Dashboard.jsx";
import Candidates from "./Pages/Candidates.jsx";
import Projects from "./Pages/Projects.jsx";
import Messages from "./Pages/Messages.jsx";
import Jobs from "./Pages/Jobs.jsx";
import Contracts from "./Pages/Contracts.jsx";
import Notifications from "./Pages/Notifications.jsx";
import ClientProfile from "./Pages/ClientProfile.jsx";
import Proposals from "./Pages/Proposals.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="candidates" element={<Candidates />} />
        <Route path="projects" element={<Projects />} />
        <Route path="proposals" element={<Proposals />} />
        <Route path="messages" element={<Messages />} />
        <Route path="jobs" element={<Jobs />} />
        <Route path="contracts" element={<Contracts />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="profile" element={<ClientProfile />} />
      </Route>
    </Routes>
  );
}

export default App;
