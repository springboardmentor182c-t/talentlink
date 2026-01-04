
import React, { useState, useEffect } from "react";
import {
  AppBar, Toolbar, Box, Avatar, IconButton, Typography, InputBase, Badge,
  Menu, MenuItem, ListItemIcon, Divider, Stack, Fade
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Logout from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import Settings from '@mui/icons-material/Settings';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import profileService from "../../services/profileService";

export default function FreelancerNavbar({
  onNotificationClick,
  onSidebarToggle,
  sidebarOpen = true,
  sidebarWidth = 260,
}) {
  const { user } = useUser();
  const navigate = useNavigate();

  // --- State for Menu ---
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);

  const [displayUser, setDisplayUser] = useState({
    name: '',
    avatar: "https://i.pravatar.cc/150?img=3",
    role: 'Freelancer'
  });

  // Fetch Freelancer Specific Profile
  useEffect(() => {
    const fetchFreelancerProfile = async () => {
      try {
        const data = await profileService.freelancer.getProfile();
        const fullName = `${data.first_name || ""} ${data.last_name || ""}`.trim();

        let avatarUrl = "https://i.pravatar.cc/150?img=3";
        if (data.profile_image) {
          avatarUrl = data.profile_image.startsWith('http')
            ? data.profile_image
            : `${process.env.REACT_APP_API_BASE_URL || 'http://127.0.0.1:8000'}${data.profile_image}`;
        }

        setDisplayUser({
          name: fullName || user.name || "Freelancer",
          avatar: avatarUrl,
          role: 'Freelancer'
        });
      } catch (err) {
        console.error("Failed to fetch freelancer profile for navbar", err);
        setDisplayUser({
          name: user.name,
          avatar: user.avatar,
          role: 'Freelancer'
        });
      }
    };

    fetchFreelancerProfile();
  }, [user.name, user.avatar]);

  // --- Handlers ---
  const handleMenuClick = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleLogout = () => {
    handleMenuClose();
    navigate("/signup");
  };

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          bgcolor: "rgba(255, 255, 255, 0.8)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid",
          borderColor: "rgba(0,0,0,0.08)",
          color: "text.primary",
          zIndex: (theme) => theme.zIndex.drawer + 1,
          width: { sm: sidebarOpen ? `calc(100% - ${sidebarWidth}px)` : '100%' },
          ml: { sm: sidebarOpen ? `${sidebarWidth}px` : 0 },
          transition: "all 0.3s ease"
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between", alignItems: 'center', gap: 2, height: 70 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {onSidebarToggle && (
              <IconButton
                onClick={onSidebarToggle}
                sx={{
                  border: '1px solid rgba(0,0,0,0.05)',
                  bgcolor: 'background.paper',
                }}
              >
                {sidebarOpen ? <ChevronLeftIcon /> : <MenuIcon />}
              </IconButton>
            )}

            {/* Search Bar */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                bgcolor: "grey.100",
                borderRadius: "50px",
                px: 2.5,
                py: 0.8,
                width: "100%",
                maxWidth: 400,
                border: "1px solid transparent",
                transition: "all 0.2s ease",
                "&:hover": { bgcolor: "grey.200" },
                "&:focus-within": {
                  bgcolor: "background.paper",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                  borderColor: "primary.main"
                }
              }}
            >
              <SearchIcon sx={{ color: "text.secondary", mr: 1.5 }} />
              <InputBase
                placeholder="Search projects..."
                fullWidth
                sx={{ fontSize: "0.95rem", fontWeight: 500 }}
              />
            </Box>

          </Box>

          {/* Right Section */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2.5 }}>

            {/* 2. Notifications Trigger */}
            <IconButton
              // Changed onClick to use the prop passed from Layout
              onClick={onNotificationClick}
              sx={{
                border: '1px solid rgba(0,0,0,0.05)',
                bgcolor: 'background.paper'
              }}
            >
              <Badge badgeContent={2} color="error" variant="dot">
                <NotificationsNoneIcon sx={{ color: 'text.secondary' }} />
              </Badge>
            </IconButton>

            {/* Profile Dropdown Trigger */}
            <Box
              onClick={handleMenuClick}
              sx={{
                display: "flex", alignItems: "center", gap: 1.5, cursor: "pointer",
                p: 0.8, pr: 1.5, borderRadius: "50px",
                transition: "0.2s",
                "&:hover": { bgcolor: "rgba(0,0,0,0.03)" }
              }}
            >
              <Avatar
                src={displayUser.avatar}
                sx={{
                  width: 40, height: 40,
                  border: '2px solid white',
                  boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
                }}
              />
              <Box sx={{ display: { xs: "none", md: "block" } }}>
                <Typography variant="subtitle2" sx={{ lineHeight: 1.2, fontWeight: 700 }}>
                  {displayUser.name}
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase', fontSize: '0.7rem' }}>
                  {displayUser.role}
                </Typography>
              </Box>
              <KeyboardArrowDownIcon fontSize="small" color="action" />
            </Box>

            {/* Dropdown Menu */}
            <Menu
              anchorEl={anchorEl}
              open={openMenu}
              onClose={handleMenuClose}
              TransitionComponent={Fade}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: 'visible',
                  filter: 'drop-shadow(0px 5px 15px rgba(0,0,0,0.1))',
                  mt: 2,
                  borderRadius: 3,
                  minWidth: 220,
                  '&:before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 24,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <Box sx={{ px: 2, py: 1.5 }}>
                <Typography variant="subtitle2" color="text.secondary">Account</Typography>
              </Box>

              <MenuItem onClick={() => { handleMenuClose(); navigate('/freelancer/profile'); }} sx={{ py: 1.5 }}>
                <ListItemIcon><PersonIcon fontSize="small" sx={{ color: 'primary.main' }} /></ListItemIcon>
                <Typography variant="body2" fontWeight={500}>Profile</Typography>
              </MenuItem>

              <MenuItem onClick={handleMenuClose} sx={{ py: 1.5 }}>
                <ListItemIcon><Settings fontSize="small" sx={{ color: 'primary.main' }} /></ListItemIcon>
                <Typography variant="body2" fontWeight={500}>Settings</Typography>
              </MenuItem>

              <Divider sx={{ my: 1 }} />

              <MenuItem onClick={handleLogout} sx={{ py: 1.5, color: 'error.main' }}>
                <ListItemIcon><Logout fontSize="small" color="error" /></ListItemIcon>
                <Typography variant="body2" fontWeight={600}>Logout</Typography>
              </MenuItem>
            </Menu>

          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}