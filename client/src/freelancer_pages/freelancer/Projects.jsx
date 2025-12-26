

import React, { useState, useEffect } from "react";
import {
  Typography,
  Box,
  Grid,
  Card,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Divider
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import axiosInstance from "../../utils/axiosInstance";
import FreelancerLayout from "../../freelancer_layouts/FreelancerLayout";

export default function FreelancerProjects() {
  const [jobs, setJobs] = useState([]);
  const [appliedProjectIds, setAppliedProjectIds] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [bidAmount, setBidAmount] = useState("");
  const [estimatedDays, setEstimatedDays] = useState("");
  const [coverLetter, setCoverLetter] = useState("");

  useEffect(() => {
    fetchJobs();
    fetchMyProposals();
  }, []);

  // ---------------- FETCH OPEN PROJECTS ----------------
  const fetchJobs = async () => {
    try {
      const res = await axiosInstance.get("/projects/");
      const openJobs = res.data.filter(
        p => p.status?.toLowerCase() === "open"
      );
      setJobs(openJobs);
    } catch (err) {
      console.error("Fetch jobs error:", err);
    }
  };

  // ---------------- FETCH MY PROPOSALS ----------------
  const fetchMyProposals = async () => {
    try {
      const res = await axiosInstance.get("/proposals/");
      const ids = res.data.map(p => p.project);
      setAppliedProjectIds(ids);
    } catch (err) {
      console.error("Fetch proposals error:", err);
    }
  };

  // ---------------- OPEN MODAL ----------------
  const openApplyModal = (job) => {
    if (!job || typeof job.id !== "number") {
      alert("Invalid project");
      return;
    }
    setSelectedJob(job);
    setBidAmount("");
    setEstimatedDays("");
    setCoverLetter("");
    setOpenModal(true);
  };

  // ---------------- SEND PROPOSAL ----------------
  const sendProposal = async () => {
    const payload = {
      project: selectedJob.id,
      bid_amount: Number(bidAmount),
      estimated_days: Number(estimatedDays),
      cover_letter: coverLetter
    };

    try {
      await axiosInstance.post("/proposals/", payload);
      alert("✅ Proposal sent");
      setOpenModal(false);
      fetchMyProposals(); // refresh applied list
    } catch (err) {
      console.error(err);
      alert(JSON.stringify(err.response?.data));
    }
  };

  return (
    <FreelancerLayout>
      <Box sx={{ p: 3 }}>
        <Typography variant="h5" fontWeight={700} mb={3}>
          Find New Work
        </Typography>

        <Grid container spacing={3}>
          {jobs.map(job => {
            const alreadyApplied = appliedProjectIds.includes(job.id);

            return (
              <Grid item xs={12} md={4} key={job.id}>
                <Card sx={{ p: 3 }}>
                  <Typography fontWeight={700}>{job.title}</Typography>
                  <Typography variant="body2">{job.description}</Typography>

                  <Divider sx={{ my: 2 }} />

                  <Typography color="success.main">
                    ${job.budget}
                  </Typography>

                  <Button
                    fullWidth
                    variant="contained"
                    endIcon={<SendIcon />}
                    disabled={alreadyApplied}
                    onClick={() => openApplyModal(job)}
                    sx={{ mt: 2 }}
                  >
                    {alreadyApplied ? "Already Applied" : "Apply"}
                  </Button>
                </Card>
              </Grid>
            );
          })}
        </Grid>

        {/* -------- APPLY MODAL -------- */}
        <Dialog open={openModal} onClose={() => setOpenModal(false)} fullWidth>
          <DialogTitle>Apply for {selectedJob?.title}</DialogTitle>
          <DialogContent>
            <TextField
              label="Bid Amount"
              fullWidth
              type="number"
              sx={{ mb: 2 }}
              value={bidAmount}
              onChange={(e) => setBidAmount(e.target.value)}
            />
            <TextField
              label="Estimated Days"
              fullWidth
              type="number"
              sx={{ mb: 2 }}
              value={estimatedDays}
              onChange={(e) => setEstimatedDays(e.target.value)}
            />
            <TextField
              label="Cover Letter"
              multiline
              rows={4}
              fullWidth
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenModal(false)}>Cancel</Button>
            <Button variant="contained" onClick={sendProposal}>
              Send Proposal
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </FreelancerLayout>
  );
}
