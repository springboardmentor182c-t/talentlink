import React, { useState } from 'react';
import ProfileLayout from '../../components/Profile/ProfileLayout.jsx';

const Work = ({ basePath = '/profile' }) => {
  const [experiences, setExperiences] = useState([
    { id: 1, role: 'Lead Developer', company: 'TechCorp Inc.', duration: 'Jan 2024 - Present' },
  ]);

  const handleAdd = () => {
    const newExp = { id: experiences.length + 1, role: 'New Role', company: 'Company', duration: 'Dates' };
    setExperiences([...experiences, newExp]);
  };

  const handleEdit = (id) => {
    alert('Edit experience (UI only)');
  };

  return (
    <ProfileLayout title="Work" basePath={basePath}>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Work Experience</h2>
          <button onClick={handleAdd} className="px-4 py-2 bg-gray-200 rounded">Add Experience</button>
        </div>

        <div className="space-y-4">
          {experiences.map((exp) => (
            <div key={exp.id} className="p-4 border rounded flex justify-between items-start">
              <div>
                <div className="text-lg font-medium">{exp.role}</div>
                <div className="text-sm text-gray-600">{exp.company}</div>
                <div className="text-sm text-gray-500">{exp.duration}</div>
              </div>
              <div>
                <button onClick={() => handleEdit(exp.id)} className="px-3 py-1 bg-gray-100 rounded">Edit</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ProfileLayout>
  );
};

export default Work;
