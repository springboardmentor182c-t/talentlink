import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ProfileLayout from '../../components/Profile/ProfileLayout.jsx';
import profileService from '../../services/profileService.js';

const Skills = ({ basePath = '/profile' }) => {
  const location = useLocation();
  const isEditMode = location.pathname.includes('/edit') || location.pathname.includes('/create');
  const isFreelancer = basePath && basePath.includes('/freelancer');

  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const handleAddSkill = () => {
    if (skillInput.trim()) {
      const newSkill = {
        id: skills.length + 1,
        name: skillInput.trim(),
      };
      setSkills([...skills, newSkill]);
      setSkillInput('');
    }
  };

  const handleRemoveSkill = (skillId) => {
    setSkills(skills.filter((skill) => skill.id !== skillId));
  };

  const handleSaveSkills = async () => {
    if (!isEditMode) return;
    setSaving(true);
    try {
      const payload = {};
      if (isFreelancer) {
        payload.skills = skills.map(s => s.name).join(',');
        const resp = await profileService.freelancer.updateProfile(payload);
        if (resp) setSkills((resp.skills || '').split(',').filter(Boolean).map((s,i)=>({id:i+1,name:s.trim()})));
      } else {
        payload.company_description = skills.map(s => s.name).join(', ');
        await profileService.client.updateProfile(payload);
      }
      alert('Skills saved');
    } catch (err) {
      console.error('Failed to save skills:', err);
      alert('Failed to save skills');
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
          const list = (p?.skills || '').split(',').filter(Boolean).map((s,i)=>({id:i+1,name:s.trim()}));
          setSkills(list);
        } else {
          const p = await profileService.client.getProfile();
          const list = (p?.company_description || '').split(',').filter(Boolean).map((s,i)=>({id:i+1,name:s.trim()}));
          setSkills(list);
        }
      } catch (err) {
        console.error('Failed to load skills:', err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [basePath]);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill();
    }
  };

  return (
    <ProfileLayout title="Skills" basePath={basePath}>
      <div className="space-y-6">
        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : (
          <>
            {isEditMode ? (
              <div>
                <label className="block text-sm font-medium text-gray-700">Add Skills</label>
                <div className="mt-2 flex gap-3">
                  <input
                    id="skill-input"
                    type="text"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type a skill and press Add"
                    className="flex-1 border rounded px-3 py-2"
                    aria-label="Enter a skill to add"
                  />
                  <button onClick={handleAddSkill} className="px-4 py-2 bg-gray-200 rounded">Add</button>
                </div>

                <div className="mt-6">
                  <h3 className="text-lg font-medium">Your Skills</h3>
                  <div className="mt-3 flex flex-wrap gap-3">
                    {skills.map((skill) => (
                      <button key={skill.id} onClick={() => handleRemoveSkill(skill.id)} className="px-4 py-2 bg-gray-200 rounded-full">{skill.name}</button>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end mt-4">
                  <button onClick={handleSaveSkills} disabled={saving} className="px-6 py-2 bg-indigo-600 text-white rounded disabled:opacity-50">{saving ? 'Saving...' : 'Save Skills'}</button>
                </div>
              </div>
            ) : (
              <div>
                <h3 className="text-lg font-medium">Skills</h3>
                <div className="mt-3 flex flex-wrap gap-3">
                  {skills.length === 0 ? <p className="text-gray-500">No skills listed</p> : skills.map((skill) => (
                    <span key={skill.id} className="px-4 py-2 bg-gray-100 rounded-full">{skill.name}</span>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </ProfileLayout>
  );
};
export default Skills;