import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import {
  ArrowLeft,
  Briefcase,
  DollarSign,
  Clock,
  MapPin,
  Tag,
} from "lucide-react";

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch project from backend
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await api.get(`/projects/${id}/`);
        setProject(res.data);
      } catch (err) {
        console.error("Error fetching project details:", err);
        setError("Failed to load project details.");
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  const handleEdit = () => {
    navigate(`/projects/${id}/edit`);
  };

  const handleClose = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to close this project?"
    );
    if (!confirmed) return;

    try {
      await api.patch(`/projects/${id}/`, {
        status: "completed",
      });
      setProject((prev) => ({ ...prev, status: "completed" }));
      alert("Project marked as completed.");
    } catch (err) {
      console.error("Error closing project:", err);
      alert("Failed to close project.");
    }
  };

  if (loading) {
    return (
      <main className="flex-1 overflow-y-auto p-6 bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50">
        <div className="max-w-4xl mx-auto text-gray-600">
          Loading project...
        </div>
      </main>
    );
  }

  if (error || !project) {
    return (
      <main className="flex-1 overflow-y-auto p-6 bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50">
        <div className="max-w-4xl mx-auto text-red-500">
          {error || "Project not found."}
        </div>
      </main>
    );
  }

  const postedDate = project.created_at
    ? new Date(project.created_at).toLocaleDateString()
    : "N/A";

  const budgetText =
    project.min_budget && project.max_budget
      ? `$${project.min_budget} – $${project.max_budget}`
      : project.min_budget
      ? `From $${project.min_budget}`
      : project.max_budget
      ? `Up to $${project.max_budget}`
      : "Not specified";

  const skillsArray = project.skills
    ? project.skills.split(",").map((s) => s.trim()).filter(Boolean)
    : [];

  return (
    <main className="flex-1 overflow-y-auto p-3 sm:p-4 lg:p-6 bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50">
      <div className="max-w-4xl mx-auto">

        {/* Back Button */}
        <button
          onClick={() => navigate("/projects")}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to My Projects
        </button>

        {/* Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 lg:p-8">

          {/* Header Row */}
          <div className="flex flex-col md:flex-row items-start justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Briefcase className="w-5 h-5 text-indigo-600" />
                <span className="text-xs sm:text-sm font-medium text-indigo-700 bg-indigo-50 px-2 py-1 rounded-full">
                  {project.status || "active"}
                </span>
              </div>

              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                {project.title}
              </h1>

              <p className="text-xs sm:text-sm text-gray-500">
                Posted {postedDate} · Project ID: {project.id}
              </p>
            </div>

            {/* Actions – short buttons */}
            <div className="flex items-center gap-3 self-start md:self-auto">
              <button
                onClick={handleEdit}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Edit
              </button>

              <button
                onClick={handleClose}
                className="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
              >
                Close
              </button>
            </div>
          </div>

          {/* Meta info row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 text-sm">
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-indigo-600" />
              <span className="font-medium text-gray-700">Budget:</span>
              <span className="text-gray-800">{budgetText}</span>
            </div>

            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-indigo-600" />
              <span className="font-medium text-gray-700">Duration:</span>
              <span className="text-gray-800">
                {project.duration || "Not specified"}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-indigo-600" />
              <span className="font-medium text-gray-700">Location:</span>
              <span className="text-gray-800">
                {project.location || "Not specified"}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-indigo-600" />
              <span className="font-medium text-gray-700">Experience:</span>
              <span className="text-gray-800">
                {project.experience_level || "Any"}
              </span>
            </div>
          </div>

          {/* Skills */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <Tag className="w-4 h-4 text-indigo-600" />
              <h2 className="text-sm font-semibold text-gray-800">
                Required Skills
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {skillsArray.length > 0 ? (
                skillsArray.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 text-xs sm:text-sm bg-indigo-50 text-indigo-700 rounded-full"
                  >
                    {skill}
                  </span>
                ))
              ) : (
                <span className="text-xs text-gray-500">No skills specified.</span>
              )}
            </div>
          </div>

          {/* Description */}
          <div>
            <h2 className="text-sm font-semibold text-gray-800 mb-2">
              Project Description
            </h2>
            <p className="text-sm text-gray-700 whitespace-pre-line">
              {project.description}
            </p>
          </div>

        </div>
      </div>
    </main>
  );
};

export default ProjectDetails;
