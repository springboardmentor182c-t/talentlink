import React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Container from "@mui/material/Container";
import { useAuth } from "../context/AuthContext";
import Typography from "@mui/material/Typography";

/**
 * DashboardLayout renders role-based navbar and a left drawer (placeholder).
 * children => main content
 */
export default function DashboardLayout({ children }) {
  const { role } = useAuth();

  const menuItems =
    role === "client"
      ? ["Post Project", "My Projects", "Proposals", "Contracts"]
      : ["Find Projects", "Proposals Sent", "Contracts", "Profile"];

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", flexDirection: "column" }}>
      {/* role-based topbar */}
      {role === "client" ? <ClientNavbar /> : <FreelancerNavbar />}

      <Box sx={{ display: "flex", flex: 1 }}>
        <Drawer variant="permanent" anchor="left" sx={{ width: 220 }}>
          <Box sx={{ width: 220, mt: 8 }}>
            <List>
              {menuItems.map((m) => (
                <ListItem button key={m}>
                  <ListItemText primary={m} />
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>

        <Container sx={{ mt: 8, ml: 28 }}>
          <Typography variant="h5" gutterBottom>
            {role ? `${role[0].toUpperCase() + role.slice(1)} Dashboard` : "Dashboard"}
          </Typography>

          <Box sx={{ mt: 2 }}>{children}</Box>
        </Container>
      </Box>
    </Box>
  );
}
