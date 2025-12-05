import React from "react";
import { Typography, Card, Box,  Chip } from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import FreelancerLayout from "../../freelancer_layouts/FreelancerLayout";

export default function Contracts() {
  return (
    <FreelancerLayout>
      <Typography variant="h5" fontWeight={700} sx={{ mb: 3 }}>Contracts</Typography>
      <Card sx={{ p: 3 }}>
        {[
          { name: "NDA - Stark Tech", date: "Oct 20, 2025", status: "Signed" },
          { name: "Service Agreement - Global Mart", date: "Nov 01, 2025", status: "Pending" },
        ].map((c, i) => (
          <Box key={i} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2, p: 2, border: "1px solid #eee", borderRadius: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <DescriptionIcon color="action" />
              <Box>
                <Typography fontWeight={600}>{c.name}</Typography>
                <Typography variant="caption" color="text.secondary">{c.date}</Typography>
              </Box>
            </Box>
            <Chip label={c.status} color={c.status === "Signed" ? "success" : "warning"} size="small" />
          </Box>
        ))}
      </Card>
    </FreelancerLayout>
  );
}