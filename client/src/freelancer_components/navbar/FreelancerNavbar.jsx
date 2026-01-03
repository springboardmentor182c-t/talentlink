


import React, { useState } from "react";
import { 
  AppBar, Toolbar, Box, Avatar, IconButton, Typography, InputBase, Badge, 
  Menu, MenuItem, ListItemIcon, Divider, Dialog, DialogTitle, 
  DialogContent, DialogActions, Button, TextField, Stack, Fade
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Logout from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import Settings from '@mui/icons-material/Settings';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext"; 

// 1. Accept the prop here
export default function FreelancerNavbar({
  onNotificationClick,
  onSidebarToggle,
  sidebarOpen = true,
  sidebarWidth = 260,
}) {
  const { user, updateProfile } = useUser();
  const navigate = useNavigate();

  // --- State for Menu ---
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);

  // --- State for Edit Profile Modal ---
  const [openModal, setOpenModal] = useState(false);
  const [tempName, setTempName] = useState(user.name);
  const [tempFile, setTempFile] = useState(null);
  const [preview, setPreview] = useState(user.avatar);

  // --- Handlers ---
  const handleMenuClick = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleLogout = () => {
    handleMenuClose();
    navigate("/signup"); 
  };

  const handleEditProfile = () => {
    setTempName(user.name);
    setPreview(user.avatar);
    setOpenModal(true);
    handleMenuClose();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setTempFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSave = () => {
    updateProfile(tempName, tempFile);
    setOpenModal(false);
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
                src={user.avatar} 
                sx={{ 
                    width: 40, height: 40, 
                    border: '2px solid white', 
                    boxShadow: '0 2px 5px rgba(0,0,0,0.1)' 
                }} 
              />
              <Box sx={{ display: { xs: "none", md: "block" } }}>
                <Typography variant="subtitle2" sx={{ lineHeight: 1.2, fontWeight: 700 }}>
                  {user.name}
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase', fontSize: '0.7rem' }}>
                  {user.role}
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
              
              <MenuItem onClick={handleEditProfile} sx={{ py: 1.5 }}>
                <ListItemIcon><PersonIcon fontSize="small" sx={{ color: 'primary.main' }}/></ListItemIcon>
                <Typography variant="body2" fontWeight={500}>Edit Profile</Typography>
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

      {/* Edit Profile Dialog - Kept same logic */}
      <Dialog 
        open={openModal} 
        onClose={() => setOpenModal(false)} 
        maxWidth="sm" 
        fullWidth
        PaperProps={{ sx: { borderRadius: 3, p: 1 } }}
      >
        <DialogTitle sx={{ fontWeight: 700, textAlign: 'center' }}>Update Profile Details</DialogTitle>
        <DialogContent>
          <Stack spacing={4} alignItems="center" sx={{ mt: 2 }}>
            <Box sx={{ position: "relative" }}>
              <Avatar src={preview} sx={{ width: 120, height: 120, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
              <IconButton 
                component="label" 
                sx={{ 
                  position: "absolute", bottom: 5, right: 5, 
                  bgcolor: "primary.main", color: "white",
                  boxShadow: 2,
                  "&:hover": { bgcolor: "primary.dark" } 
                }}
              >
                <CloudUploadIcon fontSize="small" />
                <input type="file" hidden accept="image/*" onChange={handleFileChange} />
              </IconButton>
            </Box>
            
            <TextField 
              label="Full Name" 
              fullWidth 
              variant="outlined" 
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 3, justifyContent: 'center', gap: 2 }}>
          <Button onClick={() => setOpenModal(false)} sx={{ color: 'text.secondary' }}>Cancel</Button>
          <Button onClick={handleSave} variant="contained" disableElevation sx={{ borderRadius: 2, px: 4 }}>
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}