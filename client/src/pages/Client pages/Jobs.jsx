import Sidebar from "../components/Sidebar";

export default function Jobs() {
  return (
    <div className="layout">
      <Sidebar />
      <div className="content">
        <h1>Jobs</h1>

        <ul>
          <li>Frontend Developer – Job ID: 2311</li>
          <li>Backend Developer – Job ID: 2312</li>
        </ul>
      </div>
    </div>
  );
}
