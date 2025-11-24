import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Container, Box, TextField, Button, Typography, Radio, RadioGroup, FormControlLabel } from "@mui/material";

export default function Login() {
  const { login } = useAuth();
  const [name, setName] = useState("");
  const [role, setRole] = useState("client");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // In a real app: call backend auth, receive token + role
    await login({ role, name: name || (role === "client" ? "ClientUser" : "FreelancerUser") });
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Typography variant="h5" gutterBottom>
        Login (Demo)
      </Typography>

      <Box component="form" onSubmit={handleSubmit} sx={{ display: "grid", gap: 2 }}>
        <TextField label="Name (display)" value={name} onChange={(e) => setName(e.target.value)} />

        <div>
          <Typography variant="subtitle2">Choose Role</Typography>
          <RadioGroup row value={role} onChange={(e) => setRole(e.target.value)}>
            <FormControlLabel value="client" control={<Radio />} label="Client" />
            <FormControlLabel value="freelancer" control={<Radio />} label="Freelancer" />
          </RadioGroup>
        </div>

        <Button type="submit" variant="contained">
          Login
        </Button>
      </Box>

      <Typography variant="caption" sx={{ display: "block", mt: 2 }}>
        (This is a simulated login for the frontend. Replace with real authentication calls to Django backend.)
      </Typography>
    </Container>
  );
}
