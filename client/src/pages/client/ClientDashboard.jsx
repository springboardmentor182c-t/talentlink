import React from "react";
import { Grid, Card, CardContent, Typography, Box, Button } from "@mui/material";
import ClientLayout from "../../layouts/ClientLayout";

export default function ClientDashboard() {
  return (
    <ClientLayout>
      {/* Stats Cards */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <Card sx={{ p: 1, boxShadow: 2 }}>
            <CardContent>
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                2
              </Typography>
              <Typography>Active Projects</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card sx={{ p: 1, boxShadow: 2 }}>
            <CardContent>
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                5
              </Typography>
              <Typography>Proposals Received</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card sx={{ p: 1, boxShadow: 2 }}>
            <CardContent>
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                1
              </Typography>
              <Typography>Contracts ongoing</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card sx={{ p: 1, boxShadow: 2 }}>
            <CardContent>
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                1
              </Typography>
              <Typography>Completed Projects</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Right side action buttons */}
      <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
        <Button variant="contained">Post New Projects</Button>
        <Button variant="contained">View proposals</Button>
        <Button variant="contained">View Contracts</Button>
      </Box>

      {/* Recent Projects Section */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
          Recent Projects
        </Typography>

        <Card sx={{ p: 2, width: "45%", bgcolor: "#e3f4ff" }}>
          <Typography>Project: Build Website</Typography>
          <Typography>Budget: 20,000</Typography>
          <Typography>Status: Active</Typography>
        </Card>
      </Box>
    </ClientLayout>
  );
}
