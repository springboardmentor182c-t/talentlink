import React, { useState } from 'react';

// --- SVG Icons ---
const Icons = {
  User: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>,
  Lock: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>,
  Bell: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>,
  CreditCard: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>,
  Save: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
};

const ClientSettings = () => {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div style={styles.container}>
      <h1 style={styles.pageTitle}>Account Settings</h1>
      
      <div style={styles.layout}>
        {/* Sidebar Tabs */}
        <div style={styles.sidebar}>
          <TabButton icon={<Icons.User/>} label="Profile" active={activeTab === 'profile'} onClick={() => setActiveTab('profile')} />
          <TabButton icon={<Icons.Lock/>} label="Security" active={activeTab === 'security'} onClick={() => setActiveTab('security')} />
          <TabButton icon={<Icons.Bell/>} label="Notifications" active={activeTab === 'notifications'} onClick={() => setActiveTab('notifications')} />
          <TabButton icon={<Icons.CreditCard/>} label="Billing Methods" active={activeTab === 'billing'} onClick={() => setActiveTab('billing')} />
        </div>

        {/* Content Area */}
        <div style={styles.content}>
          {activeTab === 'profile' && (
            <div>
              <h2 style={styles.sectionTitle}>Public Profile</h2>
              <div style={styles.formGroup}>
                <label style={styles.label}>Full Name</label>
                <input type="text" defaultValue="Alex Johnson" style={styles.input} />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Company Name</label>
                <input type="text" defaultValue="Apex Financial" style={styles.input} />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Email Address</label>
                <input type="email" defaultValue="client@apex.com" style={styles.input} />
              </div>
              <button style={styles.saveBtn}>
                <span style={{marginRight:'8px', display:'flex'}}><Icons.Save/></span> Save Changes
              </button>
            </div>
          )}

          {activeTab === 'security' && (
            <div>
              <h2 style={styles.sectionTitle}>Security</h2>
              <div style={styles.formGroup}>
                <label style={styles.label}>Current Password</label>
                <input type="password" style={styles.input} />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>New Password</label>
                <input type="password" style={styles.input} />
              </div>
              <button style={styles.saveBtn}>Update Password</button>
            </div>
          )}
          
          {/* Add mock content for other tabs if needed */}
        </div>
      </div>
    </div>
  );
};

const TabButton = ({ icon, label, active, onClick }) => (
  <button style={active ? styles.activeTab : styles.tab} onClick={onClick}>
    <span style={{marginRight: '12px', fontSize: '16px', display:'flex'}}>{icon}</span>
    {label}
  </button>
);

const styles = {
  container: { maxWidth: '1000px', margin: '0 auto' },
  pageTitle: { fontSize: '24px', fontWeight: 'bold', color: '#1e293b', marginBottom: '30px' },
  layout: { display: 'flex', gap: '30px' },
  sidebar: { width: '250px', display: 'flex', flexDirection: 'column', gap: '5px' },
  content: { flex: 1, backgroundColor: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' },
  tab: { display: 'flex', alignItems: 'center', padding: '12px 15px', border: 'none', background: 'transparent', color: '#64748b', fontSize: '14px', fontWeight: '500', cursor: 'pointer', borderRadius: '8px', textAlign: 'left' },
  activeTab: { display: 'flex', alignItems: 'center', padding: '12px 15px', border: 'none', background: '#eff6ff', color: '#3b82f6', fontSize: '14px', fontWeight: '600', cursor: 'pointer', borderRadius: '8px', textAlign: 'left' },
  sectionTitle: { fontSize: '18px', fontWeight: 'bold', color: '#1e293b', marginBottom: '20px', borderBottom: '1px solid #e2e8f0', paddingBottom: '10px' },
  formGroup: { marginBottom: '20px' },
  label: { display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: '600', color: '#475569' },
  input: { width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px', outline: 'none' },
  saveBtn: { backgroundColor: '#3b82f6', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', display: 'flex', alignItems: 'center' }
};

export default ClientSettings;