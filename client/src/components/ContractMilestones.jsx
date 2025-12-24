import React, { useState } from 'react';
import { Plus, CheckCircle, Clock, DollarSign, Calendar, Edit3, Trash2 } from 'lucide-react';

const ContractMilestones = ({ contract, className = '' }) => {
  // Handle null contract
  if (!contract) {
    return (
      <div className={`bg-white rounded-lg shadow-sm border border-gray-200 p-6 ${className}`}>
        <div className="text-center text-gray-500">
          <Calendar className="w-8 h-8 mx-auto mb-2 text-gray-400" />
          <p>No contract data available</p>
        </div>
      </div>
    );
  }

  const [milestones, setMilestones] = useState(contract.milestones || []);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newMilestone, setNewMilestone] = useState({
    title: '',
    description: '',
    amount: '',
    due_date: '',
    status: 'pending'
  });

  const getStatusColor = (status) => {
    const colors = {
      completed: 'bg-green-100 text-green-800',
      in_progress: 'bg-blue-100 text-blue-800',
      pending: 'bg-yellow-100 text-yellow-800',
      overdue: 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getStatusIcon = (status) => {
    const icons = {
      completed: CheckCircle,
      in_progress: Clock,
      pending: Clock,
      overdue: Clock
    };
    return icons[status] || Clock;
  };

  const handleAddMilestone = (e) => {
    e.preventDefault();
    if (newMilestone.title && newMilestone.amount) {
      const milestone = {
        ...newMilestone,
        id: Date.now(),
        amount: parseFloat(newMilestone.amount)
      };
      setMilestones([...milestones, milestone]);
      setNewMilestone({
        title: '',
        description: '',
        amount: '',
        due_date: '',
        status: 'pending'
      });
      setShowAddForm(false);
    }
  };

  const handleStatusChange = (milestoneId, newStatus) => {
    setMilestones(milestones.map(milestone => 
      milestone.id === milestoneId 
        ? { ...milestone, status: newStatus }
        : milestone
    ));
  };

  const handleDeleteMilestone = (milestoneId) => {
    setMilestones(milestones.filter(milestone => milestone.id !== milestoneId));
  };

  const totalMilestoneAmount = milestones.reduce((sum, m) => sum + (m.amount || 0), 0);
  const completedMilestones = milestones.filter(m => m.status === 'completed').length;

  return (
    <div className={`bg-white rounded-lg shadow border border-gray-200 ${className}`}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Contract Milestones</h3>
            <p className="text-sm text-gray-600 mt-1">
              {completedMilestones} of {milestones.length} milestones completed
            </p>
          </div>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center px-3 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add Milestone
          </button>
        </div>

        {/* Milestone Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center">
              <DollarSign className="w-5 h-5 text-gray-400 mr-2" />
              <div>
                <p className="text-sm text-gray-600">Total Amount</p>
                <p className="text-lg font-semibold text-gray-900">
                  ${totalMilestoneAmount.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
              <div>
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-lg font-semibold text-gray-900">
                  {completedMilestones}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center">
              <Clock className="w-5 h-5 text-yellow-400 mr-2" />
              <div>
                <p className="text-sm text-gray-600">Remaining</p>
                <p className="text-lg font-semibold text-gray-900">
                  {milestones.length - completedMilestones}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Add Milestone Form */}
        {showAddForm && (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="text-md font-medium text-gray-900 mb-4">Add New Milestone</h4>
            <form onSubmit={handleAddMilestone} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title *
                  </label>
                  <input
                    type="text"
                    value={newMilestone.title}
                    onChange={(e) => setNewMilestone({...newMilestone, title: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Milestone title"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Amount *
                  </label>
                  <input
                    type="number"
                    value={newMilestone.amount}
                    onChange={(e) => setNewMilestone({...newMilestone, amount: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="0.00"
                    step="0.01"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={newMilestone.description}
                  onChange={(e) => setNewMilestone({...newMilestone, description: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Milestone description"
                  rows="2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Due Date
                </label>
                <input
                  type="date"
                  value={newMilestone.due_date}
                  onChange={(e) => setNewMilestone({...newMilestone, due_date: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                >
                  Add Milestone
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Milestones List */}
        <div className="space-y-4">
          {milestones.length === 0 ? (
            <div className="text-center py-8">
              <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No milestones yet</h3>
              <p className="text-gray-600">Add milestones to break down your contract into manageable phases.</p>
            </div>
          ) : (
            milestones.map((milestone) => {
              const StatusIcon = getStatusIcon(milestone.status);
              return (
                <div key={milestone.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <StatusIcon className="w-5 h-5 text-gray-400 mr-2" />
                        <h4 className="text-md font-medium text-gray-900">{milestone.title}</h4>
                      </div>
                      {milestone.description && (
                        <p className="text-sm text-gray-600 mb-3">{milestone.description}</p>
                      )}
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <DollarSign className="w-4 h-4 mr-1" />
                          ${milestone.amount?.toLocaleString()}
                        </div>
                        {milestone.due_date && (
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {new Date(milestone.due_date).toLocaleDateString()}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      <select
                        value={milestone.status}
                        onChange={(e) => handleStatusChange(milestone.id, e.target.value)}
                        className={`px-2 py-1 text-xs rounded-full border-0 ${getStatusColor(milestone.status)}`}
                      >
                        <option value="pending">Pending</option>
                        <option value="in_progress">In Progress</option>
                        <option value="completed">Completed</option>
                        <option value="overdue">Overdue</option>
                      </select>
                      <button
                        onClick={() => handleDeleteMilestone(milestone.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default ContractMilestones;