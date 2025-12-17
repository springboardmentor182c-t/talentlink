import React, { useState } from 'react';
import ProfileLayout from '../../components/Profile/ProfileLayout.jsx';

const Portfolio = ({ basePath = '/profile' }) => {
  const [projects, setProjects] = useState([
    { id: 1, title: 'E-Commerce Platform', desc: 'Built a scalable e-commerce solution with React and Node.js', tags: ['React', 'Next.js', 'Node.js'] },
  ]);

  const handleAdd = () => {
    const newProject = { id: projects.length + 1, title: 'New Project', desc: 'Description', tags: [] };
    setProjects([...projects, newProject]);
  };

  const handleEdit = (id) => {
    alert('Edit project (UI only)');
  };

  return (
    <ProfileLayout title="Portfolio" basePath={basePath}>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Portfolio Projects</h2>
          <button onClick={handleAdd} className="px-4 py-2 bg-gray-200 rounded">+ Add New Projects</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((p) => (
            <div key={p.id} className="p-4 border rounded">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-lg font-medium">{p.title}</div>
                  <div className="text-sm text-gray-600 mt-2">{p.desc}</div>
                  <div className="mt-3 flex gap-2 flex-wrap">
                    {p.tags.map((t, i) => (
                      <span key={i} className="px-3 py-1 bg-gray-100 rounded-full text-sm">{t}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <button onClick={() => handleEdit(p.id)} className="px-3 py-1 bg-gray-100 rounded">Edit</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ProfileLayout>
  );
};

export default Portfolio;
