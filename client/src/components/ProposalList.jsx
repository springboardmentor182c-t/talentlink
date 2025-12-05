import React, { useEffect, useState } from "react";
import api from "../services/api";

export default function ProposalList({ projectId }) {
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProposals = async () => {
    setLoading(true);
    try {
      const mockProposals = [
        {
          id: 1,
          freelancer: "Alice Johnson",
          bid_amount: 1500,
          completion_time: "2 weeks",
          status: "Pending",
          submitted: "2025-12-01T10:30:00Z",
        },
        {
          id: 2,
          freelancer: "Bob Smith",
          bid_amount: 2000,
          completion_time: "3 weeks",
          status: "Accepted",
          submitted: "2025-12-02T14:15:00Z",
        },
        {
          id: 3,
          freelancer: "Charlie Lee",
          bid_amount: 1800,
          completion_time: "2.5 weeks",
          status: "Rejected",
          submitted: "2025-12-03T09:00:00Z",
        },
      ];

      await new Promise((res) => setTimeout(res, 500));

      setProposals(mockProposals);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch proposals");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProposals();
  }, [projectId]);

  if (loading) return <p>Loading proposals...</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  if (!proposals.length) return <p>No proposals submitted yet.</p>;

  return (
    <div className="mt-6">
      <h3 className="text-2xl font-bold mb-4">Submitted Proposals</h3>
      <table className="w-full border border-gray-300 rounded-md">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Freelancer</th>
            <th className="border p-2">Bid Amount</th>
            <th className="border p-2">Completion Time</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Submitted</th>
          </tr>
        </thead>
        <tbody>
          {proposals.map((p) => (
            <tr key={p.id}>
              <td className="border p-2">{p.freelancer}</td>
              <td className="border p-2">₹{p.bid_amount}</td>
              <td className="border p-2">{p.completion_time}</td>
              <td className="border p-2">{p.status}</td>
              <td className="border p-2">{new Date(p.submitted).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
