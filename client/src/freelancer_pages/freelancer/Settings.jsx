import React from "react";
import { Typography, Card, List, ListItem, ListItemText, Switch, Divider } from "@mui/material";
import FreelancerLayout from "../../freelancer_layouts/FreelancerLayout";

export default function Settings() {
  return (
    <FreelancerLayout>
      <Typography variant="h5" fontWeight={700} sx={{ mb: 3 }}>Settings</Typography>
      <Card>
        <List>
          <ListItem>
            <ListItemText primary="Email Notifications" secondary="Receive updates via email" />
            <Switch defaultChecked />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText primary="Dark Mode" secondary="Switch between light and dark themes" />
            <Switch />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText primary="Public Profile" secondary="Allow clients to find you" />
            <Switch defaultChecked />
          </ListItem>
        </List>
      </Card>
    </FreelancerLayout>
  );
}