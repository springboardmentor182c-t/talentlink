import React, { useState, useEffect } from "react";
import { 
  Box, Typography, Paper, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, Button, Avatar 
} from "@mui/material";
import CreateContractModal from "../../components/Modals/CreateContractModal"; // Import Step 1
import axiosInstance from "../../utils/axiosInstance";

export default function JobProposals() {
  const [proposals, setProposals] = useState([]);
  const [selectedProposal, setSelectedProposal] = useState(null);
  const [isContractModalOpen, setIsContractModalOpen] = useState(false);

  useEffect(() => {
    // Fetch all proposals sent to this client
    axiosInstance.get("/proposals/received/").then((res) => {
      setProposals(res.data);
    });
  }, []);

  // Handler for the "Hire" button
  const handleHireClick = (proposal) => {
    setSelectedProposal(proposal);
    setIsContractModalOpen(true);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 700 }}>
        Review Proposals
      </Typography>

      <TableContainer component={Paper} sx={{ boxShadow: "none", border: "1px solid #e0e0e0" }}>
        <Table>
          <TableHead sx={{ bgcolor: "#f8fafc" }}>
            <TableRow>
              <TableCell>Freelancer</TableCell>
              <TableCell>Job Applied For</TableCell>
              <TableCell>Bid</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {proposals.map((prop) => (
              <TableRow key={prop.id}>
                <TableCell sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Avatar>{prop.freelancer_name[0]}</Avatar>
                  {prop.freelancer_name}
                </TableCell>
                <TableCell>{prop.job_title}</TableCell>
                <TableCell sx={{ color: "green", fontWeight: "bold" }}>
                  ${prop.bid_amount}
                </TableCell>
                <TableCell>
                  {/* The Hire Button */}
                  <Button 
                    variant="contained" 
                    size="small" 
                    onClick={() => handleHireClick(prop)}
                  >
                    Hire / Create Contract
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* RENDER THE MODAL FROM STEP 1 */}
      <CreateContractModal 
        open={isContractModalOpen} 
        onClose={() => setIsContractModalOpen(false)} 
        proposal={selectedProposal}
        onSuccess={() => {
             // Optional: Refresh list to remove the hired proposal
             console.log("Contract created successfully");
        }}
      />
    </Box>
  );
}