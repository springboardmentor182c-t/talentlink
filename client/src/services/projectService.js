import axiosInstance from '../utils/axiosInstance';

const API_BASE = '/api/v1';

// PROJECT ENDPOINTS
export const projectService = {
  // Get all projects for the freelancer
  getAllProjects: async (status = null) => {
    try {
      const params = {};
      if (status) params.status = status;
      const response = await axiosInstance.get(`${API_BASE}/projects/`, { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching projects:', error);
      throw error;
    }
  },

  // Get a specific project
  getProjectById: async (id) => {
    try {
      const response = await axiosInstance.get(`${API_BASE}/projects/${id}/`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching project ${id}:`, error);
      throw error;
    }
  },

  // Create a new project
  createProject: async (projectData) => {
    try {
      const response = await axiosInstance.post(`${API_BASE}/projects/`, projectData);
      return response.data;
    } catch (error) {
      console.error('Error creating project:', error);
      throw error;
    }
  },

  // Update a project
  updateProject: async (id, projectData) => {
    try {
      const response = await axiosInstance.patch(`${API_BASE}/projects/${id}/`, projectData);
      return response.data;
    } catch (error) {
      console.error(`Error updating project ${id}:`, error);
      throw error;
    }
  },

  // Delete a project
  deleteProject: async (id) => {
    try {
      const response = await axiosInstance.delete(`${API_BASE}/projects/${id}/`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting project ${id}:`, error);
      throw error;
    }
  },

  // Get project statistics
  getProjectStats: async () => {
    try {
      const response = await axiosInstance.get(`${API_BASE}/projects/stats/`);
      return response.data;
    } catch (error) {
      console.error('Error fetching project stats:', error);
      throw error;
    }
  },
};

// PROPOSAL ENDPOINTS
export const proposalService = {
  // Get all proposals for the freelancer
  getAllProposals: async (status = null) => {
    try {
      const params = {};
      if (status) params.status = status;
      const response = await axiosInstance.get(`${API_BASE}/proposals/`, { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching proposals:', error);
      throw error;
    }
  },

  // Get a specific proposal
  getProposalById: async (id) => {
    try {
      const response = await axiosInstance.get(`${API_BASE}/proposals/${id}/`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching proposal ${id}:`, error);
      throw error;
    }
  },

  // Create a new proposal
  createProposal: async (proposalData) => {
    try {
      const response = await axiosInstance.post(`${API_BASE}/proposals/`, proposalData);
      return response.data;
    } catch (error) {
      console.error('Error creating proposal:', error);
      throw error;
    }
  },

  // Update a proposal
  updateProposal: async (id, proposalData) => {
    try {
      const response = await axiosInstance.patch(`${API_BASE}/proposals/${id}/`, proposalData);
      return response.data;
    } catch (error) {
      console.error(`Error updating proposal ${id}:`, error);
      throw error;
    }
  },

  // Update proposal status
  updateProposalStatus: async (id, status) => {
    try {
      const response = await axiosInstance.patch(`${API_BASE}/proposals/${id}/update_status/`, { status });
      return response.data;
    } catch (error) {
      console.error(`Error updating proposal status ${id}:`, error);
      throw error;
    }
  },

  // Delete a proposal
  deleteProposal: async (id) => {
    try {
      const response = await axiosInstance.delete(`${API_BASE}/proposals/${id}/`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting proposal ${id}:`, error);
      throw error;
    }
  },

  // Get client proposals
  getClientProposals: async (status = null) => {
    try {
      const params = {};
      if (status) params.status = status;
      const response = await axiosInstance.get(`${API_BASE}/proposals/client-proposals/`, { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching client proposals:', error);
      throw error;
    }
  },
};

// CONTRACT ENDPOINTS
export const contractService = {
  // Get all contracts
  getAllContracts: async (status = null, freelancer = null) => {
    try {
      const params = {};
      if (status) params.status = status;
      if (freelancer) params.freelancer = freelancer;
      const response = await axiosInstance.get(`${API_BASE}/contracts/`, { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching contracts:', error);
      throw error;
    }
  },

  // Get a specific contract
  getContractById: async (id) => {
    try {
      const response = await axiosInstance.get(`${API_BASE}/contracts/${id}/`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching contract ${id}:`, error);
      throw error;
    }
  },

  // Create contract from proposal
  createContractFromProposal: async (proposalId, contractData) => {
    try {
      const response = await axiosInstance.post(
        `${API_BASE}/contracts/create/${proposalId}/`,
        contractData
      );
      return response.data;
    } catch (error) {
      console.error(`Error creating contract from proposal ${proposalId}:`, error);
      throw error;
    }
  },

  // Update a contract
  updateContract: async (id, contractData) => {
    try {
      const response = await axiosInstance.patch(`${API_BASE}/contracts/${id}/update/`, contractData);
      return response.data;
    } catch (error) {
      console.error(`Error updating contract ${id}:`, error);
      throw error;
    }
  },
};

// ANALYTICS/DASHBOARD ENDPOINTS
export const analyticsService = {
  // Get dashboard statistics
  getDashboardStats: async () => {
    try {
      const response = await axiosInstance.get(`${API_BASE}/analytics/dashboard-stats/`);
      return response.data;
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      throw error;
    }
  },

  // Get project analytics
  getProjectAnalytics: async () => {
    try {
      const response = await axiosInstance.get(`${API_BASE}/analytics/projects/`);
      return response.data;
    } catch (error) {
      console.error('Error fetching project analytics:', error);
      throw error;
    }
  },

  // Get proposal analytics
  getProposalAnalytics: async () => {
    try {
      const response = await axiosInstance.get(`${API_BASE}/analytics/proposals/`);
      return response.data;
    } catch (error) {
      console.error('Error fetching proposal analytics:', error);
      throw error;
    }
  },

  // Get skills analytics
  getSkillsAnalytics: async () => {
    try {
      const response = await axiosInstance.get(`${API_BASE}/analytics/skills/`);
      return response.data;
    } catch (error) {
      console.error('Error fetching skills analytics:', error);
      throw error;
    }
  },
};
