import React from "react";
import { Link } from "react-router-dom";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function Home() {
  return (
    <Container sx={{ mt: 6 }}>
      <Typography variant="h4" gutterBottom>
        Welcome to TalentLink (Frontend)
      </Typography>
      <Typography sx={{ mb: 2 }}>
        This is a demo frontend for your project. Use Login to switch roles and see role-based dashboards.
      </Typography>

      <Box>
        <Button component={Link} to="/login" variant="contained" sx={{ mr: 2 }}>
          Login
        </Button>
      </Box>
    </Container>
  );
}
