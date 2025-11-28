import React, { useState } from 'react';
import { Eye, Edit, X } from 'lucide-react';

// Mock Data
const mockProjectsData = {
  active: [
    {
      id: 1,
      title: 'E-commerce Platform Development',
      applications: 24,
      postedDate: '2 days ago',
      description: 'Building a modern e-commerce platform with React and Node.js'
    },
    {
      id: 2,
      title: 'Mobile App UI/UX Design',
      applications: 15,
      postedDate: '5 days ago',
      description: 'Design intuitive mobile application interface'
    }
  ],
  completed: [
    {
      id: 3,
      title: 'Corporate Website Redesign',
      applications: 32,
      postedDate: '45 days ago',
      description: 'Complete redesign of corporate website with modern design'
    }
  ],
  drafts: [
    {
      id: 4,
      title: 'Backend API Development',
      applications: 0,
      postedDate: 'Draft',
      description: 'RESTful API development for mobile application'
    }
  ],
  invitations: [
    {
      id: 1,
      freelancer: 'Sarah Johnson',
      project: 'E-commerce Platform Development',
      avatar: 'SJ',
      date: '2024-11-20',
      status: 'Pending'
    },
    {
      id: 2,
      freelancer: 'Michael Chen',
      project: 'Mobile App UI/UX Design',
      avatar: 'MC',
      date: '2024-11-18',
      status: 'Accepted'
    }
  ],
  hires: [
    {
      id: 1,
      freelancer: 'Emma Wilson',
      project: 'Corporate Website Redesign',
      avatar: 'EW',
      date: '2024-10-15',
      status: 'Active',
      progress: 85
    },
    {
      id: 2,
      freelancer: 'David Brown',
      project: 'E-commerce Platform Development',
      avatar: 'DB',
      date: '2024-11-10',
      status: 'Active',
      progress: 60
    }
  ]
};

// Project Card Component
const ProjectCard = ({ project }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{project.title}</h3>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span className="font-medium">{project.applications} applications</span>
            <span>Posted {project.postedDate}</span>
          </div>
        </div>
      </div>
      
      <p className="text-sm text-gray-600 mb-4">{project.description}</p>
      
      <div className="flex items-center gap-2">
        <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
          <Eye className="w-4 h-4" />
          View
        </button>
        <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
          <Edit className="w-4 h-4" />
          Edit
        </button>
        <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors ml-auto">
          <X className="w-4 h-4" />
          Close
        </button>
      </div>
    </div>
  );
};

// Invitation/Hire Card Component
const InvitationCard = ({ item, type }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold flex-shrink-0">
          {item.avatar}
        </div>
        
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-gray-900 mb-1">{item.freelancer}</h4>
          <p className="text-sm text-gray-600 mb-2">{item.project}</p>
          <div className="flex items-center gap-3 text-xs text-gray-500">
            <span>{item.date}</span>
            <span className={`px-2 py-1 rounded-full font-medium ${
              item.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
              item.status === 'Accepted' ? 'bg-green-100 text-green-800' :
              'bg-blue-100 text-blue-800'
            }`}>
              {item.status}
            </span>
          </div>
          
          {type === 'hire' && item.progress && (
            <div className="mt-3">
              <div className="flex justify-between text-xs text-gray-600 mb-1">
                <span>Progress</span>
                <span className="font-semibold">{item.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full transition-all"
                  style={{ width: `${item.progress}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Main My Projects Component
const MyProjects = () => {
  const [activeTab, setActiveTab] = useState('Active');
  const [invitationHireTab, setInvitationHireTab] = useState('Invitations');
  
  const projectTabs = ['Active', 'Completed', 'Drafts'];

  const getCurrentProjects = () => {
    switch (activeTab) {
      case 'Active':
        return mockProjectsData.active;
      case 'Completed':
        return mockProjectsData.completed;
      case 'Drafts':
        return mockProjectsData.drafts;
      default:
        return mockProjectsData.active;
    }
  };

  return (
    <main className="flex-1 overflow-y-auto p-3 sm:p-4 lg:p-6 bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">My Projects</h2>
          <button className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium shadow-sm">
            Post new project
          </button>
        </div>

        {/* Projects Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 mb-6">
          {/* Project Tabs */}
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            {projectTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-lg font-medium transition-all whitespace-nowrap ${
                  activeTab === tab
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {getCurrentProjects().map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          {getCurrentProjects().length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600">No {activeTab.toLowerCase()} projects</p>
            </div>
          )}
        </div>

        {/* Invitations and Hire Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Invitations and Hire</h3>
          
          {/* Invitation/Hire Tabs */}
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            <button
              onClick={() => setInvitationHireTab('Invitations')}
              className={`flex-1 px-6 py-3 rounded-lg font-medium transition-all whitespace-nowrap ${
                invitationHireTab === 'Invitations'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100'
              }`}
            >
              Invitations
            </button>
            <button
              onClick={() => setInvitationHireTab('Hires')}
              className={`flex-1 px-6 py-3 rounded-lg font-medium transition-all whitespace-nowrap ${
                invitationHireTab === 'Hires'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100'
              }`}
            >
              Hires
            </button>
          </div>

          {/* Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {invitationHireTab === 'Invitations' ? (
              mockProjectsData.invitations.map((invitation) => (
                <InvitationCard key={invitation.id} item={invitation} type="invitation" />
              ))
            ) : (
              mockProjectsData.hires.map((hire) => (
                <InvitationCard key={hire.id} item={hire} type="hire" />
              ))
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default MyProjects;