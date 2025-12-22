const API_BASE_URL = 'http://localhost:8000/api';

const getAuthHeaders = () => {
  const token = localStorage.getItem('authToken');
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
};

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || 'Request failed');
  }
  return response.json();
};

export const proposalService = {
  getProposals: async (filters = {}) => {
    const queryParams = new URLSearchParams();
    Object.keys(filters).forEach(key => {
      if (filters[key]) queryParams.append(key, filters[key]);
    });
    const url = `${API_BASE_URL}/proposals/${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
    const response = await fetch(url, { headers: getAuthHeaders() });
    return handleResponse(response);
  },

  getProposal: async (proposalId) => {
    const response = await fetch(`${API_BASE_URL}/proposals/${proposalId}/`, {
      headers: getAuthHeaders()
    });
    return handleResponse(response);
  },

  getAcceptedProposals: async () => {
    return proposalService.getProposals({ status: 'accepted' });
  },

  updateProposalStatus: async (proposalId, statusData) => {
    const response = await fetch(`${API_BASE_URL}/proposals/${proposalId}/update-status/`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(statusData)
    });
    return handleResponse(response);
  },

  acceptProposal: async (proposalId) => {
    return proposalService.updateProposalStatus(proposalId, { status: 'accepted' });
  },

  rejectProposal: async (proposalId) => {
    return proposalService.updateProposalStatus(proposalId, { status: 'rejected' });
  }
};

export default proposalService;