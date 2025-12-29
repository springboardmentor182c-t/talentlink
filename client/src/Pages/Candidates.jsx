import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Search, Star, MapPin } from 'lucide-react';
import profileService from '../services/profileService.js';

function Candidates() {
  const navigate = useNavigate();
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProfiles = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await profileService.freelancer.listProfiles();
      const list = data.results ?? data;
      const normalized = list.map(p => ({
        id: p.id,
        name: (p.first_name || p.last_name) ? `${p.first_name || ''} ${p.last_name || ''}`.trim() : p.username || 'Freelancer',
        role: p.title || 'Freelancer',
        skills: p.skills ? p.skills.split(',').map(s => s.trim()).filter(Boolean) : [],
        experience: p.experience || null,
        rate: p.hourly_rate ? `$${p.hourly_rate}` : '—',
        location: p.location || '—',
        status: p.availability ? 'Active' : 'Busy',
        avatar: p.profile_image || ((p.first_name ? p.first_name[0] : (p.username ? p.username[0] : '?')) || '?'),
        bio: p.bio || '',
        raw: p,
      }));
      setProfiles(normalized);
    } catch (err) {
      console.error('Error loading freelancer profiles', err);
      setError('Failed to load freelancers');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  const filteredCandidates = profiles.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) || c.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || c.status.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  return (
    <div>

      {/* Back Button */}
      <button
        onClick={() => navigate('/client/candidates')}
        className="mb-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg"
      >
        ← Back
      </button>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
        <h2 className="text-2xl font-bold text-gray-800">Freelancers</h2>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-3 w-full md:w-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search candidates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-64"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="busy">Busy</option>
          </select>
        </div>
      </div>

      {/* Loading / Error */}
      {loading && (
        <div className="py-8 text-center text-gray-600">Loading freelancers...</div>
      )}
      {error && (
        <div className="py-8 text-center text-red-600">{error}</div>
      )}

      {/* No freelancers message */}
      {!loading && !error && filteredCandidates.length === 0 && (
        <div className="py-8 text-center text-gray-500">
          No freelancer profiles available at the moment. Please check back later.
        </div>
      )}


      {/* Candidate Cards */}
      {!loading && !error && filteredCandidates.length > 0 && (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCandidates.map(candidate => (
          <div key={candidate.id} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                {candidate.raw && candidate.raw.profile_image ? (
                  <img src={candidate.raw.profile_image} alt={candidate.name} className="w-12 h-12 rounded-full object-cover" />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                    {String(candidate.avatar).slice(0,2).toUpperCase()}
                  </div>
                )}
                <div>
                  <h3 className="font-semibold text-gray-800">{candidate.name}</h3>
                  <p className="text-sm text-gray-500">{candidate.role}</p>
                </div>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                candidate.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
              }`}>
                {candidate.status}
              </span>
            </div>

            <div className="flex items-center space-x-4 mb-4 text-sm text-gray-600">
              {candidate.raw && candidate.raw.rating != null && (
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-500 mr-1" />
                  <span>{candidate.raw.rating}</span>
                </div>
              )}
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-1" />
                <span className="truncate">{candidate.location}</span>
              </div>
            </div>

            <p className="text-sm text-gray-600 mb-4 line-clamp-2">{candidate.bio}</p>

            <div className="flex flex-wrap gap-2 mb-4">
              {candidate.skills.slice(0, 3).map((skill, idx) => (
                <span key={idx} className="px-2 py-1 bg-blue-50 text-blue-600 rounded text-xs">
                  {skill}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between pt-4 border-t">
              <div>
                <p className="text-xs text-gray-500">Rate</p>
                <p className="font-semibold text-gray-800">{candidate.rate}</p>
              </div>
              <button
                onClick={() => setSelectedCandidate(candidate)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
              >
                View Profile
              </button>
            </div>
          </div>
        ))}
      </div>
      )}

      {/* Candidate Detail Modal */}
      {selectedCandidate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl">
                    {selectedCandidate.avatar}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">{selectedCandidate.name}</h2>
                    <p className="text-gray-600">{selectedCandidate.role}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedCandidate(null)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {selectedCandidate.raw && selectedCandidate.raw.rating != null && (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-xs text-gray-500 mb-1">Rating</p>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-500 mr-1" />
                      <span className="font-semibold">{selectedCandidate.raw.rating}</span>
                    </div>
                  </div>
                )}

                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-xs text-gray-500 mb-1">Hourly Rate</p>
                  <p className="font-semibold">{selectedCandidate.rate}</p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-xs text-gray-500 mb-1">Availability</p>
                  <p className="font-semibold">{selectedCandidate.status}</p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-xs text-gray-500 mb-1">Location</p>
                  <p className="font-semibold">{selectedCandidate.location}</p>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold mb-2">About</h3>
                <p className="text-gray-600">{selectedCandidate.bio}</p>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold mb-2">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedCandidate.skills.map((skill, idx) => (
                    <span key={idx} className="px-3 py-1 bg-blue-50 text-blue-600 rounded-lg">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex space-x-3">
                <button className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Hire Now
                </button>
                <button className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Candidates;