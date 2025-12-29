


import React, { useState, useEffect } from "react";
import axiosInstance from "../../utils/axiosInstance";
import "../../App.css";

const ClientProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- STATES FOR EDIT/CREATE ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [formData, setFormData] = useState({
    project_title: "",
    description: "",
    budget: "",
    deadline: "",
    required_skills: "",
    experience_years: 0,
    status: "Open",
  });

  // --- NEW STATE FOR VIEW DETAILS ---
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [viewProject, setViewProject] = useState(null);

  /* ---------------- FETCH ---------------- */
  const fetchProjects = async () => {
    try {
      const res = await axiosInstance.get("projects/");
      setProjects(res.data);
    } catch (err) {
      console.error("Failed to fetch projects:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  /* ---------------- HANDLERS ---------------- */
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Open Create/Edit Modal
  const openCreateModal = () => {
    setIsEditing(false);
    setCurrentId(null);
    setFormData({
      project_title: "", description: "", budget: "", deadline: "",
      required_skills: "", experience_years: 0, status: "Open"
    });
    setIsModalOpen(true);
  };

  const openEditModal = (project) => {
    setIsEditing(true);
    setCurrentId(project.id);
    setFormData({
      project_title: project.title,
      description: project.description,
      budget: project.budget,
      deadline: project.deadline || "",
      required_skills: project.required_skills || "",
      experience_years: project.experience_years || 0,
      status: project.status || "Open",
    });
    setIsModalOpen(true);
  };

  // --- NEW: Open View Modal ---
  const openViewModal = (project) => {
    setViewProject(project);
    setIsViewModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      title: formData.project_title,
      description: formData.description,
      budget: formData.budget,
      deadline: formData.deadline || null,
      required_skills: formData.required_skills,
      experience_years: formData.experience_years,
      status: formData.status,
    };

    try {
      if (isEditing) {
        await axiosInstance.put(`projects/${currentId}/`, payload);
      } else {
        await axiosInstance.post("projects/", payload);
      }
      setIsModalOpen(false);
      fetchProjects();
    } catch (err) {
      console.error("Project save failed:", err);
      alert("Failed to save project");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this project?")) return;
    try {
      await axiosInstance.delete(`projects/${id}/`);
      fetchProjects();
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete project");
    }
  };

  const getStatusClass = (status) => {
    if (!status) return "default";
    const lower = status.toLowerCase();
    if (lower === "active" || lower === "open") return "active";
    if (lower === "completed") return "completed";
    if (lower === "pending") return "pending";
    return "default";
  };

  /* ---------------- UI ---------------- */
  return (
    <div className="client-projects-container">
      <div className="cp-header-row">
        <h2 className="client-projects-title">My Projects</h2>
        <button className="client-projects-create-btn" onClick={openCreateModal}>
          ➕ Post New Job
        </button>
      </div>

      {loading ? (
        <p className="client-projects-loading">Loading projects...</p>
      ) : projects.length === 0 ? (
        <p className="client-projects-empty">No projects found</p>
      ) : (
        <ul className="client-projects-list">
          {projects.map((p) => (
            <li key={p.id} className="client-project-card">
              <div className="cp-card-header">
                <span className={`cp-badge ${getStatusClass(p.status)}`}>{p.status || "Open"}</span>
                <div className="cp-actions">
                  <button className="cp-icon-btn edit" onClick={() => openEditModal(p)}>✎</button>
                  <button className="cp-icon-btn delete" onClick={() => handleDelete(p.id)}>🗑</button>
                </div>
              </div>
              <div className="cp-card-body">
                <h3 className="cp-card-title">{p.title}</h3>
                <p className="cp-card-meta">Budget: ${p.budget} • Exp: {p.experience_years || 0} yrs</p>
              </div>
              
              {/* BUTTON TRIGGERING VIEW MODAL */}
              <button className="cp-view-btn" onClick={() => openViewModal(p)}>
                View Details
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* -------- CREATE / EDIT MODAL -------- */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="client-project-modal" onClick={(e) => e.stopPropagation()}>
            <h3 className="client-project-modal-title">{isEditing ? "Edit Project" : "Post New Project"}</h3>
            <form className="client-project-form" onSubmit={handleSubmit}>
              <input className="client-project-input" type="text" name="project_title" placeholder="Title" value={formData.project_title} onChange={handleChange} required />
              <textarea className="client-project-textarea" name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
                <input className="client-project-input" type="number" name="budget" placeholder="Budget" value={formData.budget} onChange={handleChange} required />
                <select className="client-project-input" name="status" value={formData.status} onChange={handleChange}>
                   <option value="Open">Open</option><option value="Active">Active</option><option value="Pending">Pending</option><option value="Completed">Completed</option>
                </select>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
                <input className="client-project-input" type="number" name="experience_years" placeholder="Exp (yrs)" value={formData.experience_years} onChange={handleChange} />
                <input className="client-project-input" type="date" name="deadline" value={formData.deadline} onChange={handleChange} />
              </div>
              <input className="client-project-input" type="text" name="required_skills" placeholder="Skills" value={formData.required_skills} onChange={handleChange} />
              <div className="client-project-form-actions">
                <button className="client-project-cancel-btn" type="button" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button className="client-project-submit-btn" type="submit">{isEditing ? "Update" : "Post"}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* -------- NEW: VIEW DETAILS MODAL -------- */}
      {isViewModalOpen && viewProject && (
        <div className="modal-overlay" onClick={() => setIsViewModalOpen(false)}>
          <div className="client-project-modal view-mode" onClick={(e) => e.stopPropagation()}>
            
            {/* Header: Title + Status */}
            <div className="view-modal-header">
              <h2 className="view-modal-title">{viewProject.title}</h2>
              <span className={`cp-badge ${getStatusClass(viewProject.status)} large`}>
                {viewProject.status || "Open"}
              </span>
            </div>

            {/* Content Body */}
            <div className="view-modal-body">
              <div className="view-group full-width">
                <label>Description</label>
                <p className="view-desc-text">{viewProject.description}</p>
              </div>

              <div className="view-row">
                <div className="view-group">
                  <label>Budget</label>
                  <p className="view-value">${viewProject.budget}</p>
                </div>
                <div className="view-group">
                  <label>Experience Required</label>
                  <p className="view-value">{viewProject.experience_years} Years</p>
                </div>
              </div>

              <div className="view-row">
                <div className="view-group">
                  <label>Deadline</label>
                  <p className="view-value">{viewProject.deadline || "No Deadline"}</p>
                </div>
                <div className="view-group">
                  <label>Skills</label>
                  <p className="view-value">{viewProject.required_skills || "None specified"}</p>
                </div>
              </div>
            </div>

            {/* Footer Action */}
            <div className="client-project-form-actions">
              <button 
                className="client-project-cancel-btn" 
                style={{width: '100%'}} 
                onClick={() => setIsViewModalOpen(false)}
              >
                Close Details
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default ClientProjects;