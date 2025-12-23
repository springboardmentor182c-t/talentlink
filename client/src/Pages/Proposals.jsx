import React, { useEffect, useMemo, useState } from "react";
import { CheckCircle, Eye, Loader2, XCircle, Lightbulb } from "lucide-react";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8000/api";
const PROPOSALS_ENDPOINT = `${API_BASE}/proposals/`;

const statusPill = {
  submitted: "bg-gray-100 text-gray-800",
  considering: "bg-yellow-100 text-yellow-800",
  accepted: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800",
};

const ProposalCard = ({ proposal, onAction, loadingId }) => {
  const actionDisabled = loadingId === proposal.id;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-lg font-semibold text-gray-900">
              Project #{proposal.project_id}
            </h3>
            <span
              className={`px-2 py-1 text-xs font-semibold rounded-full ${statusPill[proposal.status] || statusPill.submitted}`}
            >
              {proposal.status}
            </span>
          </div>
          <p className="text-sm text-gray-700 mb-3 line-clamp-3">
            {proposal.cover_letter}
          </p>
          <div className="text-sm text-gray-600 space-y-1">
            <p>
              <span className="font-semibold text-gray-800">Bid:</span> $
              {proposal.bid_amount}
            </p>
            <p>
              <span className="font-semibold text-gray-800">Freelancer:</span>{" "}
              {proposal.freelancer?.username || "Unknown"}
            </p>
            <p className="text-xs text-gray-500">
              Submitted {proposal.created_at ? new Date(proposal.created_at).toLocaleString() : ""}
            </p>
          </div>
        </div>
        <button className="text-indigo-600 hover:text-indigo-700">
          <Eye className="w-5 h-5" />
        </button>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          onClick={() => onAction(proposal.id, "consider")}
          disabled={actionDisabled}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-yellow-700 bg-yellow-50 rounded-lg hover:bg-yellow-100 disabled:opacity-60"
        >
          {actionDisabled ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Lightbulb className="w-4 h-4" />
          )}
          Consider
        </button>
        <button
          onClick={() => onAction(proposal.id, "accept")}
          disabled={actionDisabled}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-green-700 bg-green-50 rounded-lg hover:bg-green-100 disabled:opacity-60"
        >
          {actionDisabled ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <CheckCircle className="w-4 h-4" />
          )}
          Accept
        </button>
        <button
          onClick={() => onAction(proposal.id, "reject")}
          disabled={actionDisabled}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-700 bg-red-50 rounded-lg hover:bg-red-100 disabled:opacity-60"
        >
          {actionDisabled ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <XCircle className="w-4 h-4" />
          )}
          Reject
        </button>
      </div>
    </div>
  );
};

const Proposals = () => {
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionLoadingId, setActionLoadingId] = useState(null);
  const [info, setInfo] = useState("");

  const token = useMemo(() => localStorage.getItem("token"), []);

  const fetchProposals = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(PROPOSALS_ENDPOINT, {
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Token ${token}` } : {}),
        },
      });
      if (!res.ok) throw new Error("Failed to load proposals");
      const data = await res.json();
      console.log("Fetched proposals:", data);
      // If paginated, use data.results, else use data
      if (Array.isArray(data)) {
        setProposals(data);
      } else if (Array.isArray(data.results)) {
        setProposals(data.results);
      } else {
        setProposals([]);
      }
    } catch (err) {
      console.error("Error loading proposals:", err);
      setError(err.message || "Unable to load proposals");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProposals();
  }, []);

  const handleAction = async (id, action) => {
    setActionLoadingId(id);
    setError("");
    setInfo("");
    try {
      const res = await fetch(`${PROPOSALS_ENDPOINT}${id}/${action}/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Token ${token}` } : {}),
        },
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.detail || body.message || "Action failed");
      }
      const body = await res.json().catch(() => ({}));
      if (action === "accept" && body.detail) {
        setInfo(body.detail);
      } else if (body.message) {
        setInfo(body.message);
      }
      await fetchProposals();
    } catch (err) {
      setError(err.message || "Request failed");
    } finally {
      setActionLoadingId(null);
    }
  };

  const grouped = useMemo(() => {
    const buckets = { submitted: [], considering: [], accepted: [], rejected: [] };
    proposals.forEach((p) => {
      buckets[p.status] = buckets[p.status] || [];
      buckets[p.status].push(p);
    });
    return buckets;
  }, [proposals]);

  const sections = [
    { key: "submitted", label: "Submitted" },
    { key: "considering", label: "Considering" },
    { key: "accepted", label: "Accepted" },
    { key: "rejected", label: "Rejected" },
  ];

  return (
    <main className="flex-1 overflow-y-auto p-4 sm:p-6 bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50">
      <div className="max-w-6xl mx-auto space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Project Proposals</h1>
            <p className="text-sm text-gray-600">
              View freelancer submissions, mark considering, accept one, or reject.
            </p>
          </div>
        </div>

        {info && (
          <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
            {info}
          </div>
        )}

        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex items-center gap-2 text-gray-700">
            <Loader2 className="w-5 h-5 animate-spin" />
            Loading proposals...
          </div>
        ) : (
          <div className="space-y-6">
            {sections.map((section) => (
              <div key={section.key} className="space-y-3">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">
                    {section.label}
                  </h2>
                  <span className="text-xs text-gray-500">
                    {grouped[section.key]?.length || 0} proposals
                  </span>
                </div>
                {grouped[section.key]?.length ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {grouped[section.key].map((proposal) => (
                      <ProposalCard
                        key={proposal.id}
                        proposal={proposal}
                        onAction={handleAction}
                        loadingId={actionLoadingId}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-sm text-gray-600 bg-white/70 border border-gray-200 rounded-lg p-4">
                    No proposals in this state.
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default Proposals;

