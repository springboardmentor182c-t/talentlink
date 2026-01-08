import React, { useEffect, useState, useRef } from "react";
import { 
  Grid, Card, Typography, Box, Button, Chip, 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
  Stack, Autocomplete, TextField 
} from "@mui/material";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from "recharts";

import financeService from '../../services/financeService';
import axiosInstance from '../../utils/axiosInstance';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

// Icons
import DownloadIcon from "@mui/icons-material/Download";
import AddIcon from "@mui/icons-material/Add";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import MoreVertIcon from "@mui/icons-material/MoreVert";

 

// placeholders until API responds
const DEFAULT_STATS = { total_income: '₹0.00', total_expenses: '₹0.00', net_profit: '₹0.00', pending_invoices: '0' };
const DEFAULT_CHART = [];


export default function Accounting() {
  const [stats, setStats] = useState(DEFAULT_STATS);
  const [chartData, setChartData] = useState(DEFAULT_CHART);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        const s = await financeService.getFreelancerOverview().catch(() => null);
        const tx = await financeService.getFreelancerTransactions().catch(() => null);
        const ch = s?.chart || null;
        if (!mounted) return;
        if (s) setStats(s);
        if (tx) setTransactions(tx);
        if (ch) setChartData(ch);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    return () => { mounted = false; };
  }, []);

  const handleRequestPayout = async () => {
    const amount = prompt('Enter payout amount');
    if (!amount) return;
    try {
      await financeService.requestPayout(amount);
      alert('Payout requested');
    } catch (e) {
      console.error(e);
      alert('Payout request failed');
    }
  };

  const [txDialogOpen, setTxDialogOpen] = React.useState(false);
  const [txForm, setTxForm] = React.useState({ client: '', amount: '', description: '' });
  const [clientOptions, setClientOptions] = useState([]);
  const [clientInputValue, setClientInputValue] = useState('');
  const clientSearchTimeout = useRef(null);

  const openTxDialog = () => setTxDialogOpen(true);
  const closeTxDialog = () => setTxDialogOpen(false);

  const submitTxRequest = async () => {
    if (!txForm.client || !txForm.amount) return alert('Client and amount required');
    try {
      await financeService.createFreelancerTransaction({ client: txForm.client, amount: txForm.amount, description: txForm.description });
      alert('Transaction request created');
      // reload transactions
      const tx = await financeService.getFreelancerTransactions().catch(() => null);
      if (tx) setTransactions(tx);
      closeTxDialog();
    } catch (e) {
      console.error(e);
      alert('Failed to create transaction');
    }
  };

  return (
    <>
      {/* --- Page Header --- */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>Accounting & Finance</Typography>
          <Typography variant="body2" color="text.secondary">Track your earnings, expenses, and invoices.</Typography>
        </Box>
        <Stack direction="row" spacing={2}>
          <Button variant="outlined" startIcon={<DownloadIcon />}>Export Report</Button>
          <Button variant="contained" startIcon={<AddIcon />} sx={{ bgcolor: "#3b82f6" }} onClick={openTxDialog}>Add Transaction</Button>
        </Stack>
      </Box>

      {/* --- Top Stats Cards --- */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {(Array.isArray(stats) ? stats : [
          { label: 'Total Income', value: stats.total_income || '—', change: '+', color: '#10b981', icon: <TrendingUpIcon /> },
          { label: 'Total Expenses', value: stats.total_expenses || '—', change: '-', color: '#ef4444', icon: <TrendingDownIcon /> },
          { label: 'Net Profit', value: stats.net_profit || '—', change: '+', color: '#3b82f6', icon: <AccountBalanceWalletIcon /> },
          { label: 'Pending Invoices', value: stats.pending_invoices || '0', change: '—', color: '#f59e0b', icon: <MoreVertIcon /> },
        ]).map((stat, index) => (
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

      <Dialog open={txDialogOpen} onClose={closeTxDialog}>
        <DialogTitle>Create Transaction Request</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 400 }}>
            <Autocomplete
              freeSolo
              options={clientOptions}
              getOptionLabel={(opt) => opt?.email || ''}
              inputValue={clientInputValue}
              onInputChange={(_e, newInput) => {
                setClientInputValue(newInput);
                if (clientSearchTimeout.current) clearTimeout(clientSearchTimeout.current);
                if (!newInput || newInput.length < 2) return setClientOptions([]);
                clientSearchTimeout.current = setTimeout(async () => {
                  try {
                    const res = await axiosInstance.get(`users/search/?q=${encodeURIComponent(newInput)}`);
                    setClientOptions(res.data || []);
                  } catch (err) {
                    console.error('user search', err);
                    setClientOptions([]);
                  }
                }, 300);
              }}
              onChange={(_e, value) => {
                if (value && value.id) setTxForm({...txForm, client: value.id});
                else setTxForm({...txForm, client: ''});
              }}
              renderInput={(params) => <TextField {...params} label="Client (email)" required />}
            />
            <TextField label="Amount" value={txForm.amount} onChange={(e) => setTxForm({...txForm, amount: e.target.value})} required />
            <TextField label="Description" value={txForm.description} onChange={(e) => setTxForm({...txForm, description: e.target.value})} />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeTxDialog}>Cancel</Button>
          <Button variant="contained" onClick={submitTxRequest}>Send Request</Button>
        </DialogActions>
      </Dialog>

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
    </>
  );
}