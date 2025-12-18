// import React from "react";
// import Box from "@mui/material/Box";
// import Container from "@mui/material/Container";

// // Correct paths after merging
// import ClientSidebar from "../freelancer_components/sidebar/ClientSidebar";
// import ClientNavbar from "../freelancer_components/navbar/ClientNavbar";

// export default function ClientLayout({ children }) {
//   return (
//     <Box sx={{ display: "flex", minHeight: "100vh" }}>
//       {/* Sidebar */}
//       <ClientSidebar />

//       {/* Main Content */}
//       <Box sx={{ flex: 1, ml: "220px" }}>
//         <ClientNavbar />
//         <Container sx={{ mt: 4, pb: 6 }}>{children}</Container>
//       </Box>
//     </Box>
//   );
// }

import React from "react";
import Box from "@mui/material/Box";
import ClientSidebar from "../freelancer_components/sidebar/ClientSidebar";

export default function ClientLayout({ children }) {
  return (
    <Box sx={{ display: "flex", bgcolor: "#F5F7FA", minHeight: "100vh" }}>
      
      {/* Sidebar */}
      <ClientSidebar />

      {/* RIGHT SIDE AREA */}
      <Box sx={{ flex: 1, ml: "230px" }}>
        
        {/* FIX: Navbar must be here, BEFORE the content */}
        <Navbar />

        {/* Main Content */}
        <Box sx={{ p: 3 }}>
          {children}
        </Box>

      </Box>
    </Box>
  );
}


import React from 'react';
import { Outlet } from 'react-router-dom';
import ClientSidebar from '../freelancer_components/sidebar/ClientSidebar';
import ClientNavbar from '../freelancer_components/navbar/ClientNavbar';

const ClientLayout = () => {
  return (
    <div style={styles.container}>
      {/* 1. Sidebar (Fixed Left) */}
      <div style={styles.sidebarWrapper}>
        <ClientSidebar />
      </div>

      {/* 2. Main Area (Right Side) */}
      <div style={styles.mainWrapper}>
        
        {/* Top Navbar */}
        <ClientNavbar />
        
        {/* Dashboard Content (Scrollable) */}
        <div style={styles.contentArea}>
          <Outlet /> 
        </div>

      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    height: '100vh',
    width: '100vw',
    backgroundColor: '#f3f4f8',
    fontFamily: "'Inter', sans-serif",
    overflow: 'hidden',
  },
  sidebarWrapper: {
    width: '260px',
    flexShrink: 0,
    height: '100%',
  },
  mainWrapper: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
  },
  contentArea: {
    flex: 1,
    overflowY: 'auto', // Allows scrolling ONLY in the dashboard area
    padding: '30px',
  }
};

export default ClientLayout;
