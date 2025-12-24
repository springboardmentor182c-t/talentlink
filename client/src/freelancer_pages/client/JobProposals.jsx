


import React, { useState, useEffect } from "react";
import { 
  Box, Typography, Paper, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, Button, Avatar 
} from "@mui/material";
import CreateContractModal from "../../components/Modals/CreateContractModal"; 
import axiosInstance from "../../utils/axiosInstance";
import "../../App.css";

export default function JobProposals() {
  const [proposals, setProposals] = useState([]);
  const [selectedProposal, setSelectedProposal] = useState(null);
  const [isContractModalOpen, setIsContractModalOpen] = useState(false);

  useEffect(() => {
    fetchProposals();
  }, []);

  // ✅ FIX #1: correct API for CLIENT
  const fetchProposals = () => {
    axiosInstance.get("/proposals/received/").then((res) => {
      setProposals(res.data);
    });
  };

  const handleHireClick = (proposal) => {
    setSelectedProposal(proposal);
    setIsContractModalOpen(true);
  };

  // ✅ KEEP your step-2 (local update)
  const handleContractSuccess = () => {
    if (selectedProposal) {
      setProposals((prev) =>
        prev.map((p) =>
          p.id === selectedProposal.id
            ? { ...p, status: "accepted" }   // 🔥 IMPORTANT
            : p
        )
      );
    }
  };

  return (
    <Box className="proposals-page-container" sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 700 }}>
        Review Proposals
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Freelancer</TableCell>
              <TableCell>Job Applied For</TableCell>
              <TableCell>Bid</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {proposals.map((prop) => {
              // ✅ FIX #2: backend sends "accepted"
              const isHired = prop.status?.toLowerCase() === "accepted";

              return (
                <TableRow key={prop.id}>
                  <TableCell>
                    <Avatar>{prop.freelancer_name?.[0]}</Avatar>
                    {prop.freelancer_name}
                  </TableCell>

                  <TableCell>{prop.job_title}</TableCell>

                  <TableCell>${prop.bid_amount}</TableCell>

                  <TableCell>
                    {isHired ? "Hired" : "Pending"}
                  </TableCell>

                  <TableCell>
                    <Button
                      variant="contained"
                      size="small"
                      disabled={isHired}
                      onClick={() => handleHireClick(prop)}
                    >
                      {isHired ? "Contract Created" : "Hire Freelancer"}
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <CreateContractModal
        open={isContractModalOpen}
        onClose={() => setIsContractModalOpen(false)}
        proposal={selectedProposal}
        onSuccess={handleContractSuccess}
      />
    </Box>
  );
}
