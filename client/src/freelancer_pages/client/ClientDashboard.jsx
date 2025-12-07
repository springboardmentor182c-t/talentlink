// import React from "react";
// import { Grid, Card, CardContent, Typography, Box, Button } from "@mui/material";
// import ClientLayout from "../../freelancer_layouts/ClientLayout";

// export default function ClientDashboard() {
//   return (
//     <ClientLayout>
//       {/* Stats Cards */}
//       <Grid container spacing={3}>
//         <Grid item xs={12} md={3}>
//           <Card sx={{ p: 1, boxShadow: 2 }}>
//             <CardContent>
//               <Typography variant="h4" sx={{ fontWeight: 700 }}>2</Typography>
//               <Typography>Active Projects</Typography>
//             </CardContent>
//           </Card>
//         </Grid>

//         <Grid item xs={12} md={3}>
//           <Card sx={{ p: 1, boxShadow: 2 }}>
//             <CardContent>
//               <Typography variant="h4" sx={{ fontWeight: 700 }}>5</Typography>
//               <Typography>Proposals Received</Typography>
//             </CardContent>
//           </Card>
//         </Grid>

//         <Grid item xs={12} md={3}>
//           <Card sx={{ p: 1, boxShadow: 2 }}>
//             <CardContent>
//               <Typography variant="h4" sx={{ fontWeight: 700 }}>1</Typography>
//               <Typography>Contracts ongoing</Typography>
//             </CardContent>
//           </Card>
//         </Grid>

//         <Grid item xs={12} md={3}>
//           <Card sx={{ p: 1, boxShadow: 2 }}>
//             <CardContent>
//               <Typography variant="h4" sx={{ fontWeight: 700 }}>1</Typography>
//               <Typography>Completed Projects</Typography>
//             </CardContent>
//           </Card>
//         </Grid>
//       </Grid>

//       <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
//         <Button variant="contained">Post New Projects</Button>
//         <Button variant="contained">View proposals</Button>
//         <Button variant="contained">View Contracts</Button>
//       </Box>

//       <Box sx={{ mt: 4 }}>
//         <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>Recent Projects</Typography>

//         <Card sx={{ p: 2, width: "45%", bgcolor: "#e3f4ff" }}>
//           <Typography>Project: Build Website</Typography>
//           <Typography>Budget: 20,000</Typography>
//           <Typography>Status: Active</Typography>
//         </Card>
//       </Box>
//     </ClientLayout>
//   );
// }


// remove login

// import React from "react";
// import { Grid, Card, CardContent, Typography, Box, Button } from "@mui/material";
// import ClientLayout from "../../freelancer_layouts/ClientLayout";

// export default function ClientDashboard() {
//   return (
//     <ClientLayout>
//       {/* Stats Cards */}
//       <Grid container spacing={3}>
//         <Grid item xs={12} md={3}>
//           <Card sx={{ p: 1, boxShadow: 2 }}>
//             <CardContent>
//               <Typography variant="h4" sx={{ fontWeight: 700 }}>2</Typography>
//               <Typography>Active Projects</Typography>
//             </CardContent>
//           </Card>
//         </Grid>

//         <Grid item xs={12} md={3}>
//           <Card sx={{ p: 1, boxShadow: 2 }}>
//             <CardContent>
//               <Typography variant="h4" sx={{ fontWeight: 700 }}>5</Typography>
//               <Typography>Proposals Received</Typography>
//             </CardContent>
//           </Card>
//         </Grid>

//         <Grid item xs={12} md={3}>
//           <Card sx={{ p: 1, boxShadow: 2 }}>
//             <CardContent>
//               <Typography variant="h4" sx={{ fontWeight: 700 }}>1</Typography>
//               <Typography>Contracts ongoing</Typography>
//             </CardContent>
//           </Card>
//         </Grid>

//         <Grid item xs={12} md={3}>
//           <Card sx={{ p: 1, boxShadow: 2 }}>
//             <CardContent>
//               <Typography variant="h4" sx={{ fontWeight: 700 }}>1</Typography>
//               <Typography>Completed Projects</Typography>
//             </CardContent>
//           </Card>
//         </Grid>
//       </Grid>

//       {/* Actions */}
//       <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
//         <Button variant="contained">Post New Projects</Button>
//         <Button variant="contained">View proposals</Button>
//         <Button variant="contained">View Contracts</Button>
//       </Box>

//       {/* Recent Project */}
//       <Box sx={{ mt: 4 }}>
//         <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
//           Recent Projects
//         </Typography>

//         <Card sx={{ p: 2, width: "45%", bgcolor: "#e3f4ff" }}>
//           <Typography>Project: Build Website</Typography>
//           <Typography>Budget: 20,000</Typography>
//           <Typography>Status: Active</Typography>
//         </Card>
//       </Box>
//     </ClientLayout>
//   );
// }



import React from "react";
import { Grid, Card, Typography, Box, LinearProgress } from "@mui/material";
import ClientLayout from "../../freelancer_layouts/ClientLayout";

export default function ClientDashboard() {
  return (
    <ClientLayout>
      <Box sx={{ px: 2 }}>
        <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>
          {/* Good Morning, Client! */}
        </Typography>

        {/* Top Stats */}
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Card sx={{ p: 2 }}>
              <Typography variant="subtitle2" color="gray">
                Active Projects
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                2
              </Typography>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ p: 2 }}>
              <Typography variant="subtitle2" color="gray">
                Budget Spent
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                $4,500 / $10,000
              </Typography>

              <LinearProgress
                variant="determinate"
                value={45}
                sx={{ mt: 1, height: 8, borderRadius: 4 }}
              />
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ p: 2 }}>
              <Typography variant="subtitle2" color="gray">
                Next Milestone
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Beta Launch in 4 days
              </Typography>
            </Card>
          </Grid>
        </Grid>

        {/* Current Project */}
        <Card sx={{ p: 3, mt: 3 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Current Project: E-commerce Redesign
          </Typography>

          <Grid container spacing={2}>
            {["Planning", "Design", "Development", "Launch"].map((stage, index) => (
              <Grid item xs={12} md={3} key={index}>
                <Box
                  sx={{
                    textAlign: "center",
                    p: 2,
                    borderRadius: 2,
                    bgcolor: index === 1 ? "#1E90FF" : "#F5F7FA",
                    color: index === 1 ? "white" : "black",
                    fontWeight: index === 1 ? 700 : 500,
                  }}
                >
                  {stage}
                  <Typography variant="body2">
                    {index === 0 ? "(Done)" : index === 1 ? "(In Progress)" : ""}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Card>

        {/* Recent Activity + Quick Actions */}
        <Grid container spacing={2} sx={{ mt: 2 }}>
          {/* Recent Activity */}
          <Grid item xs={12} md={8}>
            <Card sx={{ p: 2 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Recent Activity
              </Typography>

              <Box>
                {[
                  "New Wireframes uploaded by Mike",
                  "Invoice #103 paid",
                  "New Designs uploaded",
                  "New Comments added by Sarah",
                ].map((text, i) => (
                  <Typography key={i} sx={{ mb: 1 }}>
                    • {text}
                  </Typography>
                ))}
              </Box>
            </Card>
          </Grid>

          {/* Quick Actions */}
          <Grid item xs={12} md={4}>
            <Card sx={{ p: 2, mb: 2 }}>
              <Typography variant="h6">Quick Actions</Typography>
              <Box sx={{ mt: 2 }}>
                <button style={btn}>Approve Designs</button>
                <button style={btn}>Schedule Call</button>
              </Box>
            </Card>

            <Card sx={{ p: 2 }}>
              <Typography variant="h6">Shared Documents</Typography>
              <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
                <img src="pdf.png" width="40" alt="" />
                <img src="img1.png" width="40" alt="" />
                <img src="img2.png" width="40" alt="" />

              </Box>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </ClientLayout>
  );
}

const btn = {
  width: "100%",
  padding: "10px",
  marginBottom: "10px",
  borderRadius: "8px",
  border: "none",
  background: "#1E90FF",
  color: "white",
  fontWeight: 600,
  cursor: "pointer",
};
