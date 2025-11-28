// import React from "react";
// import { Box } from "@mui/material";

// // Correct new paths
// import FreelancerSidebar from "../freelancer_components/sidebar/FreelancerSidebar";
// import FreelancerNavbar from "../freelancer_components/navbar/FreelancerNavbar";

// export default function FreelancerLayout({ children }) {
//   return (
//     <Box sx={{ display: "flex" }}>
//       {/* Sidebar */}
//       <FreelancerSidebar />

//       {/* Main content area */}
//       <Box
//         sx={{
//           flexGrow: 1,
//           ml: "260px",       // matches wider sidebar
//           backgroundColor: "#E8EFF7",
//           minHeight: "100vh",
//         }}
//       >
//         {/* Navbar */}
//         <FreelancerNavbar />

//         {/* Page Content */}
//         <Box
//           sx={{
//             padding: "20px",
//             width: "100%",
//           }}
//         >
//           {children}
//         </Box>
//       </Box>
//     </Box>
//   );
// }

import React from "react";
import { Box } from "@mui/material";

import FreelancerSidebar from "../freelancer_components/sidebar/FreelancerSidebar";
import FreelancerNavbar from "../freelancer_components/navbar/FreelancerNavbar";

export default function FreelancerLayout({ children }) {
  return (
    <Box sx={{ display: "flex" }}>
      
      {/* Sidebar */}
      <FreelancerSidebar />

      {/* Main Content Area */}
      <Box
        sx={{
          flexGrow: 1,
          ml: "260px",
          backgroundColor: "#E8EFF7",
          minHeight: "100vh",
        }}
      >
        <FreelancerNavbar />

        <Box sx={{ padding: "20px", width: "100%" }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
}

