import React, { useState, useEffect } from "react";
import { Eye, Edit, X, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Project Card Component
const ProjectCard = ({ project, onView, onEdit, onClose, onComplete }) => {
  const postedDate = project.created_at
    ? new Date(project.created_at).toLocaleDateString()
    : "N/A";

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {project.title}
          </h3>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span className="font-medium">
              {project.applications || 0} applications
            </span>
            <span>Posted {postedDate}</span>
          </div>
        </div>
        <span className="px-2 py-1 text-xs rounded-full bg-indigo-50 text-indigo-700 font-medium">
          {project.status || "active"}
        </span>
      </div>

      <p className="text-sm text-gray-600 mb-4 line-clamp-3">
        {project.description}
      </p>

      <div className="flex items-center gap-2">
        {/* View */}
        <button
          onClick={() => onView(project.id)}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
        >
          <Eye className="w-4 h-4" />
          View
        </button>

        {/* Edit */}
        <button
          onClick={() => onEdit(project.id)}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
        >
          <Edit className="w-4 h-4" />
          Edit
        </button>

        {/* Complete – updated text but same styling */}
        {project.status === "active" && (
          <button
            onClick={() => onComplete(project.id)}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <CheckCircle className="w-4 h-4" />
            Complete
          </button>
        )}

        {/* Delete */}
        <button
          onClick={() => onClose(project.id)}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors ml-auto"
        >
          <X className="w-4 h-4" />
          Delete
        </button>
      </div>
    </div>
  );
};

// Main Component
const MyProjects = () => {
  const [activeTab, setActiveTab] = useState("Active");
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const projectTabs = ["Active", "Completed", "Drafts"];

  // Fetch projects
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://127.0.0.1:8000/api/projects/");
        setProjects(res.data || []);
      } catch (err) {
        console.error("Error fetching projects:", err);
        setError("Failed to load projects. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const getCurrentProjects = () => {
    if (!projects.length) return [];
    if (activeTab === "Active")
      return projects.filter((p) => p.status === "active");
    if (activeTab === "Completed")
      return projects.filter((p) => p.status === "completed");
    if (activeTab === "Drafts")
      return projects.filter((p) => p.status === "draft");
    return projects;
  };

  // Handlers
  const handleViewProject = (id) => navigate(`/projects/${id}`);

  // 🔥 CHANGE HERE: go to /projects/:id/edit instead of alert
  const handleEditProject = (id) => navigate(`/projects/${id}/edit`);

  const handleCloseProject = async (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/projects/${id}/`);
        setProjects((prev) => prev.filter((p) => p.id !== id));
        alert("🗑️ Project deleted successfully.");
      } catch {
        alert("Failed to delete project. Please try again.");
      }
    }
  };

  const handleCompleteProject = async (id) => {
    if (window.confirm("Mark this project as Completed?")) {
      try {
        await axios.patch(`http://127.0.0.1:8000/api/projects/${id}/`, {
          status: "completed",
        });
        setProjects((prev) =>
          prev.map((p) => (p.id === id ? { ...p, status: "completed" } : p))
        );
      } catch {
        alert("Failed to mark as completed. Try again.");
      }
    }
  };

  const currentProjects = getCurrentProjects();

  return (
    <main className="flex-1 overflow-y-auto p-3 sm:p-4 lg:p-6 bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
            My Projects
          </h2>

          <div className="flex gap-3">
            {/* Proposals Button (new) */}
            <button
              onClick={() => navigate("/proposals")}
              className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium shadow-sm"
            >
              Proposals
            </button>

            {/* Existing Post New Project Button */}
            <button
              onClick={() => navigate("/projects/new")}
              className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium shadow-sm"
            >
              Post new project
            </button>
          </div>
        </div>

        {/* Projects Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 mb-6">
          {/* Tabs */}
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            {projectTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-lg font-medium transition-all whitespace-nowrap ${
                  activeTab === tab
                    ? "bg-indigo-600 text-white shadow-md"
                    : "bg-indigo-50 text-indigo-600 hover:bg-indigo-100"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Loading / Error / Data */}
          {loading ? (
            <div className="text-center py-12 text-gray-600 text-sm">
              Loading projects...
            </div>
          ) : error ? (
            <div className="text-center py-12 text-red-500 text-sm">
              {error}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {currentProjects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onView={handleViewProject}
                    onEdit={handleEditProject}
                    onClose={handleCloseProject}
                    onComplete={handleCompleteProject}
                  />
                ))}
              </div>

              {currentProjects.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-600">
                    No {activeTab.toLowerCase()} projects
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </main>
  );
};

export default MyProjects;
