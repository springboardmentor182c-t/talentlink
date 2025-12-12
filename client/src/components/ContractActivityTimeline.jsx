import React, { useState, useEffect } from 'react';
import { Clock, CheckCircle, DollarSign, FileText, AlertCircle, User, Calendar, Package, XCircle } from 'lucide-react';
import { contractService } from '../services/contractService';

const ContractActivityTimeline = ({ contractId, className = '' }) => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (contractId) {
      fetchActivities();
    }
  }, [contractId]);

  const fetchActivities = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await contractService.getContractActivities(contractId);
      setActivities(data);
    } catch (err) {
      console.error('Failed to fetch activities:', err);
      setError('Failed to load activity timeline');
    } finally {
      setLoading(false);
    }
  };

  const getActivityIcon = (activityType) => {
    const iconProps = { className: "w-4 h-4" };
    
    switch (activityType) {
      case 'created':
        return <FileText {...iconProps} />;
      case 'status_changed':
        return <CheckCircle {...iconProps} />;
      case 'payment_made':
        return <DollarSign {...iconProps} />;
      case 'milestone_completed':
        return <Package {...iconProps} />;
      case 'milestone_approved':
        return <CheckCircle {...iconProps} />;
      case 'contract_completed':
        return <CheckCircle {...iconProps} />;
      case 'contract_cancelled':
        return <XCircle {...iconProps} />;
      case 'contract_disputed':
        return <AlertCircle {...iconProps} />;
      case 'note_added':
        return <FileText {...iconProps} />;
      default:
        return <Clock {...iconProps} />;
    }
  };

  const getActivityColor = (activityType) => {
    switch (activityType) {
      case 'created':
        return 'bg-blue-100 text-blue-600';
      case 'status_changed':
        return 'bg-green-100 text-green-600';
      case 'payment_made':
        return 'bg-emerald-100 text-emerald-600';
      case 'milestone_completed':
        return 'bg-purple-100 text-purple-600';
      case 'milestone_approved':
        return 'bg-green-100 text-green-600';
      case 'contract_completed':
        return 'bg-green-100 text-green-600';
      case 'contract_cancelled':
        return 'bg-red-100 text-red-600';
      case 'contract_disputed':
        return 'bg-orange-100 text-orange-600';
      case 'note_added':
        return 'bg-gray-100 text-gray-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const formatActivityTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const formatActivityType = (activityType) => {
    return activityType.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  if (loading) {
    return (
      <div className={`bg-white rounded-lg shadow-sm border border-gray-200 p-6 ${className}`}>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Activity Timeline</h3>
        <div className="animate-pulse">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex gap-4 mb-4">
              <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-48"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`bg-white rounded-lg shadow-sm border border-gray-200 p-6 ${className}`}>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Activity Timeline</h3>
        <div className="text-center py-8">
          <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-2" />
          <p className="text-red-600">{error}</p>
          <button 
            onClick={fetchActivities}
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (activities.length === 0) {
    return (
      <div className={`bg-white rounded-lg shadow-sm border border-gray-200 p-6 ${className}`}>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Activity Timeline</h3>
        <div className="text-center py-8">
          <Clock className="w-12 h-12 text-gray-400 mx-auto mb-2" />
          <p className="text-gray-600">No activity yet</p>
          <p className="text-sm text-gray-500 mt-1">Activities will appear here as the contract progresses</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 p-6 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Activity Timeline</h3>
        <button 
          onClick={fetchActivities}
          className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          title="Refresh activities"
        >
          <svg className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
      </div>
      
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex gap-4">
            <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${getActivityColor(activity.activity_type)}`}>
              {getActivityIcon(activity.activity_type)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-medium text-gray-900">
                  {formatActivityType(activity.activity_type)}
                </span>
                <span className="text-xs text-gray-500">
                  {formatActivityTime(activity.created_at)}
                </span>
              </div>
              <p className="text-sm text-gray-700">{activity.description}</p>
              <div className="flex items-center gap-2 mt-1">
                <User className="w-3 h-3 text-gray-400" />
                <span className="text-xs text-gray-500">{activity.user_name}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContractActivityTimeline;