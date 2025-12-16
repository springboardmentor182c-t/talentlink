import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileLayout from '../../components/Profile/ProfileLayout.jsx';

const STORAGE_KEY = "freelancerProfile";

export default function FreelancerProfileView() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setProfile(JSON.parse(saved));
  }, []);

  const handleEdit = () => navigate('/freelancer/profile/edit');

  const handleDelete = () => {
    if (!confirm('Delete profile? This cannot be undone.')) return;
    localStorage.removeItem(STORAGE_KEY);
    setProfile(null);
    navigate('/freelancer');
  };

  if (!profile)
    return (
      <div className="max-w-4xl mx-auto py-12">
        <h2 className="text-2xl font-bold mb-4">No profile found</h2>
        <p className="mb-6 text-gray-600">You don't have a profile yet. Create one to showcase your skills.</p>
        <button onClick={() => navigate('/freelancer/profile/create')} className="px-4 py-2 bg-indigo-600 text-white rounded">Create profile</button>
      </div>
    );

  return (
    <ProfileLayout title="Profile" basePath="/freelancer/profile">
      <div className="space-y-6 max-w-6xl mx-auto py-8">
        <div className="flex items-start gap-6">
          <div className="w-28 h-28 bg-gray-300 rounded-full flex items-center justify-center text-xl font-bold">{profile.firstName?.[0] || 'A'}</div>
          <div>
            <h1 className="text-3xl font-bold">{profile.firstName} {profile.lastName}</h1>
            <div className="text-gray-600">{profile.headline}</div>
            <div className="mt-2 text-sm text-gray-500">{profile.location} · ${profile.hourlyRate}/hr</div>
          </div>
          <div className="ml-auto flex gap-3">
            <button onClick={() => navigate('/messages')} className="px-4 py-2 bg-indigo-600 text-white rounded">Message</button>
            <button onClick={() => navigate('/contracts')} className="px-4 py-2 bg-gray-800 text-white rounded">Hire Me</button>
            <button onClick={handleEdit} className="px-4 py-2 bg-white border rounded">Edit</button>
            <button onClick={handleDelete} className="px-4 py-2 bg-red-100 text-red-700 rounded">Delete</button>
          </div>
        </div>

        <section className="mt-8 bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">About</h2>
          <p className="text-gray-700">{profile.bio}</p>
        </section>

        <section className="mt-6 bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Skills & Expertise</h2>
          <div className="flex flex-wrap gap-2">
            {profile.skills?.split(',').map((s, i) => (
              <span key={i} className="px-3 py-1 rounded-full bg-indigo-700 text-white text-sm">{s.trim()}</span>
            ))}
          </div>
        </section>

        <section className="mt-6 bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Portfolio</h2>
          <div className="flex flex-col gap-2">
            {profile.portfolioLinks?.split(',').map((link, i) => (
              <a key={i} href={link.trim()} className="text-indigo-600" target="_blank" rel="noreferrer">{link.trim()}</a>
            ))}
          </div>
        </section>
      </div>
    </ProfileLayout>
  );
}

