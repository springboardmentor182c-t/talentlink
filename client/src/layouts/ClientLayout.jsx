import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import ClientSidebar from "../components/sidebar/ClientSidebar";
import ClientNavbar from "../components/navbar/ClientNavbar";

export default function ClientLayout({ children }) {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <ClientSidebar />
      <Box sx={{ flex: 1, ml: "220px" }}>
        <ClientNavbar />
        <Container sx={{ mt: 4, pb: 6 }}>{children}</Container>
      </Box>
    </Box>
  );
}
