

import React, { useState } from "react";
import { Typography, Box, Grid, Card, LinearProgress, Chip, Avatar, Button, Stack, Tab, Tabs } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useNavigate } from "react-router-dom";

// 1. Import Shared Data Context
import { useProjects } from "../../context/ProjectContext";

// 2. Import the Layout (sidebar + navbar)
import FreelancerLayout from "../../freelancer_layouts/FreelancerLayout"; 

export default function Projects() {
  const { projects } = useProjects(); // Get Real Data
  const [tabValue, setTabValue] = useState("All");
  const navigate = useNavigate();

  // --- Calculate Counts ---
  const counts = {
    All: projects.length,
    Active: projects.filter((p) => p.status === "Active").length,
    Completed: projects.filter((p) => p.status === "Completed").length,
    Pending: projects.filter((p) => p.status === "Draft").length, // Assuming 'Draft' maps to Pending in your logic
  };

  // --- Filter Logic ---
  const filteredProjects = tabValue === "All" 
    ? projects 
    : projects.filter((p) => p.status === tabValue);

  return (
    // 3. Wrap everything in FreelancerLayout
    <FreelancerLayout>
      <Box sx={{ p: 3 }}>
        
        {/* --- Page Header --- */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
          <Box>
             <Typography variant="h5" fontWeight={700} sx={{ color: "#1e293b" }}>My Projects</Typography>
             <Typography variant="body2" color="text.secondary">Manage your active contracts and work.</Typography>
          </Box>
          
          <Button 
            variant="contained" 
            startIcon={<SearchIcon />} 
            onClick={() => navigate("/freelancer/inquiry")}
            sx={{ bgcolor: "#3b82f6", textTransform: 'none', borderRadius: 2 }}
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
            sx={{ 
              "& .MuiTab-root": { textTransform: "none", fontWeight: 600, fontSize: "14px" },
              "& .Mui-selected": { color: "#3b82f6 !important" },
              "& .MuiTabs-indicator": { backgroundColor: "#3b82f6" }
            }}
          >
            {["All", "Active", "Completed"].map((status) => (
              <Tab 
                key={status} 
                value={status} 
                label={
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    {status}
                    <Chip 
                      label={counts[status] || 0} 
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
        {filteredProjects.length === 0 ? (
          <Box sx={{ textAlign: "center", py: 8, border: "2px dashed #e2e8f0", borderRadius: 4, bgcolor: "white" }}>
              <Typography variant="h6" color="text.secondary">No projects found</Typography>
              <Typography variant="body2" color="text.secondary">Jobs posted by the client will appear here.</Typography>
          </Box>
        ) : (
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
                      borderRadius: 3,
                      boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                      border: "1px solid #f1f5f9",
                      transition: "transform 0.2s",
                      "&:hover": { transform: "translateY(-4px)", boxShadow: 4 }
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
                          fontWeight: 700,
                          fontSize: "0.7rem",
                          height: 24
                      }} 
                      />
                      <MoreVertIcon sx={{ color: "text.secondary", cursor: "pointer" }} fontSize="small" />
                  </Box>

                  {/* Card Content */}
                  <Typography variant="h6" fontWeight={700} sx={{ mb: 0.5, fontSize: "1.1rem" }}>
                      {p.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                      Client: {p.client || "Apex Financial"}
                  </Typography>
                  
                  <Box sx={{ mt: "auto" }}>
                      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                      <Typography variant="caption" fontWeight={600} color="text.secondary">Progress</Typography>
                      <Typography variant="caption" fontWeight={700}>{p.progress || 0}%</Typography>
                      </Box>
                      <LinearProgress 
                      variant="determinate" 
                      value={p.progress || 0} 
                      sx={{ 
                          height: 6, 
                          borderRadius: 3,
                          bgcolor: "#f1f5f9",
                          "& .MuiLinearProgress-bar": {
                          bgcolor: p.status === "Completed" ? "#10b981" : "#3b82f6"
                          }
                      }} 
                      />
                      
                      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 3 }}>
                          <Stack direction="row" spacing={-1}>
                          <Avatar sx={{ width: 28, height: 28, fontSize: 12, bgcolor: "#3b82f6" }}>A</Avatar>
                          </Stack>
                          <Typography variant="caption" color="text.secondary" fontWeight={500}>
                              Due: {p.deadline || "TBD"}
                          </Typography>
                      </Box>
                  </Box>
                  </Card>
              </Grid>
              ))}
          </Grid>
        )}
      </Box>
    </FreelancerLayout>
  );
}