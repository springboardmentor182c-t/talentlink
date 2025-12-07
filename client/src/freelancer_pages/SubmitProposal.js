import React from "react";

function SubmitProposal() {
  return (
    <div style={{ width: "400px", margin: "auto", marginTop: "50px" }}>
      <h2>Submit Your Proposal</h2>
      <form>
        <input type="text" placeholder="Your Name" required style={{ width: "100%", marginBottom: "10px", padding: "8px" }} />
        <input type="email" placeholder="Email" required style={{ width: "100%", marginBottom: "10px", padding: "8px" }} />
        <input type="text" placeholder="Project Title" required style={{ width: "100%", marginBottom: "10px", padding: "8px" }} />
        <textarea placeholder="Proposal Description" required style={{ width: "100%", marginBottom: "10px", padding: "8px", height: "80px" }}></textarea>
        <input type="number" placeholder="Budget (₹)" required style={{ width: "100%", marginBottom: "10px", padding: "8px" }} />
        <input type="number" placeholder="Delivery Days" required style={{ width: "100%", marginBottom: "10px", padding: "8px" }} />
        <button type="submit" style={{ width: "100%", padding: "10px", backgroundColor: "#007bff", color: "white", border: "none" }}>
          Submit Proposal
        </button>
      </form>
    </div>
  );
}

export default SubmitProposal;