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
  MessageSquare,
  RefreshCw,
  Filter,
  Search,
  X
} from "lucide-react";
import LoadingSpinner from "../LoadingSpinner.jsx";
import { freelancerService } from "../../services/freelancerService.js";

const FreelancerProposals = () => {
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("active");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProposal, setSelectedProposal] = useState(null);
  const [showProposalModal, setShowProposalModal] = useState(false);

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
    const matchesSearch = searchTerm === "" || 
      proposal.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      proposal.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      proposal.coverLetter.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeTab === "active") return (proposal.status === "pending" || proposal.status === "submitted") && matchesSearch;
    if (activeTab === "accepted") return proposal.status === "accepted" && matchesSearch;
    if (activeTab === "rejected") return proposal.status === "rejected" && matchesSearch;
    return matchesSearch;
  });

  const handleViewProposal = (proposal) => {
    setSelectedProposal(proposal);
    setShowProposalModal(true);
  };

  const handleEditProposal = (proposalId) => {
    console.log(`Editing proposal ${proposalId}`);
    alert('Edit proposal functionality would be implemented here');
  };

  const handleDeleteProposal = (proposalId) => {
    if (window.confirm("Are you sure you want to delete this proposal?")) {
      console.log(`Deleting proposal ${proposalId}`);
      alert('Delete proposal functionality would be implemented here');
    }
  };

  const handleMessageClient = (clientName) => {
    console.log(`Messaging client: ${clientName}`);
    alert(`Messaging ${clientName} functionality would be implemented here`);
  };

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
          <div className="flex items-center gap-3">
            <button 
              onClick={fetchProposals}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <div className="flex gap-2">
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
      </div>

      {/* Search and Action Bar */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search proposals by job title, client name, or cover letter..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <span className="text-sm text-gray-600">Filter:</span>
          </div>
          <button
            onClick={() => window.location.href = "/freelancer/find-work"}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2 whitespace-nowrap"
          >
            <Plus className="w-4 h-4" />
            Submit New Proposal
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            {[
              { key: "active", label: "Active Proposals", count: proposals.filter(p => p.status === "pending" || p.status === "submitted").length },
              { key: "accepted", label: "Accepted", count: proposals.filter(p => p.status === "accepted").length },
              { key: "rejected", label: "Rejected", count: proposals.filter(p => p.status === "rejected").length }
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-6 py-3 rounded-lg font-medium transition-all whitespace-nowrap ${
                  activeTab === tab.key
                    ? "bg-indigo-600 text-white shadow-md"
                    : "bg-indigo-50 text-indigo-600 hover:bg-indigo-100"
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
          </div>
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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {filteredProposals.map(proposal => {
                const StatusIcon = getStatusIcon(proposal.status);
                return (
                  <div key={proposal.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-3">
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
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 mb-4 line-clamp-3">{proposal.coverLetter}</p>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm mb-4">
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

                    <div className="flex items-center gap-2">
                      {/* View */}
                      <button
                        onClick={() => handleViewProposal(proposal)}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                        View
                      </button>

                      {/* Edit */}
                      {proposal.status === "pending" && (
                        <button
                          onClick={() => handleEditProposal(proposal.id)}
                          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                          Edit
                        </button>
                      )}

                      {/* Message Client */}
                      <button
                        onClick={() => handleMessageClient(proposal.clientName)}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        <MessageSquare className="w-4 h-4" />
                        Message
                      </button>

                      {/* Delete */}
                      <button
                        onClick={() => handleDeleteProposal(proposal.id)}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors ml-auto"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </button>
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

      {/* Proposal Detail Modal */}
      {showProposalModal && selectedProposal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Proposal Details</h3>
                <button 
                  onClick={() => setShowProposalModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Job Information</h4>
                  <dl className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Job Title:</dt>
                      <dd className="font-medium">{selectedProposal.jobTitle}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Client:</dt>
                      <dd className="font-medium">{selectedProposal.clientName}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Status:</dt>
                      <dd className="font-medium">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(selectedProposal.status)}`}>
                          {getStatusText(selectedProposal.status)}
                        </span>
                      </dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Submitted:</dt>
                      <dd className="font-medium">{selectedProposal.submittedDate}</dd>
                    </div>
                  </dl>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Proposal Details</h4>
                  <dl className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Bid Amount:</dt>
                      <dd className="font-medium">${selectedProposal.bidAmount.toLocaleString()}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Duration:</dt>
                      <dd className="font-medium">{selectedProposal.estimatedDuration}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Attachments:</dt>
                      <dd className="font-medium">{selectedProposal.attachments} files</dd>
                    </div>
                  </dl>
                </div>
              </div>
              
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-2">Cover Letter</h4>
                <p className="text-gray-700 whitespace-pre-wrap">{selectedProposal.coverLetter}</p>
              </div>
              
              {selectedProposal.clientMessage && (
                <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-2 text-blue-800 mb-2">
                    <MessageSquare className="w-4 h-4" />
                    <span className="font-medium">Client Message</span>
                  </div>
                  <p className="text-sm text-blue-700">{selectedProposal.clientMessage}</p>
                </div>
              )}
              
              {selectedProposal.status === "accepted" && (
                <div className="mb-6 p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-2 text-green-800 mb-2">
                    <CheckCircle className="w-4 h-4" />
                    <span className="font-medium">Proposal Accepted!</span>
                  </div>
                  <p className="text-sm text-green-700">
                    Congratulations! Your proposal has been accepted. Contact the client to discuss project details and start working.
                  </p>
                </div>
              )}
            </div>
            
            <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
              <button 
                onClick={() => setShowProposalModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Close
              </button>
              {selectedProposal.status === "pending" && (
                <button 
                  onClick={() => handleEditProposal(selectedProposal.id)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
                >
                  <Edit className="w-4 h-4" />
                  Edit Proposal
                </button>
              )}
              <button 
                onClick={() => handleMessageClient(selectedProposal.clientName)}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                Message Client
              </button>
              <button 
                onClick={() => handleDeleteProposal(selectedProposal.id)}
                className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Delete Proposal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FreelancerProposals;