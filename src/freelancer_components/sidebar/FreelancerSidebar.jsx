// import React from "react";
// import { Drawer, List, ListItemButton, ListItemIcon, ListItemText, Box, Typography } from "@mui/material";
// import DashboardIcon from "@mui/icons-material/Dashboard";
// import WorkIcon from "@mui/icons-material/Work";
// import LogoutIcon from "@mui/icons-material/Logout";
// import MessageIcon from "@mui/icons-material/Message";
// import DescriptionIcon from "@mui/icons-material/Description";
// import SettingsIcon from "@mui/icons-material/Settings";

// export default function FreelancerSidebar() {
//   return (
//     <Drawer
//       variant="permanent"
//       anchor="left"
//       PaperProps={{
//         sx: {
//           width: 260,                              // UPDATED WIDTH
//           backgroundColor: "#0d6efd",
//           color: "white",
//           borderRight: "none",
//           paddingTop: 2,
//         },
//       }}
//     >
//       <Box sx={{ px: 3, py: 2 }}>
//         <Typography variant="h6" sx={{ fontWeight: 700 }}>
//           TalentLink
//         </Typography>
//       </Box>

//       <List>
//         <ListItemButton selected>
//           <ListItemIcon sx={{ color: "white" }}>
//             <DashboardIcon />
//           </ListItemIcon>
//           <ListItemText primary="Dashboard" />
//         </ListItemButton>

//         <ListItemButton>
//           <ListItemIcon sx={{ color: "white" }}>
//             <WorkIcon />
//           </ListItemIcon>
//           <ListItemText primary="Projects" />
//         </ListItemButton>

//         <ListItemButton>
//           <ListItemIcon sx={{ color: "white" }}>
//             <DescriptionIcon />
//           </ListItemIcon>
//           <ListItemText primary="Contracts" />
//         </ListItemButton>

//         <ListItemButton>
//           <ListItemIcon sx={{ color: "white" }}>
//             <MessageIcon />
//           </ListItemIcon>
//           <ListItemText primary="Messages" />
//         </ListItemButton>

//         <ListItemButton>
//           <ListItemIcon sx={{ color: "white" }}>
//             <SettingsIcon />
//           </ListItemIcon>
//           <ListItemText primary="Settings" />
//         </ListItemButton>

//         <ListItemButton sx={{ mt: 3 }}>
//           <ListItemIcon sx={{ color: "white" }}>
//             <LogoutIcon />
//           </ListItemIcon>
//           <ListItemText primary="Logout" />
//         </ListItemButton>
//       </List>
//     </Drawer>
//   );
// }


import React from "react";
import { Drawer, List, ListItemButton, ListItemIcon, ListItemText, Box, Typography } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import WorkIcon from "@mui/icons-material/Work";
import LogoutIcon from "@mui/icons-material/Logout";
import MessageIcon from "@mui/icons-material/Message";
import DescriptionIcon from "@mui/icons-material/Description";
import SettingsIcon from "@mui/icons-material/Settings";

export default function FreelancerSidebar() {
  return (
    <Drawer
      variant="permanent"
      anchor="left"
      PaperProps={{
        sx: {
          width: 260,
          backgroundColor: "#0d6efd",
          color: "white",
          borderRight: "none",
          paddingTop: 2,
        },
      }}
    >
      <Box sx={{ px: 3, py: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          TalentLink
        </Typography>
      </Box>

      <List>
        <ListItemButton selected>
          <ListItemIcon sx={{ color: "white" }}>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>

        <ListItemButton>
          <ListItemIcon sx={{ color: "white" }}>
            <WorkIcon />
          </ListItemIcon>
          <ListItemText primary="Projects" />
        </ListItemButton>

        <ListItemButton>
          <ListItemIcon sx={{ color: "white" }}>
            <DescriptionIcon />
          </ListItemIcon>
          <ListItemText primary="Contracts" />
        </ListItemButton>

        <ListItemButton>
          <ListItemIcon sx={{ color: "white" }}>
            <MessageIcon />
          </ListItemIcon>
          <ListItemText primary="Messages" />
        </ListItemButton>

        <ListItemButton>
          <ListItemIcon sx={{ color: "white" }}>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItemButton>

        <ListItemButton sx={{ mt: 3 }}>
          <ListItemIcon sx={{ color: "white" }}>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItemButton>
      </List>
    </Drawer>
  );
}
