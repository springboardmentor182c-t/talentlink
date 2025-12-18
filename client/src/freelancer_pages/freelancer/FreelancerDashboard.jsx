

import React, { useState } from "react"; // 1. Import useState
import { Grid, Card, Typography, Box, Chip, Button, Avatar, List, ListItem, ListItemAvatar, ListItemText, IconButton, Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, LinearProgress, Tab, Tabs } from "@mui/material";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import AssignmentIcon from '@mui/icons-material/Assignment';
import DescriptionIcon from '@mui/icons-material/Description';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

import FreelancerLayout from "../../freelancer_layouts/FreelancerLayout";

// --- Mock Data: Stats ---
const stats = [
  { title: "This Month Revenue", value: "$13,596", icon: <AttachMoneyIcon />, change: "+1.2%", isPositive: true, bgColor: "#ecfdf5", iconColor: "#10b981" },
  { title: "Project Accepted", value: "+16", icon: <CheckCircleIcon />, change: "-2.4%", isPositive: false, bgColor: "#fefce8", iconColor: "#eab308" },
  { title: "Delivered On Time", value: "92.8%", icon: <LocalShippingIcon />, change: "+1.2%", isPositive: true, bgColor: "#eff6ff", iconColor: "#3b82f6" },
  { title: "Responsed On Time", value: "1h 00m", icon: <AccessTimeIcon />, change: "-0.8%", isPositive: false, bgColor: "#fef2f2", iconColor: "#ef4444" },
];

// --- Mock Data: Chart Data Sets ---
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

const activeProjects = [
  { id: 1, title: "Creative Corner", subtitle: "1 Member | 2 Tasks", time: "8 Days", color: "#10b981", client: "Global Mart", progress: 45 },
  { id: 2, title: "Masendro Illustration", subtitle: "3 Members | 14 Tasks", time: "8 Days", color: "#3b82f6", client: "Creative Agency", progress: 60 },
  { id: 3, title: "Space Template", subtitle: "2 Members | 24 Tasks", time: "8 Days", color: "#8b5cf6", client: "Tech Innovations", progress: 75 },
  { id: 4, title: "Milana Illustration", subtitle: "3 Members | 14 Tasks", time: "8 Days", color: "#eab308", client: "Design Studio", progress: 30 },
];

// Mock Proposals Data
const proposals = [
  { id: 1, title: "E-commerce Platform Proposal", client: "Global Mart", clientImg: "https://i.pravatar.cc/150?img=1", budget: "$5,000 - $10,000", status: "Pending Review", submittedDate: "Dec 14, 2025", rating: 4.8 },
  { id: 2, title: "Mobile App Design", client: "Acme Inc.", clientImg: "https://i.pravatar.cc/150?img=2", budget: "$2,500 - $4,000", status: "Accepted", submittedDate: "Dec 10, 2025", rating: 4.6 },
  { id: 3, title: "Website Redesign", client: "Tech Innovations", clientImg: "https://i.pravatar.cc/150?img=3", budget: "$3,000 - $6,000", status: "Pending Review", submittedDate: "Dec 8, 2025", rating: 4.7 },
  { id: 4, title: "API Development", client: "Cloud Services", clientImg: "https://i.pravatar.cc/150?img=4", budget: "$4,500 - $8,000", status: "Rejected", submittedDate: "Dec 5, 2025", rating: 4.5 },
];

// Mock Contracts Data
const contracts = [
  { id: 1, title: "Website Redesign", client: "Acme Inc.", clientImg: "https://i.pravatar.cc/150?img=2", amount: "$4,500", status: "Active", startDate: "Dec 1, 2025", endDate: "Mar 1, 2026", progress: 60 },
  { id: 2, title: "Logo Design", client: "Global Mart", clientImg: "https://i.pravatar.cc/150?img=1", amount: "$1,200", status: "Active", startDate: "Nov 15, 2025", endDate: "Dec 31, 2025", progress: 85 },
  { id: 3, title: "UI Kit Development", client: "Design Systems", clientImg: "https://i.pravatar.cc/150?img=5", amount: "$3,800", status: "Completed", startDate: "Oct 1, 2025", endDate: "Nov 30, 2025", progress: 100 },
  { id: 4, title: "React Components", client: "Tech Startup", clientImg: "https://i.pravatar.cc/150?img=6", amount: "$2,500", status: "Pending", startDate: "Dec 20, 2025", endDate: "Jan 20, 2026", progress: 0 },
];

const latestClients = [
  { id: 1, name: "Mitchel", project: "Illustration Project", status: "Wait Payment", statusColor: "warning", img: "https://i.pravatar.cc/150?img=11" },
  { id: 2, name: "William", project: "Icon Project", status: "Done", statusColor: "success", img: "https://i.pravatar.cc/150?img=12" },
  { id: 3, name: "Shahriar", project: "UI Design Project", status: "Wait Payment", statusColor: "warning", img: "https://i.pravatar.cc/150?img=13" },
];

const transactions = [
  { id: "#INV-001", client: "Stark Tech", date: "Nov 28, 2025", amount: "$1,200", status: "Paid" },
  { id: "#INV-002", client: "Global Mart", date: "Nov 25, 2025", amount: "$850", status: "Pending" },
  { id: "#INV-003", client: "Nova Labs", date: "Nov 22, 2025", amount: "$2,300", status: "Paid" },
  { id: "#INV-004", client: "Acme Corp", date: "Nov 20, 2025", amount: "$450", status: "Failed" },
];

export default function FreelancerDashboard() {
  // 2. State to handle the active time range
  const [timeRange, setTimeRange] = useState("Daily");
  const [activeTab, setActiveTab] = useState(0);

  // 3. Logic to switch data based on state
  const getChartData = () => {
    switch (timeRange) {
      case "Weekly": return weeklyData;
      case "Monthly": return monthlyData;
      case "Daily":
      default: return dailyData;
    }
  };

  // Helper style for active/inactive buttons
  const getButtonStyle = (range) => ({
    bgcolor: timeRange === range ? "white" : "transparent",
    boxShadow: timeRange === range ? 1 : 0,
    color: timeRange === range ? "text.primary" : "text.secondary",
    "&:hover": { bgcolor: timeRange === range ? "white" : "rgba(0,0,0,0.04)" }
  });

  // Get status chip color
  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return { bg: "#ecfdf5", color: "#10b981" };
      case "Pending Review":
      case "Pending":
        return { bg: "#fff7ed", color: "#f59e0b" };
      case "Accepted":
        return { bg: "#dbeafe", color: "#3b82f6" };
      case "Rejected":
      case "Completed":
        return { bg: "#f3f4f6", color: "#6b7280" };
      default:
        return { bg: "#f3f4f6", color: "#6b7280" };
    }
  };

  return (
    <FreelancerLayout>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5">Hi Kumar Gosala</Typography>
        <Typography variant="body2" color="text.secondary">This is your Freelance Team dashboard overview</Typography>
      </Box>

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
        
        {/* --- ROW 2: Task Progress & Active Projects --- */}

        {/* Task Progress Chart */}
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3, height: "100%" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
              <Typography variant="h6">Task Progress</Typography>
              
              {/* 4. Functional Buttons */}
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
              <Typography variant="h6">Active Projects</Typography>
              <Button size="small" color="secondary">See All</Button>
            </Box>
            <List disablePadding>
              {activeProjects.map((project, index) => (
                <React.Fragment key={project.id}>
                  <ListItem alignItems="flex-start" disableGutters sx={{ py: 1.5 }}>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: `${project.color}20`, color: project.color, width: 36, height: 36 }}>
                        <Box sx={{ width: 10, height: 10, bgcolor: 'currentColor', borderRadius: '50%' }} />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={<Typography variant="subtitle2" sx={{ fontWeight: 600 }}>{project.title}</Typography>}
                      secondary={<Typography variant="caption" color="text.secondary">{project.subtitle}</Typography>}
                    />
                    <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary' }}>
                        <AccessTimeIcon fontSize="small" sx={{ mr: 0.5, fontSize: 16 }} />
                        <Typography variant="caption">{project.time}</Typography>
                    </Box>
                  </ListItem>
                  {index < activeProjects.length - 1 && <Divider variant="inset" component="li" />}
                </React.Fragment>
              ))}
            </List>
          </Card>
        </Grid>

        {/* --- ROW 3: Recent Transactions & Latest Clients --- */}

        {/* Recent Transactions */}
        <Grid item xs={12} md={7}>
          <Card sx={{ p: 3, height: "100%", display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
              <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <ReceiptLongIcon color="action" /> Recent Transactions
              </Typography>
              <Button size="small" color="primary">Export</Button>
            </Box>
            
            <TableContainer>
              <Table sx={{ minWidth: 400 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ color: 'text.secondary', fontWeight: 600 }}>Invoice ID</TableCell>
                    <TableCell sx={{ color: 'text.secondary', fontWeight: 600 }}>Client</TableCell>
                    <TableCell sx={{ color: 'text.secondary', fontWeight: 600 }}>Amount</TableCell>
                    <TableCell align="right" sx={{ color: 'text.secondary', fontWeight: 600 }}>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {transactions.map((row) => (
                    <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell component="th" scope="row" sx={{ fontWeight: 500 }}>
                        {row.id}
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{row.client}</Typography>
                        <Typography variant="caption" color="text.secondary">{row.date}</Typography>
                      </TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>{row.amount}</TableCell>
                      <TableCell align="right">
                        <Chip 
                          label={row.status} 
                          size="small" 
                          sx={{ 
                            fontWeight: 600,
                            borderRadius: 1,
                            bgcolor: row.status === "Paid" ? "#ecfdf5" : row.status === "Pending" ? "#fff7ed" : "#fef2f2",
                            color: row.status === "Paid" ? "#10b981" : row.status === "Pending" ? "#f59e0b" : "#ef4444"
                          }} 
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </Grid>

        {/* Latest Clients List */}
        <Grid item xs={12} md={5}>
           <Card sx={{ p: 3, height: "100%" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
              <Typography variant="h6">Latest Clients</Typography>
              <IconButton size="small"><MoreHorizIcon /></IconButton>
            </Box>
            <List disablePadding>
              {latestClients.map((client) => (
                <ListItem key={client.id} disableGutters sx={{ py: 1.5 }}>
                  <ListItemAvatar>
                    <Avatar src={client.img} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={<Typography variant="subtitle2" sx={{ fontWeight: 600 }}>{client.name}</Typography>}
                    secondary={<Typography variant="caption" color="text.secondary">{client.project}</Typography>}
                  />
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 1 }}>
                     <Chip label={client.status} color={client.statusColor} size="small" sx={{ fontWeight: 500, fontSize: 11, height: 24 }} />
                     <Button variant="outlined" size="small" sx={{ py: 0.5, px: 2, fontSize: 11, borderColor: 'divider', color: 'text.secondary' }}>Chat</Button>
                  </Box>
                </ListItem>
              ))}
            </List>
          </Card>
        </Grid>

        {/* --- ROW 4: Active Projects, Proposals, Contracts Tabs --- */}
        <Grid item xs={12}>
          <Card sx={{ p: 3 }}>
            {/* Tabs Navigation */}
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
                      <Chip label="4" size="small" sx={{ height: 20, fontSize: "0.75rem", ml: 1 }} />
                    </Box>
                  }
                />
                <Tab 
                  label={
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <DescriptionIcon fontSize="small" />
                      Proposals
                      <Chip label="4" size="small" sx={{ height: 20, fontSize: "0.75rem", ml: 1 }} />
                    </Box>
                  }
                />
                <Tab 
                  label={
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <CheckCircleOutlineIcon fontSize="small" />
                      Contracts
                      <Chip label="4" size="small" sx={{ height: 20, fontSize: "0.75rem", ml: 1 }} />
                    </Box>
                  }
                />
              </Tabs>
            </Box>

            {/* Tab Content: My Projects */}
            {activeTab === 0 && (
              <Box>
                <Grid container spacing={2}>
                  {activeProjects.map((project) => (
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
                          <Avatar sx={{ bgcolor: `${project.color}20`, color: project.color, width: 36, height: 36 }}>
                            <Box sx={{ width: 10, height: 10, bgcolor: "currentColor", borderRadius: "50%" }} />
                          </Avatar>
                          <IconButton size="small"><MoreHorizIcon fontSize="small" /></IconButton>
                        </Box>
                        <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 0.5 }}>
                          {project.title}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" sx={{ mb: 1.5, display: "block" }}>
                          {project.client}
                        </Typography>
                        <Box sx={{ mb: 1.5 }}>
                          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
                            <Typography variant="caption" fontWeight={600}>
                              Progress
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {project.progress}%
                            </Typography>
                          </Box>
                          <LinearProgress
                            variant="determinate"
                            value={project.progress}
                            sx={{
                              height: 6,
                              borderRadius: 3,
                              bgcolor: "#e5e7eb",
                              "& .MuiLinearProgress-bar": { bgcolor: project.color },
                            }}
                          />
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, color: "text.secondary" }}>
                          <AccessTimeIcon fontSize="small" sx={{ fontSize: 14 }} />
                          <Typography variant="caption">{project.time} remaining</Typography>
                        </Box>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}

            {/* Tab Content: Proposals */}
            {activeTab === 1 && (
              <Box>
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
                            <Avatar src={proposal.clientImg} sx={{ width: 48, height: 48 }} />
                          </ListItemAvatar>
                          <ListItemText
                            primary={
                              <Box>
                                <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 0.5 }}>
                                  {proposal.title}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                  {proposal.client} • Submitted {proposal.submittedDate}
                                </Typography>
                              </Box>
                            }
                            secondary={
                              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
                                <Chip label={proposal.budget} size="small" variant="outlined" />
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
                            <Button
                              endIcon={<OpenInNewIcon fontSize="small" />}
                              size="small"
                              sx={{ textTransform: "none", color: "#3b82f6" }}
                            >
                              View
                            </Button>
                          </Box>
                        </ListItem>
                        {index < proposals.length - 1 && <Divider sx={{ my: 1 }} />}
                      </React.Fragment>
                    );
                  })}
                </List>
              </Box>
            )}

            {/* Tab Content: Contracts */}
            {activeTab === 2 && (
              <Box>
                <TableContainer>
                  <Table sx={{ minWidth: 600 }}>
                    <TableHead>
                      <TableRow sx={{ bgcolor: "#f9fafb" }}>
                        <TableCell sx={{ fontWeight: 700, color: "text.secondary" }}>Contract</TableCell>
                        <TableCell sx={{ fontWeight: 700, color: "text.secondary" }}>Amount</TableCell>
                        <TableCell sx={{ fontWeight: 700, color: "text.secondary" }}>Status</TableCell>
                        <TableCell sx={{ fontWeight: 700, color: "text.secondary" }}>Progress</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 700, color: "text.secondary" }}>Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {contracts.map((contract) => {
                        const statusColor = getStatusColor(contract.status);
                        return (
                          <TableRow key={contract.id} sx={{ borderBottom: "1px solid #e5e7eb" }}>
                            <TableCell>
                              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                                <Avatar src={contract.clientImg} sx={{ width: 40, height: 40 }} />
                                <Box>
                                  <Typography variant="subtitle2" fontWeight={700}>
                                    {contract.title}
                                  </Typography>
                                  <Typography variant="caption" color="text.secondary">
                                    {contract.client}
                                  </Typography>
                                </Box>
                              </Box>
                            </TableCell>
                            <TableCell>
                              <Typography variant="subtitle2" fontWeight={700}>
                                {contract.amount}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                {contract.startDate} - {contract.endDate}
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
                            <TableCell>
                              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                <LinearProgress
                                  variant="determinate"
                                  value={contract.progress}
                                  sx={{
                                    width: 80,
                                    height: 6,
                                    borderRadius: 3,
                                    bgcolor: "#e5e7eb",
                                    "& .MuiLinearProgress-bar": {
                                      bgcolor: contract.progress === 100 ? "#10b981" : "#3b82f6",
                                    },
                                  }}
                                />
                                <Typography variant="caption" fontWeight={600} sx={{ minWidth: 30 }}>
                                  {contract.progress}%
                                </Typography>
                              </Box>
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
              </Box>
            )}
          </Card>
        </Grid>
      </Grid>
    </FreelancerLayout>
  );
}