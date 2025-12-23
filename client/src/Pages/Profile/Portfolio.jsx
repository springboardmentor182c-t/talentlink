import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ProfileLayout from '../../components/Profile/ProfileLayout.jsx';
import profileService from '../../services/profileService.js';

const Portfolio = ({ basePath = '/client/profile' }) => {
  const location = useLocation();
  const isEditMode = location.pathname.includes('/edit') || location.pathname.includes('/create');
  const isFreelancer = basePath && basePath.includes('/freelancer');

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const handleAdd = () => {
    const newProject = { id: projects.length + 1, title: 'New Project', desc: 'Description', tags: [] };
    setProjects([...projects, newProject]);
  };

  const handleEdit = (id) => {
    const updated = projects.map(p => p.id === id ? { ...p, title: p.title + ' (edited)' } : p);
    setProjects(updated);
  };

  const handleChange = (id, field, value) => {
    const updated = projects.map(p => p.id === id ? { ...p, [field]: value } : p);
    setProjects(updated);
  };

  const handleFileChange = (id, file) => {
    const updated = projects.map(p => p.id === id ? { ...p, file } : p);
    setProjects(updated);
  };

  const handleRemove = (id) => {
    setProjects(projects.filter(p => p.id !== id));
  };

  const handleSave = async () => {
    if (!isEditMode) return;
    setSaving(true);
    try {
      if (isFreelancer) {
        const payload = { portfolio_links: projects.map(p => p.title).join(',') };
        const resp = await profileService.freelancer.updateProfile(payload);
        if (resp && resp.portfolio_links) {
          const list = (resp.portfolio_links || '').split(',').filter(Boolean).map((t,i)=>({id:i+1,title:t.trim(),desc:''}));
          setProjects(list);
        }
      } else {
        const payload = { company_description: projects.map(p => `${p.title}: ${p.desc}`).join('\n') };
        const firstFile = projects.find(p => p.file && p.file instanceof File);
        if (firstFile) payload.documents = firstFile.file || firstFile;
        const resp = await profileService.client.updateProfile(payload);
        if (resp) {
          const p = await profileService.client.getProfile();
          const lines = (p?.company_description || '').split('\n').filter(Boolean);
          const list = lines.map((l,i)=>({id:i+1,title:l,desc:''}));
          setProjects(list);
        }
      }
      alert('Portfolio saved');
    } catch (err) {
      console.error('Failed to save portfolio:', err);
      alert('Failed to save portfolio');
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
          const list = (p?.portfolio_links || '').split(',').filter(Boolean).map((t,i)=>({id:i+1,title:t.trim(),desc:''}));
          setProjects(list);
        } else {
          const p = await profileService.client.getProfile();
          const lines = (p?.company_description || '').split('\n').filter(Boolean);
          const list = lines.map((l,i)=>({id:i+1,title:l,desc:''}));
          setProjects(list);
        }
      } catch (err) {
        console.error('Failed to load portfolio:', err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [basePath]);

  return (
    <ProfileLayout title="Portfolio" basePath={basePath}>
      <div className="space-y-6">
        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : (
          <>
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Portfolio Projects</h2>
              {isEditMode && <button onClick={handleAdd} className="px-4 py-2 bg-gray-200 rounded">+ Add Project</button>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {projects.map((p) => (
                <div key={p.id} className="p-4 border rounded">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      {isEditMode ? (
                        <>
                          <input value={p.title} onChange={(e)=>handleChange(p.id,'title',e.target.value)} className="w-full text-lg font-medium border-b pb-1" />
                          <textarea value={p.desc} onChange={(e)=>handleChange(p.id,'desc',e.target.value)} className="w-full mt-2 text-sm text-gray-600" />
                          { !isFreelancer && (
                            <div className="mt-2">
                              <label className="block text-sm">Attach document</label>
                              <input type="file" onChange={(e)=>handleFileChange(p.id, e.target.files[0])} />
                              {p.file && <div className="text-xs text-gray-500 mt-1">Selected: {p.file.name}</div>}
                            </div>
                          )}
                        </>
                      ) : (
                        <>
                          <div className="text-lg font-medium">{p.title}</div>
                          <div className="text-sm text-gray-600 mt-2">{p.desc}</div>
                          <div className="mt-3 flex gap-2 flex-wrap">
                            {(p.tags || []).map((t, i) => (
                              <span key={i} className="px-3 py-1 bg-gray-100 rounded-full text-sm">{t}</span>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                    <div className="ml-4">
                      {isEditMode ? (
                        <button onClick={() => handleRemove(p.id)} className="px-3 py-1 bg-red-100 text-red-700 rounded">Remove</button>
                      ) : null}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {isEditMode && (
              <div className="flex items-center gap-3">
                <button onClick={handleSave} disabled={saving} className="px-4 py-2 bg-blue-600 text-white rounded">{saving ? 'Saving...' : 'Save Portfolio'}</button>
              </div>
            )}

            {!isEditMode && projects.length === 0 && (
              <p className="text-gray-500">No projects listed</p>
            )}
          </>
        )}
      </div>
    </ProfileLayout>
  );
};

export default Portfolio;
