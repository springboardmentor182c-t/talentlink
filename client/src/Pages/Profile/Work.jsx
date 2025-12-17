import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ProfileLayout from '../../components/Profile/ProfileLayout.jsx';
import profileService from '../../services/profileService.js';

const Work = ({ basePath = '/profile' }) => {
  const location = useLocation();
  const isEditMode = location.pathname.includes('/edit') || location.pathname.includes('/create');
  const isFreelancer = basePath && basePath.includes('/freelancer');

  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const handleAdd = () => {
    const newExp = { id: experiences.length + 1, role: 'New Role', company: 'Company', duration: 'Dates' };
    setExperiences([...experiences, newExp]);
  };

  const handleEdit = (id) => {
    const updated = experiences.map((exp) => exp.id === id ? { ...exp, role: exp.role + ' (edited)' } : exp);
    setExperiences(updated);
  };

  const handleSave = async () => {
    if (!isEditMode) return;
    setSaving(true);
    try {
      if (isFreelancer) {
        const payload = { bio: JSON.stringify(experiences) };
        await profileService.freelancer.updateProfile(payload);
      } else {
        const payload = { company_description: experiences.map(e => `${e.role} at ${e.company} (${e.duration})`).join('\n') };
        await profileService.client.updateProfile(payload);
      }
      alert('Work saved');
    } catch (err) {
      console.error('Failed to save work:', err);
      alert('Failed to save work');
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        if (isFreelancer) {
          const p = await profileService.freelancer.getProfile();
          const ex = (() => {
            try {
              return JSON.parse(p?.bio || '[]');
            } catch { return p?.bio ? [{ id:1, role: p.bio, company: '', duration: '' }] : [] }
          })();
          setExperiences(ex);
        } else {
          const p = await profileService.client.getProfile();
          const lines = (p?.company_description || '').split('\n').filter(Boolean);
          const ex = lines.map((l,i)=>({ id:i+1, role:l, company:'', duration:'' }));
          setExperiences(ex.length ? ex : []);
        }
      } catch (err) {
        console.error('Failed to load work:', err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [basePath]);

  return (
    <ProfileLayout title="Work" basePath={basePath}>
      <div className="space-y-6">
        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : (
          <>
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Work Experience</h2>
              {isEditMode && <button onClick={handleAdd} className="px-4 py-2 bg-gray-200 rounded">Add Experience</button>}
            </div>

            <div className="space-y-4">
              {experiences.length === 0 ? (
                <p className="text-gray-500">No work entries found.</p>
              ) : (
                experiences.map((exp) => (
                  <div key={exp.id} className="p-4 border rounded flex justify-between items-start">
                    <div>
                      <div className="text-lg font-medium">{exp.role}</div>
                      {exp.company && <div className="text-sm text-gray-600">{exp.company}</div>}
                      {exp.duration && <div className="text-sm text-gray-500">{exp.duration}</div>}
                    </div>
                    <div>
                      {isEditMode && <button onClick={() => handleEdit(exp.id)} className="px-3 py-1 bg-gray-100 rounded">Edit</button>}
                    </div>
                  </div>
                ))
              )}
            </div>

            {isEditMode && (
              <div className="flex justify-end mt-4">
                <button onClick={handleSave} disabled={saving} className="px-6 py-2 bg-indigo-600 text-white rounded disabled:opacity-50">{saving ? 'Saving...' : 'Save Work'}</button>
              </div>
            )}
          </>
        )}
      </div>
    </ProfileLayout>
  );
};

export default Work;
