import React from "react";
import { Typography, Box, Card, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import FreelancerLayout from "../../freelancer_layouts/FreelancerLayout";

const expenses = [
  { id: 1, item: "Adobe Creative Cloud", date: "Nov 28, 2025", category: "Software", amount: "$54.99" },
  { id: 2, item: "Hosting Renewal", date: "Nov 15, 2025", category: "Infrastructure", amount: "$120.00" },
  { id: 3, item: "Upwork Fees", date: "Nov 10, 2025", category: "Platform Fee", amount: "$45.00" },
];

export default function Expenses() {
  return (
    <FreelancerLayout>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h5" fontWeight={700}>Expenses</Typography>
        <Button variant="contained" startIcon={<AddIcon />}>Add Expense</Button>
      </Box>

      <Card sx={{ p: 3 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: "text.secondary" }}>Item</TableCell>
                <TableCell sx={{ color: "text.secondary" }}>Date</TableCell>
                <TableCell sx={{ color: "text.secondary" }}>Category</TableCell>
                <TableCell align="right" sx={{ color: "text.secondary" }}>Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {expenses.map((row) => (
                <TableRow key={row.id}>
                  <TableCell fontWeight={500}>{row.item}</TableCell>
                  <TableCell color="text.secondary">{row.date}</TableCell>
                  <TableCell><Chip label={row.category} size="small" /></TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600, color: "error.main" }}>- {row.amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </FreelancerLayout>
  );
}