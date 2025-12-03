import React, { useState } from 'react';

// --- SVG Icons ---
const Icons = {
  Plus: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>,
  Clock: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>,
  More: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>
};

const projects = [
  { id: 1, title: 'E-commerce Website Redesign', status: 'Active', freelancer: 'Sarah Smith', deadline: 'Dec 15, 2025', progress: 75, color: '#3b82f6' },
  { id: 2, title: 'Mobile App Development (iOS)', status: 'In Review', freelancer: 'Mike Johnson', deadline: 'Nov 30, 2025', progress: 90, color: '#8b5cf6' },
  { id: 3, title: 'SEO Optimization Q4', status: 'Completed', freelancer: 'Agency X', deadline: 'Oct 15, 2025', progress: 100, color: '#10b981' },
];

const ClientProjects = () => {
  const [activeTab, setActiveTab] = useState('All');

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.pageTitle}>My Projects</h1>
        <button style={styles.primaryBtn}>
          <span style={{marginRight: '8px', display:'flex'}}><Icons.Plus /></span> Post New Job
        </button>
      </div>

      {/* Tabs */}
      <div style={styles.tabs}>
        {['All', 'Active', 'Completed', 'Drafts'].map(tab => (
          <button 
            key={tab} 
            style={activeTab === tab ? styles.activeTab : styles.tab}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div style={styles.grid}>
        {projects.map(p => (
          <div key={p.id} style={styles.card}>
            <div style={styles.cardHeader}>
              <span style={{...styles.badge, backgroundColor: `${p.color}15`, color: p.color}}>{p.status}</span>
              <button style={styles.iconBtn}><Icons.More /></button>
            </div>
            
            <h3 style={styles.projectTitle}>{p.title}</h3>
            <div style={styles.metaRow}>
              <div style={styles.metaItem}>
                <span style={styles.metaLabel}>Freelancer:</span> {p.freelancer}
              </div>
              <div style={styles.metaItem}>
                <span style={{marginRight:'5px', color:'#94a3b8', display:'flex'}}><Icons.Clock /></span> {p.deadline}
              </div>
            </div>

            <div style={styles.progressSection}>
              <div style={styles.progressLabel}>
                <span>Progress</span>
                <span>{p.progress}%</span>
              </div>
              <div style={styles.progressBarBg}>
                <div style={{...styles.progressBarFill, width: `${p.progress}%`, backgroundColor: p.color}}></div>
              </div>
            </div>
            
            <button style={styles.viewBtn}>View Details</button>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: { maxWidth: '1200px', margin: '0 auto' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' },
  pageTitle: { fontSize: '24px', fontWeight: 'bold', color: '#1e293b' },
  primaryBtn: { backgroundColor: '#3b82f6', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', display: 'flex', alignItems: 'center' },
  tabs: { display: 'flex', gap: '20px', borderBottom: '1px solid #e2e8f0', marginBottom: '30px' },
  tab: { background: 'none', border: 'none', padding: '10px 0', cursor: 'pointer', color: '#64748b', fontSize: '14px', fontWeight: '500', borderBottom: '2px solid transparent' },
  activeTab: { background: 'none', border: 'none', padding: '10px 0', cursor: 'pointer', color: '#3b82f6', fontSize: '14px', fontWeight: '600', borderBottom: '2px solid #3b82f6' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '25px' },
  card: { backgroundColor: 'white', padding: '25px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', border: '1px solid #f1f5f9', display: 'flex', flexDirection: 'column' },
  cardHeader: { display: 'flex', justifyContent: 'space-between', marginBottom: '15px' },
  badge: { padding: '5px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: '600' },
  iconBtn: { background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', display: 'flex' },
  projectTitle: { fontSize: '16px', fontWeight: 'bold', color: '#1e293b', marginBottom: '15px' },
  metaRow: { display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#64748b', marginBottom: '20px' },
  metaItem: { display: 'flex', alignItems: 'center' },
  metaLabel: { fontWeight: '600', marginRight: '5px', color: '#475569' },
  progressSection: { marginBottom: '20px' },
  progressLabel: { display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '6px', color: '#64748b' },
  progressBarBg: { height: '6px', backgroundColor: '#f1f5f9', borderRadius: '3px', overflow: 'hidden' },
  progressBarFill: { height: '100%', borderRadius: '3px' },
  viewBtn: { width: '100%', padding: '10px', backgroundColor: 'transparent', border: '1px solid #e2e8f0', borderRadius: '8px', color: '#334155', fontWeight: '600', cursor: 'pointer', marginTop: 'auto', hover: {backgroundColor: '#f8fafc'} }
};

export default ClientProjects;