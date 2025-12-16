import React, { useState } from 'react';
import ProfileLayout from '../../components/Profile/ProfileLayout.jsx';

const ClientProfileCreateEdit = () => {
  const [form, setForm] = useState({
    company: '',
    email: '',
    headline: '',
    phone: '',
    location: '',
    tagline: '',
    about: '',
    industry: '',
    size: '',
  });

  const handleChange = (key) => (e) => setForm((s) => ({ ...s, [key]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    
    alert('Client account saved (UI only)');
  };

  return (
    <ProfileLayout title="Create Client Account" basePath="/profile">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Company / Full name</label>
            <input value={form.company} onChange={handleChange('company')} className="mt-1 block w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input value={form.email} onChange={handleChange('email')} className="mt-1 block w-full border rounded px-3 py-2" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Professional headline</label>
          <input value={form.headline} onChange={handleChange('headline')} className="mt-1 block w-full border rounded px-3 py-2" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <input value={form.phone} onChange={handleChange('phone')} className="mt-1 block w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Location</label>
            <input value={form.location} onChange={handleChange('location')} className="mt-1 block w-full border rounded px-3 py-2" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Tagline / Role</label>
          <input value={form.tagline} onChange={handleChange('tagline')} className="mt-1 block w-full border rounded px-3 py-2" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">About / Company Description</label>
          <textarea value={form.about} onChange={handleChange('about')} rows={5} className="mt-1 block w-full border rounded px-3 py-2" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Industry</label>
            <input value={form.industry} onChange={handleChange('industry')} className="mt-1 block w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Company Size</label>
            <input value={form.size} onChange={handleChange('size')} className="mt-1 block w-full border rounded px-3 py-2" />
          </div>
        </div>

        <div className="flex justify-end">
          <button type="submit" className="px-6 py-2 bg-indigo-600 text-white rounded">CREATE ACCOUNT</button>
        </div>
      </form>
    </ProfileLayout>
  );
};

export default ClientProfileCreateEdit;
