import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/profiles/";

function FreelancerProfile() {
  const [profiles, setProfiles] = useState([]);
  const [formData, setFormData] = useState({
    project_title: "",
    description: "",
    budget: "",
    required_skills: "",
    experience_years: "",
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    try {
      const res = await axios.get(API_URL);
      setProfiles(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("access_token");

    try {
      if (editingId) {
        await axios.patch(`${API_URL}${editingId}/`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post(API_URL, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      setFormData({
        project_title: "",
        description: "",
        budget: "",
        required_skills: "",
        experience_years: "",
      });
      setEditingId(null);
      fetchProfiles();
    } catch {
      alert("Authentication required or error occurred");
    }
  };

  const handleEdit = (profile) => {
    setEditingId(profile.id);
    setFormData(profile);
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("access_token");
    try {
      await axios.delete(`${API_URL}${id}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchProfiles();
    } catch {
      alert("Delete failed");
    }
  };

  return (
    <div style={styles.page}>
      <h2 style={styles.pageTitle}>Freelancer Profile</h2>

      {/* FORM */}
      <div style={styles.card}>
        <h3 style={styles.cardTitle}>
          {editingId ? "Edit Profile" : "Create Profile"}
        </h3>

        <form onSubmit={handleSubmit} style={styles.formGrid}>
          <input name="project_title" placeholder="Project Title" value={formData.project_title} onChange={handleChange} style={styles.input} />
          <input name="budget" placeholder="Budget (₹)" value={formData.budget} onChange={handleChange} style={styles.input} />
          <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} style={{ ...styles.input, gridColumn: "span 2", height: 80 }} />
          <input name="required_skills" placeholder="Skills (comma separated)" value={formData.required_skills} onChange={handleChange} style={styles.input} />
          <input name="experience_years" placeholder="Experience (years)" value={formData.experience_years} onChange={handleChange} style={styles.input} />

          <button type="submit" style={styles.primaryBtn}>
            {editingId ? "Update Profile" : "Create Profile"}
          </button>
        </form>
      </div>

      {/* LIST */}
      <h3 style={{ marginTop: 40 }}>Existing Profiles</h3>

      <div style={styles.grid}>
        {profiles.map((p) => (
          <div key={p.id} style={styles.profileCard}>
            <h4>{p.project_title}</h4>
            <p style={styles.muted}>{p.description}</p>
            <p><strong>Budget:</strong> ₹{p.budget}</p>

            <div style={styles.skillRow}>
              {p.required_skills.split(",").map((s, i) => (
                <span key={i} style={styles.skillChip}>{s.trim()}</span>
              ))}
            </div>

            <div style={styles.actionRow}>
              <button style={styles.editBtn} onClick={() => handleEdit(p)}>Edit</button>
              <button style={styles.deleteBtn} onClick={() => handleDelete(p.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FreelancerProfile;

/* ---------- STYLES ---------- */

const styles = {
  page: {
    padding: 30,
    background: "#f8fafc",
    minHeight: "100vh",
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 600,
    marginBottom: 20,
  },
  card: {
    background: "#fff",
    borderRadius: 12,
    padding: 24,
    boxShadow: "0 8px 24px rgba(0,0,0,0.05)",
  },
  cardTitle: {
    marginBottom: 16,
  },
  formGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 16,
  },
  input: {
    padding: "10px 12px",
    borderRadius: 8,
    border: "1px solid #e2e8f0",
    fontSize: 14,
  },
  primaryBtn: {
    gridColumn: "span 2",
    background: "#3b82f6",
    color: "#fff",
    padding: 12,
    borderRadius: 8,
    border: "none",
    fontWeight: 600,
    cursor: "pointer",
  },
  grid: {
    marginTop: 20,
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
    gap: 20,
  },
  profileCard: {
    background: "#fff",
    borderRadius: 12,
    padding: 20,
    boxShadow: "0 6px 18px rgba(0,0,0,0.05)",
  },
  muted: {
    color: "#64748b",
    fontSize: 14,
  },
  skillRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: 6,
    marginTop: 10,
  },
  skillChip: {
    background: "#e0f2fe",
    color: "#0369a1",
    padding: "4px 10px",
    borderRadius: 20,
    fontSize: 12,
    fontWeight: 500,
  },
  actionRow: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: 16,
  },
  editBtn: {
    background: "#e0f2fe",
    color: "#0369a1",
    border: "none",
    padding: "6px 14px",
    borderRadius: 6,
    cursor: "pointer",
  },
  deleteBtn: {
    background: "#fee2e2",
    color: "#b91c1c",
    border: "none",
    padding: "6px 14px",
    borderRadius: 6,
    cursor: "pointer",
  },
};
