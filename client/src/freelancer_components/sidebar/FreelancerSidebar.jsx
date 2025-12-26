


import React from "react";
import { Drawer, List, ListItemButton, ListItemIcon, ListItemText, Box, Typography, Avatar, Badge } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom"; 

// Icons
import DashboardIcon from "@mui/icons-material/DashboardRounded";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWalletRounded";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLongRounded";
import WorkIcon from "@mui/icons-material/WorkRounded"; 
import MailIcon from "@mui/icons-material/MailRounded";
import DescriptionIcon from "@mui/icons-material/DescriptionRounded"; 
import CalendarMonthIcon from "@mui/icons-material/CalendarMonthRounded";
import PeopleIcon from "@mui/icons-material/PeopleRounded";
import AssessmentIcon from "@mui/icons-material/AssessmentRounded";
import SettingsIcon from "@mui/icons-material/SettingsRounded";
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline'; 

const menuItems = [
  { text: "Dashboard", icon: <DashboardIcon />, path: "/freelancer" },
  { text: "Accounting", icon: <AccountBalanceWalletIcon />, path: "/freelancer/accounting" },
  { text: "Expenses", icon: <ReceiptLongIcon />, path: "/freelancer/expenses" },
  { text: "Projects", icon: <WorkIcon />, path: "/freelancer/projects" }, 
  { text: "Proposals", icon: <DriveFileRenameOutlineIcon />, path: "/freelancer/proposals" }, 
  { text: "Work Inquiry", icon: <MailIcon />, path: "/freelancer/inquiry" },
  { text: "Contracts", icon: <DescriptionIcon />, path: "/freelancer/contracts" },
  { text: "Calendar", icon: <CalendarMonthIcon />, path: "/freelancer/calendar" },
  { text: "Clients", icon: <PeopleIcon />, path: "/freelancer/clients" },
  { text: "Reports", icon: <AssessmentIcon />, path: "/freelancer/reports" },
  { text: "Settings", icon: <SettingsIcon />, path: "/freelancer/settings" },
];

export default function FreelancerSidebar({ width }) {
  const navigate = useNavigate();
  const location = useLocation();

  const sidebarBg = '#0a1f44'; 
  const activeBg = "#3b82f6";   
  const activeText = "#ffffff"; 
  const inactiveText = "#94a3b8"; 

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: width,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: width,
          boxSizing: "border-box",
          bgcolor: sidebarBg, 
          color: "white",
          borderRight: "none",
          
          // --- HIDE SCROLLBAR IN MUI DRAWER ---
          "&::-webkit-scrollbar": { display: "none" },
          msOverflowStyle: "none", 
          scrollbarWidth: "none",  
        },
      }}
    >
      {/* --- Logo / Team Section --- */}
      <Box sx={{ p: 3, display: "flex", alignItems: "center", gap: 2 }}>
        <Avatar sx={{ bgcolor: activeBg, color: "white", fontWeight: "bold" }}>TL</Avatar>
        <Box>
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Talent Link</Typography>
        </Box>
      </Box>

      {/* --- Navigation Menu --- */}
      <List sx={{ px: 2 }}>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          
          return (
            <ListItemButton
              key={item.text}
              onClick={() => navigate(item.path)} 
              selected={isActive} 
              sx={{
                borderRadius: 2,
                mb: 1,
                transition: "all 0.2s ease-in-out",
                
                "&.Mui-selected": {
                  bgcolor: activeBg,
                  color: activeText,
                  boxShadow: "0px 4px 10px rgba(59, 130, 246, 0.3)",
                  "&:hover": { bgcolor: "#2563eb" },
                  "& .MuiListItemIcon-root": { color: activeText },
                },
                
                "&:not(.Mui-selected)": {
                  color: inactiveText,
                  "&:hover": { 
                    bgcolor: "rgba(255,255,255,0.05)", 
                    color: "white",
                    "& .MuiListItemIcon-root": { color: "white" }
                  },
                },
              }}
            >
              <ListItemIcon sx={{ color: "inherit", minWidth: 40 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} primaryTypographyProps={{ fontSize: 14, fontWeight: 500 }} />
              
              {item.badge && (
                <Badge 
                  badgeContent={item.badge} 
                  sx={{ 
                    "& .MuiBadge-badge": { 
                      bgcolor: isActive ? "white" : activeBg, 
                      color: isActive ? activeBg : "white",
                      fontWeight: "bold" 
                    } 
                  }} 
                />
              )}
            </ListItemButton>
          );
        })}
      </List>
    </Drawer>
  );
}