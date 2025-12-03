import React, { useState } from "react";
import { Typography, Box, Grid, Card, LinearProgress, Chip, Avatar, Button, Stack, Tab, Tabs } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search"; // Changed Icon
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FreelancerLayout from "../../freelancer_layouts/FreelancerLayout";
import { useNavigate } from "react-router-dom"; // Import Navigation

// --- Mock Data (Projects you have been hired for) ---
const projectsData = [
  { id: 1, title: "Mobile App UI", client: "Stark Tech", progress: 75, status: "Active", dueDate: "Dec 10" },
  { id: 2, title: "E-Commerce Website", client: "Global Mart", progress: 30, status: "Active", dueDate: "Jan 15" },
  { id: 3, title: "Logo Redesign", client: "BizCo", progress: 100, status: "Completed", dueDate: "Nov 20" },
  { id: 4, title: "Marketing Dashboard", client: "Nova Labs", progress: 10, status: "Pending", dueDate: "Feb 01" },
  { id: 5, title: "Social Media Assets", client: "Creative Inc", progress: 60, status: "Active", dueDate: "Dec 05" },
];

export default function Projects() {
  const [tabValue, setTabValue] = useState("All");
  const navigate = useNavigate();

  // --- Calculate Counts ---
  const counts = {
    All: projectsData.length,
    Active: projectsData.filter((p) => p.status === "Active").length,
    Completed: projectsData.filter((p) => p.status === "Completed").length,
    Pending: projectsData.filter((p) => p.status === "Pending").length,
  };

  // --- Filter Logic ---
  const filteredProjects = tabValue === "All" 
    ? projectsData 
    : projectsData.filter((p) => p.status === tabValue);

  return (
    <FreelancerLayout>
      {/* --- Page Header --- */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Box>
           <Typography variant="h5" fontWeight={700}>My Projects</Typography>
           <Typography variant="body2" color="text.secondary">Manage your active contracts and work.</Typography>
        </Box>
        
        {/* LOGIC FIX: Freelancers don't create projects, they find them. */}
        <Button 
          variant="contained" 
          startIcon={<SearchIcon />} 
          onClick={() => navigate("/freelancer/inquiry")} // Or navigate to a "Job Feed" page
          sx={{ bgcolor: "#3b82f6" }}
        >
          Browse Jobs
        </Button>
      </Box>

      {/* --- Status Tabs with Badges --- */}
      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
        <Tabs 
          value={tabValue} 
          onChange={(e, newValue) => setTabValue(newValue)}
          textColor="primary"
          indicatorColor="primary"
        >
          {["All", "Active", "Completed", "Pending"].map((status) => (
            <Tab 
              key={status} 
              value={status} 
              label={
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  {status}
                  <Chip 
                    label={counts[status]} 
                    size="small" 
                    sx={{ 
                      height: 20, 
                      fontSize: "0.75rem",
                      bgcolor: tabValue === status ? "#eff6ff" : "#f3f4f6",
                      color: tabValue === status ? "#3b82f6" : "text.secondary",
                      fontWeight: 700
                    }} 
                  />
                </Box>
              } 
            />
          ))}
        </Tabs>
      </Box>

      {/* --- Projects Grid --- */}
      <Grid container spacing={3}>
        {filteredProjects.map((p) => (
          <Grid item xs={12} md={4} key={p.id}>
            <Card 
              sx={{ 
                p: 3, 
                height: "100%", 
                display: "flex", 
                flexDirection: "column",
                position: "relative",
                transition: "transform 0.2s",
                "&:hover": { transform: "translateY(-4px)", boxShadow: 3 }
              }}
            >
              {/* Card Header */}
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                <Chip 
                  label={p.status} 
                  size="small"
                  sx={{ 
                    bgcolor: p.status === "Active" ? "#eff6ff" : p.status === "Completed" ? "#ecfdf5" : "#fff7ed",
                    color: p.status === "Active" ? "#3b82f6" : p.status === "Completed" ? "#10b981" : "#f59e0b",
                    fontWeight: 600
                  }} 
                />
                <MoreVertIcon sx={{ color: "text.secondary", cursor: "pointer" }} fontSize="small" />
              </Box>

              {/* Card Content */}
              <Typography variant="h6" fontWeight={600} sx={{ mb: 0.5 }}>{p.title}</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>Client: {p.client}</Typography>
              
              <Box sx={{ mt: "auto" }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                  <Typography variant="caption" fontWeight={600}>Progress</Typography>
                  <Typography variant="caption" fontWeight={600}>{p.progress}%</Typography>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={p.progress} 
                  sx={{ 
                    height: 6, 
                    borderRadius: 3,
                    bgcolor: "#f3f4f6",
                    "& .MuiLinearProgress-bar": {
                      bgcolor: p.status === "Completed" ? "#10b981" : "#3b82f6"
                    }
                  }} 
                />
                
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 3 }}>
                   <Stack direction="row" spacing={-1}>
                     <Avatar sx={{ width: 24, height: 24, fontSize: 12, bgcolor: "#3b82f6" }}>A</Avatar>
                     <Avatar sx={{ width: 24, height: 24, fontSize: 12, bgcolor: "#f97316" }}>B</Avatar>
                   </Stack>
                   <Typography variant="caption" color="text.secondary">Due: {p.dueDate}</Typography>
                </Box>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </FreelancerLayout>
  );
}