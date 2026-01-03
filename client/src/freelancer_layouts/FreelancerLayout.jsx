

import React, { useState } from "react";
import { useUser } from "../context/UserContext";
import { Box, CssBaseline, ThemeProvider, createTheme, Toolbar } from "@mui/material";
import FreelancerSidebar from "../freelancer_components/sidebar/FreelancerSidebar";
import FreelancerNavbar from "../freelancer_components/navbar/FreelancerNavbar";
import NotificationSidebar from "../notifications/features/notifications/components/NotificationSidebar";
// --- 1. Define the Custom Theme ---
const theme = createTheme({
  palette: {
    primary: {
      main: "#1b4332", 
      light: "#2d6a4f",
    },
    secondary: {
      main: "#4ade80", 
      contrastText: "#1b4332",
    },
    background: {
      default: "#f3f4f6", 
      paper: "#ffffff",   
    },
    text: {
      primary: "#1f2937", 
      secondary: "#6b7280", 
    },
    success: { main: "#22c55e" }, 
    error: { main: "#ef4444" },   
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
          borderRadius: "16px", 
          boxShadow: "0px 2px 4px rgba(0,0,0,0.05)", 
          border: "none",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          textTransform: "none", 
          fontWeight: 600,
        },
      },
    },
  },
});

const drawerWidth = 260;

export default function FreelancerLayout({ children }) {
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { loading } = useUser();

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <style>{`
        /* Hide scrollbar for Chrome, Safari and Opera */
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        /* Hide scrollbar for IE, Edge and Firefox */
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', bgcolor: 'background.default' }}>
          <span>Loading...</span>
        </Box>
      ) : (
        <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "background.default" }}>
          <FreelancerSidebar
            width={drawerWidth}
            open={isSidebarOpen}
            onToggle={toggleSidebar}
          />
          <Box
            component="main"
            className="hide-scrollbar"
            sx={{
              flexGrow: 1,
              width: { sm: `calc(100% - ${isSidebarOpen ? drawerWidth : 0}px)` },
              ml: { sm: isSidebarOpen ? `${drawerWidth}px` : 0 },
              minHeight: "100vh",
              display: "flex",
              flexDirection: "column",
              transition: (theme) => theme.transitions.create(["margin", "width"], {
                duration: theme.transitions.duration.standard,
                easing: theme.transitions.easing.sharp,
              })
            }}
          >
            <FreelancerNavbar
              onNotificationClick={() => setIsNotifOpen(true)}
              onSidebarToggle={toggleSidebar}
              sidebarOpen={isSidebarOpen}
              sidebarWidth={drawerWidth}
            />
            <Box
              component="main"
              className="hide-scrollbar"
              sx={{ flexGrow: 1, p: 3, overflow: "auto" }}
            >
              <Toolbar />
              {children}
            </Box>
          </Box>
          <NotificationSidebar
            isOpen={isNotifOpen}
            onClose={() => setIsNotifOpen(false)}
          />
        </Box>
      )}
    </ThemeProvider>
  );
}