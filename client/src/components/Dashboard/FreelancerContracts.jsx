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
  MessageSquare,
  Search,
  RefreshCw,
  Filter
} from "lucide-react";
import LoadingSpinner from "../LoadingSpinner.jsx";
import { freelancerService } from "../../services/freelancerService.js";

const FreelancerContracts = () => {
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("active");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedContract, setSelectedContract] = useState(null);
  const [showContractModal, setShowContractModal] = useState(false);

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
    const matchesSearch = searchTerm === "" || 
      contract.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contract.clientName.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeTab === "active") return contract.status === "active" && matchesSearch;
    if (activeTab === "completed") return contract.status === "completed" && matchesSearch;
    if (activeTab === "pending") return contract.status === "pending" && matchesSearch;
    if (activeTab === "disputed") return contract.status === "disputed" && matchesSearch;
    return matchesSearch;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner />
      </div>
    );
  }

  const handleViewContract = (contract) => {
    setSelectedContract(contract);
    setShowContractModal(true);
  };

  const handleDownloadContract = (contractId) => {
    // Simulate contract download
    console.log(`Downloading contract ${contractId}`);
    alert('Contract download functionality would be implemented here');
  };

  const handleMessageClient = (clientName) => {
    // Navigate to messages or open message modal
    console.log(`Messaging client: ${clientName}`);
    alert(`Messaging ${clientName} functionality would be implemented here`);
  };

  const handleSubmitMilestone = (contractId) => {
    console.log(`Submitting milestone for contract ${contractId}`);
    alert('Milestone submission functionality would be implemented here');
  };

  const handleRequestPayment = (contractId) => {
    console.log(`Requesting payment for contract ${contractId}`);
    alert('Payment request functionality would be implemented here');
  };

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
          <div className="flex items-center gap-3">
            <button 
              onClick={fetchContracts}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <div className="flex gap-2">
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
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search contracts by title or client name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <span className="text-sm text-gray-600">Filter:</span>
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

        {/* Two Panel Layout */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Panel - Contract List */}
          <div className="w-full lg:w-2/5 xl:w-1/3">
            <div className="border-b border-gray-200 bg-gray-50 p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-900">Contract List</h3>
                <span className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded-full">
                  {filteredContracts.length} contracts
                </span>
              </div>
            </div>
            
            <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
              {filteredContracts.length === 0 ? (
                <div className="p-6 text-center">
                  <FileText className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600">
                    {activeTab === "active" && "No active contracts"}
                    {activeTab === "pending" && "No pending contracts"}
                    {activeTab === "completed" && "No completed contracts"}
                    {activeTab === "disputed" && "No disputed contracts"}
                  </p>
                </div>
              ) : (
                filteredContracts.map(contract => {
                  const StatusIcon = getStatusIcon(contract.status);
                  return (
                    <div
                      key={contract.id}
                      onClick={() => handleViewContract(contract)}
                      className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                        selectedContract?.id === contract.id ? 'bg-indigo-50 border-r-2 border-indigo-500' : ''
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-gray-900 text-sm truncate">{contract.title}</h4>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(contract.status)}`}>
                          <StatusIcon className="w-3 h-3 inline mr-1" />
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 mb-2">{contract.clientName}</p>
                      <div className="flex justify-between items-center text-xs text-gray-500">
                        <span>${contract.totalValue.toLocaleString()}</span>
                        <span>{contract.milestoneProgress}% complete</span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Right Panel - Contract Details */}
          <div className="flex-1">
            {selectedContract ? (
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="text-xl font-bold text-gray-900">{selectedContract.title}</h2>
                      <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(selectedContract.status)}`}>
                        {getStatusText(selectedContract.status)}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        <span>{selectedContract.clientName}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{selectedContract.startDate} - {selectedContract.endDate}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleDownloadContract(selectedContract.id)}
                      className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <p className="text-gray-700 mb-6">{selectedContract.description}</p>

                {/* Contract Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-sm text-gray-600 mb-1">Total Value</div>
                    <div className="text-xl font-semibold text-gray-900">${selectedContract.totalValue.toLocaleString()}</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-sm text-gray-600 mb-1">Paid Amount</div>
                    <div className="text-xl font-semibold text-green-600">${selectedContract.paidAmount.toLocaleString()}</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-sm text-gray-600 mb-1">Remaining</div>
                    <div className="text-xl font-semibold text-blue-600">${(selectedContract.totalValue - selectedContract.paidAmount).toLocaleString()}</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-sm text-gray-600 mb-1">Progress</div>
                    <div className="text-xl font-semibold text-indigo-600">{selectedContract.milestoneProgress}%</div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-6">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Overall Progress</span>
                    <span className="text-gray-900 font-medium">{selectedContract.milestoneProgress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-indigo-600 h-3 rounded-full transition-all duration-300"
                      style={{ width: `${selectedContract.milestoneProgress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3">
                  {selectedContract.status === "active" && (
                    <>
                      <button 
                        onClick={() => handleSubmitMilestone(selectedContract.id)}
                        className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
                      >
                        <TrendingUp className="w-4 h-4" />
                        Submit Milestone
                      </button>
                      <button 
                        onClick={() => handleRequestPayment(selectedContract.id)}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                      >
                        <DollarSign className="w-4 h-4" />
                        Request Payment
                      </button>
                    </>
                  )}
                  <button 
                    onClick={() => handleMessageClient(selectedContract.clientName)}
                    className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4" />
                    Message Client
                  </button>
                  {selectedContract.status === "disputed" && (
                    <button className="bg-red-100 text-red-700 px-4 py-2 rounded-lg hover:bg-red-200 transition-colors flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" />
                      View Dispute
                    </button>
                  )}
                </div>

                {selectedContract.status === "disputed" && (
                  <div className="mt-4 p-4 bg-red-50 rounded-lg">
                    <div className="flex items-center gap-2 text-red-800 mb-2">
                      <AlertCircle className="w-4 h-4" />
                      <span className="text-sm font-medium">Contract Under Dispute</span>
                    </div>
                    <p className="text-sm text-red-700">
                      This contract is currently under dispute. Our support team is reviewing the case and will provide a resolution soon.
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
                <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Select a Contract</h3>
                <p className="text-gray-600">Choose a contract from the list to view detailed information and manage your work.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Contract Detail Modal */}
      {showContractModal && selectedContract && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Contract Details</h3>
                <button 
                  onClick={() => setShowContractModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Contract Information</h4>
                  <dl className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Title:</dt>
                      <dd className="font-medium">{selectedContract.title}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Client:</dt>
                      <dd className="font-medium">{selectedContract.clientName}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Status:</dt>
                      <dd className="font-medium">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(selectedContract.status)}`}>
                          {getStatusText(selectedContract.status)}
                        </span>
                      </dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Duration:</dt>
                      <dd className="font-medium">{selectedContract.startDate} - {selectedContract.endDate}</dd>
                    </div>
                  </dl>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Financial Details</h4>
                  <dl className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Total Value:</dt>
                      <dd className="font-medium">${selectedContract.totalValue.toLocaleString()}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Paid Amount:</dt>
                      <dd className="font-medium text-green-600">${selectedContract.paidAmount.toLocaleString()}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Remaining:</dt>
                      <dd className="font-medium text-blue-600">${(selectedContract.totalValue - selectedContract.paidAmount).toLocaleString()}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Progress:</dt>
                      <dd className="font-medium">{selectedContract.milestoneProgress}%</dd>
                    </div>
                  </dl>
                </div>
              </div>
              
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-2">Description</h4>
                <p className="text-gray-700">{selectedContract.description}</p>
              </div>
              
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-2">Progress</h4>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-indigo-600 h-2 rounded-full"
                    style={{ width: `${selectedContract.milestoneProgress}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600 mt-2">{selectedContract.milestoneProgress}% complete</p>
              </div>
              
              {selectedContract.status === "disputed" && (
                <div className="mb-6 p-4 bg-red-50 rounded-lg">
                  <div className="flex items-center gap-2 text-red-800 mb-2">
                    <AlertCircle className="w-4 h-4" />
                    <span className="font-medium">Contract Under Dispute</span>
                  </div>
                  <p className="text-sm text-red-700">
                    This contract is currently under dispute. Our support team is reviewing the case and will provide a resolution soon.
                  </p>
                </div>
              )}
            </div>
            
            <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
              <button 
                onClick={() => setShowContractModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Close
              </button>
              <button 
                onClick={() => handleDownloadContract(selectedContract.id)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Download Contract
              </button>
              {selectedContract.status === "active" && (
                <>
                  <button 
                    onClick={() => handleSubmitMilestone(selectedContract.id)}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
                  >
                    <TrendingUp className="w-4 h-4" />
                    Submit Milestone
                  </button>
                  <button 
                    onClick={() => handleRequestPayment(selectedContract.id)}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                  >
                    <DollarSign className="w-4 h-4" />
                    Request Payment
                  </button>
                </>
              )}
              <button 
                onClick={() => handleMessageClient(selectedContract.clientName)}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                Message Client
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FreelancerContracts;