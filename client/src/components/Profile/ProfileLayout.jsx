import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import profileService from '../../services/profileService.js';

export default function ProfileLayout({ children, title = 'Profile', basePath = '/profile' }) {
  const [profile, setProfile] = useState(null);
  const [profileCompleteness, setProfileCompleteness] = useState(0);

  useEffect(() => {
    const load = async () => {
      try {
        const userData = localStorage.getItem('user');
        const user = userData ? JSON.parse(userData) : {};
        let p = null;
        if (user.role === 'freelancer') {
          p = await profileService.freelancer.getProfile();
        } else if (user.role === 'client') {
          p = await profileService.client.getProfile();
        }
        setProfile(p);
        setProfileCompleteness(p?.profile_completeness || 0);
      } catch (err) {
        // ignore
      }
    };
    load();
  }, []);

  const tabs = [
    { to: `${basePath}`, label: 'Profile' },
    { to: `${basePath}/skills`, label: 'Skills' },
    { to: `${basePath}/portfolio`, label: 'Portfolio' },
    { to: `${basePath}/work`, label: 'Work' },
    { to: `${basePath}/settings`, label: 'Settings' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <aside className="lg:col-span-1 bg-white rounded-lg p-6 shadow">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl">
                {profile?.first_name?.[0] || 'U'}{profile?.last_name?.[0] || ''}
              </div>
              <div>
                <h3 className="text-lg font-semibold">{(profile && `${profile.first_name || ''} ${profile.last_name || ''}`) || 'Your Profile'}</h3>
                {profile?.company_name ? (
                  <p className="text-sm text-gray-500">{profile.company_name}</p>
                ) : (
                  <p className="text-sm text-gray-500">Profile information</p>
                )}
              </div>
            </div>

            <nav className="mt-6 space-y-1">
              {tabs.map((t) => (
                <NavLink
                  key={t.to}
                  to={t.to}
                  className={({ isActive }) =>
                    `block px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'bg-indigo-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`
                  }
                >
                  {t.label}
                </NavLink>
              ))}
            </nav>

            <div className="mt-6">
              {((profile?.first_name && profile?.first_name.trim()) || profileCompleteness > 15) ? (
                <button className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md">Edit profile</button>
              ) : (
                <button className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md">Create profile</button>
              )}
            </div>
          </aside>

          <main className="lg:col-span-3">
            <div className="bg-white rounded-lg p-6 shadow">
              <h2 className="text-2xl font-bold">{title}</h2>
              <div className="mt-4">{children}</div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
