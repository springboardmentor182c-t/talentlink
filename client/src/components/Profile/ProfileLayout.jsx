import React from 'react';
import { NavLink } from 'react-router-dom';

export default function ProfileLayout({ children, title = 'Profile', basePath = '/profile' }) {
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
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl">JD</div>
              <div>
                <h3 className="text-lg font-semibold">John Anderson</h3>
                <p className="text-sm text-gray-500">Tech Startup · San Francisco</p>
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
              <button className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md">Edit profile</button>
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
