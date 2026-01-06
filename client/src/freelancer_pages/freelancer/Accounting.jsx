import React from "react";
import { 
  Grid, Card, Typography, Box, Button, Chip, 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
  Stack 
} from "@mui/material";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from "recharts";

// Icons
import DownloadIcon from "@mui/icons-material/Download";
import AddIcon from "@mui/icons-material/Add";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import FreelancerLayout from "../../freelancer_layouts/FreelancerLayout";

// --- Mock Data: Financial Stats ---
const stats = [
  { label: "Total Income", value: "₹45,200", change: "+12%", color: "#10b981", icon: <TrendingUpIcon /> },
  { label: "Total Expenses", value: "₹12,450", change: "-5%", color: "#ef4444", icon: <TrendingDownIcon /> },
  { label: "Net Profit", value: "₹32,750", change: "+8%", color: "#3b82f6", icon: <AccountBalanceWalletIcon /> },
  { label: "Pending Invoices", value: "₹4,200", change: "3 Inv", color: "#f59e0b", icon: <MoreVertIcon /> },
];

// --- Mock Data: Chart (Income vs Expense) ---
const chartData = [
  { month: "Jan", income: 4000, expense: 2400 },
  { month: "Feb", income: 3000, expense: 1398 },
  { month: "Mar", income: 2000, expense: 9800 },
  { month: "Apr", income: 2780, expense: 3908 },
  { month: "May", income: 1890, expense: 4800 },
  { month: "Jun", income: 2390, expense: 3800 },
  { month: "Jul", income: 3490, expense: 4300 },
];

// --- Mock Data: Transactions Table ---
const transactions = [
  { id: "#TRX-998", desc: "Website Development - Acme Corp", date: "Nov 28, 2025", type: "Income", amount: "+ ₹2,500.00", status: "Completed" },
  { id: "#TRX-999", desc: "Server Hosting (AWS)", date: "Nov 27, 2025", type: "Expense", amount: "- ₹120.00", status: "Completed" },
  { id: "#TRX-100", desc: "Logo Design - StartUp Inc", date: "Nov 25, 2025", type: "Income", amount: "+ ₹850.00", status: "Pending" },
  { id: "#TRX-101", desc: "Software License (Adobe)", date: "Nov 22, 2025", type: "Expense", amount: "- ₹55.00", status: "Completed" },
  { id: "#TRX-102", desc: "Mobile App UI - TechFlow", date: "Nov 20, 2025", type: "Income", amount: "+ ₹3,200.00", status: "Overdue" },
];

export default function Accounting() {
  return (
    <FreelancerLayout>
      
      {/* --- Page Header --- */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>Accounting & Finance</Typography>
          <Typography variant="body2" color="text.secondary">Track your earnings, expenses, and invoices.</Typography>
        </Box>
        <Stack direction="row" spacing={2}>
          <Button variant="outlined" startIcon={<DownloadIcon />}>Export Report</Button>
          <Button variant="contained" startIcon={<AddIcon />} sx={{ bgcolor: "#3b82f6" }}>Add Transaction</Button>
        </Stack>
      </Box>

      {/* --- Top Stats Cards --- */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{ p: 3, display: "flex", flexDirection: "column", gap: 1 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
                <Box sx={{ p: 1, borderRadius: 2, bgcolor: `${stat.color}15`, color: stat.color }}>
                  {stat.icon}
                </Box>
                <Chip 
                  label={stat.change} 
                  size="small" 
                  sx={{ bgcolor: stat.change.includes("+") ? "#ecfdf5" : "#fef2f2", color: stat.change.includes("+") ? "#10b981" : "#ef4444", fontWeight: 700 }} 
                />
              </Box>
              <Box sx={{ mt: 1 }}>
                <Typography variant="h4" sx={{ fontWeight: 700 }}>{stat.value}</Typography>
                <Typography variant="body2" color="text.secondary">{stat.label}</Typography>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* --- Main Content Row --- */}
      <Grid container spacing={3}>
        
        {/* LEFT: Cash Flow Chart */}
        <Grid item xs={12} md={7}>
          <Card sx={{ p: 3, height: "100%" }}>
            <Box sx={{ mb: 3, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>Cash Flow Analysis</Typography>
              <select style={{ padding: "6px", borderRadius: "6px", border: "1px solid #e2e8f0", color: "#64748b" }}>
                <option>This Year</option>
                <option>Last Year</option>
              </select>
            </Box>
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
                <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: 8, border: "none", boxShadow: "0px 4px 12px rgba(0,0,0,0.1)" }} />
                <Legend iconType="circle" />
                <Bar dataKey="income" name="Income" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={20} />
                <Bar dataKey="expense" name="Expense" fill="#94a3b8" radius={[4, 4, 0, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Grid>

        {/* RIGHT: Recent Transactions */}
        <Grid item xs={12} md={5}>
          <Card sx={{ p: 3, height: "100%" }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>Recent Transactions</Typography>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ color: "text.secondary" }}>Description</TableCell>
                    <TableCell align="right" sx={{ color: "text.secondary" }}>Amount</TableCell>
                    <TableCell align="right" sx={{ color: "text.secondary" }}>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {transactions.map((row) => (
                    <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell component="th" scope="row">
                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>{row.desc}</Typography>
                          <Typography variant="caption" color="text.secondary">{row.date}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell align="right">
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            fontWeight: 600, 
                            color: row.type === "Income" ? "success.main" : "error.main" 
                          }}
                        >
                          {row.amount}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Chip 
                          label={row.status} 
                          size="small" 
                          sx={{ 
                            height: 24, fontSize: 11, fontWeight: 600,
                            bgcolor: row.status === "Completed" ? "#ecfdf5" : row.status === "Pending" ? "#fff7ed" : "#fef2f2",
                            color: row.status === "Completed" ? "#10b981" : row.status === "Pending" ? "#f59e0b" : "#ef4444"
                          }} 
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Button fullWidth sx={{ mt: 2, color: "text.secondary" }}>View All Transactions</Button>
          </Card>
        </Grid>

      </Grid>
    </FreelancerLayout>
  );
}