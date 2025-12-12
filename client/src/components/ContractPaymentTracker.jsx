import React, { useState } from 'react';
import { DollarSign, CreditCard, Wallet, AlertCircle, CheckCircle } from 'lucide-react';
import { contractService } from '../services/contractService';

const ContractPaymentTracker = ({ contract, onPaymentUpdate, className = '' }) => {
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [paymentType, setPaymentType] = useState('direct'); // 'direct' or 'escrow'
  const [paymentAmount, setPaymentAmount] = useState('');
  const [paymentNote, setPaymentNote] = useState('');
  const [selectedMilestone, setSelectedMilestone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Return early if contract is null or undefined
  if (!contract) {
    return (
      <div className={`bg-white rounded-lg shadow-sm border border-gray-200 p-6 ${className}`}>
        <div className="text-center text-gray-500">
          <DollarSign className="w-8 h-8 mx-auto mb-2 text-gray-400" />
          <p>No contract data available</p>
        </div>
      </div>
    );
  }

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const paymentData = {
        amount: parseFloat(paymentAmount),
        payment_type: paymentType,
        note: paymentNote,
        ...(selectedMilestone && { milestone_id: parseInt(selectedMilestone) })
      };

      const updatedContract = await contractService.makePayment(contract.id, paymentData);
      
      // Reset form
      setPaymentAmount('');
      setPaymentNote('');
      setSelectedMilestone('');
      setShowPaymentForm(false);
      
      // Notify parent component
      if (onPaymentUpdate) {
        onPaymentUpdate(updatedContract);
      }
    } catch (err) {
      setError(err.message || 'Payment failed');
    } finally {
      setLoading(false);
    }
  };

  const handleEscrowRelease = async () => {
    setLoading(true);
    setError(null);

    try {
      const updatedContract = await contractService.releaseEscrow(contract.id, {
        amount: contract.amount_in_escrow
      });
      
      if (onPaymentUpdate) {
        onPaymentUpdate(updatedContract);
      }
    } catch (err) {
      setError(err.message || 'Failed to release escrow');
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    if (amount === null || amount === undefined || isNaN(amount)) {
      return '$0.00';
    }
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const getPaymentProgress = () => {
    if (!contract?.total_amount || contract.total_amount === 0) return 0;
    return Math.round((contract.amount_paid / contract.total_amount) * 100);
  };

  const getEscrowProgress = () => {
    if (!contract?.total_amount || contract.total_amount === 0) return 0;
    return Math.round((contract.amount_in_escrow / contract.total_amount) * 100);
  };

  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Payment Tracking</h3>
        {contract?.status === 'active' && (
          <button
            onClick={() => setShowPaymentForm(!showPaymentForm)}
            className="flex items-center gap-2 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
          >
            <DollarSign className="w-4 h-4" />
            Make Payment
          </button>
        )}
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {error}
        </div>
      )}

      {/* Payment Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-indigo-50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-indigo-700">Total Amount</span>
            <DollarSign className="w-5 h-5 text-indigo-600" />
          </div>
          <p className="text-2xl font-bold text-indigo-900">{formatCurrency(contract.total_amount)}</p>
        </div>
        
        <div className="bg-green-50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-green-700">Amount Paid</span>
            <CheckCircle className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-2xl font-bold text-green-900">{formatCurrency(contract.amount_paid)}</p>
        </div>
        
        <div className="bg-orange-50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-orange-700">Remaining</span>
            <Wallet className="w-5 h-5 text-orange-600" />
          </div>
          <p className="text-2xl font-bold text-orange-900">{formatCurrency(contract.remaining_amount)}</p>
        </div>
      </div>

      {/* Payment Progress */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-700 mb-2">
          <span className="font-semibold">Payment Progress</span>
          <span className="font-bold">{getPaymentProgress()}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className="bg-green-500 h-3 rounded-full transition-all duration-300"
            style={{ width: `${getPaymentProgress()}%` }}
          />
        </div>
      </div>

      {/* Escrow Balance */}
      {contract.amount_in_escrow > 0 && (
        <div className="mb-6 p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-blue-700">In Escrow</span>
            <Wallet className="w-5 h-5 text-blue-600" />
          </div>
          <div className="flex items-center justify-between">
            <p className="text-xl font-bold text-blue-900">{formatCurrency(contract.amount_in_escrow)}</p>
            <button
              onClick={handleEscrowRelease}
              disabled={loading}
              className="px-3 py-1.5 bg-blue-600 text-white rounded text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              Release to Freelancer
            </button>
          </div>
          <div className="mt-2">
            <div className="flex justify-between text-xs text-blue-700 mb-1">
              <span>Escrow Progress</span>
              <span>{getEscrowProgress()}%</span>
            </div>
            <div className="w-full bg-blue-200 rounded-full h-2">
              <div 
                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${getEscrowProgress()}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Payment Form */}
      {showPaymentForm && (
        <form onSubmit={handlePayment} className="mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Payment Type</label>
              <select
                value={paymentType}
                onChange={(e) => setPaymentType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                <option value="direct">Direct Payment</option>
                <option value="escrow">Pay to Escrow</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
              <input
                type="number"
                step="0.01"
                value={paymentAmount}
                onChange={(e) => setPaymentAmount(e.target.value)}
                max={contract.remaining_amount}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                required
              />
            </div>
          </div>

          {contract.milestones && contract.milestones.length > 0 && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Link to Milestone (Optional)</label>
              <select
                value={selectedMilestone}
                onChange={(e) => setSelectedMilestone(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                <option value="">No specific milestone</option>
                {contract.milestones
                  .filter(m => m.status === 'approved')
                  .map(milestone => (
                    <option key={milestone.id} value={milestone.id}>
                      {milestone.title} - {formatCurrency(milestone.amount)}
                    </option>
                  ))}
              </select>
            </div>
          )}

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Note (Optional)</label>
            <textarea
              value={paymentNote}
              onChange={(e) => setPaymentNote(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              rows={2}
              placeholder="Add a note about this payment..."
            />
          </div>

          <div className="flex gap-2">
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium disabled:opacity-50"
            >
              {loading ? 'Processing...' : 'Make Payment'}
            </button>
            <button
              type="button"
              onClick={() => setShowPaymentForm(false)}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors font-medium"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Payment History */}
      {contract.activities && contract.activities.filter(a => a.activity_type === 'payment_made').length > 0 && (
        <div className="border-t border-gray-200 pt-4">
          <h4 className="text-sm font-semibold text-gray-700 mb-3">Recent Payments</h4>
          <div className="space-y-2">
            {contract.activities
              .filter(a => a.activity_type === 'payment_made')
              .slice(0, 3)
              .map((activity, index) => (
                <div key={index} className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-gray-700">{activity.description}</span>
                  </div>
                  <span className="text-xs text-gray-500">
                    {new Date(activity.created_at).toLocaleDateString()}
                  </span>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ContractPaymentTracker;