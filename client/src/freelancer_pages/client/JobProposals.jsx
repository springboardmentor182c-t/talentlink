


import React, { useState, useEffect, useMemo } from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Avatar,
  Stack,
  Link,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from "@mui/material";
import CreateContractModal from "../../components/Modals/CreateContractModal"; 
import axiosInstance from "../../utils/axiosInstance";
import "../../App.css";

export default function JobProposals() {
  const [proposals, setProposals] = useState([]);
  const [contractProposal, setContractProposal] = useState(null);
  const [detailProposal, setDetailProposal] = useState(null);
  const [isContractModalOpen, setIsContractModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    projectId: "all",
    freelancer: "all",
    status: "all",
  });

  useEffect(() => {
    fetchProposals();
  }, []);

  // ✅ FIX #1: correct API for CLIENT
  const fetchProposals = () => {
    axiosInstance
      .get("proposals/received/")
      .then((res) => {
        setProposals(res.data);
        setDetailProposal(res.data.length ? res.data[0] : null);
      })
      .catch((err) => {
        console.error("Error fetching proposals", err);
        setProposals([]);
        setDetailProposal(null);
      });
  };

  const handleHireClick = (proposal) => {
    setContractProposal(proposal);
    setIsContractModalOpen(true);
  };

  // ✅ KEEP your step-2 (local update)
  const handleContractSuccess = () => {
    if (contractProposal) {
      setProposals((prev) =>
        prev.map((p) =>
          p.id === contractProposal.id
            ? { ...p, status: "accepted" }   // 🔥 IMPORTANT
            : p
        )
      );
      setDetailProposal((prev) =>
        prev && prev.id === contractProposal.id ? { ...prev, status: "accepted" } : prev
      );
    }
  };

  const handleViewDetails = (proposal) => {
    setDetailProposal(proposal);
  };

  const formatINR = (value) => {
    if (value === null || value === undefined || value === "") return "₹0";
    const amount = Number(value);
    if (Number.isNaN(amount)) {
      return `₹${value}`;
    }
    return `₹${amount.toLocaleString("en-IN")}`;
  };

  const buildFreelancerKey = (proposal) => {
    if (proposal?.freelancer && proposal.freelancer.id) {
      return `id:${proposal.freelancer.id}`;
    }
    if (proposal?.freelancer_email) {
      return `email:${proposal.freelancer_email.toLowerCase()}`;
    }
    return `name:${(proposal?.freelancer_name || "unknown").toLowerCase()}`;
  };

  const availableProjects = useMemo(() => {
    const map = new Map();
    proposals.forEach((prop) => {
      if (!prop.project_id) return;
      const key = String(prop.project_id);
      if (!map.has(key)) {
        map.set(key, prop.project_title || prop.job_title || `Project #${prop.project_id}`);
      }
    });
    return Array.from(map.entries()).map(([value, label]) => ({ value, label }));
  }, [proposals]);

  const availableFreelancers = useMemo(() => {
    const map = new Map();
    proposals.forEach((prop) => {
      const key = buildFreelancerKey(prop);
      if (!map.has(key)) {
        map.set(key, {
          value: key,
          label: prop.freelancer_name || "Unknown Freelancer",
        });
      }
    });
    return Array.from(map.values());
  }, [proposals]);

  const availableStatuses = useMemo(() => {
    const set = new Set();
    proposals.forEach((prop) => {
      if (prop.status) {
        set.add(prop.status.toLowerCase());
      }
    });
    return Array.from(set);
  }, [proposals]);

  const filteredProposals = useMemo(() => (
    proposals.filter((prop) => {
      const projectMatch =
        filters.projectId === "all" || String(prop.project_id) === filters.projectId;
      const freelancerMatch =
        filters.freelancer === "all" || buildFreelancerKey(prop) === filters.freelancer;
      const statusMatch =
        filters.status === "all" || (prop.status || "").toLowerCase() === filters.status;
      return projectMatch && freelancerMatch && statusMatch;
    })
  ), [proposals, filters]);

  const detailProposalId = detailProposal ? detailProposal.id : null;

  useEffect(() => {
    if (!filteredProposals.length) {
      setDetailProposal(null);
      return;
    }
    if (!detailProposalId || !filteredProposals.some((p) => p.id === detailProposalId)) {
      setDetailProposal(filteredProposals[0]);
    }
  }, [filteredProposals, detailProposalId]);

  const handleFilterChange = (key) => (event) => {
    const { value } = event.target;
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const formatStatusLabel = (status) => {
    if (!status) return "Pending";
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <Box className="proposals-page-container" sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 700 }}>
        Review Proposals
      </Typography>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Stack spacing={2} direction={{ xs: "column", md: "row" }}>
          <FormControl fullWidth size="small">
            <InputLabel id="project-filter-label">Project</InputLabel>
            <Select
              labelId="project-filter-label"
              value={filters.projectId}
              label="Project"
              onChange={handleFilterChange("projectId")}
            >
              <MenuItem value="all">All Projects</MenuItem>
              {availableProjects.map((project) => (
                <MenuItem key={project.value} value={project.value}>
                  {project.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth size="small">
            <InputLabel id="freelancer-filter-label">Freelancer</InputLabel>
            <Select
              labelId="freelancer-filter-label"
              value={filters.freelancer}
              label="Freelancer"
              onChange={handleFilterChange("freelancer")}
            >
              <MenuItem value="all">All Freelancers</MenuItem>
              {availableFreelancers.map((freelancer) => (
                <MenuItem key={freelancer.value} value={freelancer.value}>
                  {freelancer.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth size="small">
            <InputLabel id="status-filter-label">Status</InputLabel>
            <Select
              labelId="status-filter-label"
              value={filters.status}
              label="Status"
              onChange={handleFilterChange("status")}
            >
              <MenuItem value="all">All Statuses</MenuItem>
              {availableStatuses.map((status) => (
                <MenuItem key={status} value={status}>
                  {formatStatusLabel(status)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
      </Paper>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Freelancer</TableCell>
              <TableCell>Job Applied For</TableCell>
              <TableCell>Bid</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Details</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredProposals.map((prop) => {
              // ✅ FIX #2: backend sends "accepted"
              const isHired = prop.status?.toLowerCase() === "accepted";
              const isSelected = detailProposal?.id === prop.id;
              const statusLabel = isHired ? "Hired" : formatStatusLabel(prop.status);

              return (
                <TableRow key={prop.id} selected={isSelected} hover>
                  <TableCell>
                    <Stack direction="row" spacing={1.5} alignItems="center">
                      <Avatar>{prop.freelancer_name?.[0]}</Avatar>
                      <Box>
                        <Typography fontWeight={600}>{prop.freelancer_name}</Typography>
                        {prop.freelancer_email && (
                          <Typography variant="caption" color="text.secondary">
                            {prop.freelancer_email}
                          </Typography>
                        )}
                      </Box>
                    </Stack>
                  </TableCell>

                  <TableCell>{prop.project_title || prop.job_title || `Project #${prop.project_id}`}</TableCell>

                  <TableCell>{formatINR(prop.bid_amount)}</TableCell>

                  <TableCell>
                    {statusLabel}
                  </TableCell>

                  <TableCell>
                    <Button
                      variant="text"
                      size="small"
                      onClick={() => handleViewDetails(prop)}
                    >
                      View Details
                    </Button>
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
            {filteredProposals.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                  <Typography color="text.secondary">
                    No proposals match the selected filters.
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Paper sx={{ mt: 4, p: 3 }}>
        <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
          Proposal Details
        </Typography>
        {detailProposal ? (
          <Box>
            <Stack spacing={2}>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Project
                </Typography>
                <Typography fontWeight={600}>
                  {detailProposal.project_title || `Project #${detailProposal.project_id}`}
                </Typography>
              </Box>

              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Bid Amount
                </Typography>
                <Typography>{formatINR(detailProposal.bid_amount)}</Typography>
              </Box>

              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Proposed Timeline
                </Typography>
                <Typography>{detailProposal.completion_time || "Not specified"}</Typography>
              </Box>

              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Cover Letter
                </Typography>
                <Typography sx={{ whiteSpace: "pre-wrap" }}>
                  {detailProposal.cover_letter || "No cover letter provided."}
                </Typography>
              </Box>

              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Attachments
                </Typography>
                {Array.isArray(detailProposal.attachments) && detailProposal.attachments.length ? (
                  <Stack spacing={1} mt={1}>
                    {detailProposal.attachments.map((attachment) => (
                      <Link
                        key={attachment.id}
                        href={attachment.file}
                        target="_blank"
                        rel="noopener noreferrer"
                        underline="hover"
                      >
                        Download file ({attachment.uploaded_at ? new Date(attachment.uploaded_at).toLocaleString() : ""})
                      </Link>
                    ))}
                  </Stack>
                ) : (
                  <Typography>No attachments uploaded.</Typography>
                )}
              </Box>

              <Divider />

              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Submitted On
                </Typography>
                <Typography>
                  {detailProposal.created_at ? new Date(detailProposal.created_at).toLocaleString() : "Unknown"}
                </Typography>
              </Box>
            </Stack>
          </Box>
        ) : (
          <Typography color="text.secondary">Select a proposal to view details.</Typography>
        )}
      </Paper>

      <CreateContractModal
        open={isContractModalOpen}
        onClose={() => setIsContractModalOpen(false)}
        proposal={contractProposal}
        onSuccess={handleContractSuccess}
      />
    </Box>
  );
}
