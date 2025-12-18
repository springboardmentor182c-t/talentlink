// import React from "react";
// import {
//   Box,
//   Typography,
//   List,
//   ListItemButton,
//   ListItemIcon,
//   ListItemText,
//   Divider,
//   Avatar,
// } from "@mui/material";

// import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
// import DashboardCustomizeOutlinedIcon from "@mui/icons-material/DashboardCustomizeOutlined";
// import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
// import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
// import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
// import LogoutIcon from "@mui/icons-material/Logout";
// import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";

// export default function ClientSidebar({ active = "Dashboard" }) {
//   const navigate = useNavigate();
//   const { logout } = useAuth();

//   const menu = [
//     { label: "Dashboard", icon: <HomeOutlinedIcon />, to: "/client" },
//     { label: "Overview", icon: <DashboardCustomizeOutlinedIcon />, to: "/client/overview" },
//     { label: "Projects", icon: <WorkOutlineIcon />, to: "/client/projects" },
//     { label: "Proposals", icon: <DescriptionOutlinedIcon />, to: "/client/proposals" },
//     { label: "Contracts", icon: <DescriptionOutlinedIcon />, to: "/client/contracts" },
//     { label: "Messages", icon: <ChatBubbleOutlineIcon />, to: "/client/messages" },
//     { label: "Profile", icon: <SettingsOutlinedIcon />, to: "/client/profile" },
//   ];

//   return (
//     <Box
//       sx={{
//         width: 220,
//         bgcolor: "#0d84ff",
//         color: "white",
//         height: "100vh",
//         position: "fixed",
//         left: 0,
//         top: 0,
//       }}
//     >
//       {/* Logo */}
//       <Box sx={{ px: 3, py: 4, display: "flex", alignItems: "center", gap: 2 }}>
//         <Avatar sx={{ bgcolor: "white", color: "#0d84ff" }}>TL</Avatar>
//         <Typography variant="h6" sx={{ fontWeight: 700 }}>
//           TalentLink
//         </Typography>
//       </Box>

//       <Divider sx={{ borderColor: "rgba(255,255,255,0.2)" }} />

//       {/* Menu */}
//       <List sx={{ mt: 2 }}>
//         {menu.map((item) => {
//           const isActive = active === item.label;
//           return (
//             <ListItemButton
//               key={item.label}
//               selected={isActive}
//               onClick={() => navigate(item.to)}
//               sx={{
//                 color: "white",
//                 py: 1.5,
//                 px: 3,
//                 ...(isActive && {
//                   bgcolor: "rgba(0,0,0,0.15)",
//                   borderTopRightRadius: 20,
//                   borderBottomRightRadius: 20,
//                 }),
//               }}
//             >
//               <ListItemIcon sx={{ color: "white", minWidth: 36 }}>{item.icon}</ListItemIcon>
//               <ListItemText primary={item.label} />
//             </ListItemButton>
//           );
//         })}
//       </List>

//       <Box sx={{ flexGrow: 1 }} />

//       {/* Logout */}
//       <Box sx={{ px: 2, py: 3 }}>
//         <ListItemButton
//           onClick={logout}
//           sx={{ color: "white", borderRadius: 2 }}
//         >
//           <ListItemIcon sx={{ color: "white", minWidth: 36 }}>
//             <LogoutIcon />
//           </ListItemIcon>
//           <ListItemText primary="Logout" />
//         </ListItemButton>
//       </Box>
//     </Box>
//   );
// }


// import React from "react";
// import {
//   Box,
//   Typography,
//   List,
//   ListItemButton,
//   ListItemIcon,
//   ListItemText,
//   Divider,
//   Avatar,
// } from "@mui/material";

// import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
// import DashboardCustomizeOutlinedIcon from "@mui/icons-material/DashboardCustomizeOutlined";
// import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
// import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
// import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
// import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
// import LogoutIcon from "@mui/icons-material/Logout";

// import { useNavigate } from "react-router-dom";

// export default function ClientSidebar({ active = "Dashboard" }) {
//   const navigate = useNavigate();

//   const menu = [
//     { label: "Dashboard", icon: <HomeOutlinedIcon />, to: "/client" },
//     { label: "Overview", icon: <DashboardCustomizeOutlinedIcon />, to: "/client/overview" },
//     { label: "Projects", icon: <WorkOutlineIcon />, to: "/client/projects" },
//     { label: "Proposals", icon: <DescriptionOutlinedIcon />, to: "/client/proposals" },
//     { label: "Contracts", icon: <DescriptionOutlinedIcon />, to: "/client/contracts" },
//     { label: "Messages", icon: <ChatBubbleOutlineIcon />, to: "/client/messages" },
//     { label: "Profile", icon: <SettingsOutlinedIcon />, to: "/client/profile" },
//   ];

//   return (
//     <Box
//       sx={{
//         width: 220,
//         bgcolor: "#0d84ff",
//         color: "white",
//         height: "100vh",
//         position: "fixed",
//         left: 0,
//         top: 0,
//       }}
//     >
//       <Box sx={{ px: 3, py: 4, display: "flex", alignItems: "center", gap: 2 }}>
//         <Avatar sx={{ bgcolor: "white", color: "#0d84ff" }}>TL</Avatar>
//         <Typography variant="h6" sx={{ fontWeight: 700 }}>
//           TalentLink
//         </Typography>
//       </Box>

//       <Divider sx={{ borderColor: "rgba(255,255,255,0.2)" }} />

//       <List sx={{ mt: 2 }}>
//         {menu.map((item) => {
//           const isActive = active === item.label;
//           return (
//             <ListItemButton
//               key={item.label}
//               selected={isActive}
//               onClick={() => navigate(item.to)}
//               sx={{
//                 color: "white",
//                 py: 1.5,
//                 px: 3,
//                 ...(isActive && {
//                   bgcolor: "rgba(0,0,0,0.15)",
//                   borderTopRightRadius: 20,
//                   borderBottomRightRadius: 20,
//                 }),
//               }}
//             >
//               <ListItemIcon sx={{ color: "white", minWidth: 36 }}>{item.icon}</ListItemIcon>
//               <ListItemText primary={item.label} />
//             </ListItemButton>
//           );
//         })}
//       </List>

//       {/* logout now does nothing—just a button */}
//       <Box sx={{ px: 2, py: 3 }}>
//         <ListItemButton sx={{ color: "white", borderRadius: 2 }}>
//           <ListItemIcon sx={{ color: "white", minWidth: 36 }}>
//             <LogoutIcon />
//           </ListItemIcon>
//           <ListItemText primary="Logout" />
//         </ListItemButton>
//       </Box>
//     </Box>
//   );
// }



// redisgn 
import React from "react";
import {
  Box,
  Typography,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import FolderIcon from "@mui/icons-material/Folder";
import MessageIcon from "@mui/icons-material/Message";
import SettingsIcon from "@mui/icons-material/Settings";

import { useNavigate } from "react-router-dom";

export default function ClientSidebar({ active = "Dashboard" }) {
  const navigate = useNavigate();

  const menu = [
    { label: "Dashboard", icon: <DashboardIcon />, to: "/client" },
    { label: "Projects", icon: <WorkOutlineIcon />, to: "/client/projects" },
    { label: "Invoices", icon: <ReceiptLongIcon />, to: "/client/invoices" },
    { label: "Files", icon: <FolderIcon />, to: "/client/files" },
    { label: "Messages", icon: <MessageIcon />, to: "/client/messages" },
    { label: "Settings", icon: <SettingsIcon />, to: "/client/settings" },
  ];

  return (
    <Box
      sx={{
        width: 230,
        height: "100vh",
        background: "linear-gradient(180deg, #0A2342, #1B3A57)",
        color: "white",
        p: 2,
        position: "fixed",
        left: 0,
        top: 0,
      }}
    >
      <Typography variant="h6" sx={{ mb: 4, fontWeight: 700 }}>
        TalentLink
      </Typography>

      <List>
        {menu.map((item) => {
          const isActive = active === item.label;

          return (
            <ListItemButton
              key={item.label}
              onClick={() => navigate(item.to)}
              sx={{
                color: "#fff",
                mb: 1,
                borderRadius: 1.5,
                ...(isActive && {
                  backgroundColor: "#1E90FF",
                }),
              }}
            >
              <ListItemIcon sx={{ color: "white" }}>
                {item.icon}
              </ListItemIcon>

              <ListItemText primary={item.label} />
            </ListItemButton>
          );
        })}
      </List>
    </Box>
  );
}
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  FaHome, 
  FaBriefcase, 
  FaFileInvoiceDollar, 
  FaFileAlt, 
  FaEnvelope, 
  FaCog, 
  FaQuestionCircle,
  FaSignOutAlt 
} from 'react-icons/fa';

const ClientSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    // 1. Clear user session logic here
    console.log("Logging out from sidebar...");
    
    // 2. Redirect to Login
    navigate('/login');
  };

  return (
    <div style={styles.sidebar}>
      {/* --- Logo Area --- */}
      <div style={styles.logoArea}>
        <div style={styles.logoText}>
          <span style={styles.logoIcon}>▲</span> Talent Link
        </div>
        <div style={styles.subText}>Client Portal</div>
      </div>

      {/* --- Main Menu Section --- */}
      <div style={styles.scrollableContent}>
        <div style={styles.sectionLabel}>MENU</div>
        
        <NavItem 
          to="/client/dashboard" 
          icon={<FaHome />} 
          label="Overview" 
          isActive={location.pathname === '/client/dashboard'} 
        />
        <NavItem 
          to="/client/projects" 
          icon={<FaBriefcase />} 
          label="My Projects" 
          isActive={location.pathname === '/client/projects'} 
        />
        <NavItem 
          to="/client/financials" 
          icon={<FaFileInvoiceDollar />} 
          label="Financials" 
          isActive={location.pathname === '/client/financials'} 
        />
        <NavItem 
          to="/client/documents" 
          icon={<FaFileAlt />} 
          label="Documents" 
          isActive={location.pathname === '/client/documents'} 
        />
        <NavItem 
          to="/client/messages" 
          icon={<FaEnvelope />} 
          label="Messages" 
          isActive={location.pathname === '/client/messages'} 
        />

        {/* --- Settings Section --- */}
        <div style={{ ...styles.sectionLabel, marginTop: '20px' }}>PREFERENCES</div>
        
        <NavItem 
          to="/client/settings" 
          icon={<FaCog />} 
          label="Settings" 
          isActive={location.pathname === '/client/settings'} 
        />
        <NavItem 
          to="/client/help" 
          icon={<FaQuestionCircle />} 
          label="Help Center" 
          isActive={location.pathname === '/client/help'} 
        />
      </div>

      {/* --- Bottom Logout --- */}
      <div style={styles.logoutSection}>
        <button style={styles.logoutBtn} onClick={handleLogout}>
          <FaSignOutAlt style={{ marginRight: '10px' }} /> Log Out
        </button>
      </div>
    </div>
  );
};

// Helper Component for Links
const NavItem = ({ to, icon, label, isActive }) => {
  const finalStyle = isActive ? { ...styles.link, ...styles.activeLink } : styles.link;
  
  return (
    <Link to={to} style={finalStyle}>
      <span style={styles.icon}>{icon}</span>
      {label}
    </Link>
  );
};

const styles = {
  sidebar: {
    width: '100%',
    height: '100%',
    backgroundColor: '#0a1f44', // Dark Blue Theme
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
  },
  logoArea: {
    padding: '30px 25px',
    borderBottom: '1px solid rgba(255,255,255,0.08)',
    marginBottom: '10px',
    flexShrink: 0,
  },
  logoText: {
    fontSize: '20px',
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
    marginBottom: '5px',
    letterSpacing: '0.5px',
  },
  logoIcon: {
    color: '#3b82f6',
    marginRight: '10px',
    fontSize: '22px'
  },
  subText: {
    fontSize: '12px',
    color: '#94a3b8',
    paddingLeft: '32px',
    fontWeight: '500',
  },
  scrollableContent: {
    flex: 1,
    overflowY: 'auto',
    padding: '10px 15px',
  },
  sectionLabel: {
    fontSize: '11px',
    fontWeight: 'bold',
    color: '#64748b',
    padding: '0 15px 10px 15px',
    letterSpacing: '1px',
  },
  link: {
    display: 'flex',
    alignItems: 'center',
    padding: '12px 15px',
    textDecoration: 'none',
    color: '#cbd5e1', // Light grey text
    fontSize: '14px',
    borderRadius: '8px',
    transition: 'all 0.2s ease',
    marginBottom: '5px',
  },
  activeLink: {
    backgroundColor: 'rgba(59, 130, 246, 0.2)', // Semi-transparent Blue
    color: '#ffffff',
    fontWeight: '600',
    borderLeft: '3px solid #3b82f6', // Left accent border
  },
  icon: {
    marginRight: '15px',
    fontSize: '16px',
    minWidth: '20px',
  },
  logoutSection: {
    padding: '20px',
    borderTop: '1px solid rgba(255,255,255,0.08)',
    flexShrink: 0,
  },
  logoutBtn: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
    color: '#cbd5e1',
    border: 'none',
    padding: '12px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    transition: '0.2s',
  }
};

export default ClientSidebar;
