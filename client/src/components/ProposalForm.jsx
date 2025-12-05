import React, { useState, useEffect } from "react";
import api from "../services/api";

export default function ProposalForm({ projectId, onSuccess, client_id }) {
  const [bidAmount, setBidAmount] = useState("");
  const [completionTime, setCompletionTime] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const draft = localStorage.getItem(`draftProposal_${projectId}`);
    if (draft) {
      const { bidAmount, completionTime, coverLetter } = JSON.parse(draft);
      setBidAmount(bidAmount || "");
      setCompletionTime(completionTime || "");
      setCoverLetter(coverLetter || "");
    }
  }, [projectId]);

  const validate = () => {
    const e = {};
    if (!bidAmount || Number(bidAmount) <= 0) e.bidAmount = "Enter a valid bid amount";
    if (!completionTime) e.completionTime = "Completion time required";
    if (!coverLetter || coverLetter.length < 20) e.coverLetter = "Write at least 20 characters";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSaveDraft = () => {
    localStorage.setItem(
      `draftProposal_${projectId}`,
      JSON.stringify({ bidAmount, completionTime, coverLetter })
    );
    alert("Draft saved locally");
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    setLoading(true);

    try {
      const data = {
        project_id: projectId,
        bid_amount: Number(bidAmount),
        completion_time: completionTime,
        cover_letter: coverLetter,
      };

      const response = await api.post("/api/proposals/submit/", data);

      if (response.status === 201 || response.status === 200) {
        alert("Proposal submitted successfully!");
        localStorage.removeItem(`draftProposal_${projectId}`);
        setBidAmount("");
        setCompletionTime("");
        setCoverLetter("");
        if (onSuccess) onSuccess(response.data);
      } else {
        console.error("Submission failed:", response.data);
        alert("Submission failed. Check console for details.");
      }
    } catch (err) {
      if (err.response) {
        console.error("Response data:", err.response.data);
        alert(`Submission failed: ${JSON.stringify(err.response.data)}`);
      } else {
        console.error("Network error:", err);
        alert("Network error or server not reachable");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="font-semibold">Bid Amount (₹)</label>
        <input
          type="number"
          value={bidAmount}
          onChange={(e) => setBidAmount(e.target.value)}
          className="p-3 w-full border rounded-md"
        />
        {errors.bidAmount && <p className="text-red-600">{errors.bidAmount}</p>}
      </div>

      <div>
        <label className="font-semibold">Completion Time</label>
        <input
          value={completionTime}
          onChange={(e) => setCompletionTime(e.target.value)}
          className="p-3 w-full border rounded-md"
          placeholder="e.g. 4 weeks or 20 days"
        />
        {errors.completionTime && <p className="text-red-600">{errors.completionTime}</p>}
      </div>

      <div>
        <label className="font-semibold">Cover Letter</label>
        <textarea
          value={coverLetter}
          onChange={(e) => setCoverLetter(e.target.value)}
          className="p-3 w-full border rounded-md h-32"
        />
        {errors.coverLetter && <p className="text-red-600">{errors.coverLetter}</p>}
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 bg-blue-800 text-white rounded"
        >
          {loading ? "Submitting..." : "Submit Proposal"}
        </button>
        <button
          type="button"
          onClick={handleSaveDraft}
          className="px-6 py-2 bg-gray-600 text-white rounded"
        >
          Save Draft
        </button>
      </div>
    </form>
  );
}