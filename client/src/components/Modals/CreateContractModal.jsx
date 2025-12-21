// import React, { useState } from 'react';
// import { contractService } from '../../services/contractService';

// const CreateContractModal = ({ isOpen, onClose, proposal }) => {
//   const [formData, setFormData] = useState({
//     title: proposal?.projectTitle || '',
//     totalAmount: proposal?.bidAmount || 0,
//     deadline: '',
//     milestones: [{ id: 1, description: 'Initial Milestone', amount: 0 }]
//   });

//   if (!isOpen) return null;

//   // Helper to handle milestone updates
//   const updateMilestone = (index, field, value) => {
//     const newMilestones = [...formData.milestones];
//     newMilestones[index][field] = value;
//     setFormData({ ...formData, milestones: newMilestones });
//   };

//   const addMilestone = () => {
//     setFormData({
//       ...formData,
//       milestones: [...formData.milestones, { id: Date.now(), description: '', amount: 0 }]
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (!proposal?.id) {
//         alert("Error: Missing Proposal ID");
//         return;
//       }
//       // UPDATE: Passing proposal.id as the first argument to match backend URL structure
//       await contractService.createContract(proposal.id, formData);
//       alert('Contract created successfully!');
//       onClose();
//     } catch (err) { 
//       console.error(err);
//       alert('Failed to create contract. See console.');
//     }
//   };

//   return (
//     <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 }}>
//       <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '12px', width: '100%', maxWidth: '500px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}>
//         <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '16px' }}>Create Contract</h2>
        
//         <form onSubmit={handleSubmit}>
//           {/* Project Title (Read Only) */}
//           <div style={{ marginBottom: '12px' }}>
//             <label style={{ display: 'block', fontSize: '14px', marginBottom: '4px' }}>Project Title</label>
//             <input 
//               type="text" 
//               value={formData.title} 
//               readOnly 
//               style={{ width: '100%', border: '1px solid #ddd', padding: '8px', borderRadius: '6px', backgroundColor: '#f9fafb' }} 
//             />
//           </div>

//           {/* Total Budget */}
//           <div style={{ marginBottom: '12px' }}>
//             <label style={{ display: 'block', fontSize: '14px', marginBottom: '4px' }}>Total Budget ($)</label>
//             <input 
//               type="number" 
//               value={formData.totalAmount} 
//               onChange={(e) => setFormData({ ...formData, totalAmount: e.target.value })}
//               style={{ width: '100%', border: '1px solid #ddd', padding: '8px', borderRadius: '6px' }} 
//             />
//           </div>

//           {/* Deadline Input (Added) */}
//           <div style={{ marginBottom: '12px' }}>
//             <label style={{ display: 'block', fontSize: '14px', marginBottom: '4px' }}>Deadline</label>
//             <input 
//               type="date" 
//               value={formData.deadline} 
//               onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
//               style={{ width: '100%', border: '1px solid #ddd', padding: '8px', borderRadius: '6px' }} 
//               required
//             />
//           </div>

//           {/* Milestones */}
//           <div style={{ marginBottom: '16px' }}>
//             <label style={{ display: 'block', fontSize: '14px', marginBottom: '4px' }}>Milestones</label>
//             {formData.milestones.map((m, index) => (
//               <div key={m.id} style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
//                 <input 
//                   placeholder="Task description" 
//                   value={m.description}
//                   onChange={(e) => updateMilestone(index, 'description', e.target.value)}
//                   style={{ flex: 2, border: '1px solid #ddd', padding: '6px', borderRadius: '4px', fontSize: '13px' }} 
//                 />
//                 <input 
//                   placeholder="Amount" 
//                   type="number" 
//                   value={m.amount}
//                   onChange={(e) => updateMilestone(index, 'amount', e.target.value)}
//                   style={{ flex: 1, border: '1px solid #ddd', padding: '6px', borderRadius: '4px', fontSize: '13px' }} 
//                 />
//               </div>
//             ))}
//             <button type="button" onClick={addMilestone} style={{ color: '#2563eb', fontSize: '13px', background: 'none', border: 'none', cursor: 'pointer' }}>+ Add Milestone</button>
//           </div>

//           {/* Actions */}
//           <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '20px' }}>
//             <button type="button" onClick={onClose} style={{ padding: '8px 16px', borderRadius: '6px', border: '1px solid #ddd' }}>Cancel</button>
//             <button type="submit" style={{ padding: '8px 16px', borderRadius: '6px', backgroundColor: '#2563eb', color: 'white', border: 'none' }}>Create Contract</button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default CreateContractModal;

import React, { useState, useEffect } from "react";
import { 
  Dialog, DialogTitle, DialogContent, DialogActions, 
  TextField, Button, Typography, Box, Divider 
} from "@mui/material";
import axiosInstance from "../../utils/axiosInstance";

export default function CreateContractModal({ open, onClose, proposal, onSuccess }) {
  // Initialize form state
  const [contractData, setContractData] = useState({
    title: "",
    freelancer_name: "",
    amount: "",
    start_date: "",
    description: "",
  });

  // When a proposal is selected, pre-fill the form with its data
  useEffect(() => {
    if (proposal) {
      setContractData({
        title: proposal.job_title,           // From Proposal
        freelancer_name: proposal.freelancer_name, // From Proposal
        amount: proposal.bid_amount,         // From Proposal (Pre-filled bid)
        start_date: new Date().toISOString().split('T')[0], // Default to today
        description: `Contract for ${proposal.job_title} based on your proposal.`,
      });
    }
  }, [proposal]);

  const handleChange = (e) => {
    setContractData({ ...contractData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      // API Call to create the contract in the backend
      const payload = {
        proposal_id: proposal.id, // Link to the original proposal
        client_id: proposal.client_id,
        freelancer_id: proposal.freelancer_id,
        title: contractData.title,
        total_amount: contractData.amount,
        start_date: contractData.start_date,
        terms: contractData.description,
        status: "Active" // Or "Pending" if freelancer needs to sign
      };

      await axiosInstance.post("/contracts/create/", payload);
      
      onSuccess(); // Refresh the parent list
      onClose();   // Close modal
      alert("Contract created and sent to freelancer!");
    } catch (error) {
      console.error("Error creating contract:", error);
      alert("Failed to create contract.");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontWeight: "bold" }}>Create Contract</DialogTitle>
      <Divider />
      
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <Typography variant="body2" color="text.secondary">
            You are creating a contract for <strong>{contractData.freelancer_name}</strong>.
          </Typography>

          <TextField
            label="Contract Title"
            name="title"
            value={contractData.title}
            onChange={handleChange}
            fullWidth
            variant="outlined"
          />

          <TextField
            label="Agreed Amount ($)"
            name="amount"
            type="number"
            value={contractData.amount}
            onChange={handleChange}
            fullWidth
            helperText="You can adjust the final amount here if negotiated."
          />

          <TextField
            label="Start Date"
            name="start_date"
            type="date"
            value={contractData.start_date}
            onChange={handleChange}
            fullWidth
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            label="Contract Terms & Description"
            name="description"
            value={contractData.description}
            onChange={handleChange}
            multiline
            rows={4}
            fullWidth
          />
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} color="inherit">Cancel</Button>
        <Button 
          onClick={handleSubmit} 
          variant="contained" 
          color="primary"
          sx={{ fontWeight: "bold" }}
        >
          Send Contract
        </Button>
      </DialogActions>
    </Dialog>
  );
}