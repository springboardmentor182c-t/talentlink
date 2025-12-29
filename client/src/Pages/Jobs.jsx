import React, { useState, useEffect } from 'react';
import { Search, DollarSign, Clock, MapPin, User, Gift } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import api from '../services/api';

function Jobs() {
  const navigate = useNavigate();
  const [selectedJob, setSelectedJob] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await api.get('/projects/');
        setJobs(Array.isArray(res.data) ? res.data : (res.data.results || []));
      } catch (err) {
        setError('Failed to load jobs');
      }
      setLoading(false);
    };
    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter(j => {
    const matchesSearch = (j.title?.toLowerCase().includes(searchTerm.toLowerCase()) || (j.client?.toLowerCase().includes(searchTerm.toLowerCase()) || ''));
    const matchesStatus = filterStatus === 'all' || (j.status?.toLowerCase() === filterStatus.toLowerCase());
    return matchesSearch && matchesStatus;
  });
  if (loading) {
    return (
      <div className="flex-1 p-6 bg-gray-100 min-h-screen flex items-center justify-center text-gray-500">
        Loading jobs...
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex-1 p-6 bg-gray-100 min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="flex-1 p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Jobs Available</h1>
      <p className="text-gray-600 mb-6">Find your dream job here</p>
      
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search jobs by title, client, or description..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm"
        />
      </div>
      
      <div className="flex space-x-3 mb-6">
        <button
          onClick={() => setFilterStatus('active')}
          className={`px-4 py-2 rounded-lg font-medium text-sm ${
            filterStatus === 'active' ? 'bg-emerald-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          On-Site
        </button>
        <button
          onClick={() => setFilterStatus('pending')}
          className={`px-4 py-2 rounded-lg font-medium text-sm ${
            filterStatus === 'pending' ? 'bg-emerald-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Remote
        </button>
        <button
          onClick={() => setFilterStatus('completed')}
          className={`px-4 py-2 rounded-lg font-medium text-sm ${
            filterStatus === 'completed' ? 'bg-emerald-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Hybrid
        </button>
      </div>

      <div className="space-y-4">
        {filteredJobs.map(job => (
          <div key={job.id} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6">
            <div className="flex flex-col lg:flex-row justify-between">
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <h3 className="text-xl font-semibold text-gray-800">{job.title}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    job.status === 'Open' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                  }`}>
                    {job.status}
                  </span>
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold">
                    {job.type}
                  </span>
                </div>

                <p className="text-gray-600 mb-4">{job.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {(
                    Array.isArray(job.skills)
                      ? job.skills
                      : typeof job.skills === 'string'
                        ? job.skills.split(',').map(s => s.trim()).filter(Boolean)
                        : []
                  ).map((skill, idx) => (
                    <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <DollarSign className="w-4 h-4 mr-1" />
                    <span>{job.budget}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{job.duration}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-1" />
                    <span>Client: {job.client_name || 'Unknown'}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-between mt-4 lg:mt-0 lg:ml-6">
                <div className="text-right mb-4">
                  <p className="text-sm text-gray-500">Posted by</p>
                  <p className="font-semibold text-gray-800">{job.client_name || 'Unknown'}</p>
                  <p className="text-xs text-gray-500 mt-1">{job.posted}</p>
                </div>
                <button
                  onClick={() => setSelectedJob(job)}
                  className="px-6 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors whitespace-nowrap"
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}

        {filteredJobs.length === 0 && (
          <div className="flex flex-col items-center justify-center py-10 bg-white rounded-lg shadow-sm">
            <Gift className="w-16 h-16 text-gray-400 mb-4" />
            <p className="text-xl font-semibold text-gray-700 mb-2">No jobs found</p>
            <p className="text-gray-500 mb-6">Try adjusting your search or filters.</p>
            <button
              onClick={() => navigate('/freelancer/find-work')}
              className="px-6 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
            >
              Find Work
            </button>
          </div>
        )}
      </div>

      {/* Job Detail Modal */}
      {selectedJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">{selectedJob.title}</h2>
                  <p className="text-gray-600">Posted by <span className="font-semibold">{selectedJob.client}</span></p>
                </div>
                <button
                  onClick={() => setSelectedJob(null)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-xs text-gray-500 mb-1">Budget</p>
                  <p className="font-semibold">{selectedJob.budget}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-xs text-gray-500 mb-1">Duration</p>
                  <p className="font-semibold">{selectedJob.duration}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-xs text-gray-500 mb-1">Proposals</p>
                  <p className="font-semibold">{selectedJob.proposals}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-xs text-gray-500 mb-1">Type</p>
                  <p className="font-semibold">{selectedJob.type}</p>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold mb-2">Description</h3>
                <p className="text-gray-600">{selectedJob.description}</p>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold mb-2">Required Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {(
                    Array.isArray(selectedJob.skills)
                      ? selectedJob.skills
                      : typeof selectedJob.skills === 'string'
                        ? selectedJob.skills.split(',').map(s => s.trim()).filter(Boolean)
                        : []
                  ).map((skill, idx) => (
                    <span key={idx} className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-lg">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold mb-2">Project Details</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Location:</span>
                    <span className="font-medium">{selectedJob.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Posted:</span>
                    <span className="font-medium">{selectedJob.posted}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Status:</span>
                    <span className="font-medium">{selectedJob.status}</span>
                  </div>
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => navigate(`/freelancer/proposal/${selectedJob.id}`)}
                  className="flex-1 px-6 py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
                >
                  Submit Proposal
                </button>

                <button className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  Save for Later
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Jobs;