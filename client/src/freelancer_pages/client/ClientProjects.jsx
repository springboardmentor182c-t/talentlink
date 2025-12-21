

// import React, { useState } from 'react';
// import { useProjects } from '../../context/ProjectContext'; // Shared Data Context

// const ClientProjects = () => {
//     // --- 1. Get Data & Actions from Context ---
//     const { 
//         projects, 
//         loading: contextLoading, 
//         addProject, 
//         updateProject, 
//         deleteProject 
//     } = useProjects();

//     // --- Local State ---
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [isViewModalOpen, setIsViewModalOpen] = useState(false);
//     const [activeTab, setActiveTab] = useState('All');
//     const [selectedProject, setSelectedProject] = useState(null);

//     // --- Edit Mode State ---
//     const [isEditing, setIsEditing] = useState(false);
//     const [currentId, setCurrentId] = useState(null);

//     // --- Form State ---
//     const initialFormState = {
//         project_title: '',     
//         description: '',
//         budget: '',
//         // Removed freelancer field
//         deadline: '',
//         required_skills: '',
//         experience_years: 0,   
//         status: 'Active' // Default is now Active (Removed 'open')
//     };

//     const [formData, setFormData] = useState(initialFormState);

//     // --- Handlers ---
//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     // 1. Open Create Modal
//     const openCreateModal = () => {
//         setIsEditing(false);
//         setCurrentId(null);
//         setFormData(initialFormState);
//         setIsModalOpen(true);
//     };

//     // 2. Open Edit Modal
//     const openEditModal = (project) => {
//         setIsEditing(true);
//         setCurrentId(project.id);
//         setFormData({
//             project_title: project.project_title || project.title,
//             description: project.description,
//             budget: project.budget,
//             deadline: project.deadline || '',
//             required_skills: project.required_skills,
//             experience_years: project.experience_years || 0,
//             status: project.status
//         });
//         setIsModalOpen(true);
//     };

//     // 3. Open View Details
//     const openViewDetails = (project) => {
//         setSelectedProject(project);
//         setIsViewModalOpen(true);
//     };

//     // 4. Handle Submit
//     const handleSubmit = async (e) => {
//         e.preventDefault();
        
//         const projectData = {
//             ...formData,
//             title: formData.project_title 
//         };

//         if (isEditing) {
//             if(updateProject) {
//                 await updateProject(currentId, projectData);
//             }
//         } else {
//             await addProject(projectData);
//         }
        
//         setIsModalOpen(false);
//     };

//     // 5. Handle Delete
//     const handleDelete = (id) => {
//         if (window.confirm("Are you sure you want to delete this project?")) {
//             deleteProject(id);
//         }
//     };

//     // --- Filters & Helpers ---
//     const filteredProjects = activeTab === 'All' 
//         ? projects 
//         : projects.filter(p => p.status.toLowerCase() === activeTab.toLowerCase());

//     const getProgress = (status) => {
//         const s = status.toLowerCase();
//         if (s === 'completed' || s === 'closed') return 100;
//         if (s === 'active') return 50; 
//         return 0; 
//     };

//     const getStatusColor = (status) => {
//         const s = status.toLowerCase();
//         if (s === 'active') return 'Active';
//         if (s === 'completed' || s === 'closed') return 'Completed';
//         return 'Draft'; 
//     };

//     return (
//         <div className="client-page-container">
//             {/* --- INTERNAL CSS --- */}
//             <style>{`
//                 .client-page-container {
//                     padding: 40px;
//                     background-color: #f8fafc;
//                     min-height: 100vh;
//                     font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
//                 }
                
//                 /* Header */
//                 .page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; }
//                 .page-title h1 { font-size: 26px; font-weight: 700; color: #1e293b; margin: 0; }
//                 .page-title p { color: #64748b; margin-top: 5px; font-size: 14px; }
//                 .btn-primary { background-color: #2563eb; color: white; border: none; padding: 10px 20px; border-radius: 8px; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 8px; transition: background-color 0.2s; font-size: 14px; }
//                 .btn-primary:hover { background-color: #1d4ed8; }

//                 /* Tabs */
//                 .tabs-wrapper { display: flex; gap: 20px; border-bottom: 1px solid #e2e8f0; margin-bottom: 30px; }
//                 .tab-item { background: none; border: none; padding: 0 0 12px 0; font-size: 14px; color: #64748b; cursor: pointer; font-weight: 500; position: relative; }
//                 .tab-item:hover { color: #1e293b; }
//                 .tab-item.active { color: #2563eb; font-weight: 600; }
//                 .tab-item.active::after { content: ''; position: absolute; bottom: -1px; left: 0; width: 100%; height: 2px; background-color: #2563eb; }

//                 /* Grid Layout */
//                 .projects-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 25px; }

//                 /* Project Card */
//                 .project-card { background: white; border-radius: 12px; padding: 25px; box-shadow: 0 1px 3px rgba(0,0,0,0.05); border: 1px solid #f1f5f9; transition: all 0.2s ease; display: flex; flex-direction: column; }
//                 .project-card:hover { transform: translateY(-3px); box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1); }
                
//                 .card-header { display: flex; justify-content: space-between; align-items: start; margin-bottom: 15px; }
//                 .badge { font-size: 11px; text-transform: uppercase; font-weight: 700; padding: 4px 10px; border-radius: 20px; letter-spacing: 0.5px; }
//                 .badge.Active { background-color: #dbeafe; color: #1e40af; }
//                 .badge.Completed { background-color: #dcfce7; color: #166534; }
//                 .badge.Draft { background-color: #f1f5f9; color: #475569; } 

//                 /* Action Icons in Header */
//                 .header-actions { display: flex; gap: 8px; }
//                 .icon-btn { background: none; border: none; cursor: pointer; color: #94a3b8; padding: 4px; border-radius: 4px; transition: all 0.2s; }
//                 .icon-btn:hover { background-color: #f1f5f9; color: #334155; }
//                 .icon-btn.delete:hover { background-color: #fee2e2; color: #ef4444; }

//                 .project-name { font-size: 18px; font-weight: 700; color: #0f172a; margin: 0 0 8px 0; line-height: 1.4; }
//                 .project-meta { font-size: 13px; color: #64748b; margin-bottom: 20px; }

//                 /* Progress Bar */
//                 .progress-container { margin-bottom: 20px; }
//                 .progress-labels { display: flex; justify-content: space-between; font-size: 12px; color: #64748b; margin-bottom: 6px; }
//                 .progress-track { width: 100%; height: 6px; background-color: #f1f5f9; border-radius: 3px; overflow: hidden; }
//                 .progress-fill { height: 100%; border-radius: 3px; transition: width 0.5s ease; }

//                 /* Details Row */
//                 .card-footer { margin-top: auto; padding-top: 15px; border-top: 1px solid #f8fafc; display: flex; gap: 10px; }
//                 .btn-view { flex: 1; padding: 10px; background: white; border: 1px solid #e2e8f0; border-radius: 6px; color: #475569; font-weight: 500; font-size: 14px; cursor: pointer; transition: all 0.2s; }
//                 .btn-view:hover { background-color: #f8fafc; border-color: #cbd5e1; color: #1e293b; }

//                 /* Modal Overlay */
//                 .modal-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background-color: rgba(0,0,0,0.6); display: flex; justify-content: center; align-items: center; z-index: 9999; backdrop-filter: blur(2px); }
//                 .modal-content { background: white; padding: 30px; border-radius: 16px; width: 550px; max-width: 90%; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1); animation: slideUp 0.3s ease-out; }
//                 .modal-title { font-size: 20px; font-weight: 700; margin-bottom: 20px; color: #1e293b; }
//                 .form-group { margin-bottom: 15px; }
//                 .form-label { display: block; font-size: 13px; font-weight: 600; color: #334155; margin-bottom: 6px; }
//                 .form-input, .form-textarea, .form-select { width: 100%; padding: 10px 12px; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 14px; outline: none; transition: border-color 0.2s; box-sizing: border-box; }
//                 .form-input:focus, .form-textarea:focus { border-color: #2563eb; box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1); }
                
//                 .modal-actions { display: flex; gap: 12px; margin-top: 25px; }
//                 .btn-cancel { flex: 1; padding: 10px; background: white; border: 1px solid #cbd5e1; color: #475569; border-radius: 6px; cursor: pointer; font-weight: 500; }
//                 .btn-submit { flex: 1; padding: 10px; background: #2563eb; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 600; }

//                 /* --- View Details Styles --- */
//                 .detail-row { margin-bottom: 15px; border-bottom: 1px solid #f1f5f9; padding-bottom: 10px; }
//                 .detail-row:last-child { border-bottom: none; }
//                 .detail-label { font-size: 12px; font-weight: 600; color: #64748b; text-transform: uppercase; margin-bottom: 4px; }
//                 .detail-value { font-size: 15px; color: #334155; line-height: 1.5; }
//                 .skill-tag { display: inline-block; background: #e2e8f0; padding: 4px 8px; border-radius: 4px; font-size: 12px; margin-right: 5px; color: #475569; }

//                 @keyframes slideUp {
//                     from { transform: translateY(20px); opacity: 0; }
//                     to { transform: translateY(0); opacity: 1; }
//                 }
//             `}</style>

//             {/* --- HEADER --- */}
//             <div className="page-header">
//                 <div className="page-title">
//                     <h1>My Projects</h1>
//                     <p>Manage your job postings and track progress</p>
//                 </div>
//                 <button className="btn-primary" onClick={openCreateModal}>
//                     <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"></path></svg>
//                     Post New Job
//                 </button>
//             </div>

//             {/* --- TABS (Removed "Open") --- */}
//             <div className="tabs-wrapper">
//                 {['All', 'Active', 'Completed'].map(tab => (
//                     <button 
//                         key={tab} 
//                         className={`tab-item ${activeTab === tab ? 'active' : ''}`}
//                         onClick={() => setActiveTab(tab)}
//                         style={{ textTransform: 'capitalize' }}
//                     >
//                         {tab}
//                     </button>
//                 ))}
//             </div>

//             {/* --- PROJECT GRID --- */}
//             {contextLoading ? (
//                 <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>Loading projects...</div>
//             ) : filteredProjects.length === 0 ? (
//                 <div style={{ textAlign: 'center', padding: '50px', color: '#94a3b8', border: '2px dashed #e2e8f0', borderRadius: '12px' }}>
//                     <p>No projects found. Click "Post New Job" to start.</p>
//                 </div>
//             ) : (
//                 <div className="projects-grid">
//                     {filteredProjects.map(project => {
//                         const progress = getProgress(project.status);
//                         const statusColor = getStatusColor(project.status);
                        
//                         return (
//                             <div key={project.id} className="project-card">
//                                 <div className="card-header">
//                                     <span className={`badge ${statusColor}`}>
//                                         {project.status}
//                                     </span>
                                    
//                                     {/* Action Buttons */}
//                                     <div className="header-actions">
//                                         <button 
//                                             className="icon-btn" 
//                                             title="Edit Project"
//                                             onClick={() => openEditModal(project)}
//                                         >
//                                             <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
//                                         </button>
//                                         <button 
//                                             className="icon-btn delete" 
//                                             title="Delete Project"
//                                             onClick={() => handleDelete(project.id)}
//                                         >
//                                             <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
//                                         </button>
//                                     </div>
//                                 </div>

//                                 <h3 className="project-name">{project.project_title || project.title}</h3>
//                                 {/* Removed Freelancer Name, only showing Budget and Experience */}
//                                 <p className="project-meta">
//                                     Budget: ${project.budget} • Exp: {project.experience_years} yrs
//                                 </p>

//                                 {/* Visual Progress Bar */}
//                                 <div className="progress-container">
//                                     <div className="progress-labels">
//                                         <span>Progress</span>
//                                         <span>{progress}%</span>
//                                     </div>
//                                     <div className="progress-track">
//                                         <div 
//                                             className="progress-fill" 
//                                             style={{ 
//                                                 width: `${progress}%`,
//                                                 backgroundColor: progress === 100 ? '#10b981' : '#3b82f6'
//                                             }}
//                                         ></div>
//                                     </div>
//                                 </div>

//                                 <div className="card-footer">
//                                     <button className="btn-view" onClick={() => openViewDetails(project)}>View Details</button>
//                                 </div>
//                             </div>
//                         );
//                     })}
//                 </div>
//             )}

//             {/* --- CREATE/EDIT MODAL --- */}
//             {isModalOpen && (
//                 <div className="modal-overlay">
//                     <div className="modal-content">
//                         <h2 className="modal-title">
//                             {isEditing ? "Edit Job Post" : "Post a New Job"}
//                         </h2>
//                         <form onSubmit={handleSubmit}>
//                             <div className="form-group">
//                                 <label className="form-label">Project Title</label>
//                                 <input type="text" name="project_title" className="form-input" required 
//                                     value={formData.project_title} onChange={handleChange} placeholder="e.g. Website Redesign" />
//                             </div>
                            
//                             <div className="form-group">
//                                 <label className="form-label">Description</label>
//                                 <textarea name="description" className="form-textarea" rows="3" required
//                                     value={formData.description} onChange={handleChange} placeholder="Describe the requirements..."></textarea>
//                             </div>

//                             <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
//                                 <div className="form-group">
//                                     <label className="form-label">Budget ($)</label>
//                                     <input type="number" name="budget" className="form-input" required step="0.01"
//                                         value={formData.budget} onChange={handleChange} />
//                                 </div>
//                                 <div className="form-group">
//                                     <label className="form-label">Experience (Years)</label>
//                                     <input type="number" name="experience_years" className="form-input" required
//                                         value={formData.experience_years} onChange={handleChange} />
//                                 </div>
//                             </div>

//                             <div className="form-group">
//                                 <label className="form-label">Required Skills</label>
//                                 <input type="text" name="required_skills" className="form-input" placeholder="e.g. React, Python"
//                                     value={formData.required_skills} onChange={handleChange} />
//                             </div>

//                             {/* Status and Deadline share a row now, removed Freelancer input */}
//                             <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
//                                 <div className="form-group">
//                                     <label className="form-label">Status</label>
//                                     <select name="status" className="form-select" value={formData.status} onChange={handleChange}>
//                                         {/* Removed Open option */}
//                                         <option value="Active">Active</option>
//                                         <option value="Completed">Completed</option>
//                                     </select>
//                                 </div>
//                                 <div className="form-group">
//                                     <label className="form-label">Deadline</label>
//                                     <input type="date" name="deadline" className="form-input" 
//                                         value={formData.deadline} onChange={handleChange} />
//                                 </div>
//                             </div>
                            
//                             <div className="modal-actions">
//                                 <button type="button" className="btn-cancel" onClick={() => setIsModalOpen(false)}>Cancel</button>
//                                 <button type="submit" className="btn-submit">
//                                     {isEditing ? "Save Changes" : "Post Job"}
//                                 </button>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             )}

//             {/* --- VIEW DETAILS MODAL --- */}
//             {isViewModalOpen && selectedProject && (
//                 <div className="modal-overlay">
//                     <div className="modal-content">
//                         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
//                             <h2 className="modal-title" style={{ marginBottom: 0 }}>Project Details</h2>
//                             <span className={`badge ${getStatusColor(selectedProject.status)}`} style={{ fontSize: '12px' }}>
//                                 {selectedProject.status}
//                             </span>
//                         </div>
                        
//                         <div className="detail-row">
//                             <div className="detail-label">Project Title</div>
//                             <div className="detail-value" style={{ fontWeight: '600', fontSize: '18px' }}>
//                                 {selectedProject.project_title || selectedProject.title}
//                             </div>
//                         </div>

//                         <div className="detail-row">
//                             <div className="detail-label">Description</div>
//                             <div className="detail-value">{selectedProject.description || "No description provided."}</div>
//                         </div>

//                         <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
//                             <div className="detail-row">
//                                 <div className="detail-label">Budget</div>
//                                 <div className="detail-value" style={{ color: '#2563eb', fontWeight: 'bold' }}>${selectedProject.budget}</div>
//                             </div>
//                              <div className="detail-row">
//                                 <div className="detail-label">Experience Required</div>
//                                 <div className="detail-value">{selectedProject.experience_years} Years</div>
//                             </div>
//                         </div>

//                         <div className="detail-row">
//                             <div className="detail-label">Required Skills</div>
//                             <div className="detail-value">
//                                 {selectedProject.required_skills ? selectedProject.required_skills.split(',').map((skill, index) => (
//                                     <span key={index} className="skill-tag">{skill.trim()}</span>
//                                 )) : "N/A"}
//                             </div>
//                         </div>

//                         <div className="modal-actions">
//                             <button className="btn-cancel" onClick={() => setIsViewModalOpen(false)}>Close</button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default ClientProjects;







// import React, { useState } from 'react';
// import { useProjects } from '../../context/ProjectContext'; // Shared Data Context
// // --- NEW IMPORT ---
// import CreateContractModal from '../../components/Modals/CreateContractModal'; 

// const ClientProjects = () => {
//     // --- 1. Get Data & Actions from Context ---
//     const { 
//         projects, 
//         loading: contextLoading, 
//         addProject, 
//         updateProject, 
//         deleteProject 
//     } = useProjects();

//     // --- Local State ---
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    
//     // --- NEW STATE: Contract Modal ---
//     const [isContractModalOpen, setIsContractModalOpen] = useState(false);
    
//     const [activeTab, setActiveTab] = useState('All');
//     const [selectedProject, setSelectedProject] = useState(null);

//     // --- Edit Mode State ---
//     const [isEditing, setIsEditing] = useState(false);
//     const [currentId, setCurrentId] = useState(null);

//     // --- Form State ---
//     const initialFormState = {
//         project_title: '',     
//         description: '',
//         budget: '',
//         deadline: '',
//         required_skills: '',
//         experience_years: 0,   
//         status: 'Active'
//     };

//     const [formData, setFormData] = useState(initialFormState);

//     // --- Handlers ---
//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     // 1. Open Create Modal
//     const openCreateModal = () => {
//         setIsEditing(false);
//         setCurrentId(null);
//         setFormData(initialFormState);
//         setIsModalOpen(true);
//     };

//     // 2. Open Edit Modal
//     const openEditModal = (project) => {
//         setIsEditing(true);
//         setCurrentId(project.id);
//         setFormData({
//             project_title: project.project_title || project.title,
//             description: project.description,
//             budget: project.budget,
//             deadline: project.deadline || '',
//             required_skills: project.required_skills,
//             experience_years: project.experience_years || 0,
//             status: project.status
//         });
//         setIsModalOpen(true);
//     };

//     // 3. Open View Details
//     const openViewDetails = (project) => {
//         setSelectedProject(project);
//         setIsViewModalOpen(true);
//     };

//     // --- NEW HANDLER: Open Contract Modal ---
//     const openContractModal = (project) => {
//         setSelectedProject(project);
//         setIsContractModalOpen(true);
//     };

//     // 4. Handle Submit
//     const handleSubmit = async (e) => {
//         e.preventDefault();
        
//         const projectData = {
//             ...formData,
//             title: formData.project_title 
//         };

//         if (isEditing) {
//             if(updateProject) {
//                 await updateProject(currentId, projectData);
//             }
//         } else {
//             await addProject(projectData);
//         }
        
//         setIsModalOpen(false);
//     };

//     // 5. Handle Delete
//     const handleDelete = (id) => {
//         if (window.confirm("Are you sure you want to delete this project?")) {
//             deleteProject(id);
//         }
//     };

//     // --- Filters & Helpers ---
//     const filteredProjects = activeTab === 'All' 
//         ? projects 
//         : projects.filter(p => p.status.toLowerCase() === activeTab.toLowerCase());

//     const getProgress = (status) => {
//         const s = status.toLowerCase();
//         if (s === 'completed' || s === 'closed') return 100;
//         if (s === 'active') return 50; 
//         return 0; 
//     };

//     const getStatusColor = (status) => {
//         const s = status.toLowerCase();
//         if (s === 'active') return 'Active';
//         if (s === 'completed' || s === 'closed') return 'Completed';
//         return 'Draft'; 
//     };

//     return (
//         <div className="client-page-container">
//             {/* --- INTERNAL CSS --- */}
//             <style>{`
//                 .client-page-container {
//                     padding: 40px;
//                     background-color: #f8fafc;
//                     min-height: 100vh;
//                     font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
//                 }
                
//                 /* Header */
//                 .page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; }
//                 .page-title h1 { font-size: 26px; font-weight: 700; color: #1e293b; margin: 0; }
//                 .page-title p { color: #64748b; margin-top: 5px; font-size: 14px; }
//                 .btn-primary { background-color: #2563eb; color: white; border: none; padding: 10px 20px; border-radius: 8px; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 8px; transition: background-color 0.2s; font-size: 14px; }
//                 .btn-primary:hover { background-color: #1d4ed8; }

//                 /* Tabs */
//                 .tabs-wrapper { display: flex; gap: 20px; border-bottom: 1px solid #e2e8f0; margin-bottom: 30px; }
//                 .tab-item { background: none; border: none; padding: 0 0 12px 0; font-size: 14px; color: #64748b; cursor: pointer; font-weight: 500; position: relative; }
//                 .tab-item:hover { color: #1e293b; }
//                 .tab-item.active { color: #2563eb; font-weight: 600; }
//                 .tab-item.active::after { content: ''; position: absolute; bottom: -1px; left: 0; width: 100%; height: 2px; background-color: #2563eb; }

//                 /* Grid Layout */
//                 .projects-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 25px; }

//                 /* Project Card */
//                 .project-card { background: white; border-radius: 12px; padding: 25px; box-shadow: 0 1px 3px rgba(0,0,0,0.05); border: 1px solid #f1f5f9; transition: all 0.2s ease; display: flex; flex-direction: column; }
//                 .project-card:hover { transform: translateY(-3px); box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1); }
                
//                 .card-header { display: flex; justify-content: space-between; align-items: start; margin-bottom: 15px; }
//                 .badge { font-size: 11px; text-transform: uppercase; font-weight: 700; padding: 4px 10px; border-radius: 20px; letter-spacing: 0.5px; }
//                 .badge.Active { background-color: #dbeafe; color: #1e40af; }
//                 .badge.Completed { background-color: #dcfce7; color: #166534; }
//                 .badge.Draft { background-color: #f1f5f9; color: #475569; } 

//                 /* Action Icons in Header */
//                 .header-actions { display: flex; gap: 8px; }
//                 .icon-btn { background: none; border: none; cursor: pointer; color: #94a3b8; padding: 4px; border-radius: 4px; transition: all 0.2s; }
//                 .icon-btn:hover { background-color: #f1f5f9; color: #334155; }
//                 .icon-btn.delete:hover { background-color: #fee2e2; color: #ef4444; }

//                 .project-name { font-size: 18px; font-weight: 700; color: #0f172a; margin: 0 0 8px 0; line-height: 1.4; }
//                 .project-meta { font-size: 13px; color: #64748b; margin-bottom: 20px; }

//                 /* Progress Bar */
//                 .progress-container { margin-bottom: 20px; }
//                 .progress-labels { display: flex; justify-content: space-between; font-size: 12px; color: #64748b; margin-bottom: 6px; }
//                 .progress-track { width: 100%; height: 6px; background-color: #f1f5f9; border-radius: 3px; overflow: hidden; }
//                 .progress-fill { height: 100%; border-radius: 3px; transition: width 0.5s ease; }

//                 /* Details Row */
//                 .card-footer { margin-top: auto; padding-top: 15px; border-top: 1px solid #f8fafc; display: flex; gap: 10px; }
//                 .btn-view { flex: 1; padding: 10px; background: white; border: 1px solid #e2e8f0; border-radius: 6px; color: #475569; font-weight: 500; font-size: 14px; cursor: pointer; transition: all 0.2s; }
//                 .btn-view:hover { background-color: #f8fafc; border-color: #cbd5e1; color: #1e293b; }
                
//                 /* --- NEW CSS for Hire Button --- */
//                 .btn-hire { flex: 1; padding: 10px; background: #0f172a; border: 1px solid #0f172a; border-radius: 6px; color: white; font-weight: 500; font-size: 14px; cursor: pointer; transition: all 0.2s; }
//                 .btn-hire:hover { background-color: #334155; border-color: #334155; }

//                 /* Modal Overlay */
//                 .modal-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background-color: rgba(0,0,0,0.6); display: flex; justify-content: center; align-items: center; z-index: 9999; backdrop-filter: blur(2px); }
//                 .modal-content { background: white; padding: 30px; border-radius: 16px; width: 550px; max-width: 90%; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1); animation: slideUp 0.3s ease-out; }
//                 .modal-title { font-size: 20px; font-weight: 700; margin-bottom: 20px; color: #1e293b; }
//                 .form-group { margin-bottom: 15px; }
//                 .form-label { display: block; font-size: 13px; font-weight: 600; color: #334155; margin-bottom: 6px; }
//                 .form-input, .form-textarea, .form-select { width: 100%; padding: 10px 12px; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 14px; outline: none; transition: border-color 0.2s; box-sizing: border-box; }
//                 .form-input:focus, .form-textarea:focus { border-color: #2563eb; box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1); }
                
//                 .modal-actions { display: flex; gap: 12px; margin-top: 25px; }
//                 .btn-cancel { flex: 1; padding: 10px; background: white; border: 1px solid #cbd5e1; color: #475569; border-radius: 6px; cursor: pointer; font-weight: 500; }
//                 .btn-submit { flex: 1; padding: 10px; background: #2563eb; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 600; }

//                 /* --- View Details Styles --- */
//                 .detail-row { margin-bottom: 15px; border-bottom: 1px solid #f1f5f9; padding-bottom: 10px; }
//                 .detail-row:last-child { border-bottom: none; }
//                 .detail-label { font-size: 12px; font-weight: 600; color: #64748b; text-transform: uppercase; margin-bottom: 4px; }
//                 .detail-value { font-size: 15px; color: #334155; line-height: 1.5; }
//                 .skill-tag { display: inline-block; background: #e2e8f0; padding: 4px 8px; border-radius: 4px; font-size: 12px; margin-right: 5px; color: #475569; }

//                 @keyframes slideUp {
//                     from { transform: translateY(20px); opacity: 0; }
//                     to { transform: translateY(0); opacity: 1; }
//                 }
//             `}</style>

//             {/* --- HEADER --- */}
//             <div className="page-header">
//                 <div className="page-title">
//                     <h1>My Projects</h1>
//                     <p>Manage your job postings and track progress</p>
//                 </div>
//                 <button className="btn-primary" onClick={openCreateModal}>
//                     <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"></path></svg>
//                     Post New Job
//                 </button>
//             </div>

//             {/* --- TABS --- */}
//             <div className="tabs-wrapper">
//                 {['All', 'Active', 'Completed'].map(tab => (
//                     <button 
//                         key={tab} 
//                         className={`tab-item ${activeTab === tab ? 'active' : ''}`}
//                         onClick={() => setActiveTab(tab)}
//                         style={{ textTransform: 'capitalize' }}
//                     >
//                         {tab}
//                     </button>
//                 ))}
//             </div>

//             {/* --- PROJECT GRID --- */}
//             {contextLoading ? (
//                 <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>Loading projects...</div>
//             ) : filteredProjects.length === 0 ? (
//                 <div style={{ textAlign: 'center', padding: '50px', color: '#94a3b8', border: '2px dashed #e2e8f0', borderRadius: '12px' }}>
//                     <p>No projects found. Click "Post New Job" to start.</p>
//                 </div>
//             ) : (
//                 <div className="projects-grid">
//                     {filteredProjects.map(project => {
//                         const progress = getProgress(project.status);
//                         const statusColor = getStatusColor(project.status);
                        
//                         return (
//                             <div key={project.id} className="project-card">
//                                 <div className="card-header">
//                                     <span className={`badge ${statusColor}`}>
//                                         {project.status}
//                                     </span>
                                    
//                                     {/* Action Buttons */}
//                                     <div className="header-actions">
//                                         <button 
//                                             className="icon-btn" 
//                                             title="Edit Project"
//                                             onClick={() => openEditModal(project)}
//                                         >
//                                             <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
//                                         </button>
//                                         <button 
//                                             className="icon-btn delete" 
//                                             title="Delete Project"
//                                             onClick={() => handleDelete(project.id)}
//                                         >
//                                             <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
//                                         </button>
//                                     </div>
//                                 </div>

//                                 <h3 className="project-name">{project.project_title || project.title}</h3>
//                                 <p className="project-meta">
//                                     Budget: ${project.budget} • Exp: {project.experience_years} yrs
//                                 </p>

//                                 {/* Visual Progress Bar */}
//                                 <div className="progress-container">
//                                     <div className="progress-labels">
//                                         <span>Progress</span>
//                                         <span>{progress}%</span>
//                                     </div>
//                                     <div className="progress-track">
//                                         <div 
//                                             className="progress-fill" 
//                                             style={{ 
//                                                 width: `${progress}%`,
//                                                 backgroundColor: progress === 100 ? '#10b981' : '#3b82f6'
//                                             }}
//                                         ></div>
//                                     </div>
//                                 </div>

//                                 <div className="card-footer">
//                                     <button className="btn-view" onClick={() => openViewDetails(project)}>View Details</button>
                                    
//                                     {/* --- NEW HIRE BUTTON --- */}
//                                     {project.status === 'Active' && (
//                                         <button className="btn-hire" onClick={() => openContractModal(project)}>
//                                             Hire / Contract
//                                         </button>
//                                     )}
//                                 </div>
//                             </div>
//                         );
//                     })}
//                 </div>
//             )}

//             {/* --- CREATE/EDIT MODAL --- */}
//             {isModalOpen && (
//                 <div className="modal-overlay">
//                     <div className="modal-content">
//                         <h2 className="modal-title">
//                             {isEditing ? "Edit Job Post" : "Post a New Job"}
//                         </h2>
//                         <form onSubmit={handleSubmit}>
//                             <div className="form-group">
//                                 <label className="form-label">Project Title</label>
//                                 <input type="text" name="project_title" className="form-input" required 
//                                     value={formData.project_title} onChange={handleChange} placeholder="e.g. Website Redesign" />
//                             </div>
                            
//                             <div className="form-group">
//                                 <label className="form-label">Description</label>
//                                 <textarea name="description" className="form-textarea" rows="3" required
//                                     value={formData.description} onChange={handleChange} placeholder="Describe the requirements..."></textarea>
//                             </div>

//                             <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
//                                 <div className="form-group">
//                                     <label className="form-label">Budget ($)</label>
//                                     <input type="number" name="budget" className="form-input" required step="0.01"
//                                         value={formData.budget} onChange={handleChange} />
//                                 </div>
//                                 <div className="form-group">
//                                     <label className="form-label">Experience (Years)</label>
//                                     <input type="number" name="experience_years" className="form-input" required
//                                         value={formData.experience_years} onChange={handleChange} />
//                                 </div>
//                             </div>

//                             <div className="form-group">
//                                 <label className="form-label">Required Skills</label>
//                                 <input type="text" name="required_skills" className="form-input" placeholder="e.g. React, Python"
//                                     value={formData.required_skills} onChange={handleChange} />
//                             </div>

//                             {/* Status and Deadline share a row now, removed Freelancer input */}
//                             <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
//                                 <div className="form-group">
//                                     <label className="form-label">Status</label>
//                                     <select name="status" className="form-select" value={formData.status} onChange={handleChange}>
//                                         <option value="Active">Active</option>
//                                         <option value="Completed">Completed</option>
//                                     </select>
//                                 </div>
//                                 <div className="form-group">
//                                     <label className="form-label">Deadline</label>
//                                     <input type="date" name="deadline" className="form-input" 
//                                         value={formData.deadline} onChange={handleChange} />
//                                 </div>
//                             </div>
                            
//                             <div className="modal-actions">
//                                 <button type="button" className="btn-cancel" onClick={() => setIsModalOpen(false)}>Cancel</button>
//                                 <button type="submit" className="btn-submit">
//                                     {isEditing ? "Save Changes" : "Post Job"}
//                                 </button>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             )}

//             {/* --- VIEW DETAILS MODAL --- */}
//             {isViewModalOpen && selectedProject && (
//                 <div className="modal-overlay">
//                     <div className="modal-content">
//                         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
//                             <h2 className="modal-title" style={{ marginBottom: 0 }}>Project Details</h2>
//                             <span className={`badge ${getStatusColor(selectedProject.status)}`} style={{ fontSize: '12px' }}>
//                                 {selectedProject.status}
//                             </span>
//                         </div>
                        
//                         <div className="detail-row">
//                             <div className="detail-label">Project Title</div>
//                             <div className="detail-value" style={{ fontWeight: '600', fontSize: '18px' }}>
//                                 {selectedProject.project_title || selectedProject.title}
//                             </div>
//                         </div>

//                         <div className="detail-row">
//                             <div className="detail-label">Description</div>
//                             <div className="detail-value">{selectedProject.description || "No description provided."}</div>
//                         </div>

//                         <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
//                             <div className="detail-row">
//                                 <div className="detail-label">Budget</div>
//                                 <div className="detail-value" style={{ color: '#2563eb', fontWeight: 'bold' }}>${selectedProject.budget}</div>
//                             </div>
//                              <div className="detail-row">
//                                 <div className="detail-label">Experience Required</div>
//                                 <div className="detail-value">{selectedProject.experience_years} Years</div>
//                             </div>
//                         </div>

//                         <div className="detail-row">
//                             <div className="detail-label">Required Skills</div>
//                             <div className="detail-value">
//                                 {selectedProject.required_skills ? selectedProject.required_skills.split(',').map((skill, index) => (
//                                     <span key={index} className="skill-tag">{skill.trim()}</span>
//                                 )) : "N/A"}
//                             </div>
//                         </div>

//                         <div className="modal-actions">
//                             <button className="btn-cancel" onClick={() => setIsViewModalOpen(false)}>Close</button>
//                         </div>
//                     </div>
//                 </div>
//             )}

//             {/* --- NEW: CONTRACT CREATION MODAL --- */}
//             {/* Logic: Map project details to a mock "proposal" object so the modal works */}
//             {isContractModalOpen && selectedProject && (
//                 <CreateContractModal 
//                     isOpen={isContractModalOpen} 
//                     onClose={() => setIsContractModalOpen(false)} 
//                     proposal={{
//                         id: 'proj-' + selectedProject.id, // Generate a temporary ID
//                         projectTitle: selectedProject.project_title || selectedProject.title,
//                         bidAmount: selectedProject.budget,
//                         // If you have a specific freelancer ID in mind for this view, add it here, 
//                         // otherwise the user might need to select one in the backend or next step.
//                         freelancerId: null 
//                     }} 
//                 />
//             )}
//         </div>
//     );
// };

// export default ClientProjects;








// import React, { useState } from 'react';
// import { useProjects } from '../../context/ProjectContext'; // Shared Data Context
// // --- NEW IMPORT ---
// import CreateContractModal from '../../components/Modals/CreateContractModal'; 

// const ClientProjects = () => {
//     // --- 1. Get Data & Actions from Context ---
//     const { 
//         projects, 
//         loading: contextLoading, 
//         addProject, 
//         updateProject, 
//         deleteProject 
//     } = useProjects();

//     // --- Local State ---
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    
//     // --- NEW STATE: Contract Modal ---
//     const [isContractModalOpen, setIsContractModalOpen] = useState(false);
    
//     const [activeTab, setActiveTab] = useState('All');
//     const [selectedProject, setSelectedProject] = useState(null);

//     // --- Edit Mode State ---
//     const [isEditing, setIsEditing] = useState(false);
//     const [currentId, setCurrentId] = useState(null);

//     // --- Form State ---
//     const initialFormState = {
//         project_title: '',     
//         description: '',
//         budget: '',
//         deadline: '',
//         required_skills: '',
//         experience_years: 0,   
//         status: 'Active'
//     };

//     const [formData, setFormData] = useState(initialFormState);

//     // --- Handlers ---
//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     // 1. Open Create Modal
//     const openCreateModal = () => {
//         setIsEditing(false);
//         setCurrentId(null);
//         setFormData(initialFormState);
//         setIsModalOpen(true);
//     };

//     // 2. Open Edit Modal
//     const openEditModal = (project) => {
//         setIsEditing(true);
//         setCurrentId(project.id);
//         setFormData({
//             project_title: project.project_title || project.title,
//             description: project.description,
//             budget: project.budget,
//             deadline: project.deadline || '',
//             required_skills: project.required_skills,
//             experience_years: project.experience_years || 0,
//             status: project.status
//         });
//         setIsModalOpen(true);
//     };

//     // 3. Open View Details
//     const openViewDetails = (project) => {
//         setSelectedProject(project);
//         setIsViewModalOpen(true);
//     };

//     // --- NEW HANDLER: Open Contract Modal ---
//     const openContractModal = (project) => {
//         setSelectedProject(project);
//         setIsContractModalOpen(true);
//     };

//     // 4. Handle Submit
//     const handleSubmit = async (e) => {
//         e.preventDefault();
        
//         const projectData = {
//             ...formData,
//             title: formData.project_title 
//         };

//         if (isEditing) {
//             if(updateProject) {
//                 await updateProject(currentId, projectData);
//             }
//         } else {
//             await addProject(projectData);
//         }
        
//         setIsModalOpen(false);
//     };

//     // 5. Handle Delete
//     const handleDelete = (id) => {
//         if (window.confirm("Are you sure you want to delete this project?")) {
//             deleteProject(id);
//         }
//     };

//     // --- Filters & Helpers ---
//     const filteredProjects = activeTab === 'All' 
//         ? projects 
//         : projects.filter(p => p.status.toLowerCase() === activeTab.toLowerCase());

//     const getProgress = (status) => {
//         const s = status.toLowerCase();
//         if (s === 'completed' || s === 'closed') return 100;
//         if (s === 'active') return 50; 
//         return 0; 
//     };

//     const getStatusColor = (status) => {
//         const s = status.toLowerCase();
//         if (s === 'active') return 'Active';
//         if (s === 'completed' || s === 'closed') return 'Completed';
//         return 'Draft'; 
//     };

//     return (
//         <div className="client-page-container">
//             {/* --- INTERNAL CSS --- */}
//             <style>{`
//                 .client-page-container {
//                     padding: 40px;
//                     background-color: #f8fafc;
//                     min-height: 100vh;
//                     font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
//                 }
                
//                 /* Header */
//                 .page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; }
//                 .page-title h1 { font-size: 26px; font-weight: 700; color: #1e293b; margin: 0; }
//                 .page-title p { color: #64748b; margin-top: 5px; font-size: 14px; }
//                 .btn-primary { background-color: #2563eb; color: white; border: none; padding: 10px 20px; border-radius: 8px; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 8px; transition: background-color 0.2s; font-size: 14px; }
//                 .btn-primary:hover { background-color: #1d4ed8; }

//                 /* Tabs */
//                 .tabs-wrapper { display: flex; gap: 20px; border-bottom: 1px solid #e2e8f0; margin-bottom: 30px; }
//                 .tab-item { background: none; border: none; padding: 0 0 12px 0; font-size: 14px; color: #64748b; cursor: pointer; font-weight: 500; position: relative; }
//                 .tab-item:hover { color: #1e293b; }
//                 .tab-item.active { color: #2563eb; font-weight: 600; }
//                 .tab-item.active::after { content: ''; position: absolute; bottom: -1px; left: 0; width: 100%; height: 2px; background-color: #2563eb; }

//                 /* Grid Layout */
//                 .projects-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 25px; }

//                 /* Project Card */
//                 .project-card { background: white; border-radius: 12px; padding: 25px; box-shadow: 0 1px 3px rgba(0,0,0,0.05); border: 1px solid #f1f5f9; transition: all 0.2s ease; display: flex; flex-direction: column; }
//                 .project-card:hover { transform: translateY(-3px); box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1); }
                
//                 .card-header { display: flex; justify-content: space-between; align-items: start; margin-bottom: 15px; }
//                 .badge { font-size: 11px; text-transform: uppercase; font-weight: 700; padding: 4px 10px; border-radius: 20px; letter-spacing: 0.5px; }
//                 .badge.Active { background-color: #dbeafe; color: #1e40af; }
//                 .badge.Completed { background-color: #dcfce7; color: #166534; }
//                 .badge.Draft { background-color: #f1f5f9; color: #475569; } 

//                 /* Action Icons in Header */
//                 .header-actions { display: flex; gap: 8px; }
//                 .icon-btn { background: none; border: none; cursor: pointer; color: #94a3b8; padding: 4px; border-radius: 4px; transition: all 0.2s; }
//                 .icon-btn:hover { background-color: #f1f5f9; color: #334155; }
//                 .icon-btn.delete:hover { background-color: #fee2e2; color: #ef4444; }

//                 .project-name { font-size: 18px; font-weight: 700; color: #0f172a; margin: 0 0 8px 0; line-height: 1.4; }
//                 .project-meta { font-size: 13px; color: #64748b; margin-bottom: 20px; }

//                 /* Progress Bar */
//                 .progress-container { margin-bottom: 20px; }
//                 .progress-labels { display: flex; justify-content: space-between; font-size: 12px; color: #64748b; margin-bottom: 6px; }
//                 .progress-track { width: 100%; height: 6px; background-color: #f1f5f9; border-radius: 3px; overflow: hidden; }
//                 .progress-fill { height: 100%; border-radius: 3px; transition: width 0.5s ease; }

//                 /* Details Row */
//                 .card-footer { margin-top: auto; padding-top: 15px; border-top: 1px solid #f8fafc; display: flex; gap: 10px; }
//                 .btn-view { flex: 1; padding: 10px; background: white; border: 1px solid #e2e8f0; border-radius: 6px; color: #475569; font-weight: 500; font-size: 14px; cursor: pointer; transition: all 0.2s; }
//                 .btn-view:hover { background-color: #f8fafc; border-color: #cbd5e1; color: #1e293b; }
                
//                 /* --- NEW CSS for Hire Button --- */
//                 .btn-hire { flex: 1; padding: 10px; background: #0f172a; border: 1px solid #0f172a; border-radius: 6px; color: white; font-weight: 500; font-size: 14px; cursor: pointer; transition: all 0.2s; }
//                 .btn-hire:hover { background-color: #334155; border-color: #334155; }

//                 /* Modal Overlay */
//                 .modal-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background-color: rgba(0,0,0,0.6); display: flex; justify-content: center; align-items: center; z-index: 9999; backdrop-filter: blur(2px); }
//                 .modal-content { background: white; padding: 30px; border-radius: 16px; width: 550px; max-width: 90%; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1); animation: slideUp 0.3s ease-out; }
//                 .modal-title { font-size: 20px; font-weight: 700; margin-bottom: 20px; color: #1e293b; }
//                 .form-group { margin-bottom: 15px; }
//                 .form-label { display: block; font-size: 13px; font-weight: 600; color: #334155; margin-bottom: 6px; }
//                 .form-input, .form-textarea, .form-select { width: 100%; padding: 10px 12px; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 14px; outline: none; transition: border-color 0.2s; box-sizing: border-box; }
//                 .form-input:focus, .form-textarea:focus { border-color: #2563eb; box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1); }
                
//                 .modal-actions { display: flex; gap: 12px; margin-top: 25px; }
//                 .btn-cancel { flex: 1; padding: 10px; background: white; border: 1px solid #cbd5e1; color: #475569; border-radius: 6px; cursor: pointer; font-weight: 500; }
//                 .btn-submit { flex: 1; padding: 10px; background: #2563eb; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 600; }

//                 /* --- View Details Styles --- */
//                 .detail-row { margin-bottom: 15px; border-bottom: 1px solid #f1f5f9; padding-bottom: 10px; }
//                 .detail-row:last-child { border-bottom: none; }
//                 .detail-label { font-size: 12px; font-weight: 600; color: #64748b; text-transform: uppercase; margin-bottom: 4px; }
//                 .detail-value { font-size: 15px; color: #334155; line-height: 1.5; }
//                 .skill-tag { display: inline-block; background: #e2e8f0; padding: 4px 8px; border-radius: 4px; font-size: 12px; margin-right: 5px; color: #475569; }

//                 @keyframes slideUp {
//                     from { transform: translateY(20px); opacity: 0; }
//                     to { transform: translateY(0); opacity: 1; }
//                 }
//             `}</style>

//             {/* --- HEADER --- */}
//             <div className="page-header">
//                 <div className="page-title">
//                     <h1>My Projects</h1>
//                     <p>Manage your job postings and track progress</p>
//                 </div>
//                 <button className="btn-primary" onClick={openCreateModal}>
//                     <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"></path></svg>
//                     Post New Job
//                 </button>
//             </div>

//             {/* --- TABS --- */}
//             <div className="tabs-wrapper">
//                 {['All', 'Active', 'Completed'].map(tab => (
//                     <button 
//                         key={tab} 
//                         className={`tab-item ${activeTab === tab ? 'active' : ''}`}
//                         onClick={() => setActiveTab(tab)}
//                         style={{ textTransform: 'capitalize' }}
//                     >
//                         {tab}
//                     </button>
//                 ))}
//             </div>

//             {/* --- PROJECT GRID --- */}
//             {contextLoading ? (
//                 <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>Loading projects...</div>
//             ) : filteredProjects.length === 0 ? (
//                 <div style={{ textAlign: 'center', padding: '50px', color: '#94a3b8', border: '2px dashed #e2e8f0', borderRadius: '12px' }}>
//                     <p>No projects found. Click "Post New Job" to start.</p>
//                 </div>
//             ) : (
//                 <div className="projects-grid">
//                     {filteredProjects.map(project => {
//                         const progress = getProgress(project.status);
//                         const statusColor = getStatusColor(project.status);
                        
//                         return (
//                             <div key={project.id} className="project-card">
//                                 <div className="card-header">
//                                     <span className={`badge ${statusColor}`}>
//                                         {project.status}
//                                     </span>
                                    
//                                     {/* Action Buttons */}
//                                     <div className="header-actions">
//                                         <button 
//                                             className="icon-btn" 
//                                             title="Edit Project"
//                                             onClick={() => openEditModal(project)}
//                                         >
//                                             <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
//                                         </button>
//                                         <button 
//                                             className="icon-btn delete" 
//                                             title="Delete Project"
//                                             onClick={() => handleDelete(project.id)}
//                                         >
//                                             <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
//                                         </button>
//                                     </div>
//                                 </div>

//                                 <h3 className="project-name">{project.project_title || project.title}</h3>
//                                 <p className="project-meta">
//                                     Budget: ${project.budget} • Exp: {project.experience_years} yrs
//                                 </p>

//                                 {/* Visual Progress Bar */}
//                                 <div className="progress-container">
//                                     <div className="progress-labels">
//                                         <span>Progress</span>
//                                         <span>{progress}%</span>
//                                     </div>
//                                     <div className="progress-track">
//                                         <div 
//                                             className="progress-fill" 
//                                             style={{ 
//                                                 width: `${progress}%`,
//                                                 backgroundColor: progress === 100 ? '#10b981' : '#3b82f6'
//                                             }}
//                                         ></div>
//                                     </div>
//                                 </div>

//                                 <div className="card-footer">
//                                     <button className="btn-view" onClick={() => openViewDetails(project)}>View Details</button>
                                    
//                                     {/* --- NEW HIRE BUTTON --- */}
//                                     {project.status === 'Active' && (
//                                         <button className="btn-hire" onClick={() => openContractModal(project)}>
//                                             Hire / Contract
//                                         </button>
//                                     )}
//                                 </div>
//                             </div>
//                         );
//                     })}
//                 </div>
//             )}

//             {/* --- CREATE/EDIT MODAL --- */}
//             {isModalOpen && (
//                 <div className="modal-overlay">
//                     <div className="modal-content">
//                         <h2 className="modal-title">
//                             {isEditing ? "Edit Job Post" : "Post a New Job"}
//                         </h2>
//                         <form onSubmit={handleSubmit}>
//                             <div className="form-group">
//                                 <label className="form-label">Project Title</label>
//                                 <input type="text" name="project_title" className="form-input" required 
//                                     value={formData.project_title} onChange={handleChange} placeholder="e.g. Website Redesign" />
//                             </div>
                            
//                             <div className="form-group">
//                                 <label className="form-label">Description</label>
//                                 <textarea name="description" className="form-textarea" rows="3" required
//                                     value={formData.description} onChange={handleChange} placeholder="Describe the requirements..."></textarea>
//                             </div>

//                             <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
//                                 <div className="form-group">
//                                     <label className="form-label">Budget ($)</label>
//                                     <input type="number" name="budget" className="form-input" required step="0.01"
//                                         value={formData.budget} onChange={handleChange} />
//                                 </div>
//                                 <div className="form-group">
//                                     <label className="form-label">Experience (Years)</label>
//                                     <input type="number" name="experience_years" className="form-input" required
//                                         value={formData.experience_years} onChange={handleChange} />
//                                 </div>
//                             </div>

//                             <div className="form-group">
//                                 <label className="form-label">Required Skills</label>
//                                 <input type="text" name="required_skills" className="form-input" placeholder="e.g. React, Python"
//                                     value={formData.required_skills} onChange={handleChange} />
//                             </div>

//                             {/* Status and Deadline share a row now, removed Freelancer input */}
//                             <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
//                                 <div className="form-group">
//                                     <label className="form-label">Status</label>
//                                     <select name="status" className="form-select" value={formData.status} onChange={handleChange}>
//                                         <option value="Active">Active</option>
//                                         <option value="Completed">Completed</option>
//                                     </select>
//                                 </div>
//                                 <div className="form-group">
//                                     <label className="form-label">Deadline</label>
//                                     <input type="date" name="deadline" className="form-input" 
//                                         value={formData.deadline} onChange={handleChange} />
//                                 </div>
//                             </div>
                            
//                             <div className="modal-actions">
//                                 <button type="button" className="btn-cancel" onClick={() => setIsModalOpen(false)}>Cancel</button>
//                                 <button type="submit" className="btn-submit">
//                                     {isEditing ? "Save Changes" : "Post Job"}
//                                 </button>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             )}

//             {/* --- VIEW DETAILS MODAL --- */}
//             {isViewModalOpen && selectedProject && (
//                 <div className="modal-overlay">
//                     <div className="modal-content">
//                         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
//                             <h2 className="modal-title" style={{ marginBottom: 0 }}>Project Details</h2>
//                             <span className={`badge ${getStatusColor(selectedProject.status)}`} style={{ fontSize: '12px' }}>
//                                 {selectedProject.status}
//                             </span>
//                         </div>
                        
//                         <div className="detail-row">
//                             <div className="detail-label">Project Title</div>
//                             <div className="detail-value" style={{ fontWeight: '600', fontSize: '18px' }}>
//                                 {selectedProject.project_title || selectedProject.title}
//                             </div>
//                         </div>

//                         <div className="detail-row">
//                             <div className="detail-label">Description</div>
//                             <div className="detail-value">{selectedProject.description || "No description provided."}</div>
//                         </div>

//                         <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
//                             <div className="detail-row">
//                                 <div className="detail-label">Budget</div>
//                                 <div className="detail-value" style={{ color: '#2563eb', fontWeight: 'bold' }}>${selectedProject.budget}</div>
//                             </div>
//                              <div className="detail-row">
//                                 <div className="detail-label">Experience Required</div>
//                                 <div className="detail-value">{selectedProject.experience_years} Years</div>
//                             </div>
//                         </div>

//                         <div className="detail-row">
//                             <div className="detail-label">Required Skills</div>
//                             <div className="detail-value">
//                                 {selectedProject.required_skills ? selectedProject.required_skills.split(',').map((skill, index) => (
//                                     <span key={index} className="skill-tag">{skill.trim()}</span>
//                                 )) : "N/A"}
//                             </div>
//                         </div>

//                         <div className="modal-actions">
//                             <button className="btn-cancel" onClick={() => setIsViewModalOpen(false)}>Close</button>
//                         </div>
//                     </div>
//                 </div>
//             )}

//             {/* --- NEW: CONTRACT CREATION MODAL --- */}
//             {/* Logic: Map project details to a mock "proposal" object so the modal works */}
//             {isContractModalOpen && selectedProject && (
//                 <CreateContractModal 
//                     isOpen={isContractModalOpen} 
//                     onClose={() => setIsContractModalOpen(false)} 
//                     proposal={{
//                         // FIX: Remove 'proj-' + string concat. Just pass the plain ID.
//                         id: selectedProject.id, 
//                         projectTitle: selectedProject.project_title || selectedProject.title,
//                         bidAmount: selectedProject.budget,
//                         // If you have a specific freelancer ID in mind for this view, add it here, 
//                         // otherwise the user might need to select one in the backend or next step.
//                         freelancerId: null 
//                     }} 
//                 />
//             )}
//         </div>
//     );
// };

// export default ClientProjects;







// import React, { useState } from 'react';
// import { useProjects } from '../../context/ProjectContext'; // Shared Data Context
// import CreateContractModal from '../../components/Modals/CreateContractModal'; 
// // 1. Import axiosInstance to fetch the correct proposal ID
// import axiosInstance from '../../utils/axiosInstance'; 

// const ClientProjects = () => {
//     // --- 1. Get Data & Actions from Context ---
//     const { 
//         projects, 
//         loading: contextLoading, 
//         addProject, 
//         updateProject, 
//         deleteProject 
//     } = useProjects();

//     // --- Local State ---
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    
//     // --- NEW STATE: Contract Modal ---
//     const [isContractModalOpen, setIsContractModalOpen] = useState(false);
    
//     // Store the specific PROPOSAL we are turning into a contract (not just the project)
//     const [contractProposal, setContractProposal] = useState(null); 

//     const [activeTab, setActiveTab] = useState('All');
//     const [selectedProject, setSelectedProject] = useState(null);

//     // --- Edit Mode State ---
//     const [isEditing, setIsEditing] = useState(false);
//     const [currentId, setCurrentId] = useState(null);

//     // --- Form State ---
//     const initialFormState = {
//         project_title: '',     
//         description: '',
//         budget: '',
//         deadline: '',
//         required_skills: '',
//         experience_years: 0,   
//         status: 'Active'
//     };

//     const [formData, setFormData] = useState(initialFormState);

//     // --- Handlers ---
//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     // 1. Open Create Modal
//     const openCreateModal = () => {
//         setIsEditing(false);
//         setCurrentId(null);
//         setFormData(initialFormState);
//         setIsModalOpen(true);
//     };

//     // 2. Open Edit Modal
//     const openEditModal = (project) => {
//         setIsEditing(true);
//         setCurrentId(project.id);
//         setFormData({
//             project_title: project.project_title || project.title,
//             description: project.description,
//             budget: project.budget,
//             deadline: project.deadline || '',
//             required_skills: project.required_skills,
//             experience_years: project.experience_years || 0,
//             status: project.status
//         });
//         setIsModalOpen(true);
//     };

//     // 3. Open View Details
//     const openViewDetails = (project) => {
//         setSelectedProject(project);
//         setIsViewModalOpen(true);
//     };

//     // --- UPDATED HANDLER: Open Contract Modal ---
//     const openContractModal = async (project) => {
//         setSelectedProject(project);

//         // THE FIX: We need the PROPOSAL ID, not the PROJECT ID.
//         // We fetch proposals to find which one is 'Accepted' for this project.
//         try {
//             // Fetch all proposals (or filter by project if your API supports it)
//             const response = await axiosInstance.get('/proposals/'); 
//             const allProposals = response.data;

//             // Find the accepted proposal for THIS project
//             const acceptedProposal = allProposals.find(
//                 p => p.project === project.id && p.status === 'accepted'
//             );

//             if (acceptedProposal) {
//                 // Found it! Use this real Proposal ID (e.g., 4)
//                 setContractProposal(acceptedProposal);
//                 setIsContractModalOpen(true);
//             } else {
//                 // Logic Check: You can't create a contract if you haven't accepted a bid yet.
//                 alert("No 'Accepted' proposal found for this project.\n\nPlease view proposals and accept a freelancer's bid first.");
//             }
//         } catch (error) {
//             console.error("Error finding proposal:", error);
//             alert("Failed to check project status.");
//         }
//     };

//     // 4. Handle Submit
//     const handleSubmit = async (e) => {
//         e.preventDefault();
        
//         const projectData = {
//             ...formData,
//             title: formData.project_title 
//         };

//         if (isEditing) {
//             if(updateProject) {
//                 await updateProject(currentId, projectData);
//             }
//         } else {
//             await addProject(projectData);
//         }
        
//         setIsModalOpen(false);
//     };

//     // 5. Handle Delete
//     const handleDelete = (id) => {
//         if (window.confirm("Are you sure you want to delete this project?")) {
//             deleteProject(id);
//         }
//     };

//     // --- Filters & Helpers ---
//     const filteredProjects = activeTab === 'All' 
//         ? projects 
//         : projects.filter(p => p.status.toLowerCase() === activeTab.toLowerCase());

//     const getProgress = (status) => {
//         const s = status.toLowerCase();
//         if (s === 'completed' || s === 'closed') return 100;
//         if (s === 'active') return 50; 
//         return 0; 
//     };

//     const getStatusColor = (status) => {
//         const s = status.toLowerCase();
//         if (s === 'active') return 'Active';
//         if (s === 'completed' || s === 'closed') return 'Completed';
//         return 'Draft'; 
//     };

//     return (
//         <div className="client-page-container">
//             {/* --- INTERNAL CSS --- */}
//             <style>{`
//                 .client-page-container {
//                     padding: 40px;
//                     background-color: #f8fafc;
//                     min-height: 100vh;
//                     font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
//                 }
                
//                 /* Header */
//                 .page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; }
//                 .page-title h1 { font-size: 26px; font-weight: 700; color: #1e293b; margin: 0; }
//                 .page-title p { color: #64748b; margin-top: 5px; font-size: 14px; }
//                 .btn-primary { background-color: #2563eb; color: white; border: none; padding: 10px 20px; border-radius: 8px; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 8px; transition: background-color 0.2s; font-size: 14px; }
//                 .btn-primary:hover { background-color: #1d4ed8; }

//                 /* Tabs */
//                 .tabs-wrapper { display: flex; gap: 20px; border-bottom: 1px solid #e2e8f0; margin-bottom: 30px; }
//                 .tab-item { background: none; border: none; padding: 0 0 12px 0; font-size: 14px; color: #64748b; cursor: pointer; font-weight: 500; position: relative; }
//                 .tab-item:hover { color: #1e293b; }
//                 .tab-item.active { color: #2563eb; font-weight: 600; }
//                 .tab-item.active::after { content: ''; position: absolute; bottom: -1px; left: 0; width: 100%; height: 2px; background-color: #2563eb; }

//                 /* Grid Layout */
//                 .projects-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 25px; }

//                 /* Project Card */
//                 .project-card { background: white; border-radius: 12px; padding: 25px; box-shadow: 0 1px 3px rgba(0,0,0,0.05); border: 1px solid #f1f5f9; transition: all 0.2s ease; display: flex; flex-direction: column; }
//                 .project-card:hover { transform: translateY(-3px); box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1); }
                
//                 .card-header { display: flex; justify-content: space-between; align-items: start; margin-bottom: 15px; }
//                 .badge { font-size: 11px; text-transform: uppercase; font-weight: 700; padding: 4px 10px; border-radius: 20px; letter-spacing: 0.5px; }
//                 .badge.Active { background-color: #dbeafe; color: #1e40af; }
//                 .badge.Completed { background-color: #dcfce7; color: #166534; }
//                 .badge.Draft { background-color: #f1f5f9; color: #475569; } 

//                 /* Action Icons in Header */
//                 .header-actions { display: flex; gap: 8px; }
//                 .icon-btn { background: none; border: none; cursor: pointer; color: #94a3b8; padding: 4px; border-radius: 4px; transition: all 0.2s; }
//                 .icon-btn:hover { background-color: #f1f5f9; color: #334155; }
//                 .icon-btn.delete:hover { background-color: #fee2e2; color: #ef4444; }

//                 .project-name { font-size: 18px; font-weight: 700; color: #0f172a; margin: 0 0 8px 0; line-height: 1.4; }
//                 .project-meta { font-size: 13px; color: #64748b; margin-bottom: 20px; }

//                 /* Progress Bar */
//                 .progress-container { margin-bottom: 20px; }
//                 .progress-labels { display: flex; justify-content: space-between; font-size: 12px; color: #64748b; margin-bottom: 6px; }
//                 .progress-track { width: 100%; height: 6px; background-color: #f1f5f9; border-radius: 3px; overflow: hidden; }
//                 .progress-fill { height: 100%; border-radius: 3px; transition: width 0.5s ease; }

//                 /* Details Row */
//                 .card-footer { margin-top: auto; padding-top: 15px; border-top: 1px solid #f8fafc; display: flex; gap: 10px; }
//                 .btn-view { flex: 1; padding: 10px; background: white; border: 1px solid #e2e8f0; border-radius: 6px; color: #475569; font-weight: 500; font-size: 14px; cursor: pointer; transition: all 0.2s; }
//                 .btn-view:hover { background-color: #f8fafc; border-color: #cbd5e1; color: #1e293b; }
                
//                 /* --- NEW CSS for Hire Button --- */
//                 .btn-hire { flex: 1; padding: 10px; background: #0f172a; border: 1px solid #0f172a; border-radius: 6px; color: white; font-weight: 500; font-size: 14px; cursor: pointer; transition: all 0.2s; }
//                 .btn-hire:hover { background-color: #334155; border-color: #334155; }

//                 /* Modal Overlay */
//                 .modal-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background-color: rgba(0,0,0,0.6); display: flex; justify-content: center; align-items: center; z-index: 9999; backdrop-filter: blur(2px); }
//                 .modal-content { background: white; padding: 30px; border-radius: 16px; width: 550px; max-width: 90%; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1); animation: slideUp 0.3s ease-out; }
//                 .modal-title { font-size: 20px; font-weight: 700; margin-bottom: 20px; color: #1e293b; }
//                 .form-group { margin-bottom: 15px; }
//                 .form-label { display: block; font-size: 13px; font-weight: 600; color: #334155; margin-bottom: 6px; }
//                 .form-input, .form-textarea, .form-select { width: 100%; padding: 10px 12px; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 14px; outline: none; transition: border-color 0.2s; box-sizing: border-box; }
//                 .form-input:focus, .form-textarea:focus { border-color: #2563eb; box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1); }
                
//                 .modal-actions { display: flex; gap: 12px; margin-top: 25px; }
//                 .btn-cancel { flex: 1; padding: 10px; background: white; border: 1px solid #cbd5e1; color: #475569; border-radius: 6px; cursor: pointer; font-weight: 500; }
//                 .btn-submit { flex: 1; padding: 10px; background: #2563eb; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 600; }

//                 /* --- View Details Styles --- */
//                 .detail-row { margin-bottom: 15px; border-bottom: 1px solid #f1f5f9; padding-bottom: 10px; }
//                 .detail-row:last-child { border-bottom: none; }
//                 .detail-label { font-size: 12px; font-weight: 600; color: #64748b; text-transform: uppercase; margin-bottom: 4px; }
//                 .detail-value { font-size: 15px; color: #334155; line-height: 1.5; }
//                 .skill-tag { display: inline-block; background: #e2e8f0; padding: 4px 8px; border-radius: 4px; font-size: 12px; margin-right: 5px; color: #475569; }

//                 @keyframes slideUp {
//                     from { transform: translateY(20px); opacity: 0; }
//                     to { transform: translateY(0); opacity: 1; }
//                 }
//             `}</style>

//             {/* --- HEADER --- */}
//             <div className="page-header">
//                 <div className="page-title">
//                     <h1>My Projects</h1>
//                     <p>Manage your job postings and track progress</p>
//                 </div>
//                 <button className="btn-primary" onClick={openCreateModal}>
//                     <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"></path></svg>
//                     Post New Job
//                 </button>
//             </div>

//             {/* --- TABS --- */}
//             <div className="tabs-wrapper">
//                 {['All', 'Active', 'Completed'].map(tab => (
//                     <button 
//                         key={tab} 
//                         className={`tab-item ${activeTab === tab ? 'active' : ''}`}
//                         onClick={() => setActiveTab(tab)}
//                         style={{ textTransform: 'capitalize' }}
//                     >
//                         {tab}
//                     </button>
//                 ))}
//             </div>

//             {/* --- PROJECT GRID --- */}
//             {contextLoading ? (
//                 <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>Loading projects...</div>
//             ) : filteredProjects.length === 0 ? (
//                 <div style={{ textAlign: 'center', padding: '50px', color: '#94a3b8', border: '2px dashed #e2e8f0', borderRadius: '12px' }}>
//                     <p>No projects found. Click "Post New Job" to start.</p>
//                 </div>
//             ) : (
//                 <div className="projects-grid">
//                     {filteredProjects.map(project => {
//                         const progress = getProgress(project.status);
//                         const statusColor = getStatusColor(project.status);
                        
//                         return (
//                             <div key={project.id} className="project-card">
//                                 <div className="card-header">
//                                     <span className={`badge ${statusColor}`}>
//                                         {project.status}
//                                     </span>
                                    
//                                     {/* Action Buttons */}
//                                     <div className="header-actions">
//                                         <button 
//                                             className="icon-btn" 
//                                             title="Edit Project"
//                                             onClick={() => openEditModal(project)}
//                                         >
//                                             <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
//                                         </button>
//                                         <button 
//                                             className="icon-btn delete" 
//                                             title="Delete Project"
//                                             onClick={() => handleDelete(project.id)}
//                                         >
//                                             <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
//                                         </button>
//                                     </div>
//                                 </div>

//                                 <h3 className="project-name">{project.project_title || project.title}</h3>
//                                 <p className="project-meta">
//                                     Budget: ${project.budget} • Exp: {project.experience_years} yrs
//                                 </p>

//                                 {/* Visual Progress Bar */}
//                                 <div className="progress-container">
//                                     <div className="progress-labels">
//                                         <span>Progress</span>
//                                         <span>{progress}%</span>
//                                     </div>
//                                     <div className="progress-track">
//                                         <div 
//                                             className="progress-fill" 
//                                             style={{ 
//                                                 width: `${progress}%`,
//                                                 backgroundColor: progress === 100 ? '#10b981' : '#3b82f6'
//                                             }}
//                                         ></div>
//                                     </div>
//                                 </div>

//                                 <div className="card-footer">
//                                     <button className="btn-view" onClick={() => openViewDetails(project)}>View Details</button>
                                    
//                                     {/* --- HIRE BUTTON --- */}
//                                     {project.status === 'Active' && (
//                                         <button className="btn-hire" onClick={() => openContractModal(project)}>
//                                             Hire / Contract
//                                         </button>
//                                     )}
//                                 </div>
//                             </div>
//                         );
//                     })}
//                 </div>
//             )}

//             {/* --- CREATE/EDIT MODAL --- */}
//             {isModalOpen && (
//                 <div className="modal-overlay">
//                     <div className="modal-content">
//                         <h2 className="modal-title">
//                             {isEditing ? "Edit Job Post" : "Post a New Job"}
//                         </h2>
//                         <form onSubmit={handleSubmit}>
//                             <div className="form-group">
//                                 <label className="form-label">Project Title</label>
//                                 <input type="text" name="project_title" className="form-input" required 
//                                     value={formData.project_title} onChange={handleChange} placeholder="e.g. Website Redesign" />
//                             </div>
                            
//                             <div className="form-group">
//                                 <label className="form-label">Description</label>
//                                 <textarea name="description" className="form-textarea" rows="3" required
//                                     value={formData.description} onChange={handleChange} placeholder="Describe the requirements..."></textarea>
//                             </div>

//                             <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
//                                 <div className="form-group">
//                                     <label className="form-label">Budget ($)</label>
//                                     <input type="number" name="budget" className="form-input" required step="0.01"
//                                         value={formData.budget} onChange={handleChange} />
//                                 </div>
//                                 <div className="form-group">
//                                     <label className="form-label">Experience (Years)</label>
//                                     <input type="number" name="experience_years" className="form-input" required
//                                         value={formData.experience_years} onChange={handleChange} />
//                                 </div>
//                             </div>

//                             <div className="form-group">
//                                 <label className="form-label">Required Skills</label>
//                                 <input type="text" name="required_skills" className="form-input" placeholder="e.g. React, Python"
//                                     value={formData.required_skills} onChange={handleChange} />
//                             </div>

//                             <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
//                                 <div className="form-group">
//                                     <label className="form-label">Status</label>
//                                     <select name="status" className="form-select" value={formData.status} onChange={handleChange}>
//                                         <option value="Active">Active</option>
//                                         <option value="Completed">Completed</option>
//                                     </select>
//                                 </div>
//                                 <div className="form-group">
//                                     <label className="form-label">Deadline</label>
//                                     <input type="date" name="deadline" className="form-input" 
//                                         value={formData.deadline} onChange={handleChange} />
//                                 </div>
//                             </div>
                            
//                             <div className="modal-actions">
//                                 <button type="button" className="btn-cancel" onClick={() => setIsModalOpen(false)}>Cancel</button>
//                                 <button type="submit" className="btn-submit">
//                                     {isEditing ? "Save Changes" : "Post Job"}
//                                 </button>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             )}

//             {/* --- VIEW DETAILS MODAL --- */}
//             {isViewModalOpen && selectedProject && (
//                 <div className="modal-overlay">
//                     <div className="modal-content">
//                         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
//                             <h2 className="modal-title" style={{ marginBottom: 0 }}>Project Details</h2>
//                             <span className={`badge ${getStatusColor(selectedProject.status)}`} style={{ fontSize: '12px' }}>
//                                 {selectedProject.status}
//                             </span>
//                         </div>
                        
//                         <div className="detail-row">
//                             <div className="detail-label">Project Title</div>
//                             <div className="detail-value" style={{ fontWeight: '600', fontSize: '18px' }}>
//                                 {selectedProject.project_title || selectedProject.title}
//                             </div>
//                         </div>

//                         <div className="detail-row">
//                             <div className="detail-label">Description</div>
//                             <div className="detail-value">{selectedProject.description || "No description provided."}</div>
//                         </div>

//                         <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
//                             <div className="detail-row">
//                                 <div className="detail-label">Budget</div>
//                                 <div className="detail-value" style={{ color: '#2563eb', fontWeight: 'bold' }}>${selectedProject.budget}</div>
//                             </div>
//                              <div className="detail-row">
//                                 <div className="detail-label">Experience Required</div>
//                                 <div className="detail-value">{selectedProject.experience_years} Years</div>
//                             </div>
//                         </div>

//                         <div className="detail-row">
//                             <div className="detail-label">Required Skills</div>
//                             <div className="detail-value">
//                                 {selectedProject.required_skills ? selectedProject.required_skills.split(',').map((skill, index) => (
//                                     <span key={index} className="skill-tag">{skill.trim()}</span>
//                                 )) : "N/A"}
//                             </div>
//                         </div>

//                         <div className="modal-actions">
//                             <button className="btn-cancel" onClick={() => setIsViewModalOpen(false)}>Close</button>
//                         </div>
//                     </div>
//                 </div>
//             )}

//             {/* --- NEW: CONTRACT CREATION MODAL --- */}
//             {isContractModalOpen && selectedProject && contractProposal && (
//                 <CreateContractModal 
//                     isOpen={isContractModalOpen} 
//                     onClose={() => setIsContractModalOpen(false)} 
//                     proposal={{
//                         // 2. THE FIX: Pass the real PROPOSAL ID (e.g., 4)
//                         id: contractProposal.id, 
                        
//                         // We can still use project info for display text
//                         projectTitle: selectedProject.project_title || selectedProject.title,
//                         bidAmount: contractProposal.bid_amount, // Use the bid amount, not budget
//                         freelancerId: contractProposal.freelancer 
//                     }} 
//                 />
//             )}
//         </div>
//     );
// };

// export default ClientProjects;



import React, { useState } from 'react';
import { useProjects } from '../../context/ProjectContext'; // Shared Data Context
import CreateContractModal from '../../components/Modals/CreateContractModal'; 
import axiosInstance from '../../utils/axiosInstance'; 

const ClientProjects = () => {
    // --- 1. Get Data & Actions from Context ---
    const { 
        projects, 
        loading: contextLoading, 
        addProject, 
        updateProject, 
        deleteProject 
    } = useProjects();

    // --- Local State ---
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    
    // --- Contract Modal State ---
    const [isContractModalOpen, setIsContractModalOpen] = useState(false);
    const [contractProposal, setContractProposal] = useState(null); 

    const [activeTab, setActiveTab] = useState('All');
    const [selectedProject, setSelectedProject] = useState(null);

    // --- Edit Mode State ---
    const [isEditing, setIsEditing] = useState(false);
    const [currentId, setCurrentId] = useState(null);

    // --- Form State ---
    const initialFormState = {
        project_title: '',      
        description: '',
        budget: '',
        deadline: '',
        required_skills: '',
        experience_years: 0,    
        status: 'Open' // <--- FIX: Default to Open so it goes to Marketplace
    };

    const [formData, setFormData] = useState(initialFormState);

    // --- Handlers ---
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // 1. Open Create Modal
    const openCreateModal = () => {
        setIsEditing(false);
        setCurrentId(null);
        setFormData(initialFormState);
        setIsModalOpen(true);
    };

    // 2. Open Edit Modal
    const openEditModal = (project) => {
        setIsEditing(true);
        setCurrentId(project.id);
        setFormData({
            project_title: project.project_title || project.title,
            description: project.description,
            budget: project.budget,
            deadline: project.deadline || '',
            required_skills: project.required_skills,
            experience_years: project.experience_years || 0,
            status: project.status
        });
        setIsModalOpen(true);
    };

    // 3. Open View Details
    const openViewDetails = (project) => {
        setSelectedProject(project);
        setIsViewModalOpen(true);
    };

    // --- Open Contract Modal ---
    const openContractModal = async (project) => {
        setSelectedProject(project);
        try {
            const response = await axiosInstance.get('/proposals/'); 
            const allProposals = response.data;
            const acceptedProposal = allProposals.find(
                p => p.project === project.id && p.status === 'accepted'
            );

            if (acceptedProposal) {
                setContractProposal(acceptedProposal);
                setIsContractModalOpen(true);
            } else {
                alert("No 'Accepted' proposal found for this project.\n\nPlease view proposals and accept a freelancer's bid first.");
            }
        } catch (error) {
            console.error("Error finding proposal:", error);
            alert("Failed to check project status.");
        }
    };

    // 4. Handle Submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const projectData = {
            ...formData,
            title: formData.project_title 
        };

        // <--- FIX: Force status to Open if creating new
        if (!isEditing) {
            projectData.status = 'Open';
        }

        if (isEditing) {
            if(updateProject) {
                await updateProject(currentId, projectData);
            }
        } else {
            await addProject(projectData);
        }
        
        setIsModalOpen(false);
    };

    // 5. Handle Delete
    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this project?")) {
            deleteProject(id);
        }
    };

    // --- Filters & Helpers ---
    const filteredProjects = activeTab === 'All' 
        ? projects 
        : projects.filter(p => p.status.toLowerCase() === activeTab.toLowerCase());

    const getProgress = (status) => {
        const s = status.toLowerCase();
        if (s === 'completed' || s === 'closed') return 100;
        if (s === 'active') return 50; 
        return 0; 
    };

    const getStatusColor = (status) => {
        const s = status.toLowerCase();
        if (s === 'active') return 'Active';
        if (s === 'completed' || s === 'closed') return 'Completed';
        if (s === 'open') return 'Draft'; // Or add a specific Open class
        return 'Draft'; 
    };

    return (
        <div className="client-page-container">
            {/* --- INTERNAL CSS --- */}
            <style>{`
                .client-page-container {
                    padding: 40px;
                    background-color: #f8fafc;
                    min-height: 100vh;
                    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
                }
                
                /* Header */
                .page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; }
                .page-title h1 { font-size: 26px; font-weight: 700; color: #1e293b; margin: 0; }
                .page-title p { color: #64748b; margin-top: 5px; font-size: 14px; }
                .btn-primary { background-color: #2563eb; color: white; border: none; padding: 10px 20px; border-radius: 8px; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 8px; transition: background-color 0.2s; font-size: 14px; }
                .btn-primary:hover { background-color: #1d4ed8; }

                /* Tabs */
                .tabs-wrapper { display: flex; gap: 20px; border-bottom: 1px solid #e2e8f0; margin-bottom: 30px; }
                .tab-item { background: none; border: none; padding: 0 0 12px 0; font-size: 14px; color: #64748b; cursor: pointer; font-weight: 500; position: relative; }
                .tab-item:hover { color: #1e293b; }
                .tab-item.active { color: #2563eb; font-weight: 600; }
                .tab-item.active::after { content: ''; position: absolute; bottom: -1px; left: 0; width: 100%; height: 2px; background-color: #2563eb; }

                /* Grid Layout */
                .projects-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 25px; }

                /* Project Card */
                .project-card { background: white; border-radius: 12px; padding: 25px; box-shadow: 0 1px 3px rgba(0,0,0,0.05); border: 1px solid #f1f5f9; transition: all 0.2s ease; display: flex; flex-direction: column; }
                .project-card:hover { transform: translateY(-3px); box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1); }
                
                .card-header { display: flex; justify-content: space-between; align-items: start; margin-bottom: 15px; }
                .badge { font-size: 11px; text-transform: uppercase; font-weight: 700; padding: 4px 10px; border-radius: 20px; letter-spacing: 0.5px; }
                .badge.Active { background-color: #dbeafe; color: #1e40af; }
                .badge.Completed { background-color: #dcfce7; color: #166534; }
                .badge.Draft { background-color: #f1f5f9; color: #475569; } 

                /* Action Icons in Header */
                .header-actions { display: flex; gap: 8px; }
                .icon-btn { background: none; border: none; cursor: pointer; color: #94a3b8; padding: 4px; border-radius: 4px; transition: all 0.2s; }
                .icon-btn:hover { background-color: #f1f5f9; color: #334155; }
                .icon-btn.delete:hover { background-color: #fee2e2; color: #ef4444; }

                .project-name { font-size: 18px; font-weight: 700; color: #0f172a; margin: 0 0 8px 0; line-height: 1.4; }
                .project-meta { font-size: 13px; color: #64748b; margin-bottom: 20px; }

                /* Progress Bar */
                .progress-container { margin-bottom: 20px; }
                .progress-labels { display: flex; justify-content: space-between; font-size: 12px; color: #64748b; margin-bottom: 6px; }
                .progress-track { width: 100%; height: 6px; background-color: #f1f5f9; border-radius: 3px; overflow: hidden; }
                .progress-fill { height: 100%; border-radius: 3px; transition: width 0.5s ease; }

                /* Details Row */
                .card-footer { margin-top: auto; padding-top: 15px; border-top: 1px solid #f8fafc; display: flex; gap: 10px; }
                .btn-view { flex: 1; padding: 10px; background: white; border: 1px solid #e2e8f0; border-radius: 6px; color: #475569; font-weight: 500; font-size: 14px; cursor: pointer; transition: all 0.2s; }
                .btn-view:hover { background-color: #f8fafc; border-color: #cbd5e1; color: #1e293b; }
                
                /* Hire Button */
                .btn-hire { flex: 1; padding: 10px; background: #0f172a; border: 1px solid #0f172a; border-radius: 6px; color: white; font-weight: 500; font-size: 14px; cursor: pointer; transition: all 0.2s; }
                .btn-hire:hover { background-color: #334155; border-color: #334155; }

                /* Modal Overlay */
                .modal-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background-color: rgba(0,0,0,0.6); display: flex; justify-content: center; align-items: center; z-index: 9999; backdrop-filter: blur(2px); }
                .modal-content { background: white; padding: 30px; border-radius: 16px; width: 550px; max-width: 90%; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1); animation: slideUp 0.3s ease-out; }
                .modal-title { font-size: 20px; font-weight: 700; margin-bottom: 20px; color: #1e293b; }
                .form-group { margin-bottom: 15px; }
                .form-label { display: block; font-size: 13px; font-weight: 600; color: #334155; margin-bottom: 6px; }
                .form-input, .form-textarea, .form-select { width: 100%; padding: 10px 12px; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 14px; outline: none; transition: border-color 0.2s; box-sizing: border-box; }
                .form-input:focus, .form-textarea:focus { border-color: #2563eb; box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1); }
                
                .modal-actions { display: flex; gap: 12px; margin-top: 25px; }
                .btn-cancel { flex: 1; padding: 10px; background: white; border: 1px solid #cbd5e1; color: #475569; border-radius: 6px; cursor: pointer; font-weight: 500; }
                .btn-submit { flex: 1; padding: 10px; background: #2563eb; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 600; }

                /* View Details Styles */
                .detail-row { margin-bottom: 15px; border-bottom: 1px solid #f1f5f9; padding-bottom: 10px; }
                .detail-row:last-child { border-bottom: none; }
                .detail-label { font-size: 12px; font-weight: 600; color: #64748b; text-transform: uppercase; margin-bottom: 4px; }
                .detail-value { font-size: 15px; color: #334155; line-height: 1.5; }
                .skill-tag { display: inline-block; background: #e2e8f0; padding: 4px 8px; border-radius: 4px; font-size: 12px; margin-right: 5px; color: #475569; }

                @keyframes slideUp {
                    from { transform: translateY(20px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
            `}</style>

            {/* --- HEADER --- */}
            <div className="page-header">
                <div className="page-title">
                    <h1>My Projects</h1>
                    <p>Manage your job postings and track progress</p>
                </div>
                <button className="btn-primary" onClick={openCreateModal}>
                    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"></path></svg>
                    Post New Job
                </button>
            </div>

            {/* --- TABS --- */}
            <div className="tabs-wrapper">
                {['All', 'Active', 'Completed'].map(tab => (
                    <button 
                        key={tab} 
                        className={`tab-item ${activeTab === tab ? 'active' : ''}`}
                        onClick={() => setActiveTab(tab)}
                        style={{ textTransform: 'capitalize' }}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* --- PROJECT GRID --- */}
            {contextLoading ? (
                <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>Loading projects...</div>
            ) : filteredProjects.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '50px', color: '#94a3b8', border: '2px dashed #e2e8f0', borderRadius: '12px' }}>
                    <p>No projects found. Click "Post New Job" to start.</p>
                </div>
            ) : (
                <div className="projects-grid">
                    {filteredProjects.map(project => {
                        const progress = getProgress(project.status);
                        const statusColor = getStatusColor(project.status);
                        
                        return (
                            <div key={project.id} className="project-card">
                                <div className="card-header">
                                    <span className={`badge ${statusColor}`}>
                                        {project.status}
                                    </span>
                                    
                                    {/* Action Buttons */}
                                    <div className="header-actions">
                                        <button 
                                            className="icon-btn" 
                                            title="Edit Project"
                                            onClick={() => openEditModal(project)}
                                        >
                                            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                                        </button>
                                        <button 
                                            className="icon-btn delete" 
                                            title="Delete Project"
                                            onClick={() => handleDelete(project.id)}
                                        >
                                            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                        </button>
                                    </div>
                                </div>

                                <h3 className="project-name">{project.project_title || project.title}</h3>
                                <p className="project-meta">
                                    Budget: ${project.budget} • Exp: {project.experience_years} yrs
                                </p>

                                {/* Visual Progress Bar */}
                                <div className="progress-container">
                                    <div className="progress-labels">
                                        <span>Progress</span>
                                        <span>{progress}%</span>
                                    </div>
                                    <div className="progress-track">
                                        <div 
                                            className="progress-fill" 
                                            style={{ 
                                                width: `${progress}%`,
                                                backgroundColor: progress === 100 ? '#10b981' : '#3b82f6'
                                            }}
                                        ></div>
                                    </div>
                                </div>

                                <div className="card-footer">
                                    <button className="btn-view" onClick={() => openViewDetails(project)}>View Details</button>
                                    
                                    {/* --- HIRE BUTTON --- */}
                                    {project.status === 'Active' && (
                                        <button className="btn-hire" onClick={() => openContractModal(project)}>
                                            Hire / Contract
                                        </button>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* --- CREATE/EDIT MODAL --- */}
            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2 className="modal-title">
                            {isEditing ? "Edit Job Post" : "Post a New Job"}
                        </h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label className="form-label">Project Title</label>
                                <input type="text" name="project_title" className="form-input" required 
                                    value={formData.project_title} onChange={handleChange} placeholder="e.g. Website Redesign" />
                            </div>
                            
                            <div className="form-group">
                                <label className="form-label">Description</label>
                                <textarea name="description" className="form-textarea" rows="3" required
                                    value={formData.description} onChange={handleChange} placeholder="Describe the requirements..."></textarea>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                                <div className="form-group">
                                    <label className="form-label">Budget ($)</label>
                                    <input type="number" name="budget" className="form-input" required step="0.01"
                                        value={formData.budget} onChange={handleChange} />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Experience (Years)</label>
                                    <input type="number" name="experience_years" className="form-input" required
                                        value={formData.experience_years} onChange={handleChange} />
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="form-label">Required Skills</label>
                                <input type="text" name="required_skills" className="form-input" placeholder="e.g. React, Python"
                                    value={formData.required_skills} onChange={handleChange} />
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                                <div className="form-group">
                                    <label className="form-label">Status</label>
                                    <select name="status" className="form-select" value={formData.status} onChange={handleChange}>
                                        <option value="Open">Open</option>
                                        <option value="Active">Active</option>
                                        <option value="Completed">Completed</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Deadline</label>
                                    <input type="date" name="deadline" className="form-input" 
                                        value={formData.deadline} onChange={handleChange} />
                                </div>
                            </div>
                            
                            <div className="modal-actions">
                                <button type="button" className="btn-cancel" onClick={() => setIsModalOpen(false)}>Cancel</button>
                                <button type="submit" className="btn-submit">
                                    {isEditing ? "Save Changes" : "Post Job"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* --- VIEW DETAILS MODAL --- */}
            {isViewModalOpen && selectedProject && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                            <h2 className="modal-title" style={{ marginBottom: 0 }}>Project Details</h2>
                            <span className={`badge ${getStatusColor(selectedProject.status)}`} style={{ fontSize: '12px' }}>
                                {selectedProject.status}
                            </span>
                        </div>
                        
                        <div className="detail-row">
                            <div className="detail-label">Project Title</div>
                            <div className="detail-value" style={{ fontWeight: '600', fontSize: '18px' }}>
                                {selectedProject.project_title || selectedProject.title}
                            </div>
                        </div>

                        <div className="detail-row">
                            <div className="detail-label">Description</div>
                            <div className="detail-value">{selectedProject.description || "No description provided."}</div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                            <div className="detail-row">
                                <div className="detail-label">Budget</div>
                                <div className="detail-value" style={{ color: '#2563eb', fontWeight: 'bold' }}>${selectedProject.budget}</div>
                            </div>
                             <div className="detail-row">
                                <div className="detail-label">Experience Required</div>
                                <div className="detail-value">{selectedProject.experience_years} Years</div>
                            </div>
                        </div>

                        <div className="detail-row">
                            <div className="detail-label">Required Skills</div>
                            <div className="detail-value">
                                {selectedProject.required_skills ? selectedProject.required_skills.split(',').map((skill, index) => (
                                    <span key={index} className="skill-tag">{skill.trim()}</span>
                                )) : "N/A"}
                            </div>
                        </div>

                        <div className="modal-actions">
                            <button className="btn-cancel" onClick={() => setIsViewModalOpen(false)}>Close</button>
                        </div>
                    </div>
                </div>
            )}

            {/* --- CONTRACT CREATION MODAL --- */}
            {isContractModalOpen && selectedProject && contractProposal && (
                <CreateContractModal 
                    isOpen={isContractModalOpen} 
                    onClose={() => setIsContractModalOpen(false)} 
                    proposal={{
                        // 2. THE FIX: Pass the real PROPOSAL ID (e.g., 4)
                        id: contractProposal.id, 
                        
                        // We can still use project info for display text
                        projectTitle: selectedProject.project_title || selectedProject.title,
                        bidAmount: contractProposal.bid_amount, // Use the bid amount, not budget
                        freelancerId: contractProposal.freelancer 
                    }} 
                />
            )}
        </div>
    );
};

export default ClientProjects;