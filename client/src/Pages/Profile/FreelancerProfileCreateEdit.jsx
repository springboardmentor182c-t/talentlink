import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileLayout from '../../components/Profile/ProfileLayout.jsx';

const STORAGE_KEY = "freelancerProfile";

const FreelancerProfileCreateEdit = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    headline: "",
    bio: "",
    location: "",
    languages: "",
    hourlyRate: "",
    availability: true,
    skills: "",
    portfolioLinks: "",
    imageUrl: "",
  });

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setForm(JSON.parse(saved));
  }, []);

  const handleChange = (key) => (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm((s) => ({ ...s, [key]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(form));
    navigate("/freelancer/profile/view");
  };

  return (
    <ProfileLayout title={form.firstName ? 'Edit Profile' : 'Create Profile'} basePath="/freelancer/profile">
      <div className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">First name</label>
              <input value={form.firstName} onChange={handleChange('firstName')} className="mt-1 block w-full border rounded px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Last name</label>
              <input value={form.lastName} onChange={handleChange('lastName')} className="mt-1 block w-full border rounded px-3 py-2" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Professional headline</label>
            <input value={form.headline} onChange={handleChange('headline')} className="mt-1 block w-full border rounded px-3 py-2" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">About / Bio</label>
            <textarea value={form.bio} onChange={handleChange('bio')} rows={5} className="mt-1 block w-full border rounded px-3 py-2" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Location</label>
              <input value={form.location} onChange={handleChange('location')} className="mt-1 block w-full border rounded px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Languages (comma separated)</label>
              <input value={form.languages} onChange={handleChange('languages')} className="mt-1 block w-full border rounded px-3 py-2" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Skills (comma separated)</label>
              <input value={form.skills} onChange={handleChange('skills')} className="mt-1 block w-full border rounded px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Hourly rate ($)</label>
              <input value={form.hourlyRate} onChange={handleChange('hourlyRate')} className="mt-1 block w-full border rounded px-3 py-2" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Portfolio links (comma separated)</label>
            <input value={form.portfolioLinks} onChange={handleChange('portfolioLinks')} className="mt-1 block w-full border rounded px-3 py-2" />
          </div>

          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={form.availability} onChange={handleChange('availability')} />
              <span className="text-sm">Available for work</span>
            </label>
            <div className="ml-auto">
              <button type="submit" className="px-6 py-2 bg-indigo-600 text-white rounded font-medium">Save profile</button>
            </div>
          </div>
        </form>
      </div>
    </ProfileLayout>
  );
};

export default FreelancerProfileCreateEdit;
