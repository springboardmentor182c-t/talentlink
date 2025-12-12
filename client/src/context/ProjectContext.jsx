import React, { createContext, useContext, useState, useEffect } from 'react';

const ProjectContext = createContext();

export const useProjects = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProjects must be used within a ProjectProvider');
  }
  return context;
};

export const ProjectProvider = ({ children }) => {
  // 1. Load projects from localStorage
  const [projects, setProjects] = useState(() => {
    try {
      const savedProjects = localStorage.getItem('talentlink_projects');
      console.log("Initial Load from Storage:", savedProjects); // Debug Log
      return savedProjects ? JSON.parse(savedProjects) : [];
    } catch (e) {
      console.error("Failed to load projects", e);
      return [];
    }
  });

  // 2. Save to localStorage whenever projects change (Client side)
  useEffect(() => {
    console.log("Saving to Storage:", projects); // Debug Log
    localStorage.setItem('talentlink_projects', JSON.stringify(projects));
  }, [projects]);

  // 3. AUTO-SYNC: Listen for changes from other tabs (Freelancer side)
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'talentlink_projects') {
        console.log("Storage changed in another tab! Syncing...");
        const newProjects = e.newValue ? JSON.parse(e.newValue) : [];
        setProjects(newProjects);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Function to add a new project
  const addProject = (newProject) => {
    console.log("Adding Project:", newProject); // Debug Log
    const projectWithDetails = {
      id: Date.now(),
      status: 'Active',
      progress: 0,
      createdAt: new Date().toLocaleDateString(),
      color: '#3b82f6',
      messages: [],
      ...newProject
    };
    setProjects((prev) => [projectWithDetails, ...prev]);
  };

  // Function to update a project by id (shallow merge)
  const updateProject = (id, patch) => {
    setProjects((prev) => prev.map(p => p.id === id ? { ...p, ...patch } : p));
  };

  // Add a message to a project's messages array
  const addMessage = (projectId, message) => {
    setProjects((prev) => prev.map(p => {
      if (p.id !== projectId) return p;
      const nextMessages = Array.isArray(p.messages) ? [...p.messages, message] : [message];
      return { ...p, messages: nextMessages };
    }));
  };

  const deleteProject = (id) => {
    setProjects((prev) => prev.filter(p => p.id !== id));
  };

  return (
    <ProjectContext.Provider value={{ projects, addProject, deleteProject, updateProject, addMessage }}>
      {children}
    </ProjectContext.Provider>
  );
}