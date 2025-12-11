import React, { useState, useEffect } from 'react';
import { 
  DollarSign, 
  Clock, 
  CheckCircle, 
  FileText, 
  AlertCircle, 
  Calendar, 
  Download, 
  Eye,
  RefreshCw,
  Filter,
  Search
} from 'lucide-react';
import { contractService, contractStatsService } from '../services/contractService';
import ContractCreationModal from '../components/ContractCreationModal';
import ContractActivityTimeline from '../components/ContractActivityTimeline';
import ContractMilestones from '../components/ContractMilestones';
import ContractPaymentTracker from '../components/ContractPaymentTracker';
import ContractDocumentGenerator from '../components/ContractDocumentGenerator';
import { useNotifications } from '../contexts/NotificationContext';

// Stats Card Component
const StatsCard = ({ title, value, icon: Icon, color = "indigo", loading = false }) => {
  const colorClasses = {
    indigo: 'bg-indigo-50 text-indigo-600',
    green: 'bg-green-50 text-green-600',
    yellow: 'bg-yellow-50 text-yellow-600',
    blue: 'bg-blue-50 text-blue-600',
    red: 'bg-red-50 text-red-600'
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 sm:p-6 border border-gray-200">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-gray-600 text-xs sm:text-sm font-medium mb-1 sm:mb-2">{title}</h3>
          {loading ? (
            <div className="h-8 bg-gray-200 animate-pulse rounded w-20"></div>
          ) : (
            <p className="text-2xl sm:text-3xl font-bold text-gray-900">{value}</p>
          )}
        </div>
        {Icon && (
          <div className={`p-2 sm:p-3 rounded-lg ${colorClasses[color]}`}>
            <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
        )}
      </div>
    </div>
  );
};

// Loading Skeleton for Contract List
const ContractListSkeleton = () => (
  <div className="divide-y divide-gray-200">
    {[1, 2, 3].map(i => (
      <div key={i} className="p-4 animate-pulse">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
          </div>
          <div className="w-16 h-6 bg-gray-200 rounded-full"></div>
        </div>
        <div className="flex items-center justify-between mt-3">
          <div className="h-3 bg-gray-200 rounded w-20"></div>
          <div className="h-4 bg-gray-200 rounded w-12"></div>
        </div>
      </div>
    ))}
  </div>
);

// Contract List Item Component
const ContractListItem = ({ contract, isSelected, onClick }) => {
  const getStatusColor = (status) => {
    const colors = {
      'active': 'bg-green-100 text-green-800',
      'in_review': 'bg-yellow-100 text-yellow-800',
      'completed': 'bg-blue-100 text-blue-800',
      'cancelled': 'bg-red-100 text-red-800',
      'draft': 'bg-gray-100 text-gray-800',
      'pending': 'bg-purple-100 text-purple-800',
      'disputed': 'bg-orange-100 text-orange-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getContractTypeColor = (type) => {
    const colors = {
      'fixed': 'bg-indigo-100 text-indigo-700',
      'hourly': 'bg-purple-100 text-purple-700',
      'milestone': 'bg-teal-100 text-teal-700'
    };
    return colors[type] || 'bg-gray-100 text-gray-700';
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <div
      onClick={onClick}
      className={`p-4 cursor-pointer transition-colors hover:bg-gray-50 ${
        isSelected ? 'bg-indigo-50 border-l-4 border-indigo-600' : ''
      }`}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-gray-900 text-sm sm:text-base truncate">
            {contract.title}
          </h4>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">
            Client: <span className="font-medium">{contract.client_name}</span>
          </p>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-semibold flex-shrink-0 ml-2 ${getStatusColor(contract.status)}`}>
          {contract.status.replace('_', ' ')}
        </span>
      </div>
      
      <div className="flex items-center justify-between text-xs sm:text-sm text-gray-600 mt-3">
        <span className="flex items-center gap-1">
          <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
          <span className="hidden sm:inline">Start:</span> {formatDate(contract.start_date)}
        </span>
        <span className="font-semibold text-indigo-600">
          {formatCurrency(contract.total_amount)}
        </span>
      </div>
      
      <div className="flex items-center justify-between text-xs sm:text-sm mt-2">
        <span className="text-gray-600">
          <span className="hidden sm:inline">End:</span> {formatDate(contract.end_date)}
        </span>
        <span className={`px-2 py-0.5 rounded text-xs font-medium ${getContractTypeColor(contract.contract_type)}`}>
          {contract.contract_type === 'fixed' ? 'Fixed Price' : 
           contract.contract_type === 'hourly' ? 'Hourly Rate' : 'Milestone Based'}
        </span>
      </div>

      {/* Payment Progress */}
      <div className="mt-3">
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <span>Payment Progress</span>
          <span>{contract.payment_progress_percentage}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-green-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${contract.payment_progress_percentage}%` }}
          />
        </div>
      </div>
    </div>
  );
};

// Contract Details Component
const ContractDetails = ({ contract, onStatusUpdate, onPayment }) => {
  const [loading, setLoading] = useState(false);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    const colors = {
      'active': 'bg-green-100 text-green-800',
      'in_review': 'bg-yellow-100 text-yellow-800',
      'completed': 'bg-blue-100 text-blue-800',
      'cancelled': 'bg-red-100 text-red-800',
      'draft': 'bg-gray-100 text-gray-800',
      'pending': 'bg-purple-100 text-purple-800',
      'disputed': 'bg-orange-100 text-orange-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const handleStatusUpdate = async (newStatus) => {
    setLoading(true);
    try {
      await onStatusUpdate(contract.id, { status: newStatus });
    } catch (error) {
      console.error('Failed to update status:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!contract) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 sm:p-12 text-center">
        <FileText className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mx-auto mb-4" />
        <p className="text-base sm:text-lg text-gray-600">Select a contract to view details</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
            Contract Details
          </h2>
          <p className="text-sm text-gray-600">
            Contract ID: <span className="font-mono font-semibold">#{contract.id.toString().padStart(4, '0')}</span>
          </p>
        </div>
        <div className="flex gap-2">
          {contract.status === 'pending' && (
            <button
              onClick={() => handleStatusUpdate('active')}
              disabled={loading}
              className="px-3 sm:px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-sm disabled:opacity-50"
            >
              {loading ? 'Activating...' : 'Activate'}
            </button>
          )}
          {contract.status === 'active' && (
            <button
              onClick={() => handleStatusUpdate('completed')}
              disabled={loading}
              className="px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm disabled:opacity-50"
            >
              {loading ? 'Completing...' : 'Complete'}
            </button>
          )}
          <button className="px-3 sm:px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium text-sm">
            End Contract
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {/* Project Name */}
        <div>
          <label className="text-sm font-semibold text-gray-700 mb-2 block">Project Name:</label>
          <p className="text-base sm:text-lg text-gray-900">{contract.title}</p>
        </div>

        {/* Client */}
        <div>
          <label className="text-sm font-semibold text-gray-700 mb-2 block">Client:</label>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold">
              {contract.client_name.substring(0, 2).toUpperCase()}
            </div>
            <p className="text-base sm:text-lg text-gray-900">{contract.client_name}</p>
          </div>
        </div>

        {/* Freelancer */}
        <div>
          <label className="text-sm font-semibold text-gray-700 mb-2 block">Freelancer:</label>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-blue-600 flex items-center justify-center text-white font-bold">
              {contract.freelancer_name.substring(0, 2).toUpperCase()}
            </div>
            <p className="text-base sm:text-lg text-gray-900">{contract.freelancer_name}</p>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="text-sm font-semibold text-gray-700 mb-2 block">Description:</label>
          <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{contract.description}</p>
        </div>

        {/* Dates */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-2 block">Start Date:</label>
            <p className="text-base text-gray-900">{formatDate(contract.start_date)}</p>
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-2 block">End Date:</label>
            <p className="text-base text-gray-900">{formatDate(contract.end_date)}</p>
          </div>
        </div>

        {/* Payment */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-2 block">Total Amount:</label>
            <p className="text-xl sm:text-2xl font-bold text-indigo-600">{formatCurrency(contract.total_amount)}</p>
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-2 block">Amount Paid:</label>
            <p className="text-xl sm:text-2xl font-bold text-green-600">{formatCurrency(contract.amount_paid)}</p>
          </div>
        </div>

        {/* Remaining Amount */}
        <div>
          <label className="text-sm font-semibold text-gray-700 mb-2 block">Remaining Amount:</label>
          <p className="text-lg font-semibold text-orange-600">{formatCurrency(contract.remaining_amount)}</p>
        </div>

        {/* Status */}
        <div>
          <label className="text-sm font-semibold text-gray-700 mb-2 block">Status:</label>
          <span className={`inline-block px-4 py-2 rounded-lg text-sm font-semibold ${getStatusColor(contract.status)}`}>
            {contract.status.replace('_', ' ').toUpperCase()}
          </span>
        </div>

        {/* Contract Type */}
        <div>
          <label className="text-sm font-semibold text-gray-700 mb-2 block">Contract Type:</label>
          <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
            {contract.contract_type === 'fixed' ? 'Fixed Price' : 
             contract.contract_type === 'hourly' ? 'Hourly Rate' : 'Milestone Based'}
          </span>
        </div>

        {/* Progress Bar */}
        <div>
          <div className="flex justify-between text-sm text-gray-700 mb-2">
            <span className="font-semibold">Progress</span>
            <span className="font-bold">{contract.progress_percentage}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-indigo-500 to-purple-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${contract.progress_percentage}%` }}
            />
          </div>
        </div>

        {/* Payment Progress */}
        <div>
          <div className="flex justify-between text-sm text-gray-700 mb-2">
            <span className="font-semibold">Payment Progress</span>
            <span className="font-bold">{contract.payment_progress_percentage}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-green-500 h-3 rounded-full transition-all duration-300"
              style={{ width: `${contract.payment_progress_percentage}%` }}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
          <button 
            onClick={() => onPayment(contract.id)}
            className="flex-1 px-4 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center justify-center gap-2"
          >
            <DollarSign className="w-4 h-4" />
            Make Payment
          </button>
          <button 
            onClick={() => {
              // Handle download - this will be managed by ContractDocumentGenerator
              console.log('Download contract:', contract.id);
            }}
            className="flex-1 px-4 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" />
            Download Contract
          </button>
          <button className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium flex items-center justify-center gap-2">
            <Eye className="w-4 h-4" />
            View Full Details
          </button>
        </div>
      </div>
    </div>
  );
};

// Main Contracts Component
// Contracts Component (updated grid layout)
const Contracts = () => {
  const [contracts, setContracts] = useState([]);
  const [stats, setStats] = useState({
    activeContracts: 0,
    totalEarnings: '$0',
    pendingPayments: '$0',
    completedProjects: 0
  });
  const [selectedContract, setSelectedContract] = useState(null);
  const [filter, setFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const { 
    notifyContractStatusChanged, 
    notifyPaymentMade, 
    notifyContractCreated,
    startMonitoringContracts,
    stopMonitoringContracts 
  } = useNotifications();

  const filters = ['All', 'Active', 'In Review', 'Completed', 'Cancelled', 'Pending', 'Draft'];

  useEffect(() => {
    fetchContracts();
    fetchStats();
    
    // Start monitoring active contracts for notifications
    const activeContractIds = contracts
      .filter(c => ['active', 'in_review', 'pending'].includes(c.status))
      .map(c => c.id);
    
    if (activeContractIds.length > 0) {
      startMonitoringContracts(activeContractIds);
    }
    
    return () => {
      stopMonitoringContracts();
    };
  }, [contracts.length]);

  const fetchContracts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await contractService.getContracts();
      setContracts(data);
    } catch (err) {
      console.error('Failed to fetch contracts:', err);
      setError('Failed to load contracts. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const statsData = await contractStatsService.getStats();
      setStats(statsData);
    } catch (err) {
      console.error('Failed to fetch stats:', err);
    }
  };

  const handleContractSelect = async (contract) => {
    setSelectedContract(contract);
    try {
      // Fetch full contract details including activities and milestones
      const fullContract = await contractService.getContract(contract.id);
      setSelectedContract(fullContract);
    } catch (err) {
      console.error('Failed to fetch contract details:', err);
    }
  };

  const handleStatusUpdate = async (contractId, statusData) => {
    try {
      const currentContract = contracts.find(c => c.id === contractId);
      const updatedContract = await contractService.updateContractStatus(contractId, statusData);
      
      // Send notification
      if (currentContract) {
        notifyContractStatusChanged(updatedContract, currentContract.status, statusData.status);
      }
      
      // Update the contract in the list
      setContracts(prev => prev.map(c => c.id === contractId ? updatedContract : c));
      // Update the selected contract if it's the same one
      if (selectedContract?.id === contractId) {
        setSelectedContract(updatedContract);
      }
      // Refresh stats
      fetchStats();
    } catch (err) {
      console.error('Failed to update contract status:', err);
      throw err;
    }
  };

  const handlePayment = async (contractId, paymentData) => {
    try {
      const updatedContract = await contractService.makePayment(contractId, paymentData);
      
      // Send notification
      notifyPaymentMade(updatedContract, paymentData.amount, paymentData.payment_type);
      
      setContracts(prev => prev.map(c => c.id === contractId ? updatedContract : c));
      if (selectedContract?.id === contractId) {
        setSelectedContract(updatedContract);
      }
      fetchStats();
      
      return updatedContract;
    } catch (err) {
      console.error('Failed to process payment:', err);
      throw err;
    }
  };

  const filteredContracts = contracts.filter(contract => {
    const matchesFilter = filter === 'All' || contract.status.toLowerCase() === filter.toLowerCase().replace(' ', '_');
    const matchesSearch = searchTerm === '' || 
      contract.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contract.client_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contract.freelancer_name.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  const refreshData = () => {
    fetchContracts();
    fetchStats();
  };

  const handleCreateContract = () => {
    setIsCreateModalOpen(true);
  };

  const handleContractCreated = (newContract) => {
    setContracts(prev => [newContract, ...prev]);
    fetchStats();
    
    // Send notification for new contract
    notifyContractCreated(newContract);
  };

  const handleCloseModal = () => {
    setIsCreateModalOpen(false);
  };

  return (
    <main className="flex-1 overflow-y-auto p-3 sm:p-4 lg:p-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4 lg:mb-6">
          <div className="flex items-center gap-3">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">Contracts</h2>
            <button
              onClick={refreshData}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              title="Refresh data"
            >
              <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
          <button 
            onClick={handleCreateContract}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium text-sm sm:text-base shadow-sm"
          >
            + New Contract
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center">
              <AlertCircle className="w-5 h-5 text-red-400 mr-2" />
              <p className="text-red-800">{error}</p>
            </div>
          </div>
        )}

        {/* Stats Overview - Responsive Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4 lg:mb-6">
        {/* Stats Overview - Responsive Grid (3 equal cards) */}
        {/* grid-cols-1 on xs, grid-cols-3 on sm and above ensures equal spacing */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-4 lg:mb-6">
          <StatsCard 
            title="Active Contracts" 
            value={stats.activeContracts} 
            icon={FileText}
            color="indigo"
            loading={loading}
          />
          <StatsCard 
            title="Total Earnings" 
            value={stats.totalEarnings} 
            icon={DollarSign}
            color="green"
            loading={loading}
          />

          {/* If you have 'total spent' available from backend, replace the value below.
              Otherwise this card can be removed or show placeholder like "$0". */}
          <StatsCard 
            title="Pending Payments" 
            value={stats.pendingPayments} 
            icon={Clock}
            color="yellow"
            loading={loading}
          />

          <StatsCard 
            title="Completed" 
            value={stats.completedProjects} 
            icon={CheckCircle}
            color="blue"
            loading={loading}
          />
        </div>

        {/* Search and Filter */}
        <div className="mb-4 flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search contracts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-600" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              {filters.map(f => (
                <option key={f} value={f}>{f}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
          {/* Left Side - Contract List */}
          <div className="w-full lg:w-2/5 xl:w-1/3">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              {/* Filter Tabs */}
              <div className="border-b border-gray-200 bg-gray-50 p-3">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Contract List</h3>
                  <span className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded-full">
                    {filteredContracts.length} contracts
                  </span>
                </div>
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                  {filters.map((f) => (
                    <button
                      key={f}
                      onClick={() => setFilter(f)}
                      className={`px-3 py-1.5 rounded-md font-medium transition-colors whitespace-nowrap text-xs sm:text-sm ${
                        filter === f
                          ? 'bg-indigo-600 text-white shadow-sm'
                          : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              {/* Contract Items */}
              <div className="max-h-[600px] overflow-y-auto">
                {loading ? (
                  <ContractListSkeleton />
                ) : filteredContracts.length === 0 ? (
                  <div className="text-center py-12 px-4">
                    <AlertCircle className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-sm sm:text-base text-gray-600">No contracts found</p>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-200">
                    {filteredContracts.map((contract) => (
                      <ContractListItem
                        key={contract.id}
                        contract={contract}
                        isSelected={selectedContract?.id === contract.id}
                        onClick={() => handleContractSelect(contract)}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Side - Contract Details */}
          <div className="w-full lg:w-3/5 xl:w-2/3 space-y-6">
            {selectedContract ? (
              <>
                <ContractDetails
                  contract={selectedContract}
                  onStatusUpdate={handleStatusUpdate}
                  onPayment={handlePayment}
                />
                <ContractActivityTimeline
                  contractId={selectedContract.id}
                  className="mt-6"
                />
                
                {/* Payment Tracking */}
                <ContractPaymentTracker
                  contract={selectedContract}
                  onPaymentUpdate={(updatedContract) => {
                    setContracts(prev => prev.map(c => c.id === updatedContract.id ? updatedContract : c));
                    setSelectedContract(updatedContract);
                    fetchStats();
                  }}
                  className="mt-6"
                />
                
                {/* Contract Milestones */}
                <ContractMilestones
                  contract={selectedContract}
                  onMilestoneUpdate={(updatedMilestone) => {
                    // Update the contract with the new milestone data
                    const updatedContract = {
                      ...selectedContract,
                      milestones: selectedContract.milestones.map(m => 
                        m.id === updatedMilestone.id ? updatedMilestone : m
                      )
                    };
                    setSelectedContract(updatedContract);
                  }}
                  className="mt-6"
                />
                
                {/* Contract Document Generator */}
                <ContractDocumentGenerator
                  contract={selectedContract}
                  className="mt-6"
                />
              </>
            ) : (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
                <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-lg text-gray-600">Select a contract to view details</p>
              </div>
            )}
          </div>
        </div>

        {/* Contract Creation Modal */}
        <ContractCreationModal
          isOpen={isCreateModalOpen}
          onClose={handleCloseModal}
          onContractCreated={handleContractCreated}
        />
      </div>
    </main>
  );
};

export default Contracts;
