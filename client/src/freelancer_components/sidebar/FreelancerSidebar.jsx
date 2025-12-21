



// import React from "react";
// import { Drawer, List, ListItemButton, ListItemIcon, ListItemText, Box, Typography, Avatar, Badge } from "@mui/material";
// // 1. Import Router hooks
// import { useNavigate, useLocation } from "react-router-dom"; 

// // Icons
// import DashboardIcon from "@mui/icons-material/DashboardRounded";
// import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWalletRounded";
// import ReceiptLongIcon from "@mui/icons-material/ReceiptLongRounded";
// import WorkIcon from "@mui/icons-material/WorkRounded";
// import MailIcon from "@mui/icons-material/MailRounded";
// import DescriptionIcon from "@mui/icons-material/DescriptionRounded";
// import CalendarMonthIcon from "@mui/icons-material/CalendarMonthRounded";
// import PeopleIcon from "@mui/icons-material/PeopleRounded";
// import AssessmentIcon from "@mui/icons-material/AssessmentRounded";
// import SettingsIcon from "@mui/icons-material/SettingsRounded";

// // 2. Added 'path' to every item for future connection
// const menuItems = [
//   { text: "Dashboard", icon: <DashboardIcon />, path: "/freelancer" },
//   { text: "Accounting", icon: <AccountBalanceWalletIcon />, path: "/freelancer/accounting" },
//   { text: "Expenses", icon: <ReceiptLongIcon />, path: "/freelancer/expenses" },
//   { text: "Projects", icon: <WorkIcon />, path: "/freelancer/projects" },
//   { text: "Work Inquiry", icon: <MailIcon />, path: "/freelancer/inquiry" },
//   { text: "Contracts", icon: <DescriptionIcon />, path: "/freelancer/contracts" },
//   { text: "Calendar", icon: <CalendarMonthIcon />, path: "/freelancer/calendar" },
//   { text: "Clients", icon: <PeopleIcon />, path: "/freelancer/clients" },
//   { text: "Reports", icon: <AssessmentIcon />, path: "/freelancer/reports" },
//   { text: "Settings", icon: <SettingsIcon />, path: "/freelancer/settings" },
// ];

// export default function FreelancerSidebar({ width }) {
//   // 3. Initialize Hooks (Uncomment these when ready)
//   const navigate = useNavigate();
//   const location = useLocation();

//   // Professional Blue Palette
//   const sidebarBg = '#0a1f44'; 
//   const activeBg = "#3b82f6";   
//   const activeText = "#ffffff"; 
//   const inactiveText = "#94a3b8"; 

//   return (
//     <Drawer
//       variant="permanent"
//       sx={{
//         width: width,
//         flexShrink: 0,
//         "& .MuiDrawer-paper": {
//           width: width,
//           boxSizing: "border-box",
//           bgcolor: sidebarBg, 
//           color: "white",
//           borderRight: "none",
//         },
//       }}
//     >
//       {/* --- Logo / Team Section --- */}
//       <Box sx={{ p: 3, display: "flex", alignItems: "center", gap: 2 }}>
//         <Avatar sx={{ bgcolor: activeBg, color: "white", fontWeight: "bold" }}>TL</Avatar>
//         <Box>
//           <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Talent Link</Typography>
//           {/* <Typography variant="caption" sx={{ color: inactiveText }}>10 Members</Typography> */}
//         </Box>
//       </Box>

//       {/* --- Navigation Menu --- */}
//       <List sx={{ px: 2 }}>
//         {menuItems.map((item) => {
          
//           // --- LOGIC TO UNCOMMENT LATER ---
//           // Check if this item is currently active based on URL
//           const isActive = location.pathname === item.path;
          
//           // For now, let's keep Dashboard active by default if no logic applies
//           // const isActive = item.text === "Dashboard"; 

//           return (
//             <ListItemButton
//               key={item.text}
              
//               // --- UNCOMMENT THIS TO ENABLE NAVIGATION ---
//                onClick={() => navigate(item.path)}
              
//               // --- UNCOMMENT THIS TO ENABLE HIGHLIGHTING ---
//                selected={isActive}

//               // (Remove this manual 'selected' prop once you uncomment the line above)
//               // selected={item.text === "Dashboard"} 

//               sx={{
//                 borderRadius: 2,
//                 mb: 1,
//                 transition: "all 0.2s ease-in-out",
                
//                 // --- Active State (Blue) ---
//                 "&.Mui-selected": {
//                   bgcolor: activeBg,
//                   color: activeText,
//                   boxShadow: "0px 4px 10px rgba(59, 130, 246, 0.3)",
//                   "&:hover": { bgcolor: "#2563eb" },
//                   "& .MuiListItemIcon-root": { color: activeText },
//                 },
                
//                 // --- Inactive State ---
//                 "&:not(.Mui-selected)": {
//                   color: inactiveText,
//                   "&:hover": { 
//                     bgcolor: "rgba(255,255,255,0.05)", 
//                     color: "white",
//                     "& .MuiListItemIcon-root": { color: "white" }
//                   },
//                 },
//               }}
//             >
//               <ListItemIcon sx={{ color: "inherit", minWidth: 40 }}>
//                 {item.icon}
//               </ListItemIcon>
//               <ListItemText primary={item.text} primaryTypographyProps={{ fontSize: 14, fontWeight: 500 }} />
              
//               {/* Badge */}
//               {item.badge && (
//                 <Badge 
//                   badgeContent={item.badge} 
//                   sx={{ 
//                     "& .MuiBadge-badge": { 
//                       bgcolor: isActive ? "white" : activeBg, // Uses isActive logic
//                       color: isActive ? activeBg : "white",
//                       fontWeight: "bold" 
//                     } 
//                   }} 
//                 />
//               )}
//             </ListItemButton>
//           );
//         })}
//       </List>
//     </Drawer>
//   );
// }



import React from "react";
import { Drawer, List, ListItemButton, ListItemIcon, ListItemText, Box, Typography, Avatar, Badge } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom"; 

// Icons
import DashboardIcon from "@mui/icons-material/DashboardRounded";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWalletRounded";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLongRounded";
import WorkIcon from "@mui/icons-material/WorkRounded"; // Projects
import MailIcon from "@mui/icons-material/MailRounded";
import DescriptionIcon from "@mui/icons-material/DescriptionRounded"; // Contracts
import CalendarMonthIcon from "@mui/icons-material/CalendarMonthRounded";
import PeopleIcon from "@mui/icons-material/PeopleRounded";
import AssessmentIcon from "@mui/icons-material/AssessmentRounded";
import SettingsIcon from "@mui/icons-material/SettingsRounded";
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline'; // Icon for Proposals

const menuItems = [
  { text: "Dashboard", icon: <DashboardIcon />, path: "/freelancer" },
  { text: "Accounting", icon: <AccountBalanceWalletIcon />, path: "/freelancer/accounting" },
  { text: "Expenses", icon: <ReceiptLongIcon />, path: "/freelancer/expenses" },
  { text: "Projects", icon: <WorkIcon />, path: "/freelancer/projects" }, // Where they find work
  { text: "Proposals", icon: <DriveFileRenameOutlineIcon />, path: "/freelancer/proposals" }, // <--- NEW ADDITION
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

  // Professional Blue Palette
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
              onClick={() => navigate(item.path)} // Navigation Enabled
              selected={isActive} // Highlighting Enabled
              sx={{
                borderRadius: 2,
                mb: 1,
                transition: "all 0.2s ease-in-out",
                
                // --- Active State (Blue) ---
                "&.Mui-selected": {
                  bgcolor: activeBg,
                  color: activeText,
                  boxShadow: "0px 4px 10px rgba(59, 130, 246, 0.3)",
                  "&:hover": { bgcolor: "#2563eb" },
                  "& .MuiListItemIcon-root": { color: activeText },
                },
                
                // --- Inactive State ---
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
              
              {/* Badge */}
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