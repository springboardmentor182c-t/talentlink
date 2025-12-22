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
  FileText
} from "lucide-react";
import LoadingSpinner from "../LoadingSpinner.jsx";
import { freelancerService } from "../../services/freelancerService.js";

const FreelancerMyJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("active");

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
    if (activeTab === "active") return job.status === "active" || job.status === "in_progress";
    if (activeTab === "completed") return job.status === "completed";
    if (activeTab === "pending") return job.status === "pending";
    return jobs;
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
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { key: "active", label: "Active Jobs", count: jobs.filter(j => j.status === "active" || j.status === "in_progress").length },
              { key: "pending", label: "Pending", count: jobs.filter(j => j.status === "pending").length },
              { key: "completed", label: "Completed", count: jobs.filter(j => j.status === "completed").length }
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
            <div className="grid gap-4">
              {filteredJobs.map(job => {
                const StatusIcon = getStatusIcon(job.status);
                return (
                  <div key={job.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(job.status)}`}>
                            <StatusIcon className="w-3 h-3 inline mr-1" />
                            {getStatusText(job.status)}
                          </span>
                        </div>
                        
                        <p className="text-gray-600 mb-4">{job.description}</p>
                        
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
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
                          <div className="mt-4">
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
                      </div>
                      
                      <div className="flex flex-col gap-2 ml-4">
                        <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                          <MessageSquare className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
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

export default FreelancerMyJobs;