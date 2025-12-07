


import React from "react";
import { Box, CssBaseline, ThemeProvider, createTheme, Toolbar } from "@mui/material";
import FreelancerSidebar from "../freelancer_components/sidebar/FreelancerSidebar";
import FreelancerNavbar from "../freelancer_components/navbar/FreelancerNavbar";

// --- 1. Define the Custom Theme based on the image ---
const theme = createTheme({
  palette: {
    primary: {
      main: "#1b4332", // Dark Green for Sidebar
      light: "#2d6a4f",
    },
    secondary: {
      main: "#4ade80", // Bright Green for Accents/Active states
      contrastText: "#1b4332",
    },
    background: {
      default: "#f3f4f6", // Light Gray background for the main content area
      paper: "#ffffff",   // White for cards and navbar
    },
    text: {
      primary: "#1f2937", // Dark Gray for main text
      secondary: "#6b7280", // Softer gray for labels
    },
    success: { main: "#22c55e" }, // Green for positive stats
    error: { main: "#ef4444" },   // Red for negative stats
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h5: { fontWeight: 700 },
    h6: { fontWeight: 600 },
    subtitle1: { fontWeight: 600 },
    subtitle2: { fontWeight: 500 },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "16px", // Soft, modern roundness
          boxShadow: "0px 2px 4px rgba(0,0,0,0.05)", // Very subtle shadow
          border: "none",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          textTransform: "none", // Keep button text typical case
          fontWeight: 600,
        },
      },
    },
  },
});

const drawerWidth = 260;

export default function FreelancerLayout({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "background.default" }}>
        
        {/* --- 2. Sidebar (Fixed Left) --- */}
        <FreelancerSidebar width={drawerWidth} />

        {/* --- 3. Main Content Area --- */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            width: `calc(100% - ${drawerWidth}px)`,
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Navbar (Fixed Top) */}
          <FreelancerNavbar />

          {/* Scrollable Dashboard Content */}
          <Box component="main" sx={{ flexGrow: 1, p: 3, overflow: "auto" }}>
            {/* Toolbar fix to prevent content from going under the navbar */}
            <Toolbar /> 
            {children}
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
