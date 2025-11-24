import React from "react";
import { Box } from "@mui/material";
import FreelancerSidebar from "../components/sidebar/FreelancerSidebar";
import FreelancerNavbar from "../components/navbar/FreelancerNavbar";

export default function FreelancerLayout({ children }) {
  return (
    <Box sx={{ display: "flex" }}>
      {/* Sidebar */}
      <FreelancerSidebar />

      {/* Main content area */}
      <Box
        sx={{
          flexGrow: 1,
          ml: "260px",       // matches wider sidebar
          backgroundColor: "#E8EFF7",
          minHeight: "100vh",
        }}
      >
        {/* Navbar */}
        <FreelancerNavbar />

        {/* Content */}
        <Box
          sx={{
            padding: "20px",
            width: "100%",        // FULL width, no restriction
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}
