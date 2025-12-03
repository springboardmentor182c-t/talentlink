// import React from "react";
// import AppBar from "@mui/material/AppBar";
// import Toolbar from "@mui/material/Toolbar";
// import Typography from "@mui/material/Typography";
// import Button from "@mui/material/Button";
// import { useAuth } from "../../context/AuthContext";

// export default function FreelancerNavbar() {
//   const { user, logout } = useAuth();
//   return (
//     <AppBar position="static" color="secondary">
//       <Toolbar>
//         <Typography variant="h6" sx={{ flexGrow: 1 }}>
//           TalentLink — Freelancer
//         </Typography>
//         <Typography sx={{ mr: 2 }}>{user?.name}</Typography>
//         <Button color="inherit" onClick={logout}>
//           Logout
//         </Button>
//       </Toolbar>
//     </AppBar>
//   );
// }


import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default function FreelancerNavbar() {
  return (
    <AppBar position="static" color="secondary">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          TalentLink — Freelancer
        </Typography>

        <Typography sx={{ mr: 2 }}>Freelancer User</Typography>

        {/* Logout removed */}
        <Button color="inherit">Logout</Button>
      </Toolbar>
    </AppBar>
  );
}
