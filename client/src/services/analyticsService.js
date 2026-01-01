import api from './api';

export async function getProposalsPerProject(params = {}) {
  const res = await api.get('/api/projects/analytics/proposals-per-project/', { params });
  return res.data;
}

export async function getFreelancersPerSkill(params = {}) {
  const res = await api.get('/api/projects/analytics/freelancers-per-skill/', { params });
  return res.data;
}

export async function getProjectActivity(project_id) {
  const res = await api.get('/api/projects/analytics/project-activity/', { params: { project_id } });
  return res.data;
}

export default {
  getProposalsPerProject,
  getFreelancersPerSkill,
  getProjectActivity,
};
