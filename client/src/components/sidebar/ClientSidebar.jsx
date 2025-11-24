import React from "react";
import {
  Box,
  Typography,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Avatar,
} from "@mui/material";

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DashboardCustomizeOutlinedIcon from "@mui/icons-material/DashboardCustomizeOutlined";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function ClientSidebar({ active = "Dashboard" }) {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const menu = [
    { label: "Dashboard", icon: <HomeOutlinedIcon />, to: "/client" },
    { label: "Overview", icon: <DashboardCustomizeOutlinedIcon />, to: "/client/overview" },
    { label: "Projects", icon: <WorkOutlineIcon />, to: "/client/projects" },
    { label: "Proposals", icon: <DescriptionOutlinedIcon />, to: "/client/proposals" },
    { label: "Contracts", icon: <DescriptionOutlinedIcon />, to: "/client/contracts" },
    { label: "Messages", icon: <ChatBubbleOutlineIcon />, to: "/client/messages" },
    { label: "Profile", icon: <SettingsOutlinedIcon />, to: "/client/profile" },
  ];

  return (
    <Box
      sx={{
        width: 220,
        bgcolor: "#0d84ff",
        color: "white",
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
      }}
    >
      {/* Logo */}
      <Box sx={{ px: 3, py: 4, display: "flex", alignItems: "center", gap: 2 }}>
        <Avatar sx={{ bgcolor: "white", color: "#0d84ff" }}>TL</Avatar>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          TalentLink
        </Typography>
      </Box>

      <Divider sx={{ borderColor: "rgba(255,255,255,0.2)" }} />

      {/* Menu */}
      <List sx={{ mt: 2 }}>
        {menu.map((item) => {
          const isActive = active === item.label;
          return (
            <ListItemButton
              key={item.label}
              selected={isActive}
              onClick={() => navigate(item.to)}
              sx={{
                color: "white",
                py: 1.5,
                px: 3,
                ...(isActive && {
                  bgcolor: "rgba(0,0,0,0.15)",
                  borderTopRightRadius: 20,
                  borderBottomRightRadius: 20,
                }),
              }}
            >
              <ListItemIcon sx={{ color: "white", minWidth: 36 }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          );
        })}
      </List>

      <Box sx={{ flexGrow: 1 }} />

      {/* Logout */}
      <Box sx={{ px: 2, py: 3 }}>
        <ListItemButton
          onClick={logout}
          sx={{ color: "white", borderRadius: 2 }}
        >
          <ListItemIcon sx={{ color: "white", minWidth: 36 }}>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItemButton>
      </Box>
    </Box>
  );
}
