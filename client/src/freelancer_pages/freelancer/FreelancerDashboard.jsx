

import React, { useState } from "react"; // 1. Import useState
import { Grid, Card, Typography, Box, Chip, Button, Avatar, List, ListItem, ListItemAvatar, ListItemText, IconButton, Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';

import FreelancerLayout from "../../freelancer_layouts/FreelancerLayout";
import { useUser } from "../../context/UserContext";

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
  { id: 1, title: "Creative Corner", subtitle: "1 Member | 2 Tasks", time: "8 Days", color: "#10b981" },
  { id: 2, title: "Masendro Illustration", subtitle: "3 Members | 14 Tasks", time: "8 Days", color: "#3b82f6" },
  { id: 3, title: "Space Template", subtitle: "2 Members | 24 Tasks", time: "8 Days", color: "#8b5cf6" },
  { id: 4, title: "Milana Illustration", subtitle: "3 Members | 14 Tasks", time: "8 Days", color: "#eab308" },
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
  const { user } = useUser();

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

  return (
    <FreelancerLayout>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5">{`Hi ${user?.name || "User"}`}</Typography>
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
      </Grid>
    </FreelancerLayout>
  );
}