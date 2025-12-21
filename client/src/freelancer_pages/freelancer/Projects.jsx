// import React, { useState } from "react";
// import { 
//   Typography, Box, Grid, Card, LinearProgress, Chip, Avatar, Button, Tab, Tabs, 
//   Dialog, DialogTitle, DialogContent, DialogActions, TextField, Divider 
// } from "@mui/material";
// import SendIcon from "@mui/icons-material/Send";
// import WorkIcon from "@mui/icons-material/Work"; // Icon for My Projects
// import SearchIcon from "@mui/icons-material/Search"; // Icon for Find Work

// import { useProjects } from "../../context/ProjectContext";
// import FreelancerLayout from "../../freelancer_layouts/FreelancerLayout"; 

// export default function Projects() {
//   const { projects } = useProjects(); 
  
//   // MAIN TOGGLE: 0 = My Projects, 1 = Find Work
//   const [mainTab, setMainTab] = useState(0); 

//   // Modal State
//   const [openProposalModal, setOpenProposalModal] = useState(false);
//   const [selectedJob, setSelectedJob] = useState(null);

//   // --- MARKETPLACE MOCK DATA ---
//   const marketJobs = [
//     { id: 101, title: "E-Commerce React App", budget: "$1,200", client: "TechCorp Inc.", description: "Need a full stack developer for a shopify clone." },
//     { id: 102, title: "Logo Design", budget: "$300", client: "Creative Studio", description: "Minimalist logo for a new coffee brand." },
//     { id: 103, title: "Python Automation Script", budget: "$500", client: "DataFlow", description: "Script to scrape data from 3 websites daily." },
//   ];

//   const handleOpenProposal = (job) => {
//     setSelectedJob(job);
//     setOpenProposalModal(true);
//   };

//   return (
//     <FreelancerLayout>
//       <Box sx={{ p: 3 }}>
        
//         {/* --- MAIN PAGE TABS --- */}
//         <Box sx={{ mb: 4 }}>
//           <Typography variant="h5" fontWeight={700} sx={{ mb: 2 }}>Projects & Jobs</Typography>
//           <Tabs 
//             value={mainTab} 
//             onChange={(e, val) => setMainTab(val)}
//             sx={{ borderBottom: 1, borderColor: 'divider' }}
//           >
//             <Tab label="My Active Projects" icon={<WorkIcon />} iconPosition="start" />
//             <Tab label="Find New Work" icon={<SearchIcon />} iconPosition="start" />
//           </Tabs>
//         </Box>

//         {/* =========================================================
//             VIEW 1: MY ACTIVE PROJECTS
//            ========================================================= */}
//         {mainTab === 0 && (
//           <Box>
//             {projects.length === 0 ? (
//                <Box sx={{ textAlign: "center", py: 8, border: "2px dashed #e2e8f0", borderRadius: 4 }}>
//                   <Typography variant="h6" color="text.secondary">No active projects</Typography>
//                </Box>
//             ) : (
//               <Grid container spacing={3}>
//                   {projects.map((p) => (
//                   <Grid item xs={12} md={4} key={p.id}>
//                       <Card sx={{ p: 3, borderRadius: 3, boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
//                         <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
//                             <Chip label={p.status} size="small" color={p.status === "Completed" ? "success" : "primary"} />
//                         </Box>
//                         <Typography variant="h6" fontWeight={700}>{p.title}</Typography>
//                         <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>{p.client}</Typography>
                        
//                         <Typography variant="caption" fontWeight={600}>Progress</Typography>
//                         <LinearProgress variant="determinate" value={p.progress || 0} sx={{ height: 6, borderRadius: 3, mt: 0.5, mb: 2 }} />
//                       </Card>
//                   </Grid>
//                   ))}
//               </Grid>
//             )}
//           </Box>
//         )}

//         {/* =========================================================
//             VIEW 2: MARKETPLACE (Find Work)
//            ========================================================= */}
//         {mainTab === 1 && (
//            <Grid container spacing={3}>
//              {marketJobs.map((job) => (
//                <Grid item xs={12} md={6} lg={4} key={job.id}>
//                  <Card sx={{ p: 3, borderRadius: 3, height: "100%", display: "flex", flexDirection: "column", border: "1px solid #eee" }}>
//                     <Typography variant="h6" fontWeight={700}>{job.title}</Typography>
//                     <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>{job.client}</Typography>
//                     <Divider sx={{ my: 1 }} />
//                     <Typography variant="body2" sx={{ mb: 3, flexGrow: 1, mt: 1 }}>{job.description}</Typography>
                    
//                     <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 'auto' }}>
//                        <Typography variant="subtitle1" fontWeight={700} color="success.main">{job.budget}</Typography>
//                        <Button variant="contained" endIcon={<SendIcon />} onClick={() => handleOpenProposal(job)}>
//                          Apply Now
//                        </Button>
//                     </Box>
//                  </Card>
//                </Grid>
//              ))}
//            </Grid>
//         )}

//         {/* --- PROPOSAL MODAL --- */}
//         <Dialog open={openProposalModal} onClose={() => setOpenProposalModal(false)} maxWidth="sm" fullWidth>
//           <DialogTitle>Apply for {selectedJob?.title}</DialogTitle>
//           <DialogContent>
//              <TextField autoFocus margin="dense" label="Cover Letter" fullWidth multiline rows={4} sx={{ mb: 2 }} />
//              <TextField margin="dense" label="Bid Amount ($)" type="number" fullWidth defaultValue={selectedJob?.budget.replace('$', '')} />
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={() => setOpenProposalModal(false)}>Cancel</Button>
//             <Button variant="contained" onClick={() => setOpenProposalModal(false)}>Send Proposal</Button>
//           </DialogActions>
//         </Dialog>

//       </Box>
//     </FreelancerLayout>
//   );
// }






// import React, { useState, useEffect } from "react";
// import { 
//   Typography, Box, Grid, Card, LinearProgress, Chip, Button, Tab, Tabs, 
//   Dialog, DialogTitle, DialogContent, DialogActions, TextField, Divider 
// } from "@mui/material";
// import SendIcon from "@mui/icons-material/Send";
// import WorkIcon from "@mui/icons-material/Work"; 
// import SearchIcon from "@mui/icons-material/Search"; 
// import axios from "axios"; 

// import { useProjects } from "../../context/ProjectContext";
// import FreelancerLayout from "../../freelancer_layouts/FreelancerLayout"; 

// export default function Projects() {
//   const { projects } = useProjects(); // Still used for "My Active Projects" (Context data)
  
//   // MAIN TOGGLE: 0 = My Projects, 1 = Find Work
//   const [mainTab, setMainTab] = useState(0); 

//   // Modal State
//   const [openProposalModal, setOpenProposalModal] = useState(false);
//   const [selectedJob, setSelectedJob] = useState(null);

//   // State for "Find New Work" Data
//   const [availableJobs, setAvailableJobs] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // Fetch Data from Django when component loads
//   useEffect(() => {
//     fetchAvailableJobs();
//   }, []);

//   const fetchAvailableJobs = async () => {
//     try {
//       setLoading(true);
//       // ✅ UPDATED URL HERE based on your request
//       const response = await axios.get("http://127.0.0.1:8000/api/v1/projects/");
      
//       console.log("All Fetched Jobs:", response.data); // Debugging: check console to see what arrives

//       // Filter: Only show jobs that are 'Open'.
//       // Note: We also filter out jobs where the current user is already the freelancer
//       // (Assuming your API returns a 'freelancer' field that is null for open jobs)
//       const openJobs = response.data.filter(job => {
//           const status = job.status ? job.status.toLowerCase() : "";
//           const isUnassigned = job.freelancer === null; 
//           return (status === "open" || status === "pending") && isUnassigned;
//       });
      
//       setAvailableJobs(openJobs);
//     } catch (error) {
//       console.error("Error fetching jobs:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleOpenProposal = (job) => {
//     setSelectedJob(job);
//     setOpenProposalModal(true);
//   };

//   const handleSendProposal = () => {
//     // ⚠️ NOTE: You usually need a separate endpoint to send a proposal (e.g. /api/v1/proposals/)
//     // The URL you gave (POST /api/v1/projects/) is typically for creating NEW projects.
//     console.log("Sending proposal for:", selectedJob.id);
//     setOpenProposalModal(false);
//   };

//   return (
//     <FreelancerLayout>
//       <Box sx={{ p: 3 }}>
        
//         {/* --- MAIN PAGE TABS --- */}
//         <Box sx={{ mb: 4 }}>
//           <Typography variant="h5" fontWeight={700} sx={{ mb: 2 }}>Projects & Jobs</Typography>
//           <Tabs 
//             value={mainTab} 
//             onChange={(e, val) => setMainTab(val)}
//             sx={{ borderBottom: 1, borderColor: 'divider' }}
//           >
//             <Tab label="My Active Projects" icon={<WorkIcon />} iconPosition="start" />
//             <Tab label="Find New Work" icon={<SearchIcon />} iconPosition="start" />
//           </Tabs>
//         </Box>

//         {/* =========================================================
//             VIEW 1: MY ACTIVE PROJECTS (With new "Send Proposal" Button)
//            ========================================================= */}
//         {mainTab === 0 && (
//           <Box>
//             {projects.length === 0 ? (
//                <Box sx={{ textAlign: "center", py: 8, border: "2px dashed #e2e8f0", borderRadius: 4 }}>
//                   <Typography variant="h6" color="text.secondary">No active projects</Typography>
//                </Box>
//             ) : (
//               <Grid container spacing={3}>
//                   {projects.map((p) => (
//                   <Grid item xs={12} md={4} key={p.id}>
//                       <Card sx={{ p: 3, borderRadius: 3, boxShadow: "0 2px 10px rgba(0,0,0,0.05)", display: 'flex', flexDirection: 'column', height: '100%' }}>
//                         <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
//                             <Chip label={p.status} size="small" color={p.status === "Completed" ? "success" : "primary"} />
//                         </Box>
//                         <Typography variant="h6" fontWeight={700}>{p.title}</Typography>
//                         <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
//                             {/* Handling client name safely */}
//                             {typeof p.client === 'object' ? p.client.username : p.client}
//                         </Typography>
                        
//                         <Typography variant="caption" fontWeight={600}>Progress</Typography>
//                         <LinearProgress variant="determinate" value={p.progress || 0} sx={{ height: 6, borderRadius: 3, mt: 0.5, mb: 2 }} />

//                         {/* --- NEW BUTTON ADDED HERE --- */}
//                         <Box sx={{ mt: 'auto', pt: 2 }}>
//                            <Button 
//                               variant="contained" 
//                               fullWidth 
//                               endIcon={<SendIcon />} 
//                               onClick={() => handleOpenProposal(p)}
//                            >
//                               Send Proposal
//                            </Button>
//                         </Box>
                        
//                       </Card>
//                   </Grid>
//                   ))}
//               </Grid>
//             )}
//           </Box>
//         )}

//         {/* =========================================================
//             VIEW 2: MARKETPLACE (Find New Work - From API)
//            ========================================================= */}
//         {mainTab === 1 && (
//            <Grid container spacing={3}>
//              {loading ? (
//                 <Typography sx={{ p: 3 }}>Loading jobs...</Typography>
//              ) : availableJobs.length === 0 ? (
//                 <Box sx={{ p: 3, width: '100%' }}>
//                     <Typography variant="h6" color="text.secondary">No new jobs found right now.</Typography>
//                     <Typography variant="caption" color="text.secondary">
//                         (Check that your Django DB has jobs with status="Open" and freelancer=null)
//                     </Typography>
//                     <br/>
//                     <Button onClick={fetchAvailableJobs} sx={{ mt: 2 }} variant="outlined">Refresh List</Button>
//                 </Box>
//              ) : (
//                 availableJobs.map((job) => (
//                   <Grid item xs={12} md={6} lg={4} key={job.id}>
//                     <Card sx={{ p: 3, borderRadius: 3, height: "100%", display: "flex", flexDirection: "column", border: "1px solid #eee" }}>
//                        <Typography variant="h6" fontWeight={700}>{job.title}</Typography>
                       
//                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
//                            Client: {job.client_name || "Unknown"}
//                        </Typography>
                       
//                        <Divider sx={{ my: 1 }} />
//                        <Typography variant="body2" sx={{ mb: 3, flexGrow: 1, mt: 1 }}>
//                            {job.description}
//                        </Typography>
                       
//                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 'auto' }}>
//                           <Typography variant="subtitle1" fontWeight={700} color="success.main">
//                               ${job.budget}
//                           </Typography>
//                           <Button variant="contained" endIcon={<SendIcon />} onClick={() => handleOpenProposal(job)}>
//                             Apply Now
//                           </Button>
//                        </Box>
//                     </Card>
//                   </Grid>
//                 ))
//              )}
//            </Grid>
//         )}

//         {/* --- PROPOSAL MODAL --- */}
//         <Dialog open={openProposalModal} onClose={() => setOpenProposalModal(false)} maxWidth="sm" fullWidth>
//           <DialogTitle>Apply for {selectedJob?.title}</DialogTitle>
//           <DialogContent>
//              <TextField autoFocus margin="dense" label="Cover Letter" fullWidth multiline rows={4} sx={{ mb: 2 }} />
//              <TextField margin="dense" label="Bid Amount ($)" type="number" fullWidth defaultValue={selectedJob?.budget} />
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={() => setOpenProposalModal(false)}>Cancel</Button>
//             <Button variant="contained" onClick={handleSendProposal}>Send Proposal</Button>
//           </DialogActions>
//         </Dialog>

//       </Box>
//     </FreelancerLayout>
//   );
// }


import React, { useState, useEffect } from "react";
import { 
  Typography, Box, Grid, Card, LinearProgress, Chip, Button, Tab, Tabs, 
  Dialog, DialogTitle, DialogContent, DialogActions, TextField, Divider, Alert 
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import WorkIcon from "@mui/icons-material/Work"; 
import SearchIcon from "@mui/icons-material/Search"; 
import axiosInstance from "../../utils/axiosInstance"; 

import { useProjects } from "../../context/ProjectContext";
import FreelancerLayout from "../../freelancer_layouts/FreelancerLayout"; 

export default function FreelancerProjects() {
  const { projects } = useProjects(); // "My Active Projects" from Context
  const [mainTab, setMainTab] = useState(0); 

  // --- MODAL STATE ---
  const [openProposalModal, setOpenProposalModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [bidAmount, setBidAmount] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [isSending, setIsSending] = useState(false); 

  // --- MARKETPLACE DATA ---
  const [availableJobs, setAvailableJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  // 1. Fetch "Find New Work" Jobs
  useEffect(() => {
    fetchAvailableJobs();
  }, []);

  const fetchAvailableJobs = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/projects/"); 
      
      // Filter: Only show jobs that are 'Open' AND have NO freelancer assigned
      const openJobs = response.data.filter(job => {
          const status = job.status ? job.status.toLowerCase() : "";
          const isUnassigned = job.freelancer === null; 
          return (status === "open" || status === "pending") && isUnassigned;
      });
      
      setAvailableJobs(openJobs);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  // 2. Open Modal Logic
  const handleOpenProposal = (job) => {
    setSelectedJob(job);
    setBidAmount(job.budget || ""); // Pre-fill budget if available
    setCoverLetter(""); 
    setOpenProposalModal(true);
  };

  // 3. SEND PROPOSAL LOGIC
  const handleSendProposal = async () => {
    if (!coverLetter || !bidAmount) {
        alert("Please fill in all fields");
        return;
    }

    try {
        setIsSending(true);
        
        const payload = {
            project: selectedJob.id,
            bid_amount: bidAmount,
            cover_letter: coverLetter,
        };

        // POST request to save to database
        await axiosInstance.post("/proposals/", payload);

        alert("Success! Proposal sent to client.");
        setOpenProposalModal(false); 
    } catch (error) {
        console.error("Error sending proposal:", error);
        // Safely handle error messages
        const errMsg = error.response?.data?.detail || "Failed to send proposal.";
        alert(errMsg);
    } finally {
        setIsSending(false);
    }
  };

  return (
    <FreelancerLayout>
      <Box sx={{ p: 3 }}>
        
        {/* --- TABS --- */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" fontWeight={700} sx={{ mb: 2 }}>Projects & Jobs</Typography>
          <Tabs 
            value={mainTab} 
            onChange={(e, val) => setMainTab(val)}
            sx={{ borderBottom: 1, borderColor: 'divider' }}
          >
            <Tab label="My Active Projects" icon={<WorkIcon />} iconPosition="start" />
            <Tab label="Find New Work" icon={<SearchIcon />} iconPosition="start" />
          </Tabs>
        </Box>

        {/* --- VIEW 1: MY ACTIVE PROJECTS --- */}
        {mainTab === 0 && (
          <Box>
            {projects.length === 0 ? (
               <Box sx={{ textAlign: "center", py: 8, border: "2px dashed #e2e8f0", borderRadius: 4 }}>
                  <Typography variant="h6" color="text.secondary">No active projects</Typography>
               </Box>
            ) : (
              <Grid container spacing={3}>
                  {projects.map((p) => (
                  <Grid item xs={12} md={4} key={p.id}>
                      <Card sx={{ p: 3, borderRadius: 3, boxShadow: "0 2px 10px rgba(0,0,0,0.05)", height: '100%', display:'flex', flexDirection:'column' }}>
                        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                            <Chip label={p.status || "Active"} size="small" color="primary" />
                        </Box>
                        <Typography variant="h6" fontWeight={700}>{p.title}</Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                            Client: {typeof p.client === 'object' ? p.client.username : p.client}
                        </Typography>
                        
                        <Typography variant="caption" fontWeight={600}>Progress</Typography>
                        <LinearProgress variant="determinate" value={p.progress || 0} sx={{ height: 6, borderRadius: 3, mt: 0.5, mb: 2 }} />
                        
                        {/* RESTORED BUTTON HERE */}
                        <Box sx={{ mt: 'auto', pt: 2 }}>
                           <Button 
                              variant="contained" 
                              fullWidth 
                              endIcon={<SendIcon />} 
                              onClick={() => handleOpenProposal(p)}
                           >
                              Send Proposal
                           </Button>
                        </Box>
                        
                      </Card>
                  </Grid>
                  ))}
              </Grid>
            )}
          </Box>
        )}
        
        {/* --- VIEW 2: MARKETPLACE (Find New Work) --- */}
        {mainTab === 1 && (
           <Grid container spacing={3}>
             {loading ? (
                <Typography sx={{ p: 3 }}>Loading open jobs...</Typography>
             ) : availableJobs.length === 0 ? (
                <Box sx={{ p: 3 }}>
                    <Typography>No open jobs found.</Typography>
                    <Button onClick={fetchAvailableJobs} sx={{ mt: 1 }}>Refresh</Button>
                </Box>
             ) : (
                availableJobs.map((job) => (
                  <Grid item xs={12} md={6} lg={4} key={job.id}>
                    <Card sx={{ p: 3, borderRadius: 3, height: "100%", display: "flex", flexDirection: "column", border: "1px solid #eee" }}>
                       <Box sx={{display:'flex', justifyContent:'space-between', mb:1}}>
                           <Typography variant="h6" fontWeight={700}>{job.title}</Typography>
                           <Chip label="Open" size="small" color="success" variant="outlined"/>
                       </Box>
                       
                       <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                           Client: {job.client_name || "Unknown"}
                       </Typography>
                       
                       <Typography variant="body2" sx={{ mb: 3, flexGrow: 1 }}>
                           {job.description}
                       </Typography>
                       
                       <Divider sx={{ my: 2 }} />

                       <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 'auto' }}>
                          <Typography variant="subtitle1" fontWeight={700} color="success.main">
                              ${job.budget}
                          </Typography>
                          <Button 
                            variant="contained" 
                            endIcon={<SendIcon />} 
                            onClick={() => handleOpenProposal(job)}
                          >
                            Apply Now
                          </Button>
                       </Box>
                    </Card>
                  </Grid>
                ))
             )}
           </Grid>
        )}

        {/* --- INTERNAL APPLY MODAL --- */}
        <Dialog open={openProposalModal} onClose={() => setOpenProposalModal(false)} maxWidth="sm" fullWidth>
          <DialogTitle>Apply for {selectedJob?.title}</DialogTitle>
          <DialogContent>
             <Box sx={{ mt: 1 }}>
                 <TextField 
                    label="Bid Amount ($)" 
                    type="number" 
                    fullWidth 
                    value={bidAmount}
                    onChange={(e) => setBidAmount(e.target.value)}
                    sx={{ mb: 2 }}
                 />
                 <TextField 
                    label="Cover Letter" 
                    placeholder="Why are you a good fit?"
                    fullWidth 
                    multiline 
                    rows={4} 
                    value={coverLetter}
                    onChange={(e) => setCoverLetter(e.target.value)}
                 />
             </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenProposalModal(false)}>Cancel</Button>
            <Button 
                variant="contained" 
                onClick={handleSendProposal}
                disabled={isSending}
            >
                {isSending ? "Sending..." : "Send Proposal"}
            </Button>
          </DialogActions>
        </Dialog>

      </Box>
    </FreelancerLayout>
  );
}