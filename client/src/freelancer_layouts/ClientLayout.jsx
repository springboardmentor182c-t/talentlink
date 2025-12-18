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


