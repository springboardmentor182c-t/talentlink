import React, { useState, useEffect } from "react";
import { 
  FileText, 
  Clock, 
  DollarSign, 
  User, 
  Eye, 
  Edit, 
  Trash2, 
  Plus,
  Send,
  CheckCircle,
  XCircle,
  AlertCircle,
  MessageSquare
} from "lucide-react";
import LoadingSpinner from "../LoadingSpinner.jsx";
import { freelancerService } from "../../services/freelancerService.js";

const FreelancerProposals = () => {
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("active");

  useEffect(() => {
    fetchProposals();
  }, [activeTab]);

  const fetchProposals = async () => {
    try {
      setLoading(true);
      const data = await freelancerService.getMyProposals();
      setProposals(data);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching proposals:", err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "accepted":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "submitted":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "accepted":
        return CheckCircle;
      case "rejected":
        return XCircle;
      case "pending":
        return Clock;
      case "submitted":
        return Send;
      default:
        return AlertCircle;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "accepted":
        return "Accepted";
      case "rejected":
        return "Rejected";
      case "pending":
        return "Pending";
      case "submitted":
        return "Submitted";
      default:
        return status;
    }
  };

  const filteredProposals = proposals.filter(proposal => {
    if (activeTab === "active") return proposal.status === "pending" || proposal.status === "submitted";
    if (activeTab === "accepted") return proposal.status === "accepted";
    if (activeTab === "rejected") return proposal.status === "rejected";
    return proposals;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-800">Error loading proposals: {error}</p>
        <button 
          onClick={fetchProposals}
          className="mt-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Proposals</h1>
            <p className="text-gray-600 mt-1">Track and manage your job proposals</p>
          </div>
          <div className="mt-4 sm:mt-0 flex gap-2">
            <div className="bg-blue-50 rounded-lg p-3">
              <div className="text-2xl font-bold text-blue-600">{proposals.filter(p => p.status === "pending" || p.status === "submitted").length}</div>
              <div className="text-sm text-blue-600">Active</div>
            </div>
            <div className="bg-green-50 rounded-lg p-3">
              <div className="text-2xl font-bold text-green-600">{proposals.filter(p => p.status === "accepted").length}</div>
              <div className="text-sm text-green-600">Accepted</div>
            </div>
            <div className="bg-red-50 rounded-lg p-3">
              <div className="text-2xl font-bold text-red-600">{proposals.filter(p => p.status === "rejected").length}</div>
              <div className="text-sm text-red-600">Rejected</div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex gap-2">
            <button
              onClick={() => window.location.href = "/freelancer/find-work"}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Submit New Proposal
            </button>
          </div>
          <div className="text-sm text-gray-600">
            Total proposals submitted: {proposals.length}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { key: "active", label: "Active Proposals", count: proposals.filter(p => p.status === "pending" || p.status === "submitted").length },
              { key: "accepted", label: "Accepted", count: proposals.filter(p => p.status === "accepted").length },
              { key: "rejected", label: "Rejected", count: proposals.filter(p => p.status === "rejected").length }
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.key
                    ? "border-indigo-500 text-indigo-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {tab.label}
                {tab.count > 0 && (
                  <span className={`ml-2 px-2 py-1 text-xs rounded-full ${
                    activeTab === tab.key ? "bg-indigo-100 text-indigo-600" : "bg-gray-100 text-gray-600"
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Proposals List */}
        <div className="p-6">
          {filteredProposals.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No proposals found</h3>
              <p className="text-gray-600 mb-4">
                {activeTab === "active" && "You don't have any active proposals right now."}
                {activeTab === "accepted" && "No proposals have been accepted yet."}
                {activeTab === "rejected" && "No rejected proposals found."}
              </p>
              {activeTab === "active" && (
                <button
                  onClick={() => window.location.href = "/freelancer/find-work"}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Browse Jobs
                </button>
              )}
            </div>
          ) : (
            <div className="grid gap-4">
              {filteredProposals.map(proposal => {
                const StatusIcon = getStatusIcon(proposal.status);
                return (
                  <div key={proposal.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{proposal.jobTitle}</h3>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(proposal.status)}`}>
                            <StatusIcon className="w-3 h-3 inline mr-1" />
                            {getStatusText(proposal.status)}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                          <div className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            <span>{proposal.clientName}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{proposal.submittedDate}</span>
                          </div>
                        </div>

                        <p className="text-gray-700 mb-4 line-clamp-2">{proposal.coverLetter}</p>

                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <DollarSign className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-600">${proposal.bidAmount.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-600">{proposal.estimatedDuration}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-600">{proposal.attachments} files</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-2 ml-4">
                        <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                        {proposal.status === "pending" && (
                          <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                            <Edit className="w-4 h-4" />
                          </button>
                        )}
                        <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {proposal.status === "accepted" && (
                      <div className="mt-4 p-3 bg-green-50 rounded-lg">
                        <div className="flex items-center gap-2 text-green-800">
                          <CheckCircle className="w-4 h-4" />
                          <span className="text-sm font-medium">Proposal Accepted!</span>
                        </div>
                        <p className="text-sm text-green-700 mt-1">
                          Contact the client to discuss project details and start working.
                        </p>
                      </div>
                    )}

                    {proposal.clientMessage && (
                      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                        <div className="flex items-center gap-2 text-blue-800">
                          <MessageSquare className="w-4 h-4" />
                          <span className="text-sm font-medium">Client Message</span>
                        </div>
                        <p className="text-sm text-blue-700 mt-1">{proposal.clientMessage}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FreelancerProposals;