import React from "react";
import { Typography, Grid, Card, Avatar, Box, Button } from "@mui/material";
import FreelancerLayout from "../../freelancer_layouts/FreelancerLayout";

export default function Clients() {
  return (
    <FreelancerLayout>
      <Typography variant="h5" fontWeight={700} sx={{ mb: 3 }}>My Clients</Typography>
      <Grid container spacing={3}>
        {[1, 2, 3, 4].map((i) => (
          <Grid item xs={12} sm={6} md={3} key={i}>
            <Card sx={{ p: 3, textAlign: "center" }}>
              <Avatar sx={{ width: 64, height: 64, margin: "0 auto", mb: 2, bgcolor: "#3b82f6" }}>C{i}</Avatar>
              <Typography variant="h6">Client Name {i}</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>CEO at Company {i}</Typography>
              <Button variant="outlined" size="small" fullWidth>View Profile</Button>
            </Card>
          </Grid>
        ))}
      </Grid>
    </FreelancerLayout>
  );
}