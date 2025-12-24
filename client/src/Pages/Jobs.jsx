import React, { useState } from 'react';
import { Search, DollarSign, Clock, MapPin, User, Gift } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function Jobs() {
  const navigate = useNavigate();
  const [selectedJob, setSelectedJob] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const jobs = [
    {
      id: 1,
      title: 'E-commerce Website Development',
      client: 'TechCorp Inc.',
      budget: '$5,000 - $8,000',
      duration: '3 months',
      posted: '2 days ago',
      proposals: 12,
      status: 'Open',
      type: 'Fixed Price',
      description: 'Looking for an experienced developer to build a modern e-commerce platform with payment integration.',
      skills: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      location: 'Remote'
    },
    {
      id: 2,
      title: 'Mobile App UI/UX Design',
      client: 'StartupXYZ',
      budget: '$3,000 - $5,000',
      duration: '1 month',
      posted: '5 hours ago',
      proposals: 8,
      status: 'Open',
      type: 'Fixed Price',
      description: 'Need a talented designer to create modern UI/UX for our fitness tracking mobile app.',
      skills: ['Figma', 'Mobile Design', 'Prototyping'],
      location: 'Remote'
    },
    {
      id: 3,
      title: 'Content Writing - Tech Blog',
      client: 'Digital Media Co.',
      budget: '$1,500 - $2,500',
      duration: '2 months',
      posted: '1 day ago',
      proposals: 15,
      status: 'Open',
      type: 'Hourly',
      description: 'Seeking experienced tech writers for our growing blog. Must have SEO knowledge.',
      skills: ['SEO', 'Technical Writing', 'Content Strategy'],
      location: 'Remote'
    },
    {
      id: 4,
      title: 'iOS App Development',
      client: 'InnovateLabs',
      budget: '$8,000 - $12,000',
      duration: '4 months',
      posted: '3 days ago',
      proposals: 6,
      status: 'In Progress',
      type: 'Fixed Price',
      description: 'Building a productivity app for iOS with advanced features and cloud sync.',
      skills: ['Swift', 'iOS', 'Firebase', 'REST API'],
      location: 'Remote'
    },
    {
      id: 5,
      title: 'DevOps & Cloud Infrastructure',
      client: 'CloudTech Solutions',
      budget: '$6,000 - $10,000',
      duration: '2 months',
      posted: '1 week ago',
      proposals: 10,
      status: 'Open',
      type: 'Fixed Price',
      description: 'Need DevOps expert to set up CI/CD pipelines and AWS infrastructure for our SaaS platform.',
      skills: ['AWS', 'Docker', 'Kubernetes', 'Jenkins'],
      location: 'Remote'
    },
    {
      id: 6,
      title: 'Data Analysis & Visualization',
      client: 'Analytics Pro',
      budget: '$4,000 - $7,000',
      duration: '6 weeks',
      posted: '4 days ago',
      proposals: 9,
      status: 'Open',
      type: 'Hourly',
      description: 'Looking for data analyst to create interactive dashboards and insights from our customer data.',
      skills: ['Python', 'Tableau', 'SQL', 'Data Visualization'],
      location: 'Remote'
    }
  ];

  const filteredJobs = jobs.filter(j => {
    const matchesSearch = j.title.toLowerCase().includes(searchTerm.toLowerCase()) || j.client.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || j.status.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="flex-1 p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-2">My Jobs</h1>
      <p className="text-gray-600 mb-6">Manage your active and completed projects</p>
      
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
            filterStatus === 'active' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Active Jobs
        </button>
        <button
          onClick={() => setFilterStatus('pending')}
          className={`px-4 py-2 rounded-lg font-medium text-sm ${
            filterStatus === 'pending' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Pending
        </button>
        <button
          onClick={() => setFilterStatus('completed')}
          className={`px-4 py-2 rounded-lg font-medium text-sm ${
            filterStatus === 'completed' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Completed
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
                  {job.skills.map((skill, idx) => (
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
                    <span>{job.proposals} proposals</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-between mt-4 lg:mt-0 lg:ml-6">
                <div className="text-right mb-4">
                  <p className="text-sm text-gray-500">Posted by</p>
                  <p className="font-semibold text-gray-800">{job.client}</p>
                  <p className="text-xs text-gray-500 mt-1">{job.posted}</p>
                </div>
                <button
                  onClick={() => setSelectedJob(job)}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap"
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
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
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
                  {selectedJob.skills.map((skill, idx) => (
                    <span key={idx} className="px-3 py-1 bg-blue-50 text-blue-600 rounded-lg">
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
                  className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
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