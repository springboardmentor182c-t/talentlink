import React, { useState } from 'react';
import ProfileLayout from '../components/Profile/ProfileLayout.jsx';
import { useNavigate } from 'react-router-dom';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Eye,
  Edit,
  X,
  MessageSquare,
  Settings,
  Lock,
  CreditCard,
  Trash2
} from 'lucide-react';

const ClientProfile = () => {
  const [activeTab, setActiveTab] = useState('active');
  const [activeSection, setActiveSection] = useState('profile');
  const [invitationTab, setInvitationTab] = useState('invitations');

  const navigate = useNavigate();                // 👈 added
  
  // Sample data
  const [projects] = useState({
    active: [
      {
        id: 1,
        title: 'E-commerce Platform Development',
        applications: 24,
        postedDate: '2 days ago'
      },
      {
        id: 2,
        title: 'Mobile App UI/UX Design',
        applications: 15,
        postedDate: '5 days ago'
      }
    ],
    completed: [
      {
        id: 3,
        title: 'Website Redesign Project',
        applications: 32,
        completedDate: '1 month ago'
      },
      {
        id: 4,
        title: 'Database Migration',
        applications: 8,
        completedDate: '2 months ago'
      }
    ],
    drafts: [
      {
        id: 5,
        title: 'API Integration Task',
        lastEdited: '1 day ago'
      },
      {
        id: 6,
        title: 'Cloud Infrastructure Setup',
        lastEdited: '3 days ago'
      }
    ]
  });

  const [messages] = useState([
    {
      id: 1,
      sender: 'Michael Park',
      message: "I've submitted the initial designs for review",
      time: '2 hours ago'
    },
    {
      id: 2,
      sender: 'Sarah Chen',
      message: 'When can we schedule the project kickoff meeting?',
      time: '5 hours ago'
    },
    {
      id: 3,
      sender: 'Alex Rodriguez',
      message: 'The milestone has been completed successfully',
      time: '1 day ago'
    }
  ]);

  const [invitations] = useState([
    {
      id: 1,
      name: 'Sarah Chen',
      role: 'Full Stack Developer',
      project: 'E-commerce Platform',
      sentDate: '2 days ago',
      status: 'Pending'
    },
    {
      id: 2,
      name: 'David Kumar',
      role: 'React Developer',
      project: 'Mobile App UI/UX Design',
      sentDate: '4 days ago',
      status: 'Pending'
    }
  ]);

  const [hires] = useState([
    {
      id: 1,
      name: 'Michael Park',
      role: 'UI/UX Designer',
      project: 'Website Redesign Project',
      hireDate: '1 month ago',
      status: 'Active'
    },
    {
      id: 2,
      name: 'Emma Wilson',
      role: 'Backend Developer',
      project: 'Database Migration',
      hireDate: '2 months ago',
      status: 'Completed'
    },
    {
      id: 3,
      name: 'James Chen',
      role: 'DevOps Engineer',
      project: 'Cloud Infrastructure',
      hireDate: '3 weeks ago',
      status: 'Active'
    }
  ]);

  const renderProjects = () => {
    const currentProjects = projects[activeTab];
    
    return (
      <div className="space-y-4">
        {currentProjects.map((project) => (
          <div key={project.id} className="bg-white rounded-lg p-4 md:p-6 shadow-sm border border-gray-200">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
              <div className="flex-1">
                <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2">
                  {project.title}
                </h3>
                <div className="flex flex-wrap items-center gap-3 md:gap-6 text-xs md:text-sm text-gray-600">
                  {project.applications && (
                    <span>{project.applications} applications</span>
                  )}
                  {project.postedDate && (
                    <span>Posted {project.postedDate}</span>
                  )}
                  {project.completedDate && (
                    <span>Completed {project.completedDate}</span>
                  )}
                  {project.lastEdited && (
                    <span>Last edited {project.lastEdited}</span>
                  )}
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <button className="px-3 md:px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors flex items-center gap-2 text-sm">
                  <Eye size={16} />
                  <span className="hidden sm:inline">View</span>
                </button>
                {activeTab !== 'completed' && (
                  <button className="px-3 md:px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors flex items-center gap-2 text-sm">
                    <Edit size={16} />
                    <span className="hidden sm:inline">Edit</span>
                  </button>
                )}
                {activeTab === 'active' && (
                  <button className="px-3 md:px-4 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors flex items-center gap-2 text-sm">
                    <X size={16} />
                    <span className="hidden sm:inline">Close</span>
                  </button>
                )}
                {activeTab === 'drafts' && (
                  <button className="px-3 md:px-4 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors flex items-center gap-2 text-sm">
                    <Trash2 size={16} />
                    <span className="hidden sm:inline">Delete</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderProfileSection = () => (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-indigo-200 to-blue-200 rounded-2xl p-4 md:p-8 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 md:gap-6">
            <div className="w-20 h-20 md:w-24 md:h-24 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
              <User size={40} className="text-gray-500 md:w-12 md:h-12" />
            </div>
            <div className="text-center sm:text-left">
              <h1 className="text-xl md:text-2xl font-bold text-gray-900">John Anderson</h1>
              <p className="text-sm md:text-base text-gray-700 mt-1">Tech Startup | Looking for MERN developers</p>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 mt-4 text-xs md:text-sm text-gray-700">
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <MapPin size={14} className="md:w-4 md:h-4" />
                  <span>San Francisco, CA</span>
                </div>
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <Phone size={14} className="md:w-4 md:h-4" />
                  <span>+1 (555) 123-4567</span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 mt-2 text-xs md:text-sm text-gray-700">
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <Mail size={14} className="md:w-4 md:h-4" />
                  <span>john.anderson@email.com</span>
                </div>
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <Calendar size={14} className="md:w-4 md:h-4" />
                  <span>Member since Jan 2024</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-3 items-center">
            <button className="px-4 md:px-6 py-2 bg-white text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium shadow-sm text-sm md:text-base w-full sm:w-auto">
              Edit profile
            </button>
          </div>
        </div>
      </div>

      {/* My Projects Section */}
      <div className="bg-gradient-to-br from-indigo-100 to-blue-100 rounded-2xl p-4 md:p-6 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
          <h2 className="text-lg md:text-xl font-bold text-gray-900">My Projects</h2>
          <button className="px-4 md:px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium shadow-sm text-sm md:text-base">
            Post new project
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 md:gap-4 mb-6">
          <button
            onClick={() => setActiveTab('active')}
            className={`flex-1 py-2 md:py-3 px-2 md:px-4 rounded-lg font-medium transition-colors text-sm md:text-base ${
              activeTab === 'active'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-indigo-200 text-gray-700 hover:bg-indigo-300'
            }`}
          >
            Active
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={`flex-1 py-2 md:py-3 px-2 md:px-4 rounded-lg font-medium transition-colors text-sm md:text-base ${
              activeTab === 'completed'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-indigo-200 text-gray-700 hover:bg-indigo-300'
            }`}
          >
            Completed
          </button>
          <button
            onClick={() => setActiveTab('drafts')}
            className={`flex-1 py-2 md:py-3 px-2 md:px-4 rounded-lg font-medium transition-colors text-sm md:text-base ${
              activeTab === 'drafts'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-indigo-200 text-gray-700 hover:bg-indigo-300'
            }`}
          >
            Drafts
          </button>
        </div>

        {/* Projects List */}
        {renderProjects()}
      </div>

      {/* Invitations and Hire Section */}
      <div className="bg-gradient-to-br from-indigo-100 to-blue-100 rounded-2xl p-4 md:p-6 shadow-lg">
        <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-6">Invitations and Hire</h2>
        
        <div className="flex gap-2 md:gap-4 mb-6">
          <button 
            onClick={() => setInvitationTab('invitations')}
            className={`flex-1 py-2 md:py-3 px-2 md:px-4 rounded-lg font-medium transition-colors text-sm md:text-base ${
              invitationTab === 'invitations'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-indigo-200 text-gray-700 hover:bg-indigo-300'
            }`}
          >
            Invitations
          </button>
          <button 
            onClick={() => setInvitationTab('hires')}
            className={`flex-1 py-2 md:py-3 px-2 md:px-4 rounded-lg font-medium transition-colors text-sm md:text-base ${
              invitationTab === 'hires'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-indigo-200 text-gray-700 hover:bg-indigo-300'
            }`}
          >
            Hires
          </button>
        </div>

        <div className="space-y-4">
          {invitationTab === 'invitations' ? (
            invitations.map((invitation) => (
              <div key={invitation.id} className="bg-white rounded-lg p-4 md:p-6 shadow-sm border border-gray-200">
                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                  <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0 mx-auto sm:mx-0">
                    <User size={24} className="text-gray-500" />
                  </div>
                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="font-semibold text-gray-900">{invitation.name}</h3>
                    <p className="text-xs md:text-sm text-gray-600 mt-1">{invitation.role}</p>
                    <p className="text-xs md:text-sm text-gray-600">For: {invitation.project} • Sent {invitation.sentDate}</p>
                  </div>
                  <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                    <button className="px-3 md:px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors text-sm">
                      {invitation.status}
                    </button>
                    <button className="px-3 md:px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors text-sm">
                      Message
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            hires.map((hire) => (
              <div key={hire.id} className="bg-white rounded-lg p-4 md:p-6 shadow-sm border border-gray-200">
                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                  <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0 mx-auto sm:mx-0">
                    <User size={24} className="text-gray-500" />
                  </div>
                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="font-semibold text-gray-900">{hire.name}</h3>
                    <p className="text-xs md:text-sm text-gray-600 mt-1">{hire.role}</p>
                    <p className="text-xs md:text-sm text-gray-600">Project: {hire.project} • Hired {hire.hireDate}</p>
                  </div>
                  <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                    <button className={`px-3 md:px-4 py-2 rounded-md transition-colors text-sm ${
                      hire.status === 'Active' 
                        ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}>
                      {hire.status}
                    </button>
                    <button className="px-3 md:px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors text-sm">
                      View Profile
                    </button>
                    <button className="px-3 md:px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors text-sm">
                      Message
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );

  const renderMessagesSection = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-indigo-100 to-blue-100 rounded-2xl p-4 md:p-6 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
          <h2 className="text-lg md:text-xl font-bold text-gray-900">Messages</h2>
          <button className="px-4 md:px-6 py-2 bg-white text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium shadow-sm text-sm md:text-base">
            View all
          </button>
        </div>

        <div className="space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className="bg-white rounded-lg p-4 md:p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0 mx-auto sm:mx-0">
                  <User size={24} className="text-gray-500" />
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                    <h3 className="font-semibold text-gray-900">{msg.sender}</h3>
                    <span className="text-xs md:text-sm text-gray-500">{msg.time}</span>
                  </div>
                  <p className="text-sm md:text-base text-gray-600 mt-1">{msg.message}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderAccountSettings = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-indigo-100 to-blue-100 rounded-2xl p-4 md:p-8 shadow-lg">
        <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-6 md:mb-8">Account Settings</h2>

        {/* Security Section */}
        <div className="mb-6 md:mb-8">
          <div className="flex items-center gap-2 mb-3">
            <Lock size={18} className="text-gray-700 md:w-5 md:h-5" />
            <h3 className="text-base md:text-lg font-semibold text-gray-900">Security</h3>
          </div>
          <p className="text-sm md:text-base text-gray-700 mb-4">Manage your password and security preferences</p>
          <button className="px-4 md:px-6 py-2 bg-white text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium shadow-sm text-sm md:text-base w-full sm:w-auto">
            Change Password
          </button>
        </div>

        {/* Payment Details Section */}
        <div className="mb-6 md:mb-8">
          <div className="flex items-center gap-2 mb-3">
            <CreditCard size={18} className="text-gray-700 md:w-5 md:h-5" />
            <h3 className="text-base md:text-lg font-semibold text-gray-900">Payment Details</h3>
          </div>
          <p className="text-sm md:text-base text-gray-700 mb-4">Manage your payment methods and billing information</p>
          <button className="px-4 md:px-6 py-2 bg-white text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium shadow-sm text-sm md:text-base w-full sm:w-auto">
            Manage Payment Methods
          </button>
        </div>

        {/* Danger Zone Section */}
        <div className="pt-6 border-t border-red-200">
          <div className="flex items-center gap-2 mb-3">
            <Trash2 size={18} className="text-red-600 md:w-5 md:h-5" />
            <h3 className="text-base md:text-lg font-semibold text-red-600">Danger Zone</h3>
          </div>
          <p className="text-sm md:text-base text-gray-700 mb-4">Permanently delete your account and all associated data</p>
          <button className="px-4 md:px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium shadow-sm text-sm md:text-base w-full sm:w-auto">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <ProfileLayout title="Client Profile" basePath="/profile">
      {/* Back button + small header within layout */}
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <div className="text-sm text-gray-500">Company account</div>
        <button
          onClick={() => navigate(-1)}
          className="px-3 md:px-4 py-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 text-xs md:text-sm text-gray-700 flex items-center gap-2 shadow-sm transition-colors"
        >
          <span>←</span>
          <span>Back</span>
        </button>
      </div>

      {/* Navigation */}
      <div className="flex flex-col sm:flex-row gap-2 md:gap-4 mb-6 md:mb-8">
        <button
          onClick={() => setActiveSection('profile')}
          className={`px-4 md:px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 text-sm md:text-base ${
            activeSection === 'profile'
              ? 'bg-indigo-600 text-white shadow-lg'
              : 'bg-white text-gray-700 hover:bg-gray-50 shadow-sm'
          }`}
        >
          <User size={18} className="md:w-5 md:h-5" />
          Profile
        </button>
        <button
          onClick={() => setActiveSection('messages')}
          className={`px-4 md:px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 text-sm md:text-base ${
            activeSection === 'messages'
              ? 'bg-indigo-600 text-white shadow-lg'
              : 'bg-white text-gray-700 hover:bg-gray-50 shadow-sm'
          }`}
        >
          <MessageSquare size={18} className="md:w-5 md:h-5" />
          Messages
        </button>
        <button
          onClick={() => setActiveSection('settings')}
          className={`px-4 md:px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 text-sm md:text-base ${
            activeSection === 'settings'
              ? 'bg-indigo-600 text-white shadow-lg'
              : 'bg-white text-gray-700 hover:bg-gray-50 shadow-sm'
          }`}
        >
          <Settings size={18} className="md:w-5 md:h-5" />
          Settings
        </button>
      </div>

      {/* Content */}
      {activeSection === 'profile' && renderProfileSection()}
      {activeSection === 'messages' && renderMessagesSection()}
      {activeSection === 'settings' && renderAccountSettings()}
    </ProfileLayout>
  );
};

export default ClientProfile;
