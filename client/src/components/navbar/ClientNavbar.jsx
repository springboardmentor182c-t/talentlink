import React from "react";
import { AppBar, Toolbar, Typography, Box, IconButton, Avatar } from "@mui/material";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import { useAuth } from "../../context/AuthContext";

export default function ClientNavbar() {
  const { user } = useAuth();

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        bgcolor: "#9bd7ff", // Light sky blue like your Figma
        ml: "220px",
        height: 70,
        justifyContent: "center",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "flex-end", gap: 3 }}>
        <IconButton>
          <NotificationsNoneOutlinedIcon />
        </IconButton>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography sx={{ color: "black", fontWeight: 600 }}>
            {user?.name || "Client Name"}
          </Typography>
          <Avatar />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
