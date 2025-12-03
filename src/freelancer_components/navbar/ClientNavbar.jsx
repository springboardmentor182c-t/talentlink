// import React from "react";
// import { AppBar, Toolbar, Typography, Box, IconButton, Avatar } from "@mui/material";
// import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
// import { useAuth } from "../../context/AuthContext";

// export default function ClientNavbar() {
//   const { user } = useAuth();

//   return (
//     <AppBar
//       position="static"
//       elevation={0}
//       sx={{
//         bgcolor: "#9bd7ff", // Light sky blue like your Figma
//         ml: "220px",
//         height: 70,
//         justifyContent: "center",
//       }}
//     >
//       <Toolbar sx={{ display: "flex", justifyContent: "flex-end", gap: 3 }}>
//         <IconButton>
//           <NotificationsNoneOutlinedIcon />
//         </IconButton>

//         <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//           <Typography sx={{ color: "black", fontWeight: 600 }}>
//             {user?.name || "Client Name"}
//           </Typography>
//           <Avatar />
//         </Box>
//       </Toolbar>
//     </AppBar>
//   );
// }


// import React from "react";
// import { AppBar, Toolbar, Typography, Box, IconButton, Avatar } from "@mui/material";
// import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";

// export default function ClientNavbar() {
//   return (
//     <AppBar
//       position="static"
//       elevation={0}
//       sx={{
//         bgcolor: "#9bd7ff",
//         ml: "220px",
//         height: 70,
//         justifyContent: "center",
//       }}
//     >
//       <Toolbar sx={{ display: "flex", justifyContent: "flex-end", gap: 3 }}>
//         <IconButton>
//           <NotificationsNoneOutlinedIcon />
//         </IconButton>

//         <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//           <Typography sx={{ color: "black", fontWeight: 600 }}>
//             Client User
//           </Typography>
//           <Avatar />
//         </Box>
//       </Toolbar>
//     </AppBar>
//   );
// }

// redsign 

import React from "react";
import { AppBar, Toolbar, Avatar, Box, InputBase, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function ClientNavbar() {
  return (
    <AppBar
      position="sticky"
      sx={{
        ml: "2px",
        width: "calc(100% - 2px)",
        bgcolor: "white",
        color: "black",
        boxShadow: "0px 1px 4px rgba(0,0,0,0.08)",
        paddingY: 1,
        zIndex: 10,
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          px: 3,
        }}
      >

        {/* LEFT SPACER */}
        <Box sx={{ width: 250 }} />

        {/* CENTERED SEARCH BAR */}
        <Paper
          elevation={0}
          sx={{
            display: "flex",
            alignItems: "center",
            width: 350,
            height: 42,
            px: 2,
            borderRadius: 3,
            bgcolor: "#F3F5F7",
            border: "1px solid #E0E0E0",
            mx: "auto",    // ⭐ MAGIC for centering
            ml: "9%",
            
          }}
        >
          <SearchIcon sx={{ color: "#9E9E9E", mr: 1 }} />
          <InputBase
            placeholder="Search projects, files, messages..."
            sx={{
              width: "100%",
              fontSize: "0.9rem",
            }}
          />
        </Paper>

        {/* RIGHT AVATAR */}
        <Avatar alt="User" src="" sx={{ ml: 2 }} />
      </Toolbar>
    </AppBar>
  );
}
