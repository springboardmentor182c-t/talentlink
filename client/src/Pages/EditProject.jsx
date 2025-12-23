import React, { useEffect, useState } from "react";
import { ArrowLeft, CheckCircle, FileText, Tag, DollarSign, Clock, Award, Briefcase, MapPin } from "lucide-react";
import api from "../services/api";
import { useNavigate, useParams } from "react-router-dom";

const EditProject = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    skills: "",
    minBudget: "",
    maxBudget: "",
    duration: "",
    location: "",
    experienceLevel: "Any",
    projectType: "Fixed Price",
    status: "active",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});

  // Load project from backend
  useEffect(() => {
    async function fetchProject() {
      try {
        const res = await api.get(`/projects/${id}/`);
        const p = res.data;

        setFormData({
          title: p.title || "",
          description: p.description || "",
          skills: p.skills || "",
          minBudget: p.min_budget || "",
          maxBudget: p.max_budget || "",
          duration: p.duration || "",
          location: p.location || "",
          experienceLevel: p.experience_level || "Any",
          projectType: p.project_type || "Fixed Price",
          status: p.status || "active",
        });

        setLoading(false);
      } catch (err) {
        console.error("Error fetching project:", err);
        alert("Failed to load project.");
      }
    }

    fetchProject();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) newErrors.title = "Title is required.";
    if (!formData.description.trim()) newErrors.description = "Description is required.";
    if (!formData.skills.trim()) newErrors.skills = "Skills are required.";

    if (formData.minBudget && formData.maxBudget) {
      if (Number(formData.minBudget) > Number(formData.maxBudget)) {
        newErrors.maxBudget = "Max budget must be greater than min budget.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setSaving(true);

    const payload = {
      title: formData.title,
      description: formData.description,
      skills: formData.skills,
      min_budget: formData.minBudget || null,
      max_budget: formData.maxBudget || null,
      duration: formData.duration,
      location: formData.location,
      experience_level: formData.experienceLevel,
      project_type: formData.projectType,
      status: formData.status,
    };

    try {
      await api.put(`/projects/${id}/`, payload);

      alert("Project updated successfully!");
      navigate(`/projects/${id}`);
    } catch (err) {
      console.error("Error updating project:", err);
      alert("Failed to update the project.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center pt-20 text-gray-600">Loading project...</div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-6 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Back Button */}
        <button
          onClick={() => navigate(`/projects/${id}`)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft size={18} />
          Back to Project
        </button>

        <h1 className="text-2xl font-bold mb-6">Edit Project</h1>

        <form
          onSubmit={handleSave}
          className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 space-y-6"
        >
          {/* Title */}
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-1 flex items-center gap-2">
              <FileText size={18} className="text-indigo-600" />
              Project Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`w-full border px-3 py-2 rounded-lg ${
                errors.title ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.title && (
              <p className="text-red-500 text-xs mt-1">{errors.title}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-1 flex items-center gap-2">
              <FileText size={18} className="text-indigo-600" />
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              rows="4"
              onChange={handleChange}
              className={`w-full border px-3 py-2 rounded-lg ${
                errors.description ? "border-red-500" : "border-gray-300"
              }`}
            ></textarea>
            {errors.description && (
              <p className="text-red-500 text-xs mt-1">
                {errors.description}
              </p>
            )}
          </div>

          {/* Skills */}
          <div>
            <label className="text-sm font-semibold mb-1 flex items-center gap-2">
              <Tag size={18} className="text-indigo-600" />
              Required Skills
            </label>
            <input
              type="text"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              className={`w-full border px-3 py-2 rounded-lg ${
                errors.skills ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.skills && (
              <p className="text-red-500 text-xs mt-1">{errors.skills}</p>
            )}
          </div>

          {/* Budget */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold flex items-center gap-2">
                <DollarSign size={18} className="text-indigo-600" />
                Min Budget
              </label>
              <input
                type="number"
                name="minBudget"
                value={formData.minBudget}
                onChange={handleChange}
                className="w-full border-gray-300 border px-3 py-2 rounded-lg"
              />
            </div>

            <div>
              <label className="text-sm font-semibold flex items-center gap-2">
                <DollarSign size={18} className="text-indigo-600" />
                Max Budget
              </label>
              <input
                type="number"
                name="maxBudget"
                value={formData.maxBudget}
                onChange={handleChange}
                className={`w-full border px-3 py-2 rounded-lg ${
                  errors.maxBudget ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.maxBudget && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.maxBudget}
                </p>
              )}
            </div>
          </div>

          {/* Duration */}
          <div>
            <label className="text-sm font-semibold flex items-center gap-2">
              <Clock size={18} className="text-indigo-600" />
              Duration
            </label>
            <input
              type="text"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              className="w-full border-gray-300 border px-3 py-2 rounded-lg"
            />
          </div>

          {/* Experience + Type */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold flex items-center gap-2">
                <Award size={18} className="text-indigo-600" />
                Experience Level
              </label>
              <select
                name="experienceLevel"
                value={formData.experienceLevel}
                onChange={handleChange}
                className="w-full border-gray-300 border px-3 py-2 rounded-lg"
              >
                <option value="Any">Any</option>
                <option value="Junior">Junior</option>
                <option value="Mid-level">Mid-level</option>
                <option value="Senior">Senior</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-semibold flex items-center gap-2">
                <Briefcase size={18} className="text-indigo-600" />
                Project Type
              </label>
              <select
                name="projectType"
                value={formData.projectType}
                onChange={handleChange}
                className="w-full border-gray-300 border px-3 py-2 rounded-lg"
              >
                <option value="Fixed Price">Fixed Price</option>
                <option value="Hourly">Hourly</option>
              </select>
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="text-sm font-semibold flex items-center gap-2">
              <MapPin size={18} className="text-indigo-600" />
              Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full border-gray-300 border px-3 py-2 rounded-lg"
            />
          </div>

          {/* Save Button */}
          <button
            type="submit"
            disabled={saving}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all"
          >
            <CheckCircle size={20} />
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProject;
