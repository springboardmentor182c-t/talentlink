import React, {
  useState,
  useMemo,
  useEffect,
  useRef,
} from "react";

const initialProjects = [
  {
    id: 1,
    title: "React Frontend Developer (Dashboard UI)",
    summary:
      "Build a responsive dashboard for project and client management using React.",
    description:
      "Looking for a frontend developer to create a clean dashboard interface with reusable components, responsive layout, and integration-ready UI elements.",
    duration: "1-3 months",
    budget: "₹40,000 – ₹60,000",
    skills: ["React", "JavaScript", "CSS", "Responsive UI"],
    tags: ["React", "JavaScript", "CSS", "Responsive UI"],
  },
  {
    id: 2,
    title: "Full Stack MERN Developer",
    summary:
      "Create a MERN stack project with REST APIs and admin dashboard.",
    description:
      "Need a MERN developer to build secure APIs, authentication module, and an admin panel. Experience with MongoDB schema design and deployment is preferred.",
    duration: "1-3 months",
    budget: "₹70,000 – ₹1,00,000",
    skills: ["React", "Node.js", "MongoDB", "Express"],
    tags: ["Node.js", "React", "MongoDB", "Express"],
  },
  {
    id: 3,
    title: "UI/UX Design for Mobile Banking App",
    summary:
      "Design a clean mobile banking application in Figma for Android & iOS.",
    description:
      "Require a UI/UX designer to create user journeys, wireframes, and high-fidelity screens for a modern mobile banking experience.",
    duration: "1-4 weeks",
    budget: "₹25,000 – ₹45,000",
    skills: ["UI/UX", "Figma"],
    tags: ["Figma", "UI Design", "UX Research"],
  },
  {
    id: 4,
    title: "Angular Admin Panel Developer",
    summary:
      "Create admin dashboard with modular and reusable components.",
    description:
      "Admin panel with charts, tables, role-based access, and responsive design. Preferred experience with Angular routing and state management.",
    duration: "> 3 months",
    budget: "₹80,000 – ₹1,20,000",
    skills: ["Angular", "TypeScript"],
    tags: ["Angular", "TypeScript", "Admin Panel"],
  },
  {
    id: 5,
    title: "Python Backend Developer (REST APIs)",
    summary:
      "Build scalable REST APIs for existing frontend application.",
    description:
      "Need a Python backend developer experienced in Django/Flask, database modeling, and API documentation.",
    duration: "1-3 months",
    budget: "₹50,000 – ₹90,000",
    skills: ["Python"],
    tags: ["Python", "REST API", "Backend"],
  },
];

function App() {
  // which page is currently shown: 'find' | 'saved' | 'post'
  const [currentPage, setCurrentPage] = useState("find");

  // projects & saved
  const [allProjects, setAllProjects] =
    useState(initialProjects);
  const [savedProjects, setSavedProjects] = useState([]);

  // profile dropdown
  const [profileMenuOpen, setProfileMenuOpen] =
    useState(false);
  const profileMenuRef = useRef(null);
  const profileBtnRef = useRef(null);

  // filter form (what the user has typed/selected)
  const [filterForm, setFilterForm] = useState({
    search: "",
    skill: "Any",
    minBudget: "",
    maxBudget: "",
    duration: "",
  });

  // filters actually applied to list (after "Apply Filters")
  const [filters, setFilters] = useState({
    search: "",
    skill: "Any",
    minBudget: null,
    maxBudget: null,
    duration: "",
  });

  // selected project for modal
  const [selectedProject, setSelectedProject] =
    useState(null);

  // close profile menu on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (!profileMenuOpen) return;
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(e.target) &&
        profileBtnRef.current &&
        !profileBtnRef.current.contains(e.target)
      ) {
        setProfileMenuOpen(false);
      }
    }

    document.addEventListener("click", handleClickOutside);
    return () =>
      document.removeEventListener("click", handleClickOutside);
  }, [profileMenuOpen]);

  // filtering logic (same as JS version)
  function matchesFilters(project, f) {
    // search
    if (f.search) {
      const text = (
        project.title +
        " " +
        project.summary +
        " " +
        project.skills.join(" ")
      ).toLowerCase();
      if (!text.includes(f.search.toLowerCase()))
        return false;
    }

    // skill
    if (f.skill && f.skill !== "Any") {
      if (!project.skills.includes(f.skill)) return false;
    }

    // duration
    if (f.duration && project.duration !== f.duration)
      return false;

    // budget
    if (f.minBudget || f.maxBudget) {
      const budgetNumbers = project.budget.match(/\d+/g);
      let approxMin = 0;
      let approxMax = Infinity;
      if (budgetNumbers && budgetNumbers.length >= 1) {
        approxMin = parseInt(budgetNumbers[0], 10);
      }
      if (budgetNumbers && budgetNumbers.length >= 2) {
        approxMax = parseInt(budgetNumbers[1], 10);
      }

      if (f.minBudget && approxMax < f.minBudget)
        return false;
      if (f.maxBudget && approxMin > f.maxBudget)
        return false;
    }

    return true;
  }

  const filteredProjects = useMemo(
    () => allProjects.filter((p) => matchesFilters(p, filters)),
    [allProjects, filters]
  );

  const savedCount = savedProjects.length;

  // filter handlers
  const handleFilterChange = (field, value) => {
    setFilterForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleApplyFilters = () => {
    setFilters({
      search: filterForm.search.trim(),
      skill: filterForm.skill,
      minBudget: filterForm.minBudget
        ? parseInt(filterForm.minBudget, 10)
        : null,
      maxBudget: filterForm.maxBudget
        ? parseInt(filterForm.maxBudget, 10)
        : null,
      duration: filterForm.duration || "",
    });
  };

  const handleClearFilters = () => {
    const clearedForm = {
      search: "",
      skill: "Any",
      minBudget: "",
      maxBudget: "",
      duration: "",
    };
    setFilterForm(clearedForm);
    setFilters({
      search: "",
      skill: "Any",
      minBudget: null,
      maxBudget: null,
      duration: "",
    });
  };

  // saved projects helpers
  const isProjectSaved = (id) =>
    savedProjects.some((p) => p.id === id);

  const handleSaveProject = (project) => {
    if (!isProjectSaved(project.id)) {
      setSavedProjects((prev) => [...prev, project]);
    }
  };

  const handleRemoveProject = (id) => {
    setSavedProjects((prev) =>
      prev.filter((p) => p.id !== id)
    );
  };

  // create new project (converted from submit handler)
  const handleCreateProject = (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form["new-title"].value.trim();
    const summary = form["new-summary"].value.trim();
    const description =
      form["new-description"].value.trim();
    const duration =
      form["new-duration"].value.trim() || "1-3 months";
    const budget =
      form["new-budget"].value.trim() ||
      "₹40,000 – ₹60,000";
    const mainSkill =
      form["new-main-skill"].value.trim();
    const skillsExtra = form["new-skills"].value.trim();
    const tagsInput = form["new-tags"].value.trim();

    const skills = [];
    if (mainSkill) skills.push(mainSkill);
    if (skillsExtra) {
      skillsExtra.split(",").forEach((s) => {
        const trimmed = s.trim();
        if (trimmed) skills.push(trimmed);
      });
    }

    const tags = [];
    if (tagsInput) {
      tagsInput.split(",").forEach((t) => {
        const trimmed = t.trim();
        if (trimmed) tags.push(trimmed);
      });
    }

    const newProject = {
      id: Date.now(),
      title,
      summary,
      description,
      duration,
      budget,
      skills: skills.length ? skills : ["General"],
      tags: tags.length
        ? tags
        : skills.length
        ? skills
        : ["Project"],
    };

    setAllProjects((prev) => [...prev, newProject]);

    form.reset();
    window.alert(
      "Project created and added to the main list."
    );
    setCurrentPage("find");
  };

  // modal
  const openDetailsModal = (project) =>
    setSelectedProject(project);
  const closeModal = () => setSelectedProject(null);

  const showFindPage = currentPage === "find";
  const showSavedPage = currentPage === "saved";
  const showPostPage = currentPage === "post";

  return (
    <div className="app">
      {/* TOP BAR */}
      <header className="topbar">
        <div className="topbar-left">
          <div className="logo">Talent Link</div>
          <span className="topbar-divider">|</span>
          <span className="page-title">
            Freelancer Dashboard
          </span>
        </div>
        <div className="topbar-right">
          <button
            className="icon-btn"
            title="Notifications"
            onClick={() =>
              window.alert("No new notifications right now 😊")
            }
          >
            🔔
          </button>
          <div className="profile-wrapper">
            <button
              className="profile-btn"
              id="btn-profile"
              title="Profile"
              ref={profileBtnRef}
              onClick={(e) => {
                e.stopPropagation();
                setProfileMenuOpen((prev) => !prev);
              }}
            >
              S
            </button>

            {profileMenuOpen && (
              <div
                className="profile-menu"
                ref={profileMenuRef}
                onClick={(e) => e.stopPropagation()}
              >
                <h3>Profile Information</h3>
                <div className="form-group">
                  <label>Full Name</label>
                  <input placeholder="Sara Snehitha" />
                </div>
                <div className="form-group">
                  <label>Role</label>
                  <input placeholder="Freelancer / Client" />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    placeholder="you@email.com"
                  />
                </div>
                <div className="form-group">
                  <label>About</label>
                  <textarea
                    rows={2}
                    placeholder="Short description about you."
                  ></textarea>
                </div>
                <button
                  className="btn-profile-save"
                  onClick={() =>
                    window.alert("Profile saved (demo only).")
                  }
                >
                  Save Profile
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main className="main">
        {/* FIND PROJECTS (HOME) */}
        {showFindPage && (
          <section
            id="find-projects"
            className="page visible"
          >
            <div className="toolbar">
              <div className="search-box">
                <input
                  id="search-input"
                  placeholder="Search by project title or keyword..."
                  value={filterForm.search}
                  onChange={(e) =>
                    handleFilterChange(
                      "search",
                      e.target.value
                    )
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleApplyFilters();
                    }
                  }}
                />
              </div>
              <div className="toolbar-actions">
                <button
                  className="btn-primary"
                  id="btn-post-project"
                  onClick={() => setCurrentPage("post")}
                >
                  + Post a New Project
                </button>
                <button
                  className="btn-outline saved-projects-pill"
                  id="btn-open-saved"
                  onClick={() => setCurrentPage("saved")}
                >
                  <span className="star">★</span>
                  Saved Projects (
                  <span id="pill-saved-count">
                    {savedCount}
                  </span>
                  )
                </button>
              </div>
            </div>

            <div className="content-row">
              {/* Filters */}
              <aside className="panel">
                <h2>Filters</h2>

                <div className="filter-group">
                  <label htmlFor="skill-select">
                    Skill
                  </label>
                  <select
                    id="skill-select"
                    value={filterForm.skill}
                    onChange={(e) =>
                      handleFilterChange(
                        "skill",
                        e.target.value
                      )
                    }
                  >
                    <option>Any</option>
                    <option>React</option>
                    <option>Angular</option>
                    <option>Vue</option>
                    <option>Node.js</option>
                    <option>Express</option>
                    <option>MongoDB</option>
                    <option>MySQL</option>
                    <option>UI/UX</option>
                    <option>Figma</option>
                    <option>Flutter</option>
                    <option>Java</option>
                    <option>Python</option>
                  </select>
                </div>

                <div className="filter-group">
                  <label>Budget (₹)</label>
                  <input
                    id="budget-min"
                    type="number"
                    placeholder="Min"
                    style={{ marginBottom: "0.4rem" }}
                    value={filterForm.minBudget}
                    onChange={(e) =>
                      handleFilterChange(
                        "minBudget",
                        e.target.value
                      )
                    }
                  />
                  <input
                    id="budget-max"
                    type="number"
                    placeholder="Max"
                    value={filterForm.maxBudget}
                    onChange={(e) =>
                      handleFilterChange(
                        "maxBudget",
                        e.target.value
                      )
                    }
                  />
                </div>

                <div className="filter-group">
                  <label>Duration</label>
                  <div className="duration-options">
                    {[
                      "< 1 week",
                      "1-4 weeks",
                      "1-3 months",
                      "> 3 months",
                    ].map((d) => (
                      <label key={d}>
                        <input
                          type="radio"
                          name="duration"
                          value={d}
                          checked={
                            filterForm.duration === d
                          }
                          onChange={(e) =>
                            handleFilterChange(
                              "duration",
                              e.target.value
                            )
                          }
                        />{" "}
                        {d === "< 1 week"
                          ? "< 1 week"
                          : d === "> 3 months"
                          ? "> 3 months"
                          : d}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="filter-actions">
                  <button
                    className="btn-primary"
                    id="btn-apply-filters"
                    onClick={handleApplyFilters}
                  >
                    Apply Filters
                  </button>
                  <button
                    className="btn-secondary"
                    id="btn-clear-filters"
                    onClick={handleClearFilters}
                  >
                    Clear Filters
                  </button>
                </div>
              </aside>

              {/* Project list */}
              <section className="panel">
                <div
                  id="find-projects-list"
                  className="projects-list"
                >
                  {filteredProjects.map((project) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      isSaved={isProjectSaved(project.id)}
                      showSave
                      showRemove={false}
                      onSave={() =>
                        handleSaveProject(project)
                      }
                      onViewDetails={() =>
                        openDetailsModal(project)
                      }
                    />
                  ))}

                  {filteredProjects.length === 0 && (
                    <p
                      style={{
                        fontSize: "0.9rem",
                        color: "var(--text-muted)",
                      }}
                    >
                      No projects found.
                    </p>
                  )}
                </div>
                <div className="projects-meta">
                  <span id="find-results-count">
                    {filteredProjects.length === 0
                      ? "No projects found."
                      : `${filteredProjects.length} projects found.`}
                  </span>
                  <span>
                    Tip: Click “Save Project” to move it
                    into your Saved list.
                  </span>
                </div>
              </section>
            </div>
          </section>
        )}

        {/* SAVED PROJECTS PAGE */}
        {showSavedPage && (
          <section
            id="saved-projects"
            className="page visible"
          >
            <div className="toolbar">
              <div>
                <div className="page-title-inline">
                  Saved Projects
                </div>
                <span
                  style={{
                    fontSize: "0.87rem",
                    color: "var(--text-muted)",
                  }}
                >
                  Projects you’ve bookmarked to review or
                  apply later.
                </span>
              </div>
              <button
                className="btn-outline"
                id="btn-back-from-saved"
                onClick={() => setCurrentPage("find")}
              >
                ← Back to Projects
              </button>
            </div>

            <section className="panel">
              <div
                id="saved-projects-list"
                className="projects-list"
              >
                {savedProjects.length === 0 ? (
                  <p
                    style={{
                      fontSize: "0.9rem",
                      color: "var(--text-muted)",
                    }}
                  >
                    No saved projects yet.
                  </p>
                ) : (
                  savedProjects.map((project) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      isSaved
                      showSave={false}
                      showRemove
                      onRemove={() =>
                        handleRemoveProject(project.id)
                      }
                      onViewDetails={() =>
                        openDetailsModal(project)
                      }
                    />
                  ))
                )}
              </div>
              <div className="projects-meta">
                <span id="saved-results-count">
                  {savedProjects.length} saved project(s).
                </span>
                <span>
                  Saved projects stay only in this browser
                  (demo mode).
                </span>
              </div>
            </section>
          </section>
        )}

        {/* POST A NEW PROJECT PAGE */}
        {showPostPage && (
          <section
            id="post-project"
            className="page visible"
          >
            <div className="toolbar">
              <div className="page-title-inline">
                Post a New Project
              </div>
              <button
                className="btn-outline"
                id="btn-back-from-post"
                onClick={() => setCurrentPage("find")}
              >
                ← Back to Projects
              </button>
            </div>

            <section className="panel">
              <form
                id="post-project-form"
                onSubmit={handleCreateProject}
              >
                <div className="form-group">
                  <label>Project Title</label>
                  <input
                    id="new-title"
                    name="new-title"
                    required
                    placeholder="React Frontend Dashboard UI"
                  />
                </div>

                <div className="form-group">
                  <label>Short Summary</label>
                  <textarea
                    id="new-summary"
                    name="new-summary"
                    rows={2}
                    required
                    placeholder="Build a responsive dashboard for client management using React."
                  ></textarea>
                </div>

                <div className="form-group">
                  <label>
                    Detailed Description / View Details
                    Content
                  </label>
                  <textarea
                    id="new-description"
                    name="new-description"
                    rows={4}
                    required
                    placeholder="Add here all the details that should appear in the View Details section."
                  ></textarea>
                </div>

                <div className="form-grid">
                  <div className="form-group">
                    <label>Duration</label>
                    <input
                      id="new-duration"
                      name="new-duration"
                      placeholder="1-3 months"
                    />
                  </div>
                  <div className="form-group">
                    <label>Budget Range (₹)</label>
                    <input
                      id="new-budget"
                      name="new-budget"
                      placeholder="40,000 – 60,000"
                    />
                  </div>
                </div>

                <div className="form-grid">
                  <div className="form-group">
                    <label>Primary Skill</label>
                    <input
                      id="new-main-skill"
                      name="new-main-skill"
                      placeholder="React"
                    />
                  </div>
                  <div className="form-group">
                    <label>
                      Other Skills (comma separated)
                    </label>
                    <input
                      id="new-skills"
                      name="new-skills"
                      placeholder="JavaScript, CSS, Responsive UI"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Tags (comma separated)</label>
                  <input
                    id="new-tags"
                    name="new-tags"
                    placeholder="Frontend, Dashboard, Web App"
                  />
                </div>

                <button
                  className="btn-primary"
                  type="submit"
                >
                  Create Project
                </button>
              </form>
            </section>
          </section>
        )}
      </main>

      {/* MODAL */}
      {selectedProject && (
        <div
          className="modal-backdrop"
          onClick={(e) => {
            if (
              e.target.classList.contains(
                "modal-backdrop"
              )
            ) {
              closeModal();
            }
          }}
        >
          <div
            className="modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close"
              id="modal-close"
              onClick={closeModal}
            >
              &times;
            </button>
            <h2 id="modal-title">
              {selectedProject.title}
            </h2>
            <p id="modal-summary">
              {selectedProject.summary}
            </p>
            <p>
              <strong>Duration:</strong>{" "}
              <span id="modal-duration">
                {selectedProject.duration}
              </span>
            </p>
            <p>
              <strong>Budget:</strong>{" "}
              <span id="modal-budget">
                {selectedProject.budget}
              </span>
            </p>
            <p>
              <strong>Skills:</strong>{" "}
              <span id="modal-skills">
                {selectedProject.skills.join(", ")}
              </span>
            </p>
            <p style={{ marginTop: "0.5rem" }}>
              <strong>Details:</strong>
            </p>
            <p id="modal-description">
              {selectedProject.description}
            </p>
            <div className="modal-tags" id="modal-tags">
              {selectedProject.tags.map((tag) => (
                <span key={tag} className="tag">
                  {tag}
                </span>
              ))}
            </div>
            <div className="modal-footer">
              <button
                className="btn-secondary"
                id="modal-ok"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Reusable card component
function ProjectCard({
  project,
  isSaved,
  showSave,
  showRemove,
  onSave,
  onRemove,
  onViewDetails,
}) {
  return (
    <div className="project-card">
      <div className="project-header">
        <div className="project-title">
          {project.title}
        </div>
        <div
          style={{
            fontSize: "0.8rem",
            color: "var(--text-muted)",
          }}
        >
          {project.duration}
        </div>
      </div>

      <p className="project-summary">
        {project.summary}
      </p>

      <div className="project-footer">
        <div className="tags">
          {project.tags.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>
        <div
          style={{
            display: "flex",
            gap: "0.4rem",
            flexWrap: "wrap",
          }}
        >
          <button
            className="btn-details"
            onClick={onViewDetails}
          >
            View Details
          </button>
          {showSave && (
            <button
              className="btn-save"
              onClick={onSave}
              disabled={isSaved}
            >
              {isSaved ? "Saved" : "Save Project"}
            </button>
          )}
          {showRemove && (
            <button
              className="btn-remove"
              onClick={onRemove}
            >
              Remove
            </button>
          )}
        </div>
      </div>

      <div
        style={{
          marginTop: "0.3rem",
          fontSize: "0.78rem",
          color: "var(--text-muted)",
        }}
      >
        {project.budget}
      </div>
    </div>
  );
}

export default App;