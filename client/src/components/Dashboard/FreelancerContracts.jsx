import React, { useState, useEffect } from "react";
import { 
  FileText, 
  Clock, 
  DollarSign, 
  User, 
  Eye, 
  Download, 
  CheckCircle,
  XCircle,
  AlertCircle,
  Calendar,
  TrendingUp,
  Shield,
  MessageSquare
} from "lucide-react";
import LoadingSpinner from "../LoadingSpinner.jsx";
import { freelancerService } from "../../services/freelancerService.js";

const FreelancerContracts = () => {
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("active");

  useEffect(() => {
    fetchContracts();
  }, [activeTab]);

  const fetchContracts = async () => {
    try {
      setLoading(true);
      const data = await freelancerService.getMyContracts();
      setContracts(data);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching contracts:", err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "completed":
        return "bg-gray-100 text-gray-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "disputed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "active":
        return CheckCircle;
      case "completed":
        return CheckCircle;
      case "pending":
        return Clock;
      case "disputed":
        return AlertCircle;
      default:
        return FileText;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "active":
        return "Active";
      case "completed":
        return "Completed";
      case "pending":
        return "Pending";
      case "disputed":
        return "Disputed";
      default:
        return status;
    }
  };

  const filteredContracts = contracts.filter(contract => {
    if (activeTab === "active") return contract.status === "active";
    if (activeTab === "completed") return contract.status === "completed";
    if (activeTab === "pending") return contract.status === "pending";
    if (activeTab === "disputed") return contract.status === "disputed";
    return contracts;
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
        <p className="text-red-800">Error loading contracts: {error}</p>
        <button 
          onClick={fetchContracts}
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
            <h1 className="text-2xl font-bold text-gray-900">My Contracts</h1>
            <p className="text-gray-600 mt-1">Manage your active and completed contracts</p>
          </div>
          <div className="mt-4 sm:mt-0 flex gap-2">
            <div className="bg-green-50 rounded-lg p-3">
              <div className="text-2xl font-bold text-green-600">{contracts.filter(c => c.status === "active").length}</div>
              <div className="text-sm text-green-600">Active</div>
            </div>
            <div className="bg-blue-50 rounded-lg p-3">
              <div className="text-2xl font-bold text-blue-600">${contracts.reduce((sum, c) => sum + c.totalValue, 0).toLocaleString()}</div>
              <div className="text-sm text-blue-600">Total Value</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { key: "active", label: "Active", count: contracts.filter(c => c.status === "active").length },
              { key: "pending", label: "Pending", count: contracts.filter(c => c.status === "pending").length },
              { key: "completed", label: "Completed", count: contracts.filter(c => c.status === "completed").length },
              { key: "disputed", label: "Disputed", count: contracts.filter(c => c.status === "disputed").length }
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

        {/* Contracts List */}
        <div className="p-6">
          {filteredContracts.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No contracts found</h3>
              <p className="text-gray-600 mb-4">
                {activeTab === "active" && "You don't have any active contracts right now."}
                {activeTab === "pending" && "No contracts are pending approval."}
                {activeTab === "completed" && "You haven't completed any contracts yet."}
                {activeTab === "disputed" && "No contracts are currently disputed."}
              </p>
            </div>
          ) : (
            <div className="grid gap-4">
              {filteredContracts.map(contract => {
                const StatusIcon = getStatusIcon(contract.status);
                return (
                  <div key={contract.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{contract.title}</h3>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(contract.status)}`}>
                            <StatusIcon className="w-3 h-3 inline mr-1" />
                            {getStatusText(contract.status)}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                          <div className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            <span>{contract.clientName}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>{contract.startDate} - {contract.endDate}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-2 ml-4">
                        <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <p className="text-gray-700 mb-4">{contract.description}</p>

                    {/* Contract Details */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="text-sm text-gray-600 mb-1">Total Value</div>
                        <div className="text-lg font-semibold text-gray-900">${contract.totalValue.toLocaleString()}</div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="text-sm text-gray-600 mb-1">Paid Amount</div>
                        <div className="text-lg font-semibold text-green-600">${contract.paidAmount.toLocaleString()}</div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="text-sm text-gray-600 mb-1">Remaining</div>
                        <div className="text-lg font-semibold text-blue-600">${(contract.totalValue - contract.paidAmount).toLocaleString()}</div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="text-sm text-gray-600 mb-1">Milestone Progress</div>
                        <div className="text-lg font-semibold text-indigo-600">{contract.milestoneProgress}%</div>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Overall Progress</span>
                        <span className="text-gray-900 font-medium">{contract.milestoneProgress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${contract.milestoneProgress}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-2">
                      {contract.status === "active" && (
                        <>
                          <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2">
                            <TrendingUp className="w-4 h-4" />
                            Submit Milestone
                          </button>
                          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2">
                            <DollarSign className="w-4 h-4" />
                            Request Payment
                          </button>
                        </>
                      )}
                      <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2">
                        <MessageSquare className="w-4 h-4" />
                        Message Client
                      </button>
                      {contract.status === "disputed" && (
                        <button className="bg-red-100 text-red-700 px-4 py-2 rounded-lg hover:bg-red-200 transition-colors flex items-center gap-2">
                          <AlertCircle className="w-4 h-4" />
                          View Dispute
                        </button>
                      )}
                    </div>

                    {contract.status === "disputed" && (
                      <div className="mt-4 p-3 bg-red-50 rounded-lg">
                        <div className="flex items-center gap-2 text-red-800">
                          <AlertCircle className="w-4 h-4" />
                          <span className="text-sm font-medium">Contract Under Dispute</span>
                        </div>
                        <p className="text-sm text-red-700 mt-1">
                          This contract is currently under dispute. Our support team is reviewing the case.
                        </p>
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

export default FreelancerContracts;