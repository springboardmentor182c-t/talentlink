import React, { useState, useEffect } from 'react';
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
  Trash2,
  Building,
  Globe,
  Download
} from 'lucide-react';
import profileService from '../services/profileService.js';
import ProfileCompletenessBar from '../components/ProfileCompletenessBar.jsx';

const ClientProfile = () => {
  const [activeTab, setActiveTab] = useState('active');
  const [activeSection, setActiveSection] = useState('profile');
  const [invitationTab, setInvitationTab] = useState('invitations');
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    loadProfile();
  }, []);

  // Proper async function for loading profile
  const loadProfile = async () => {
    try {
      setLoading(true);
      const data = await profileService.client.getProfile();
      setProfile(data);
      setError('');
    } catch (err) {
      setError('');
    } finally {
      setLoading(false);
    }
  };
  const [projects] = useState({ active: [], completed: [] });
  const [messages] = useState([]);

  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000';

  const renderProfileSection = () => (
    <div className="space-y-6">
      {/* Profile Header */}
      {profile ? (
        <div className="bg-gradient-to-r from-indigo-200 to-blue-200 rounded-2xl p-4 md:p-8 shadow-lg">
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="flex-shrink-0">
              {profile.profile_image ? (
                <img
                  src={profile.profile_image.startsWith('http') ? profile.profile_image : `${apiBaseUrl}${profile.profile_image}`}
                  alt={`${profile.first_name} ${profile.last_name}`}
                  className="w-32 h-32 rounded-full object-cover border-4 border-white"
                />
              ) : (
                <div className="w-32 h-32 bg-gray-300 rounded-full flex items-center justify-center text-3xl font-bold text-gray-600">
                  {profile.first_name?.[0] || 'C'}{profile.last_name?.[0] || 'U'}
                </div>
              )}
            </div>

            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                {profile.first_name} {profile.last_name}
              </h1>
              {profile.company_name && (
                <p className="text-lg text-gray-700 mt-1 flex items-center gap-2">
                  <Building size={18} />
                  {profile.company_name}
                </p>
              )}
              <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-600">
                {profile.location && <span>📍 {profile.location}</span>}
                {profile.country && <span>🌍 {profile.country}</span>}
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  onClick={() => navigate('/client/messages')}
                  className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  <MessageSquare size={18} />
                  Messages
                </button>
                <button
                  onClick={() => setActiveSection('settings')}
                  className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors"
                >
                  <Edit size={18} />
                  Edit Profile
                </button>
              </div>
            </div>
          </div>

          {/* Profile Completeness */}
          <div className="mt-6 pt-6 border-t border-indigo-300">
            <ProfileCompletenessBar percentage={profile.profile_completeness || 0} />
          </div>
        </div>
      ) : (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">No Profile Found</h2>
          <p className="mb-6 text-gray-600">Create a profile to get started.</p>
          <button
            onClick={() => navigate('/client/profile/edit')}
            className="px-6 py-2 bg-indigo-600 text-white rounded font-medium hover:bg-indigo-700 transition-colors"
          >
            Create Profile
          </button>
        </div>
      )}

      {/* Profile Details */}
      {profile && (
        <>
          {profile.company_description && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-3 text-gray-900">About Company</h3>
              <p className="text-gray-700">{profile.company_description}</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {profile.website && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-gray-900">
                  <Globe size={20} />
                  Website
                </h3>
                <a
                  href={profile.website}
                  target="_blank"
                  rel="noreferrer"
                  className="text-indigo-600 hover:underline break-all"
                >
                  {profile.website}
                </a>
              </div>
            )}

            {profile.phone && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-gray-900">
                  <Phone size={20} />
                  Phone
                </h3>
                <p className="text-gray-700">{profile.phone}</p>
              </div>
            )}
          </div>

          {profile.documents && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-gray-900">
                <Download size={20} />
                Documents
              </h3>
              <a
                href={profile.documents.startsWith('http') ? profile.documents : `${apiBaseUrl}${profile.documents}`}
                download
                className="text-indigo-600 hover:underline font-medium"
              >
                {profile.documents.split('/').pop()}
              </a>
            </div>
          )}
        </>
      )}
    </div>
  );

  const renderProjectsSection = () => (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex gap-2 border-b">
        {['active', 'completed'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 font-medium border-b-2 transition-colors ${
              activeTab === tab
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab === 'active' ? 'Active Projects' : 'Completed Projects'}
          </button>
        ))}
      </div>

      {/* Projects List */}
      <div className="space-y-4">
        {(activeTab === 'active' ? projects.active : projects.completed).length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-6 text-center text-gray-500">No projects yet</div>
        ) : (
          (activeTab === 'active' ? projects.active : projects.completed).map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{project.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {activeTab === 'active'
                      ? `Posted ${project.postedDate}`
                      : `Completed ${project.completedDate}`}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-indigo-600">{project.applications}</p>
                  <p className="text-sm text-gray-600">Applications</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );

  const renderInvitationsSection = () => (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex gap-2 border-b">
        {['invitations', 'applications'].map((tab) => (
          <button
            key={tab}
            onClick={() => setInvitationTab(tab)}
            className={`px-6 py-3 font-medium border-b-2 transition-colors ${
              invitationTab === tab
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab === 'invitations' ? 'My Invitations' : 'Applications'}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="space-y-4">
        {(invitationTab === 'invitations'
          ? invitations.invitations
          : invitations.applications
        ).map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{item.freelancer}</h3>
                <p className="text-sm text-gray-600 mt-1">{item.appliedDate}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-green-600">{item.skillMatch}%</p>
                <p className="text-sm text-gray-600">Skill Match</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderMessagesSection = () => (
    <div className="space-y-4">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer"
          onClick={() => navigate('/messages')}
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{msg.freelancer}</h3>
              <p className="text-sm text-gray-600 mt-2">{msg.lastMessage}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">{msg.timestamp}</p>
              {msg.unread > 0 && (
                <span className="mt-2 inline-block px-3 py-1 bg-indigo-600 text-white rounded-full text-xs font-semibold">
                  {msg.unread} unread
                </span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderAccountSettings = () => (
    <div className="max-w-2xl space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-900 flex items-center gap-2">
          <User size={20} />
          Edit Profile
        </h3>
        <button
          onClick={() => navigate('/client/profile/edit')}
          className="w-full px-4 py-2 bg-indigo-600 text-white rounded font-medium hover:bg-indigo-700 transition-colors"
        >
          Update Your Profile
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-900 flex items-center gap-2">
          <Lock size={20} />
          Security
        </h3>
        <button className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded font-medium hover:bg-gray-300 transition-colors">
          Change Password
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-900 flex items-center gap-2">
          <CreditCard size={20} />
          Billing
        </h3>
        <button className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded font-medium hover:bg-gray-300 transition-colors">
          Manage Billing
        </button>
      </div>
    </div>
  );

  return (
    <ProfileLayout title="Client Dashboard" basePath="/client/profile">
      {/* Back button + small header within layout */}
      <div className="mb-8 flex items-center gap-4">
        <button
          onClick={() => navigate('/freelancer')}
          className="text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-2"
        >
          ← Back
        </button>
        <h2 className="text-2xl font-bold text-gray-900">Client Dashboard</h2>
      </div>

      {/* Navigation Tabs */}
      <div className="mb-8 flex flex-wrap gap-2 border-b">
        <button
          onClick={() => setActiveSection('profile')}
          className={`px-4 py-3 font-medium border-b-2 transition-colors ${
            activeSection === 'profile'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
        >
          <User size={18} className="inline mr-2" />
          Profile
        </button>
        <button
          onClick={() => setActiveSection('projects')}
          className={`px-4 py-3 font-medium border-b-2 transition-colors ${
            activeSection === 'projects'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
        >
          Projects
        </button>
        <button
          onClick={() => setActiveSection('invitations')}
          className={`px-4 py-3 font-medium border-b-2 transition-colors ${
            activeSection === 'invitations'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
        >
          Invitations & Applications
        </button>
        <button
          onClick={() => setActiveSection('messages')}
          className={`px-4 py-3 font-medium border-b-2 transition-colors ${
            activeSection === 'messages'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
        >
          <MessageSquare size={18} className="inline mr-2" />
          Messages
        </button>
        <button
          onClick={() => setActiveSection('settings')}
          className={`px-4 py-3 font-medium border-b-2 transition-colors ${
            activeSection === 'settings'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
        >
          <Settings size={18} className="inline mr-2" />
          Settings
        </button>
      </div>

      {/* Content */}
      {activeSection === 'profile' && renderProfileSection()}
      {activeSection === 'projects' && renderProjectsSection()}
      {activeSection === 'invitations' && renderInvitationsSection()}
      {activeSection === 'messages' && renderMessagesSection()}
      {activeSection === 'settings' && renderAccountSettings()}
    </ProfileLayout>
  );
};

export default ClientProfile;
