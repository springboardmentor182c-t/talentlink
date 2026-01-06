import React from "react";
import { Box } from "@mui/material";
import FreelancerLayout from "../../freelancer_layouts/FreelancerLayout";
import SettingsPanel from "../shared/SettingsPanel";

const FreelancerSettings = () => (
  <FreelancerLayout>
    <Box sx={{ width: "100%", px: { xs: 0, sm: 1 } }}>
      <SettingsPanel role="freelancer" />
    </Box>
  </FreelancerLayout>
);

export default FreelancerSettings;