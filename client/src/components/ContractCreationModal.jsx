import React, { useState, useEffect } from 'react';
import { X, Calendar, DollarSign, User, FileText, AlertCircle, CheckCircle } from 'lucide-react';
import { proposalService } from '../services/proposalService';
import { contractService } from '../services/contractService';

const ContractCreationModal = ({ isOpen, onClose, onContractCreated }) => {
  const [step, setStep] = useState(1);
  const [acceptedProposals, setAcceptedProposals] = useState([]);
  const [selectedProposal, setSelectedProposal] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    proposal_id: '',
    start_date: '',
    end_date: '',
    expected_delivery_date: '',
    requirements: '',
    deliverables: '',
    terms_and_conditions: ''
  });

  useEffect(() => {
    if (isOpen) {
      fetchAcceptedProposals();
    }
  }, [isOpen]);

  const fetchAcceptedProposals = async () => {
    setLoading(true);
    setError(null);
    try {
      const proposals = await proposalService.getAcceptedProposals();
      setAcceptedProposals(proposals);
    } catch (err) {
      console.error('Failed to fetch accepted proposals:', err);
      setError('Failed to load accepted proposals. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleProposalSelect = (proposal) => {
    setSelectedProposal(proposal);
    setFormData(prev => ({ ...prev, proposal_id: proposal.id }));
    setStep(2);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      // Validate dates
      if (new Date(formData.start_date) >= new Date(formData.end_date)) {
        setError('End date must be after start date.');
        return;
      }

      const newContract = await contractService.createContractFromProposal(formData);
      onContractCreated(newContract);
      resetForm();
      onClose();
    } catch (err) {
      console.error('Failed to create contract:', err);
      setError(err.message || 'Failed to create contract. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setStep(1);
    setSelectedProposal(null);
    setFormData({
      proposal_id: '',
      start_date: '',
      end_date: '',
      expected_delivery_date: '',
      requirements: '',
      deliverables: '',
      terms_and_conditions: ''
    });
    setError(null);
  };

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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Create New Contract</h2>
              <p className="text-sm text-gray-600">Step {step} of 2</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="px-6 pt-4">
          <div className="flex items-center gap-2">
            <div className={`flex items-center gap-2 ${step === 1 ? 'text-indigo-600' : 'text-gray-400'}`}>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-semibold ${
                step === 1 ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                1
              </div>
              <span className="text-sm font-medium">Select Proposal</span>
            </div>
            <div className="flex-1 h-px bg-gray-200 mx-2"></div>
            <div className={`flex items-center gap-2 ${step === 2 ? 'text-indigo-600' : 'text-gray-400'}`}>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-semibold ${
                step === 2 ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                2
              </div>
              <span className="text-sm font-medium">Contract Details</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-500" />
              <p className="text-red-800 text-sm">{error}</p>
            </div>
          )}

          {step === 1 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Accepted Proposal</h3>
              
              {loading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="p-4 border border-gray-200 rounded-lg animate-pulse">
                      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                    </div>
                  ))}
                </div>
              ) : acceptedProposals.length === 0 ? (
                <div className="text-center py-12">
                  <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-2">No accepted proposals found</p>
                  <p className="text-sm text-gray-500">You need to accept a proposal first before creating a contract.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {acceptedProposals.map((proposal) => (
                    <div
                      key={proposal.id}
                      onClick={() => handleProposalSelect(proposal)}
                      className="p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:bg-indigo-50 cursor-pointer transition-all"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 mb-1">{proposal.project_title}</h4>
                          <p className="text-sm text-gray-600 line-clamp-2">{proposal.description}</p>
                        </div>
                        <div className="flex items-center gap-2 ml-4">
                          <DollarSign className="w-4 h-4 text-green-600" />
                          <span className="font-semibold text-green-600">
                            {formatCurrency(proposal.bid_amount)}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4" />
                          <span>{proposal.freelancer_name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(proposal.created_at)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {step === 2 && selectedProposal && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="w-5 h-5 text-indigo-600" />
                  <h4 className="font-semibold text-indigo-900">Selected Proposal</h4>
                </div>
                <p className="text-indigo-800 font-medium">{selectedProposal.project_title}</p>
                <p className="text-indigo-700 text-sm">{selectedProposal.freelancer_name} • {formatCurrency(selectedProposal.bid_amount)}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Start Date *
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="date"
                      name="start_date"
                      value={formData.start_date}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    End Date *
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="date"
                      name="end_date"
                      value={formData.end_date}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Expected Delivery Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="date"
                    name="expected_delivery_date"
                    value={formData.expected_delivery_date}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Requirements
                </label>
                <textarea
                  name="requirements"
                  value={formData.requirements}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Describe the project requirements..."
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Deliverables
                </label>
                <textarea
                  name="deliverables"
                  value={formData.deliverables}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="List the expected deliverables..."
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Terms and Conditions
                </label>
                <textarea
                  name="terms_and_conditions"
                  value={formData.terms_and_conditions}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Enter terms and conditions..."
                />
              </div>
            </form>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors font-medium"
          >
            Cancel
          </button>
          
          <div className="flex items-center gap-3">
            {step === 2 && (
              <button
                onClick={() => setStep(1)}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors font-medium"
              >
                Back
              </button>
            )}
            
            {step === 2 && (
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium disabled:opacity-50"
              >
                {loading ? 'Creating...' : 'Create Contract'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContractCreationModal;