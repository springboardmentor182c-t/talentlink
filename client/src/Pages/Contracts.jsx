import React, { useState } from 'react';
import { DollarSign, Clock, CheckCircle, FileText, AlertCircle, Calendar, Download, Eye } from 'lucide-react';

// Mock Data (updated: removed totalEarnings)
const mockContractsData = {
  stats: {
    activeContracts: 8,
    // totalEarnings removed on purpose for client view
    pendingPayments: '$3,500',
    completedProjects: 24
  },
  contracts: [
    {
      id: 1,
      title: 'E-commerce Website Development',
      client: 'TechCorp Inc.',
      clientAvatar: 'TC',
      status: 'Active',
      type: 'Fixed Price',
      amount: '$5,000',
      paid: '$2,500',
      progress: 50,
      startDate: '2024-01-15',
      endDate: '2024-03-15',
      description: 'Full-stack development of e-commerce platform with payment integration'
    },
    {
      id: 2,
      title: 'Mobile App UI/UX Design',
      client: 'StartupXYZ',
      clientAvatar: 'SX',
      status: 'Active',
      type: 'Hourly',
      amount: '$50/hr',
      paid: '$1,800',
      progress: 75,
      startDate: '2024-02-01',
      endDate: '2024-02-28',
      description: 'Design modern and intuitive mobile app interface'
    },
    {
      id: 3,
      title: 'Backend API Development',
      client: 'DataFlow Systems',
      clientAvatar: 'DF',
      status: 'In Review',
      type: 'Fixed Price',
      amount: '$3,200',
      paid: '$3,200',
      progress: 100,
      startDate: '2024-01-10',
      endDate: '2024-02-10',
      description: 'RESTful API development with authentication and database integration'
    },
    {
      id: 4,
      title: 'WordPress Website Customization',
      client: 'Creative Agency',
      clientAvatar: 'CA',
      status: 'Completed',
      type: 'Fixed Price',
      amount: '$1,500',
      paid: '$1,500',
      progress: 100,
      startDate: '2023-12-01',
      endDate: '2024-01-05',
      description: 'Custom WordPress theme development and plugin integration'
    },
    {
      id: 5,
      title: 'Data Analytics Dashboard',
      client: 'FinTech Pro',
      clientAvatar: 'FP',
      status: 'Active',
      type: 'Hourly',
      amount: '$65/hr',
      paid: '$4,550',
      progress: 60,
      startDate: '2024-01-20',
      endDate: '2024-03-30',
      description: 'Build interactive analytics dashboard with real-time data visualization'
    },
    {
      id: 6,
      title: 'Logo Redesign Project',
      client: 'Brand Studio',
      clientAvatar: 'BS',
      status: 'Cancelled',
      type: 'Fixed Price',
      amount: '$800',
      paid: '$0',
      progress: 0,
      startDate: '2024-02-15',
      endDate: '2024-03-01',
      description: 'Modern logo redesign for corporate rebranding initiative'
    }
  ]
};

// Stats Card Component (unchanged)
const StatsCard = ({ title, value, icon: Icon, color = "indigo" }) => {
  const colorClasses = {
    indigo: 'bg-indigo-50 text-indigo-600',
    green: 'bg-green-50 text-green-600',
    yellow: 'bg-yellow-50 text-yellow-600',
    blue: 'bg-blue-50 text-blue-600'
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 sm:p-6 border border-gray-200">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-gray-600 text-xs sm:text-sm font-medium mb-1 sm:mb-2">{title}</h3>
          <p className="text-2xl sm:text-3xl font-bold text-gray-900">{value}</p>
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

// Contracts Component (updated grid layout)
const Contracts = () => {
  const [filter, setFilter] = useState('All');
  const [selectedContract, setSelectedContract] = useState(mockContractsData.contracts[0]);
  const filters = ['All', 'Active', 'In Review', 'Completed', 'Cancelled'];

  const filteredContracts = filter === 'All' 
    ? mockContractsData.contracts 
    : mockContractsData.contracts.filter(c => c.status === filter);

  return (
    <main className="flex-1 overflow-y-auto p-3 sm:p-4 lg:p-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4 lg:mb-6">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">Contracts</h2>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium text-sm sm:text-base shadow-sm">
            + New Contract
          </button>
        </div>

        {/* Stats Overview - Responsive Grid (3 equal cards) */}
        {/* grid-cols-1 on xs, grid-cols-3 on sm and above ensures equal spacing */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-4 lg:mb-6">
          <StatsCard 
            title="Active" 
            value={mockContractsData.stats.activeContracts} 
            icon={FileText}
            color="indigo"
          />

          {/* If you have 'total spent' available from backend, replace the value below.
              Otherwise this card can be removed or show placeholder like "$0". */}
          <StatsCard 
            title="Pending" 
            value={mockContractsData.stats.pendingPayments} 
            icon={Clock}
            color="yellow"
          />

          <StatsCard 
            title="Completed" 
            value={mockContractsData.stats.completedProjects} 
            icon={CheckCircle}
            color="blue"
          />
        </div>

        {/* Main Content Area */}
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
          {/* Left Side - Contract List */}
          <div className="w-full lg:w-2/5 xl:w-1/3">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              {/* Filter Tabs */}
              <div className="border-b border-gray-200 bg-gray-50 p-3">
                <h3 className="font-semibold text-gray-900 mb-3 text-sm sm:text-base">Contract List</h3>
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
              <div className="divide-y divide-gray-200 max-h-[600px] overflow-y-auto">
                {filteredContracts.map((contract) => (
                  <div
                    key={contract.id}
                    onClick={() => setSelectedContract(contract)}
                    className={`p-4 cursor-pointer transition-colors hover:bg-gray-50 ${
                      selectedContract?.id === contract.id ? 'bg-indigo-50 border-l-4 border-indigo-600' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-900 text-sm sm:text-base truncate">
                          {contract.title}
                        </h4>
                        <p className="text-xs sm:text-sm text-gray-600 mt-1">
                          Freelancer: <span className="font-medium">{contract.client}</span>
                        </p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold flex-shrink-0 ml-2 ${
                        contract.status === 'Active' ? 'bg-green-100 text-green-800' :
                        contract.status === 'In Review' ? 'bg-yellow-100 text-yellow-800' :
                        contract.status === 'Completed' ? 'bg-blue-100 text-blue-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {contract.status}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between text-xs sm:text-sm text-gray-600 mt-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span className="hidden sm:inline">Start:</span> {contract.startDate}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between text-xs sm:text-sm mt-2">
                      <span className="text-gray-600">
                        <span className="hidden sm:inline">End:</span> {contract.endDate}
                      </span>
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                        contract.type === 'Fixed Price' ? 'bg-indigo-100 text-indigo-700' : 'bg-purple-100 text-purple-700'
                      }`}>
                        {contract.type}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {filteredContracts.length === 0 && (
                <div className="text-center py-12 px-4">
                  <AlertCircle className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-sm sm:text-base text-gray-600">No contracts found</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Side - Contract Details */}
          <div className="w-full lg:w-3/5 xl:w-2/3">
            {selectedContract ? (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                      Contract Details
                    </h2>
                    <p className="text-sm text-gray-600">
                      Contract ID: <span className="font-mono font-semibold">#{selectedContract.id.toString().padStart(4, '0')}</span>
                    </p>
                  </div>
                  <button className="px-3 sm:px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium text-sm">
                    End Contract
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Project Name */}
                  <div>
                    <label className="text-sm font-semibold text-gray-700 mb-2 block">Project Name:</label>
                    <p className="text-base sm:text-lg text-gray-900">{selectedContract.title}</p>
                  </div>

                  {/* Client */}
                  <div>
                    <label className="text-sm font-semibold text-gray-700 mb-2 block">Client:</label>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold">
                        {selectedContract.clientAvatar}
                      </div>
                      <p className="text-base sm:text-lg text-gray-900">{selectedContract.client}</p>
                    </div>
                  </div>

                  {/* Freelancer */}
                  <div>
                    <label className="text-sm font-semibold text-gray-700 mb-2 block">Freelancer:</label>
                    <p className="text-base sm:text-lg text-gray-900">John Anderson</p>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="text-sm font-semibold text-gray-700 mb-2 block">Description:</label>
                    <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{selectedContract.description}</p>
                  </div>

                  {/* Dates */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-semibold text-gray-700 mb-2 block">Start Date:</label>
                      <p className="text-base text-gray-900">{selectedContract.startDate}</p>
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-gray-700 mb-2 block">End Date:</label>
                      <p className="text-base text-gray-900">{selectedContract.endDate}</p>
                    </div>
                  </div>

                  {/* Payment */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-semibold text-gray-700 mb-2 block">Payment:</label>
                      <p className="text-xl sm:text-2xl font-bold text-indigo-600">{selectedContract.amount}</p>
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-gray-700 mb-2 block">Amount Paid:</label>
                      <p className="text-xl sm:text-2xl font-bold text-green-600">{selectedContract.paid}</p>
                    </div>
                  </div>

                  {/* Status */}
                  <div>
                    <label className="text-sm font-semibold text-gray-700 mb-2 block">Status:</label>
                    <span className={`inline-block px-4 py-2 rounded-lg text-sm font-semibold ${
                      selectedContract.status === 'Active' ? 'bg-green-100 text-green-800' :
                      selectedContract.status === 'In Review' ? 'bg-yellow-100 text-yellow-800' :
                      selectedContract.status === 'Completed' ? 'bg-blue-100 text-blue-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {selectedContract.status}
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div>
                    <div className="flex justify-between text-sm text-gray-700 mb-2">
                      <span className="font-semibold">Progress</span>
                      <span className="font-bold">{selectedContract.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className="bg-gradient-to-r from-indigo-500 to-purple-600 h-3 rounded-full transition-all duration-300"
                        style={{ width: `${selectedContract.progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
                    <button className="flex-1 px-4 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium flex items-center justify-center gap-2">
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
            ) : (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 sm:p-12 text-center">
                <FileText className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-base sm:text-lg text-gray-600">Select a contract to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Contracts;
