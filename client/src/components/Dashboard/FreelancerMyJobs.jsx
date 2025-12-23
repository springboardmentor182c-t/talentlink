import React, { useState, useEffect } from "react";
import { 
  Briefcase, 
  Clock, 
  DollarSign, 
  Calendar, 
  CheckCircle, 
  AlertCircle, 
  Clock3,
  MessageSquare,
  Eye,
  FileText,
  Search,
  RefreshCw,
  Filter,
  X,
  MapPin,
  User
} from "lucide-react";
import LoadingSpinner from "../LoadingSpinner.jsx";
import { freelancerService } from "../../services/freelancerService.js";

const FreelancerMyJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("active");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedJob, setSelectedJob] = useState(null);
  const [showJobModal, setShowJobModal] = useState(false);

  useEffect(() => {
    fetchJobs();
  }, [activeTab]);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const data = await freelancerService.getMyJobs();
      setJobs(data);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching jobs:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleViewJob = (job) => {
    setSelectedJob(job);
    setShowJobModal(true);
  };

  const handleMessageClient = (clientName) => {
    console.log(`Opening message dialog for ${clientName}`);
    // Implement message functionality
  };

  const handleSubmitWork = (jobId) => {
    console.log(`Submitting work for job ${jobId}`);
    // Implement submit work functionality
  };

  const handleRequestPayment = (jobId) => {
    console.log(`Requesting payment for job ${jobId}`);
    // Implement payment request functionality
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "in_progress":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-gray-100 text-gray-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "active":
        return CheckCircle;
      case "in_progress":
        return Clock3;
      case "completed":
        return CheckCircle;
      case "pending":
        return AlertCircle;
      default:
        return Briefcase;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "active":
        return "Active";
      case "in_progress":
        return "In Progress";
      case "completed":
        return "Completed";
      case "pending":
        return "Pending Approval";
      default:
        return status;
    }
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = searchTerm === "" || 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase());

    if (activeTab === "active") return (job.status === "active" || job.status === "in_progress") && matchesSearch;
    if (activeTab === "completed") return job.status === "completed" && matchesSearch;
    if (activeTab === "pending") return job.status === "pending" && matchesSearch;
    return matchesSearch;
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
        <p className="text-red-800">Error loading jobs: {error}</p>
        <button 
          onClick={fetchJobs}
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
            <h1 className="text-2xl font-bold text-gray-900">My Jobs</h1>
            <p className="text-gray-600 mt-1">Manage your active and completed projects</p>
          </div>
          <div className="mt-4 sm:mt-0 flex gap-2">
            <div className="bg-blue-50 rounded-lg p-3">
              <div className="text-2xl font-bold text-blue-600">{jobs.filter(j => j.status === "active" || j.status === "in_progress").length}</div>
              <div className="text-sm text-blue-600">Active Jobs</div>
            </div>
            <div className="bg-green-50 rounded-lg p-3">
              <div className="text-2xl font-bold text-green-600">${jobs.reduce((sum, job) => sum + job.earnings, 0).toLocaleString()}</div>
              <div className="text-sm text-green-600">Total Earnings</div>
            </div>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="mt-6 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search jobs by title, client, or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <div className="flex gap-2">
            <button
              onClick={fetchJobs}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filter
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            {[
              { key: "active", label: "Active Jobs", count: jobs.filter(j => j.status === "active" || j.status === "in_progress").length },
              { key: "pending", label: "Pending", count: jobs.filter(j => j.status === "pending").length },
              { key: "completed", label: "Completed", count: jobs.filter(j => j.status === "completed").length }
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

        {/* Jobs List */}
        <div className="p-6">
          {filteredJobs.length === 0 ? (
            <div className="text-center py-12">
              <Briefcase className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
              <p className="text-gray-600 mb-4">
                {activeTab === "active" && "You don't have any active jobs right now."}
                {activeTab === "pending" && "No jobs are pending approval."}
                {activeTab === "completed" && "You haven't completed any jobs yet."}
              </p>
              {activeTab === "active" && (
                <button
                  onClick={() => window.location.href = "/freelancer/find-work"}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Find Work
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {filteredJobs.map(job => {
                const StatusIcon = getStatusIcon(job.status);
                return (
                  <div key={job.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(job.status)}`}>
                            <StatusIcon className="w-3 h-3 inline mr-1" />
                            {getStatusText(job.status)}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-4 line-clamp-3">{job.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">${job.budget.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">{job.deadline}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">{job.hoursLogged}h logged</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">{job.milestoneProgress}% complete</span>
                      </div>
                    </div>

                    {job.milestoneProgress > 0 && (
                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600">Progress</span>
                          <span className="text-gray-900 font-medium">{job.milestoneProgress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${job.milestoneProgress}%` }}
                          ></div>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center gap-2">
                      {/* View */}
                      <button
                        onClick={() => handleViewJob(job)}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                        View
                      </button>

                      {/* Message Client */}
                      <button
                        onClick={() => handleMessageClient(job.clientName)}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        <MessageSquare className="w-4 h-4" />
                        Message
                      </button>

                      {/* Submit Work */}
                      {(job.status === "active" || job.status === "in_progress") && (
                        <button
                          onClick={() => handleSubmitWork(job.id)}
                          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors"
                        >
                          <CheckCircle className="w-4 h-4" />
                          Submit Work
                        </button>
                      )}

                      {/* Request Payment */}
                      {job.status === "completed" && (
                        <button
                          onClick={() => handleRequestPayment(job.id)}
                          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-green-600 bg-green-50 rounded-lg hover:bg-green-100 transition-colors ml-auto"
                        >
                          <DollarSign className="w-4 h-4" />
                          Request Payment
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Job Detail Modal */}
      {showJobModal && selectedJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Job Details</h3>
                <button 
                  onClick={() => setShowJobModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-2xl font-bold text-gray-800">{selectedJob.title}</h2>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(selectedJob.status)}`}>
                  {getStatusText(selectedJob.status)}
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-xs text-gray-500 mb-1">Budget</p>
                  <p className="font-semibold">${selectedJob.budget.toLocaleString()}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-xs text-gray-500 mb-1">Deadline</p>
                  <p className="font-semibold">{selectedJob.deadline}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-xs text-gray-500 mb-1">Hours Logged</p>
                  <p className="font-semibold">{selectedJob.hoursLogged}h</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-xs text-gray-500 mb-1">Progress</p>
                  <p className="font-semibold">{selectedJob.milestoneProgress}%</p>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold mb-2">Description</h3>
                <p className="text-gray-600">{selectedJob.description}</p>
              </div>

              {selectedJob.milestoneProgress > 0 && (
                <div className="mb-6">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Project Progress</span>
                    <span className="text-gray-900 font-medium">{selectedJob.milestoneProgress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-indigo-600 h-3 rounded-full transition-all duration-300"
                      style={{ width: `${selectedJob.milestoneProgress}%` }}
                    ></div>
                  </div>
                </div>
              )}

              <div className="mb-6">
                <h3 className="font-semibold mb-2">Project Details</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Client:</span>
                    <span className="font-medium">{selectedJob.clientName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Status:</span>
                    <span className="font-medium">{getStatusText(selectedJob.status)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Started:</span>
                    <span className="font-medium">{selectedJob.startDate}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
              <button 
                onClick={() => setShowJobModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Close
              </button>
              <button 
                onClick={() => handleMessageClient(selectedJob.clientName)}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                Message Client
              </button>
              {(selectedJob.status === "active" || selectedJob.status === "in_progress") && (
                <button 
                  onClick={() => handleSubmitWork(selectedJob.id)}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
                >
                  <CheckCircle className="w-4 h-4" />
                  Submit Work
                </button>
              )}
              {selectedJob.status === "completed" && (
                <button 
                  onClick={() => handleRequestPayment(selectedJob.id)}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                >
                  <DollarSign className="w-4 h-4" />
                  Request Payment
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FreelancerMyJobs;