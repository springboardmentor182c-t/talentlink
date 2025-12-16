import React, { useState } from 'react';
import ProfileLayout from '../../components/Profile/ProfileLayout.jsx';

const Skills = ({ basePath = '/profile' }) => {
  const initialSkills = [
    { id: 1, name: 'React' },
    { id: 2, name: 'Node.js' },
    { id: 3, name: 'Next.js' },
  ];

  const [skills, setSkills] = useState(initialSkills);
  const [skillInput, setSkillInput] = useState('');

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

  const handleSaveSkills = () => {
    alert('Skills saved (UI only)');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill();
    }
  };

  return (
    <ProfileLayout title="Skills" basePath={basePath}>
      <div className="space-y-6">
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
        </div>

        <div>
          <h3 className="text-lg font-medium">Your Skills</h3>
          <div className="mt-3 flex flex-wrap gap-3">
            {skills.map((skill) => (
              <button key={skill.id} onClick={() => handleRemoveSkill(skill.id)} className="px-4 py-2 bg-gray-200 rounded-full">{skill.name}</button>
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <button onClick={handleSaveSkills} className="px-6 py-2 bg-indigo-600 text-white rounded">Save Skills</button>
        </div>
      </div>
    </ProfileLayout>
  );
};
export default Skills;