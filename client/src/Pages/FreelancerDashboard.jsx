import React, { useState, useMemo, useEffect, useRef } from "react";
import ProjectCard from "../components/ProjectCard.jsx";
import FilterSidebar from "../components/FilterSidebar.jsx";
import ProjectModal from "../components/ProjectModal.jsx";
import ProfileMenu from "../components/ProfileMenu.jsx";
import profileService from '../services/profileService.js';
import ProfileCompletenessBar from '../components/ProfileCompletenessBar.jsx';
import { useNavigate } from "react-router-dom";

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

const FreelancerDashboard = () => {
  // which page is currently shown: 'find' | 'saved' | 'post'
  const [currentPage, setCurrentPage] = useState("find");

  // projects & saved
  const [allProjects, setAllProjects] = useState(initialProjects);
  const [savedProjects, setSavedProjects] = useState([]);

  // profile dropdown
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef(null);
  const profileBtnRef = useRef(null);
  const [profile, setProfile] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(true);

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
  const [selectedProject, setSelectedProject] = useState(null);

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

  // load freelancer profile
  useEffect(() => {
    const loadProfile = async () => {
      setLoadingProfile(true);
      try {
        const data = await profileService.freelancer.getProfile();
        setProfile(data);
      } catch (err) {
        setProfile(null);
        console.error('Failed to load freelancer profile:', err);
      } finally {
        setLoadingProfile(false);
      }
    };

    loadProfile();
  }, []);

  // filtering logic
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
    setFilterForm({
      search: "",
      skill: "Any",
      minBudget: "",
      maxBudget: "",
      duration: "",
    });
    setFilters({
      search: "",
      skill: "Any",
      minBudget: null,
      maxBudget: null,
      duration: "",
    });
  };

  // save / unsave
  const toggleSave = (project) => {
    setSavedProjects((prev) => {
      const exists = prev.some((p) => p.id === project.id);
      if (exists) {
        return prev.filter((p) => p.id !== project.id);
      } else {
        return [...prev, project];
      }
    });
  };

  const isProjectSaved = (project) =>
    savedProjects.some((p) => p.id === project.id);

  // page navigation
  const renderPage = () => {
    switch (currentPage) {
      case "find":
        return filteredProjects;
      case "saved":
        return savedProjects;
      default:
        return filteredProjects;
    }
  };

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">FreelanceHub</h1>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex space-x-8">
              <button
                onClick={() => setCurrentPage("find")}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  currentPage === "find"
                    ? "bg-indigo-100 text-indigo-700"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Find Work
              </button>
              <button
                onClick={() => setCurrentPage("saved")}
                className={`px-3 py-2 rounded-md text-sm font-medium relative ${
                  currentPage === "saved"
                    ? "bg-indigo-100 text-indigo-700"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Saved Jobs
                {savedCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {savedCount}
                  </span>
                )}
              </button>
              {loadingProfile ? (
                <button className="px-3 py-2 rounded-md text-sm font-medium text-white bg-gray-400 cursor-wait">Loading...</button>
              ) : profile ? (
                <button onClick={() => navigate('/freelancer/profile/edit')} className="px-3 py-2 rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">Edit Profile</button>
              ) : (
                <button onClick={() => navigate('/freelancer/profile/create')} className="px-3 py-2 rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">Create Profile</button>
              )}
            </nav>

            {/* Profile Menu */}
            <ProfileMenu
              isOpen={profileMenuOpen}
              setIsOpen={setProfileMenuOpen}
              menuRef={profileMenuRef}
              buttonRef={profileBtnRef}
            />
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filter Sidebar */}
          <FilterSidebar
            filterForm={filterForm}
            onFilterChange={handleFilterChange}
            onApplyFilters={handleApplyFilters}
            onClearFilters={handleClearFilters}
          />

          {/* Main Content */}
          <div className="flex-1">
            {/* Page Title */}
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-gray-900">
                {currentPage === "find" ? "Find Work" : "Saved Jobs"}
              </h2>
              <p className="text-gray-600 mt-2">
                {currentPage === "find"
                  ? "Discover projects that match your skills"
                  : "Your saved projects"}
              </p>
            </div>

            {profile && (
              <div className="mb-6 p-4 bg-white rounded-md shadow-sm border">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-gray-600">Welcome back,</div>
                    <div className="text-lg font-semibold">{profile.first_name} {profile.last_name}</div>
                    {profile.title && <div className="text-sm text-gray-500">{profile.title}</div>}
                  </div>
                  <div className="w-48">
                    <ProfileCompletenessBar percentage={profile.profile_completeness || 0} />
                  </div>
                </div>
              </div>
            )}

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {renderPage().map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  isSaved={isProjectSaved(project)}
                  onToggleSave={toggleSave}
                  onViewDetails={setSelectedProject}
                />
              ))}
            </div>

            {renderPage().length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  {currentPage === "find"
                    ? "No projects found matching your criteria."
                    : "No saved projects yet."}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          isSaved={isProjectSaved(selectedProject)}
          onToggleSave={toggleSave}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
};

export default FreelancerDashboard;