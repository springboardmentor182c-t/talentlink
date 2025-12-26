import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Briefcase,
  FileText,
  CheckCircle,
  Clock,
  DollarSign,
  Eye,
  Loader2,
  AlertCircle,
  TrendingUp,
} from "lucide-react";
import api from "../services/api.js";

const FreelancerDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  // Data states
  const [activeProjects, setActiveProjects] = useState([]);
  const [proposals, setProposals] = useState([]);
  const [contracts, setContracts] = useState([]);

  // Loading states
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [loadingProposals, setLoadingProposals] = useState(true);
  const [loadingContracts, setLoadingContracts] = useState(true);

  // Error states
  const [error, setError] = useState("");

  // Check if user is freelancer
  const isFreelancer = useMemo(() => {
    try {
      const userData = localStorage.getItem("user");
      if (userData) {
        const user = JSON.parse(userData);
        return user.role === "freelancer";
      }
    } catch (err) {
      console.error("Error parsing user data:", err);
    }
    return false;
  }, []);

  // Redirect if not freelancer
  useEffect(() => {
    if (!isFreelancer) {
      navigate("/");
    }
  }, [isFreelancer, navigate]);

  // Fetch active projects (projects where freelancer has accepted proposals)
  const fetchActiveProjects = async () => {
    try {
      setLoadingProjects(true);
      // Fetch proposals with status 'accepted' to get active projects
      const proposalsRes = await api.get("/proposals/");
      const allProposals = Array.isArray(proposalsRes.data)
        ? proposalsRes.data
        : proposalsRes.data.results || [];

      // Get accepted proposals
      const acceptedProposals = allProposals.filter(
        (p) => p.status === "accepted"
      );

      // Fetch project details for accepted proposals
      const projectIds = acceptedProposals
        .map((p) => p.project_id)
        .filter((id) => id != null);

      const projectsData = [];
      for (const projectId of projectIds) {
        try {
          const projectRes = await api.get(`/projects/${projectId}/`);
          projectsData.push({
            ...projectRes.data,
            proposal_id: acceptedProposals.find(
              (p) => p.project_id === projectId
            )?.id,
            bid_amount: acceptedProposals.find(
              (p) => p.project_id === projectId
            )?.bid_amount,
          });
        } catch (err) {
          console.error(`Failed to fetch project ${projectId}:`, err);
        }
      }

      setActiveProjects(projectsData);
    } catch (err) {
      console.error("Failed to fetch active projects:", err);
      setError("Failed to load active projects");
    } finally {
      setLoadingProjects(false);
    }
  };

  // Fetch all proposals submitted by freelancer
  const fetchProposals = async () => {
    try {
      setLoadingProposals(true);
      const res = await api.get("/proposals/");
      const data = Array.isArray(res.data) ? res.data : res.data.results || [];
      setProposals(data);
    } catch (err) {
      console.error("Failed to fetch proposals:", err);
      setError("Failed to load proposals");
    } finally {
      setLoadingProposals(false);
    }
  };

  // Fetch contracts for freelancer
  const fetchContracts = async () => {
    try {
      setLoadingContracts(true);
      const res = await api.get("/contracts/contracts/?role=freelancer");
      const data = Array.isArray(res.data) ? res.data : res.data.results || [];
      setContracts(data);
    } catch (err) {
      console.error("Failed to fetch contracts:", err);
      setError("Failed to load contracts");
    } finally {
      setLoadingContracts(false);
    }
  };

  // Load all data on mount
  useEffect(() => {
    if (isFreelancer) {
      fetchActiveProjects();
      fetchProposals();
      fetchContracts();
    }
  }, [isFreelancer]);

  // Calculate stats
  const stats = useMemo(() => {
    const activeProposals = proposals.filter((p) => p.status === "accepted");
    const submittedProposals = proposals.filter(
      (p) => p.status === "submitted"
    );
    const consideringProposals = proposals.filter(
      (p) => p.status === "considering"
    );
    const activeContracts = contracts.filter((c) => c.status === "active");
    const totalEarnings = contracts.reduce((sum, c) => {
      return sum + parseFloat(c.amount_paid || 0);
    }, 0);

    return {
      activeProjects: activeProjects.length,
      totalProposals: proposals.length,
      activeProposals: activeProposals.length,
      submittedProposals: submittedProposals.length,
      consideringProposals: consideringProposals.length,
      activeContracts: activeContracts.length,
      totalContracts: contracts.length,
      totalEarnings: totalEarnings.toFixed(2),
    };
  }, [activeProjects, proposals, contracts]);

  // Status badge colors
  const getStatusColor = (status) => {
    const colors = {
      submitted: "bg-gray-100 text-gray-800",
      considering: "bg-yellow-100 text-yellow-800",
      accepted: "bg-green-100 text-green-800",
      rejected: "bg-red-100 text-red-800",
      active: "bg-blue-100 text-blue-800",
      completed: "bg-indigo-100 text-indigo-800",
      draft: "bg-gray-100 text-gray-800",
      pending: "bg-purple-100 text-purple-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount || 0);
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  if (!isFreelancer) {
    return null;
  }

  return (
    <main className="flex-1 overflow-y-auto p-4 sm:p-6 bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Freelancer Dashboard
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              View your active projects, proposals, and contracts
            </p>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
            {error}
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">
                  Active Projects
                </p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {stats.activeProjects}
                </p>
              </div>
              <div className="p-3 bg-indigo-50 rounded-lg">
                <Briefcase className="w-6 h-6 text-indigo-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">
                  Total Proposals
                </p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {stats.totalProposals}
                </p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">
                  Active Contracts
                </p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {stats.activeContracts}
                </p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">
                  Total Earnings
                </p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  ${stats.totalEarnings}
                </p>
              </div>
              <div className="p-3 bg-yellow-50 rounded-lg">
                <DollarSign className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab("overview")}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === "overview"
                    ? "border-indigo-500 text-indigo-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab("projects")}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === "projects"
                    ? "border-indigo-500 text-indigo-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Active Projects ({stats.activeProjects})
              </button>
              <button
                onClick={() => setActiveTab("proposals")}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === "proposals"
                    ? "border-indigo-500 text-indigo-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Proposals ({stats.totalProposals})
              </button>
              <button
                onClick={() => setActiveTab("contracts")}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === "contracts"
                    ? "border-indigo-500 text-indigo-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Contracts ({stats.totalContracts})
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === "overview" && (
              <div className="space-y-6">
                {/* Active Projects Section */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-gray-900">
                      Active Projects
                    </h2>
                    <button
                      onClick={() => setActiveTab("projects")}
                      className="text-sm text-indigo-600 hover:text-indigo-700"
                    >
                      View All
                    </button>
                  </div>
                  {loadingProjects ? (
                    <div className="flex items-center justify-center py-8">
                      <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
                    </div>
                  ) : activeProjects.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {activeProjects.slice(0, 4).map((project) => (
                        <div
                          key={project.id}
                          className="bg-gray-50 rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow"
                        >
                          <h3 className="font-semibold text-gray-900 mb-2">
                            {project.title || `Project #${project.id}`}
                          </h3>
                          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                            {project.description || "No description available"}
                          </p>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">
                              Bid: {formatCurrency(project.bid_amount)}
                            </span>
                            <button
                              onClick={() =>
                                navigate(`/freelancer/projects/${project.id}`)
                              }
                              className="text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
                            >
                              <Eye className="w-4 h-4" />
                              View
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      No active projects
                    </div>
                  )}
                </div>

                {/* Recent Proposals Section */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-gray-900">
                      Recent Proposals
                    </h2>
                    <button
                      onClick={() => setActiveTab("proposals")}
                      className="text-sm text-indigo-600 hover:text-indigo-700"
                    >
                      View All
                    </button>
                  </div>
                  {loadingProposals ? (
                    <div className="flex items-center justify-center py-8">
                      <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
                    </div>
                  ) : proposals.length > 0 ? (
                    <div className="space-y-3">
                      {proposals.slice(0, 5).map((proposal) => (
                        <div
                          key={proposal.id}
                          className="bg-gray-50 rounded-lg border border-gray-200 p-4 flex items-center justify-between"
                        >
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium text-gray-900">
                                Project #{proposal.project_id || "N/A"}
                              </span>
                              <span
                                className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                                  proposal.status
                                )}`}
                              >
                                {proposal.status}
                              </span>
                            </div>
                            <div className="text-sm text-gray-600">
                              Bid: {formatCurrency(proposal.bid_amount)} •{" "}
                              {formatDate(proposal.created_at)}
                            </div>
                          </div>
                          <button
                            onClick={() =>
                              navigate(`/freelancer/proposal/${proposal.id}`)
                            }
                            className="text-indigo-600 hover:text-indigo-700"
                          >
                            <Eye className="w-5 h-5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      No proposals submitted
                    </div>
                  )}
                </div>

                {/* Active Contracts Section */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-gray-900">
                      Active Contracts
                    </h2>
                    <button
                      onClick={() => setActiveTab("contracts")}
                      className="text-sm text-indigo-600 hover:text-indigo-700"
                    >
                      View All
                    </button>
                  </div>
                  {loadingContracts ? (
                    <div className="flex items-center justify-center py-8">
                      <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
                    </div>
                  ) : contracts.filter((c) => c.status === "active").length >
                    0 ? (
                    <div className="space-y-3">
                      {contracts
                        .filter((c) => c.status === "active")
                        .slice(0, 5)
                        .map((contract) => (
                          <div
                            key={contract.id}
                            className="bg-gray-50 rounded-lg border border-gray-200 p-4"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="font-semibold text-gray-900">
                                {contract.title}
                              </h3>
                              <span
                                className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                                  contract.status
                                )}`}
                              >
                                {contract.status}
                              </span>
                            </div>
                            <div className="text-sm text-gray-600 space-y-1">
                              <p>
                                Client: {contract.client_name || "Unknown"}
                              </p>
                              <p>
                                Amount: {formatCurrency(contract.total_amount)} •{" "}
                                Paid: {formatCurrency(contract.amount_paid)}
                              </p>
                              <div className="flex items-center gap-2 mt-2">
                                <div className="flex-1 bg-gray-200 rounded-full h-2">
                                  <div
                                    className="bg-green-500 h-2 rounded-full"
                                    style={{
                                      width: `${contract.payment_progress_percentage}%`,
                                    }}
                                  />
                                </div>
                                <span className="text-xs text-gray-500">
                                  {contract.payment_progress_percentage}%
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      No active contracts
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Active Projects Tab */}
            {activeTab === "projects" && (
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Active Projects
                </h2>
                {loadingProjects ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
                  </div>
                ) : activeProjects.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {activeProjects.map((project) => (
                      <div
                        key={project.id}
                        className="bg-gray-50 rounded-lg border border-gray-200 p-5 hover:shadow-md transition-shadow"
                      >
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {project.title || `Project #${project.id}`}
                        </h3>
                        <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                          {project.description || "No description available"}
                        </p>
                        <div className="space-y-2 text-sm text-gray-600 mb-4">
                          <p>
                            <span className="font-semibold">Bid Amount:</span>{" "}
                            {formatCurrency(project.bid_amount)}
                          </p>
                          <p>
                            <span className="font-semibold">Created:</span>{" "}
                            {formatDate(project.created_at)}
                          </p>
                        </div>
                        <button
                          onClick={() =>
                            navigate(`/freelancer/projects/${project.id}`)
                          }
                          className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                        >
                          View Details
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    <Briefcase className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                    <p>No active projects</p>
                  </div>
                )}
              </div>
            )}

            {/* Proposals Tab */}
            {activeTab === "proposals" && (
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  All Proposals
                </h2>
                {loadingProposals ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
                  </div>
                ) : proposals.length > 0 ? (
                  <div className="space-y-4">
                    {proposals.map((proposal) => (
                      <div
                        key={proposal.id}
                        className="bg-gray-50 rounded-lg border border-gray-200 p-5 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-semibold text-gray-900">
                                Project #{proposal.project_id || "N/A"}
                              </h3>
                              <span
                                className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                                  proposal.status
                                )}`}
                              >
                                {proposal.status}
                              </span>
                            </div>
                            {proposal.cover_letter && (
                              <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                                {proposal.cover_letter}
                              </p>
                            )}
                            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                              <span>
                                <span className="font-semibold">Bid:</span>{" "}
                                {formatCurrency(proposal.bid_amount)}
                              </span>
                              {proposal.completion_time && (
                                <span>
                                  <span className="font-semibold">
                                    Time:
                                  </span>{" "}
                                  {proposal.completion_time}
                                </span>
                              )}
                              <span>
                                <span className="font-semibold">Submitted:</span>{" "}
                                {formatDate(proposal.created_at)}
                              </span>
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() =>
                            navigate(`/freelancer/proposal/${proposal.id}`)
                          }
                          className="mt-3 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium text-sm"
                        >
                          View Details
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    <FileText className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                    <p>No proposals submitted</p>
                  </div>
                )}
              </div>
            )}

            {/* Contracts Tab */}
            {activeTab === "contracts" && (
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  All Contracts
                </h2>
                {loadingContracts ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
                  </div>
                ) : contracts.length > 0 ? (
                  <div className="space-y-4">
                    {contracts.map((contract) => (
                      <div
                        key={contract.id}
                        className="bg-gray-50 rounded-lg border border-gray-200 p-5 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-semibold text-gray-900">
                                {contract.title}
                              </h3>
                              <span
                                className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                                  contract.status
                                )}`}
                              >
                                {contract.status}
                              </span>
                            </div>
                            {contract.description && (
                              <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                                {contract.description}
                              </p>
                            )}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
                              <div>
                                <p>
                                  <span className="font-semibold">Client:</span>{" "}
                                  {contract.client_name || "Unknown"}
                                </p>
                                <p>
                                  <span className="font-semibold">
                                    Contract Type:
                                  </span>{" "}
                                  {contract.contract_type || "N/A"}
                                </p>
                              </div>
                              <div>
                                <p>
                                  <span className="font-semibold">
                                    Total Amount:
                                  </span>{" "}
                                  {formatCurrency(contract.total_amount)}
                                </p>
                                <p>
                                  <span className="font-semibold">Paid:</span>{" "}
                                  {formatCurrency(contract.amount_paid)}
                                </p>
                              </div>
                            </div>
                            <div className="mb-3">
                              <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                                <span>Payment Progress</span>
                                <span>
                                  {contract.payment_progress_percentage}%
                                </span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-green-500 h-2 rounded-full"
                                  style={{
                                    width: `${contract.payment_progress_percentage}%`,
                                  }}
                                />
                              </div>
                            </div>
                            <div className="text-xs text-gray-500">
                              <p>
                                Start: {formatDate(contract.start_date)} • End:{" "}
                                {formatDate(contract.end_date)}
                              </p>
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() =>
                            navigate(`/freelancer/contracts`)
                          }
                          className="mt-3 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium text-sm"
                        >
                          View Details
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    <CheckCircle className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                    <p>No contracts found</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default FreelancerDashboard;
