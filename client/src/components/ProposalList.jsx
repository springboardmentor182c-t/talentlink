import React, { useEffect, useState } from "react";
import api from "../utils/axiosInstance";

export default function ProposalList({ projectId, refresh }) {
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [info, setInfo] = useState("");

  const fetchProposals = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log("Fetching proposals for projectId:", projectId);
      const response = await api.get("/proposals/", {
        params: {
          project_id: projectId,
        },
      });
      console.log("Full response:", response);
      console.log("Response data:", response.data);
      console.log("Response data type:", typeof response.data);
      console.log("Is array?", Array.isArray(response.data));
      console.log("Has results?", response.data.results);
      console.log("Keys in response.data:", Object.keys(response.data));
      const data = Array.isArray(response.data) ? response.data : (response.data.results || []);
      console.log("Processed data:", data);
      console.log("Processed data length:", data.length);
      setProposals(data);
    } catch (err) {
      console.error("Error fetching proposals:", err);
      setError("Failed to fetch proposals");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProposals();
  }, [projectId, refresh]);

  if (loading) return <p>Loading proposals...</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  if (!proposals.length) return <p>No proposals submitted yet.</p>;

  return (
    <div className="mt-6">
      <h3 className="text-2xl font-bold mb-4">Submitted Proposals</h3>
      {info && <div className="mb-2 text-green-700">{info}</div>}
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
          {proposals.map((p) => {
            const freelancerLabel = (() => {
              if (p.freelancer_name && typeof p.freelancer_name === "string") return p.freelancer_name;
              if (p.freelancer) {
                if (typeof p.freelancer === "string") return p.freelancer;
                if (typeof p.freelancer === "object") {
                  if (p.freelancer.username) return p.freelancer.username;
                  if (p.freelancer.email) return p.freelancer.email;
                  if (p.freelancer.id) return `User ${p.freelancer.id}`;
                }
              }
              return "N/A";
            })();

            return (
              <tr key={p.id}>
                <td className="border p-2">{freelancerLabel}</td>
                <td className="border p-2">₹{p.bid_amount}</td>
                <td className="border p-2">{p.completion_time || "N/A"}</td>
                <td className="border p-2">{p.status}</td>
                <td className="border p-2">{new Date(p.created_at).toLocaleString()}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
