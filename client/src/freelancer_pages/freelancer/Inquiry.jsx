import React, { useState, useMemo } from "react";
import {
  Typography,
  Card,
  Box,
  Grid,
  Chip,
  Button,
  Avatar,
  Stack,
  Pagination,
  Rating,
  IconButton,
  Tooltip,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import FreelancerLayout from "../../freelancer_layouts/FreelancerLayout";
import ProjectSearchFilters from "../../freelancer_components/ProjectSearchFilters/ProjectSearchFilters";

// Mock Projects Data
const mockProjects = [
  {
    id: 1,
    title: "E-commerce Platform Development",
    description: "Build a full-stack e-commerce platform with React and Node.js. Need experienced developer for 3-month project.",
    client: "Global Mart",
    clientImg: "https://i.pravatar.cc/150?img=1",
    budget: { min: 5000, max: 10000 },
    budgetType: "fixed",
    duration: "3-6 months",
    level: "Expert",
    skills: ["React", "Node.js", "JavaScript", "GraphQL"],
    rating: 4.8,
    reviews: 24,
    proposals: 12,
    status: "open",
    saved: false,
  },
  {
    id: 2,
    title: "Mobile App UI Design",
    description: "Design beautiful and intuitive UI for our mobile application. Looking for creative designer with Figma experience.",
    client: "Acme Inc.",
    clientImg: "https://i.pravatar.cc/150?img=2",
    budget: { min: 1000, max: 3000 },
    budgetType: "fixed",
    duration: "1-3 months",
    level: "Intermediate",
    skills: ["UI Design", "Figma", "CSS"],
    rating: 4.6,
    reviews: 18,
    proposals: 8,
    status: "open",
    saved: false,
  },
  {
    id: 3,
    title: "Website Redesign & Optimization",
    description: "Complete redesign of existing website for better performance and modern design. Bootstrap to React conversion.",
    client: "Tech Innovations",
    clientImg: "https://i.pravatar.cc/150?img=3",
    budget: { min: 2000, max: 5000 },
    budgetType: "fixed",
    duration: "1-3 months",
    level: "Intermediate",
    skills: ["React", "Web Development", "CSS", "JavaScript"],
    rating: 4.7,
    reviews: 32,
    proposals: 15,
    status: "open",
    saved: false,
  },
  {
    id: 4,
    title: "TypeScript Migration & Refactoring",
    description: "Convert existing JavaScript project to TypeScript. Improve type safety and code maintainability.",
    client: "StartUp Labs",
    clientImg: "https://i.pravatar.cc/150?img=4",
    budget: { min: 3000, max: 7000 },
    budgetType: "fixed",
    duration: "3-6 months",
    level: "Expert",
    skills: ["TypeScript", "JavaScript", "React", "Node.js"],
    rating: 4.9,
    reviews: 41,
    proposals: 22,
    status: "open",
    saved: false,
  },
  {
    id: 5,
    title: "Backend API Development",
    description: "Develop RESTful API for mobile app with Python and Django. Handle authentication, payments, and notifications.",
    client: "Cloud Services Co.",
    clientImg: "https://i.pravatar.cc/150?img=5",
    budget: { min: 4000, max: 8000 },
    budgetType: "hourly",
    duration: "Less than 1 month",
    level: "Expert",
    skills: ["Python", "Node.js", "GraphQL", "Database Design"],
    rating: 4.7,
    reviews: 29,
    proposals: 18,
    status: "open",
    saved: false,
  },
  {
    id: 6,
    title: "Next.js SaaS Application",
    description: "Build a complete SaaS application with Next.js. Includes landing page, dashboard, and user management.",
    client: "Digital Solutions",
    clientImg: "https://i.pravatar.cc/150?img=6",
    budget: { min: 6000, max: 12000 },
    budgetType: "fixed",
    duration: "3-6 months",
    level: "Expert",
    skills: ["Next.js", "React", "TypeScript", "GraphQL"],
    rating: 4.8,
    reviews: 35,
    proposals: 19,
    status: "open",
    saved: false,
  },
  {
    id: 7,
    title: "Mobile App Development",
    description: "Native iOS and Android app development for fitness tracking. React Native or Flutter.",
    client: "FitTech Inc.",
    clientImg: "https://i.pravatar.cc/150?img=7",
    budget: { min: 8000, max: 15000 },
    budgetType: "fixed",
    duration: "More than 6 months",
    level: "Expert",
    skills: ["Mobile App", "React", "JavaScript"],
    rating: 4.6,
    reviews: 27,
    proposals: 14,
    status: "open",
    saved: false,
  },
  {
    id: 8,
    title: "Landing Page Design & Development",
    description: "Create an engaging landing page with animations. Design + Frontend development needed.",
    client: "Marketing Pro",
    clientImg: "https://i.pravatar.cc/150?img=8",
    budget: { min: 500, max: 1500 },
    budgetType: "fixed",
    duration: "Less than 1 month",
    level: "Entry Level",
    skills: ["Web Development", "CSS", "JavaScript"],
    rating: 4.5,
    reviews: 19,
    proposals: 25,
    status: "open",
    saved: false,
  },
  {
    id: 9,
    title: "React Component Library",
    description: "Build reusable React component library with Storybook. TypeScript required.",
    client: "Dev Framework Inc.",
    clientImg: "https://i.pravatar.cc/150?img=9",
    budget: { min: 4000, max: 7000 },
    budgetType: "fixed",
    duration: "1-3 months",
    level: "Expert",
    skills: ["React", "TypeScript", "JavaScript"],
    rating: 4.9,
    reviews: 38,
    proposals: 16,
    status: "open",
    saved: false,
  },
  {
    id: 10,
    title: "Data Dashboard Creation",
    description: "Create interactive data visualization dashboard. Real-time data from APIs.",
    client: "Analytics Hub",
    clientImg: "https://i.pravatar.cc/150?img=10",
    budget: { min: 2500, max: 5000 },
    budgetType: "fixed",
    duration: "1-3 months",
    level: "Intermediate",
    skills: ["React", "JavaScript", "GraphQL"],
    rating: 4.7,
    reviews: 22,
    proposals: 11,
    status: "open",
    saved: false,
  },
];

export default function Inquiry() {
  const [projects, setProjects] = useState(mockProjects);
  const [filteredProjects, setFilteredProjects] = useState(mockProjects);
  const [currentPage, setCurrentPage] = useState(1);

  const projectsPerPage = 6;

  // Filter projects
  const handleFiltersChange = (newFilters) => {
    setCurrentPage(1);

    let filtered = projects;

    // Search query
    if (newFilters.searchQuery) {
      const query = newFilters.searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.client.toLowerCase().includes(query)
      );
    }

    // Skills filter
    if (newFilters.skills.length > 0) {
      filtered = filtered.filter((p) =>
        newFilters.skills.some((skill) => p.skills.includes(skill))
      );
    }

    // Budget filter
    filtered = filtered.filter(
      (p) =>
        p.budget.min >= newFilters.budget[0] &&
        p.budget.max <= newFilters.budget[1]
    );

    // Duration filter
    if (newFilters.duration !== "all") {
      filtered = filtered.filter((p) => p.duration === newFilters.duration);
    }

    // Level filter
    if (newFilters.level.length > 0) {
      filtered = filtered.filter((p) =>
        newFilters.level.includes(p.level)
      );
    }

    // Status filter
    if (newFilters.status !== "all") {
      filtered = filtered.filter((p) => p.status === newFilters.status);
    }

    setFilteredProjects(filtered);
  };

  // Handle save project
  const handleSaveProject = (projectId) => {
    setProjects((prev) =>
      prev.map((p) =>
        p.id === projectId ? { ...p, saved: !p.saved } : p
      )
    );
    setFilteredProjects((prev) =>
      prev.map((p) =>
        p.id === projectId ? { ...p, saved: !p.saved } : p
      )
    );
  };

  // Pagination
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);
  const paginatedProjects = useMemo(() => {
    const startIndex = (currentPage - 1) * projectsPerPage;
    return filteredProjects.slice(startIndex, startIndex + projectsPerPage);
  }, [filteredProjects, currentPage]);

  return (
    <FreelancerLayout>
      <Box sx={{ p: 3 }}>
        {/* Header */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h5" fontWeight={700} sx={{ color: "#1e293b", mb: 1 }}>
            Browse Projects
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Find and apply for projects that match your skills
          </Typography>
        </Box>

        {/* Search & Filters */}
        <ProjectSearchFilters onFiltersChange={handleFiltersChange} />

        {/* Results Info */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
          <Typography variant="body2" color="text.secondary">
            Showing {paginatedProjects.length > 0 ? (currentPage - 1) * projectsPerPage + 1 : 0} -{" "}
            {Math.min(currentPage * projectsPerPage, filteredProjects.length)} of{" "}
            {filteredProjects.length} projects
          </Typography>
        </Box>

        {/* Projects Grid */}
        {paginatedProjects.length === 0 ? (
          <Card sx={{ p: 6, textAlign: "center", bgcolor: "#f9fafb" }}>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
              No projects found
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Try adjusting your filters to find more projects
            </Typography>
          </Card>
        ) : (
          <Grid container spacing={3}>
            {paginatedProjects.map((project) => (
              <Grid item xs={12} md={6} lg={4} key={project.id}>
                <Card
                  sx={{
                    p: 2.5,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                      transform: "translateY(-4px)",
                    },
                  }}
                >
                  {/* Header with Save Button */}
                  <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                    <Box>
                      <Typography variant="h6" fontWeight={700} sx={{ color: "#1e293b" }}>
                        {project.title}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {project.status === "open" && "🟢 Open"}
                      </Typography>
                    </Box>
                    <Tooltip title={project.saved ? "Remove from saved" : "Save project"}>
                      <IconButton
                        size="small"
                        onClick={() => handleSaveProject(project.id)}
                        sx={{ color: project.saved ? "#ef4444" : "text.secondary" }}
                      >
                        {project.saved ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                      </IconButton>
                    </Tooltip>
                  </Box>

                  {/* Client Info */}
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                    <Avatar src={project.clientImg} sx={{ width: 40, height: 40 }} />
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="subtitle2" fontWeight={600}>
                        {project.client}
                      </Typography>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                        <Rating value={project.rating} readOnly size="small" />
                        <Typography variant="caption" color="text.secondary">
                          {project.rating} ({project.reviews} reviews)
                        </Typography>
                      </Box>
                    </Box>
                  </Box>

                  {/* Description */}
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      mb: 2,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {project.description}
                  </Typography>

                  {/* Skills */}
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
                    {project.skills.slice(0, 3).map((skill) => (
                      <Chip
                        key={skill}
                        label={skill}
                        size="small"
                        variant="outlined"
                        sx={{
                          height: 24,
                          borderColor: "#e5e7eb",
                          color: "text.secondary",
                          fontSize: "0.75rem",
                        }}
                      />
                    ))}
                    {project.skills.length > 3 && (
                      <Typography variant="caption" color="text.secondary" sx={{ pt: 0.5 }}>
                        +{project.skills.length - 3} more
                      </Typography>
                    )}
                  </Box>

                  {/* Meta Info */}
                  <Box sx={{ display: "flex", gap: 2, mb: 2, flexWrap: "wrap" }}>
                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        Budget
                      </Typography>
                      <Typography variant="subtitle2" fontWeight={700} color="success.main">
                        ${project.budget.min} - ${project.budget.max}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        Duration
                      </Typography>
                      <Typography variant="subtitle2" fontWeight={700}>
                        {project.duration}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        Level
                      </Typography>
                      <Typography
                        variant="subtitle2"
                        fontWeight={700}
                        sx={{
                          color:
                            project.level === "Expert"
                              ? "#ef4444"
                              : project.level === "Intermediate"
                              ? "#f59e0b"
                              : "#10b981",
                        }}
                      >
                        {project.level}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Proposals Count */}
                  <Typography variant="caption" color="text.secondary" sx={{ mb: 2 }}>
                    {project.proposals} proposals submitted
                  </Typography>

                  {/* Action Buttons */}
                  <Stack spacing={1} sx={{ mt: "auto" }}>
                    <Button
                      fullWidth
                      variant="contained"
                      endIcon={<OpenInNewIcon />}
                      sx={{
                        bgcolor: "#3b82f6",
                        textTransform: "none",
                        borderRadius: 1.5,
                        "&:hover": { bgcolor: "#2563eb" },
                      }}
                    >
                      View Details
                    </Button>
                    <Button
                      fullWidth
                      variant="outlined"
                      sx={{
                        borderColor: "#e5e7eb",
                        color: "text.secondary",
                        textTransform: "none",
                        borderRadius: 1.5,
                        "&:hover": { bgcolor: "#f9fafb" },
                      }}
                    >
                      Message Client
                    </Button>
                  </Stack>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={(event, page) => setCurrentPage(page)}
              color="primary"
              sx={{
                "& .MuiPaginationItem-root": {
                  borderRadius: 1,
                  textTransform: "none",
                },
                "& .Mui-selected": {
                  bgcolor: "#eff6ff !important",
                  color: "#3b82f6 !important",
                },
              }}
            />
          </Box>
        )}
      </Box>
    </FreelancerLayout>
  );
}