import React, { useState, useEffect } from "react";
import { Grid, Card, Typography, Box, Chip, Button, Avatar, List, ListItem, ListItemAvatar, ListItemText, IconButton, Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, LinearProgress, Tab, Tabs, CircularProgress, Alert } from "@mui/material";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import AssignmentIcon from '@mui/icons-material/Assignment';
import DescriptionIcon from '@mui/icons-material/Description';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

import FreelancerLayout from "../../freelancer_layouts/FreelancerLayout";
import { analyticsService, proposalService, contractService, projectService } from "../../services/projectService";

// Mock data for chart (fallback if API fails)
const dailyData = [
  { name: 'Sep 1', value: 42 }, { name: 'Sep 2', value: 45 }, { name: 'Sep 3', value: 55 }, { name: 'Sep 4', value: 50 }, 
  { name: 'Sep 5', value: 40 }, { name: 'Sep 6', value: 42 }, { name: 'Sep 7', value: 38 }, { name: 'Sep 8', value: 48 }, 
  { name: 'Sep 9', value: 45 }, { name: 'Sep 10', value: 42 }, { name: 'Sep 11', value: 43 }, { name: 'Sep 12', value: 40 },
];

const weeklyData = [
  { name: 'Week 1', value: 30 }, { name: 'Week 2', value: 45 }, { name: 'Week 3', value: 38 }, { name: 'Week 4', value: 55 },
];

const monthlyData = [
  { name: 'Jan', value: 20 }, { name: 'Feb', value: 35 }, { name: 'Mar', value: 45 }, { name: 'Apr', value: 30 },
  { name: 'May', value: 55 }, { name: 'Jun', value: 48 }, { name: 'Jul', value: 52 }, { name: 'Aug', value: 40 },
  { name: 'Sep', value: 42 }, { name: 'Oct', value: 50 }, { name: 'Nov', value: 58 }, { name: 'Dec', value: 60 },
];

export default function FreelancerDashboard() {
  const [timeRange, setTimeRange] = useState("Daily");
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dashboardStats, setDashboardStats] = useState(null);
  const [projects, setProjects] = useState([]);
  const [proposals, setProposals] = useState([]);
  const [contracts, setContracts] = useState([]);
  const [userName, setUserName] = useState("User");

  // Fetch all dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Get user info from localStorage
        const userData = localStorage.getItem('user');
        if (userData) {
          const user = JSON.parse(userData);
          setUserName(user.full_name || user.username || "User");
        }

        // Fetch dashboard stats
        const statsData = await analyticsService.getDashboardStats();
        setDashboardStats(statsData);

        // Fetch projects
        const projectsData = await projectService.getAllProjects();
        setProjects(Array.isArray(projectsData) ? projectsData : projectsData.results || []);

        // Fetch proposals
        const proposalsData = await proposalService.getAllProposals();
        setProposals(Array.isArray(proposalsData) ? proposalsData : proposalsData.results || []);

        // Fetch contracts
        const contractsData = await contractService.getAllContracts();
        setContracts(Array.isArray(contractsData) ? contractsData : contractsData.results || []);

      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Failed to load dashboard data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Transform stats data for display
  const getStatsDisplay = () => {
    if (!dashboardStats) {
      return [
        { title: "This Month Revenue", value: "$0", icon: <AttachMoneyIcon />, change: "0%", isPositive: true, bgColor: "#ecfdf5", iconColor: "#10b981" },
        { title: "Project Accepted", value: "0", icon: <CheckCircleIcon />, change: "0%", isPositive: true, bgColor: "#fefce8", iconColor: "#eab308" },
        { title: "Delivered On Time", value: "0%", icon: <LocalShippingIcon />, change: "0%", isPositive: true, bgColor: "#eff6ff", iconColor: "#3b82f6" },
        { title: "Active Contracts", value: "0", icon: <AccessTimeIcon />, change: "0%", isPositive: true, bgColor: "#fef2f2", iconColor: "#ef4444" },
      ];
    }

    return [
      { title: "This Month Revenue", value: dashboardStats.this_month_revenue, icon: <AttachMoneyIcon />, change: "+1.2%", isPositive: true, bgColor: "#ecfdf5", iconColor: "#10b981" },
      { title: "Project Accepted", value: `+${dashboardStats.projects_accepted}`, icon: <CheckCircleIcon />, change: "-2.4%", isPositive: false, bgColor: "#fefce8", iconColor: "#eab308" },
      { title: "Delivered On Time", value: dashboardStats.delivered_on_time, icon: <LocalShippingIcon />, change: "+1.2%", isPositive: true, bgColor: "#eff6ff", iconColor: "#3b82f6" },
      { title: "Active Contracts", value: dashboardStats.active_contracts, icon: <AccessTimeIcon />, change: "-0.8%", isPositive: false, bgColor: "#fef2f2", iconColor: "#ef4444" },
    ];
  };

  // Get chart data
  const getChartData = () => {
    switch (timeRange) {
      case "Weekly": return weeklyData;
      case "Monthly": return monthlyData;
      case "Daily":
      default: return dailyData;
    }
  };

  // Helper function
  const getButtonStyle = (range) => ({
    bgcolor: timeRange === range ? "white" : "transparent",
    boxShadow: timeRange === range ? 1 : 0,
    color: timeRange === range ? "text.primary" : "text.secondary",
    "&:hover": { bgcolor: timeRange === range ? "white" : "rgba(0,0,0,0.04)" }
  });

  const getStatusColor = (status) => {
    const statusLower = status?.toLowerCase() || '';
    if (statusLower.includes('active')) return { bg: "#ecfdf5", color: "#10b981" };
    if (statusLower.includes('pending')) return { bg: "#fff7ed", color: "#f59e0b" };
    if (statusLower.includes('accepted')) return { bg: "#dbeafe", color: "#3b82f6" };
    if (statusLower.includes('rejected') || statusLower.includes('completed')) return { bg: "#f3f4f6", color: "#6b7280" };
    return { bg: "#f3f4f6", color: "#6b7280" };
  };

  const stats = getStatsDisplay();

  if (loading) {
    return (
      <FreelancerLayout>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
          <CircularProgress />
        </Box>
      </FreelancerLayout>
    );
  }

  return (
    <FreelancerLayout>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5">Hi {userName}</Typography>
        <Typography variant="body2" color="text.secondary">This is your Freelance Team dashboard overview</Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      {/* --- Top Stats Row --- */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{ p: 2.5, display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
              <Box sx={{ display: "flex", gap: 2 }}>
                <Avatar sx={{ bgcolor: stat.bgColor, color: stat.iconColor, width: 48, height: 48 }}>
                  {stat.icon}
                </Avatar>
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 700 }}>{stat.value}</Typography>
                  <Typography variant="body2" color="text.secondary">{stat.title}</Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', color: stat.isPositive ? 'success.main' : 'error.main' }}>
                  {stat.isPositive ? <ArrowUpwardIcon fontSize="small" /> : <ArrowDownwardIcon fontSize="small" />}
                  <Typography variant="caption" fontWeight="bold">{stat.change}</Typography>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        {/* Task Progress Chart */}
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3, height: "100%" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
              <Typography variant="h6">Task Progress</Typography>
              <Box sx={{ bgcolor: "#f3f4f6", borderRadius: 2, p: 0.5 }}>
                <Button size="small" onClick={() => setTimeRange("Daily")} sx={getButtonStyle("Daily")}>Daily</Button>
                <Button size="small" onClick={() => setTimeRange("Weekly")} sx={getButtonStyle("Weekly")}>Weekly</Button>
                <Button size="small" onClick={() => setTimeRange("Monthly")} sx={getButtonStyle("Monthly")}>Monthly</Button>
              </Box>
            </Box>

            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={getChartData()}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} domain={[0, 'auto']} />
                <Tooltip contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0px 4px 20px rgba(0,0,0,0.1)' }} />
                <Line type="monotone" dataKey="value" stroke="#4ade80" strokeWidth={3} dot={false} activeDot={{ r: 6, strokeWidth: 0 }} />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Grid>

        {/* Active Projects List */}
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 3, height: "100%" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
              <Typography variant="h6">Active Projects ({projects.filter(p => p.status === 'ACTIVE').length})</Typography>
              <Button size="small" color="secondary">See All</Button>
            </Box>
            <List disablePadding>
              {projects.filter(p => p.status === 'ACTIVE').slice(0, 4).map((project, index) => (
                <React.Fragment key={project.id}>
                  <ListItem alignItems="flex-start" disableGutters sx={{ py: 1.5 }}>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: '#3b82f620', color: '#3b82f6', width: 36, height: 36 }}>
                        <Box sx={{ width: 10, height: 10, bgcolor: 'currentColor', borderRadius: '50%' }} />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={<Typography variant="subtitle2" sx={{ fontWeight: 600 }}>{project.title}</Typography>}
                      secondary={<Typography variant="caption" color="text.secondary">{project.status}</Typography>}
                    />
                  </ListItem>
                  {index < projects.filter(p => p.status === 'ACTIVE').slice(0, 4).length - 1 && <Divider variant="inset" component="li" />}
                </React.Fragment>
              ))}
            </List>
          </Card>
        </Grid>

        {/* Projects, Proposals, Contracts Tabs */}
        <Grid item xs={12}>
          <Card sx={{ p: 3 }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
              <Tabs
                value={activeTab}
                onChange={(e, newValue) => setActiveTab(newValue)}
                textColor="primary"
                indicatorColor="primary"
                sx={{
                  "& .MuiTab-root": { 
                    textTransform: "none", 
                    fontWeight: 600, 
                    fontSize: "14px",
                    display: "flex",
                    alignItems: "center",
                    gap: 1
                  },
                  "& .Mui-selected": { color: "#3b82f6 !important" },
                  "& .MuiTabs-indicator": { backgroundColor: "#3b82f6" },
                }}
              >
                <Tab 
                  label={
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <AssignmentIcon fontSize="small" />
                      My Projects
                      <Chip label={projects.length} size="small" sx={{ height: 20, fontSize: "0.75rem", ml: 1 }} />
                    </Box>
                  }
                />
                <Tab 
                  label={
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <DescriptionIcon fontSize="small" />
                      Proposals
                      <Chip label={proposals.length} size="small" sx={{ height: 20, fontSize: "0.75rem", ml: 1 }} />
                    </Box>
                  }
                />
                <Tab 
                  label={
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <CheckCircleOutlineIcon fontSize="small" />
                      Contracts
                      <Chip label={contracts.length} size="small" sx={{ height: 20, fontSize: "0.75rem", ml: 1 }} />
                    </Box>
                  }
                />
              </Tabs>
            </Box>

            {/* Tab Content: My Projects */}
            {activeTab === 0 && (
              <Box>
                {projects.length === 0 ? (
                  <Typography color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
                    No projects yet. Create your first project to get started.
                  </Typography>
                ) : (
                  <Grid container spacing={2}>
                    {projects.map((project) => (
                      <Grid item xs={12} sm={6} md={3} key={project.id}>
                        <Box
                          sx={{
                            p: 2.5,
                            border: "1px solid #e5e7eb",
                            borderRadius: 2,
                            cursor: "pointer",
                            transition: "all 0.3s ease",
                            "&:hover": {
                              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                              transform: "translateY(-2px)",
                            },
                          }}
                        >
                          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 1.5 }}>
                            <Avatar sx={{ bgcolor: '#3b82f620', color: '#3b82f6', width: 36, height: 36 }}>
                              <Box sx={{ width: 10, height: 10, bgcolor: "currentColor", borderRadius: "50%" }} />
                            </Avatar>
                            <IconButton size="small"><MoreHorizIcon fontSize="small" /></IconButton>
                          </Box>
                          <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 0.5 }}>
                            {project.title}
                          </Typography>
                          <Typography variant="caption" color="text.secondary" sx={{ mb: 1.5, display: "block" }}>
                            {project.status}
                          </Typography>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, color: "text.secondary" }}>
                            <Typography variant="caption">{new Date(project.created_at).toLocaleDateString()}</Typography>
                          </Box>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                )}
              </Box>
            )}

            {/* Tab Content: Proposals */}
            {activeTab === 1 && (
              <Box>
                {proposals.length === 0 ? (
                  <Typography color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
                    No proposals yet.
                  </Typography>
                ) : (
                  <List disablePadding>
                    {proposals.map((proposal, index) => {
                      const statusColor = getStatusColor(proposal.status);
                      return (
                        <React.Fragment key={proposal.id}>
                          <ListItem
                            disableGutters
                            sx={{
                              py: 2,
                              px: 2,
                              borderRadius: 1.5,
                              cursor: "pointer",
                              transition: "all 0.3s ease",
                              "&:hover": {
                                bgcolor: "#f9fafb",
                              },
                            }}
                          >
                            <ListItemAvatar>
                              <Avatar sx={{ width: 48, height: 48 }}>
                                {proposal.client_name?.[0] || 'C'}
                              </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                              primary={
                                <Box>
                                  <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 0.5 }}>
                                    {proposal.project_title}
                                  </Typography>
                                  <Typography variant="caption" color="text.secondary">
                                    {proposal.client_name} • ${proposal.bid_amount}
                                  </Typography>
                                </Box>
                              }
                            />
                            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 1 }}>
                              <Chip
                                label={proposal.status}
                                size="small"
                                sx={{
                                  fontWeight: 600,
                                  borderRadius: 1,
                                  bgcolor: statusColor.bg,
                                  color: statusColor.color,
                                }}
                              />
                            </Box>
                          </ListItem>
                          {index < proposals.length - 1 && <Divider sx={{ my: 1 }} />}
                        </React.Fragment>
                      );
                    })}
                  </List>
                )}
              </Box>
            )}

            {/* Tab Content: Contracts */}
            {activeTab === 2 && (
              <Box>
                {contracts.length === 0 ? (
                  <Typography color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
                    No contracts yet.
                  </Typography>
                ) : (
                  <TableContainer>
                    <Table sx={{ minWidth: 600 }}>
                      <TableHead>
                        <TableRow sx={{ bgcolor: "#f9fafb" }}>
                          <TableCell sx={{ fontWeight: 700, color: "text.secondary" }}>Contract</TableCell>
                          <TableCell sx={{ fontWeight: 700, color: "text.secondary" }}>Client</TableCell>
                          <TableCell sx={{ fontWeight: 700, color: "text.secondary" }}>Status</TableCell>
                          <TableCell align="right" sx={{ fontWeight: 700, color: "text.secondary" }}>Action</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {contracts.map((contract) => {
                          const statusColor = getStatusColor(contract.status);
                          return (
                            <TableRow key={contract.id} sx={{ borderBottom: "1px solid #e5e7eb" }}>
                              <TableCell>
                                <Typography variant="subtitle2" fontWeight={700}>
                                  {contract.title}
                                </Typography>
                              </TableCell>
                              <TableCell>
                                <Typography variant="caption" color="text.secondary">
                                  {new Date(contract.start_date).toLocaleDateString()}
                                </Typography>
                              </TableCell>
                              <TableCell>
                                <Chip
                                  label={contract.status}
                                  size="small"
                                  sx={{
                                    fontWeight: 600,
                                    borderRadius: 1,
                                    bgcolor: statusColor.bg,
                                    color: statusColor.color,
                                  }}
                                />
                              </TableCell>
                              <TableCell align="right">
                                <IconButton size="small" sx={{ color: "#3b82f6" }}>
                                  <OpenInNewIcon fontSize="small" />
                                </IconButton>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              </Box>
            )}
          </Card>
        </Grid>
      </Grid>
    </FreelancerLayout>
  );
}
