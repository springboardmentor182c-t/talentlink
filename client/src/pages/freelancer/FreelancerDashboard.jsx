import React from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Button,
} from "@mui/material";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

import FreelancerLayout from "../../layouts/FreelancerLayout";

// Earnings Data for Mini Bar Chart
const earningsData = [
  { month: "Jan", amount: 12000 },
  { month: "Feb", amount: 25000 },
  { month: "Mar", amount: 9000 },
];

export default function FreelancerDashboard() {
  const allProjects = [
    { id: 1, title: "Mobile App UI", client: "Stark Tech", status: "In Progress" },
    { id: 2, title: "Brand Identity Pack", client: "DesignIt", status: "Pending" },
    { id: 3, title: "Landing Page Revamp", client: "Nova Labs", status: "Completed" },
    { id: 4, title: "Illustration Pack", client: "PixArt", status: "In Progress" },
  ];

  const myProjects = [
    { id: 1, title: "Website Redesign", client: "Acme Inc.", status: "In Progress" },
    { id: 2, title: "Logo Design", client: "BizCo", status: "Pending" },
  ];

  const invites = [
    { id: 1, title: "E-commerce Platform", client: "Global Mart" },
    { id: 2, title: "Marketing Campaign", client: "BizCo" },
  ];

  return (
    <FreelancerLayout>
      {/* -------------------------------- */}
      {/* TOP STATS */}
      {/* -------------------------------- */}

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 2 }}>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>4</Typography>
            <Typography>Active Projects</Typography>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ p: 2 }}>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>2</Typography>
            <Typography>Completed Projects</Typography>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ p: 2 }}>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>6</Typography>
            <Typography>Total Projects</Typography>
          </Card>
        </Grid>
      </Grid>

      {/* -------------------------------- */}
      {/* MAIN 4 COLUMN LAYOUT */}
      {/* -------------------------------- */}

      <Grid container spacing={3}>

        {/* ---------------- ALL PROJECTS ---------------- */}
        <Grid item xs={12} md={3}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>All Projects</Typography>

          {allProjects.map((p) => (
            <Card key={p.id} sx={{ mb: 2, p: 2 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box>
                  <Typography sx={{ fontWeight: 700 }}>{p.title}</Typography>
                  <Typography variant="body2">{p.client}</Typography>
                </Box>

                <Chip
                  label={p.status}
                  sx={{
                    bgcolor:
                      p.status === "In Progress"
                        ? "#2F81E0"
                        : p.status === "Pending"
                        ? "#F4A623"
                        : "#4CAF50",
                    color: "white",
                    fontWeight: 700,
                  }}
                />
              </Box>
            </Card>
          ))}
        </Grid>

        {/* ---------------- MY PROJECTS ---------------- */}
        <Grid item xs={12} md={3}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>My Projects</Typography>

          <Card sx={{ p: 2 }}>
            {myProjects.map((p) => (
              <Box key={p.id} sx={{ mb: 3 }}>
                <Typography sx={{ fontWeight: 700 }}>{p.title}</Typography>
                <Typography variant="body2">{p.client}</Typography>

                <Chip
                  label={p.status}
                  sx={{
                    mt: 1,
                    bgcolor: p.status === "In Progress" ? "#2F81E0" : "#F4A623",
                    color: "white",
                    fontWeight: 700,
                  }}
                />
              </Box>
            ))}
          </Card>
        </Grid>

        {/* ---------------- INVITATIONS ---------------- */}
        <Grid item xs={12} md={3}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>Invitations</Typography>

          {invites.map((inv) => (
            <Card key={inv.id} sx={{ mb: 2, p: 2 }}>
              <Typography sx={{ fontWeight: 700 }}>{inv.title}</Typography>
              <Typography variant="body2">{inv.client}</Typography>

              <Button
                variant="contained"
                sx={{ mt: 2, bgcolor: "#F4A623", color: "white" }}
              >
                View Details
              </Button>
            </Card>
          ))}
        </Grid>

        {/* ---------------- EARNINGS (SIDE BY SIDE) ---------------- */}
        <Grid item xs={12} md={3}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
            Earnings Summary
          </Typography>

          <Card sx={{ p: 2 }}>
            <Typography sx={{ fontWeight: 700, mb: 2 }}>
              Last 3 Months
            </Typography>

            <Box sx={{ width: "100%", height: 200 }}>
              <ResponsiveContainer>
                <BarChart data={earningsData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="amount" fill="#4CAF50" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Card>
        </Grid>
      </Grid>

    </FreelancerLayout>
  );
}
