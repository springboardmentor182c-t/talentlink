import React, { useState } from 'react';
import ProfileLayout from '../../components/Profile/ProfileLayout.jsx';

const Settings = ({ basePath = '/client/profile' }) => {
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [visible, setVisible] = useState(true);

  const handleSave = (e) => {
    e.preventDefault();
    
    alert('Settings saved (UI only)');
  };

  return (
    <ProfileLayout title="Settings" basePath={basePath}>
      <form onSubmit={handleSave} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Email Address</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 block w-full border rounded px-3 py-2" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Change Address</label>
          <input value={address} onChange={(e) => setAddress(e.target.value)} className="mt-1 block w-full border rounded px-3 py-2" />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-medium text-gray-700">Email Notifications</div>
            <div className="text-sm text-gray-500">Receive updates about your projects</div>
          </div>
          <input type="checkbox" checked={emailNotifications} onChange={(e) => setEmailNotifications(e.target.checked)} />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-medium text-gray-700">Profile Visibility</div>
            <div className="text-sm text-gray-500">Make your profile visible to clients</div>
          </div>
          <input type="checkbox" checked={visible} onChange={(e) => setVisible(e.target.checked)} />
        </div>

        <div className="pt-6 border-t">
          <div className="text-lg font-semibold text-red-600">Danger Zone</div>
          <div className="mt-4 flex space-x-3">
            <button type="button" className="px-4 py-2 rounded bg-red-600 text-white">Delete account</button>
            <button type="submit" className="px-4 py-2 rounded bg-black text-white">Save Settings</button>
          </div>
        </div>
      </form>
    </ProfileLayout>
  );
};

export default Settings;
