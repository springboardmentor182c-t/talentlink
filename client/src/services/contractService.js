// Contract API service functions
const API_BASE_URL = 'http://localhost:8000/api/contracts';

// Helper function to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem('authToken');
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Token ${token}` })
  };
};

// Helper function to handle API responses
const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'An error occurred' }));
    throw new Error(error.detail || error.message || 'An error occurred');
  }
  return response.json();
};

// Contract CRUD operations
export const contractService = {
  // Get all contracts with optional filters
  getContracts: async (filters = {}) => {
    const queryParams = new URLSearchParams();
    Object.keys(filters).forEach(key => {
      if (filters[key]) {
        queryParams.append(key, filters[key]);
      }
    });
    
    const url = `${API_BASE_URL}/contracts/${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
    const response = await fetch(url, {
      headers: getAuthHeaders()
    });
    return handleResponse(response);
  },

  // Get single contract by ID
  getContract: async (contractId) => {
    const response = await fetch(`${API_BASE_URL}/contracts/${contractId}/`, {
      headers: getAuthHeaders()
    });
    return handleResponse(response);
  },

  // Create a new contract
  createContract: async (contractData) => {
    const response = await fetch(`${API_BASE_URL}/contracts/`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(contractData)
    });
    return handleResponse(response);
  },

  // Update contract
  updateContract: async (contractId, contractData) => {
    const response = await fetch(`${API_BASE_URL}/contracts/${contractId}/`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(contractData)
    });
    return handleResponse(response);
  },

  // Partial update contract
  patchContract: async (contractId, contractData) => {
    const response = await fetch(`${API_BASE_URL}/contracts/${contractId}/`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify(contractData)
    });
    return handleResponse(response);
  },

  // Delete contract
  deleteContract: async (contractId) => {
    const response = await fetch(`${API_BASE_URL}/contracts/${contractId}/`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    if (!response.ok) {
      const error = await response.json().catch(() => ({ detail: 'An error occurred' }));
      throw new Error(error.detail || error.message || 'An error occurred');
    }
    return true;
  },

  // Create contract from accepted proposal
  createContractFromProposal: async (proposalData) => {
    const response = await fetch(`${API_BASE_URL}/contracts/create-from-proposal/`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(proposalData)
    });
    return handleResponse(response);
  },

  // Update contract status
  updateContractStatus: async (contractId, statusData) => {
    const response = await fetch(`${API_BASE_URL}/contracts/${contractId}/update-status/`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(statusData)
    });
    return handleResponse(response);
  },

  // Make payment
  makePayment: async (contractId, paymentData) => {
    const response = await fetch(`${API_BASE_URL}/contracts/${contractId}/make-payment/`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(paymentData)
    });
    return handleResponse(response);
  },

  // Release escrow
  releaseEscrow: async (contractId, releaseData) => {
    const response = await fetch(`${API_BASE_URL}/contracts/${contractId}/release-escrow/`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(releaseData)
    });
    return handleResponse(response);
  },

  // Get contract activities
  getContractActivities: async (contractId) => {
    const response = await fetch(`${API_BASE_URL}/contracts/${contractId}/activities/`, {
      headers: getAuthHeaders()
    });
    return handleResponse(response);
  },

  // Add milestone
  addMilestone: async (contractId, milestoneData) => {
    const response = await fetch(`${API_BASE_URL}/contracts/${contractId}/add-milestone/`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(milestoneData)
    });
    return handleResponse(response);
  },

  // Download contract
  downloadContract: async (contractId) => {
    const response = await fetch(`${API_BASE_URL}/contracts/${contractId}/download/`, {
      headers: getAuthHeaders()
    });
    return handleResponse(response);
  },

  // Milestone operations
  milestones: {
    // Get all milestones
    getMilestones: async () => {
      const response = await fetch(`${API_BASE_URL}/milestones/`, {
        headers: getAuthHeaders()
      });
      return handleResponse(response);
    },

    // Get single milestone
    getMilestone: async (milestoneId) => {
      const response = await fetch(`${API_BASE_URL}/milestones/${milestoneId}/`, {
        headers: getAuthHeaders()
      });
      return handleResponse(response);
    },

    // Complete milestone
    completeMilestone: async (milestoneId) => {
      const response = await fetch(`${API_BASE_URL}/milestones/${milestoneId}/complete/`, {
        method: 'POST',
        headers: getAuthHeaders()
      });
      return handleResponse(response);
    },

    // Approve milestone
    approveMilestone: async (milestoneId) => {
      const response = await fetch(`${API_BASE_URL}/milestones/${milestoneId}/approve/`, {
        method: 'POST',
        headers: getAuthHeaders()
      });
      return handleResponse(response);
    }
  }
};

// Contract statistics and analytics
export const contractStatsService = {
  // Get contract statistics
  getStats: async () => {
    const contracts = await contractService.getContracts();
    
    const activeContracts = contracts.filter(c => c.status === 'active').length;
    const completedContracts = contracts.filter(c => c.status === 'completed').length;
    const totalEarnings = contracts
      .filter(c => c.status === 'completed')
      .reduce((sum, c) => sum + parseFloat(c.total_amount), 0);
    const pendingPayments = contracts
      .filter(c => ['active', 'in_review'].includes(c.status))
      .reduce((sum, c) => sum + parseFloat(c.remaining_amount), 0);

    return {
      activeContracts,
      completedContracts,
      totalEarnings: `$${totalEarnings.toLocaleString()}`,
      pendingPayments: `$${pendingPayments.toLocaleString()}`
    };
  },

  // Get contract status distribution
  getStatusDistribution: async () => {
    const contracts = await contractService.getContracts();
    const distribution = {};
    
    contracts.forEach(contract => {
      distribution[contract.status] = (distribution[contract.status] || 0) + 1;
    });

    return distribution;
  },

  // Get recent contracts
  getRecentContracts: async (limit = 5) => {
    const contracts = await contractService.getContracts();
    return contracts.slice(0, limit);
  }
};

export default contractService;