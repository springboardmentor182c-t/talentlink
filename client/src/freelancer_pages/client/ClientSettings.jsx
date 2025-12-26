

import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext'; // Ensure path is correct

// --- SVG Icons ---
const Icons = {
  User: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>,
  Lock: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>,
  Bell: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>,
  CreditCard: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>,
  Save: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>,
  // New Icons for Theme
  Moon: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>,
  Sun: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
};

const ClientSettings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  
  // Use the Global Theme Context
  const { theme, toggleTheme } = useTheme(); 
  
  // Get dynamic styles based on theme
  const styles = getStyles(theme); 

  return (
    <div style={styles.container}>
      <h1 style={styles.pageTitle}>Account Settings</h1>
      
      <div style={styles.layout}>
        {/* Sidebar Tabs */}
        <div style={styles.sidebar}>
          <TabButton icon={<Icons.User/>} label="Profile" active={activeTab === 'profile'} onClick={() => setActiveTab('profile')} theme={theme} />
          <TabButton icon={<Icons.Lock/>} label="Security" active={activeTab === 'security'} onClick={() => setActiveTab('security')} theme={theme} />
          <TabButton icon={<Icons.Bell/>} label="Notifications" active={activeTab === 'notifications'} onClick={() => setActiveTab('notifications')} theme={theme} />
          <TabButton icon={<Icons.CreditCard/>} label="Billing Methods" active={activeTab === 'billing'} onClick={() => setActiveTab('billing')} theme={theme} />
          {/* New Appearance Tab */}
          <TabButton icon={theme === 'dark' ? <Icons.Sun/> : <Icons.Moon/>} label="Appearance" active={activeTab === 'appearance'} onClick={() => setActiveTab('appearance')} theme={theme} />
        </div>

        {/* Content Area */}
        <div style={styles.content}>
          {activeTab === 'profile' && (
            <div>
              <h2 style={styles.sectionTitle}>Public Profile</h2>
              <div style={styles.formGroup}>
                <label style={styles.label}>Full Name</label>
                <input type="text" defaultValue="Kumar Gosala" style={styles.input} />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Company Name</label>
                <input type="text" defaultValue="TalentLink Connect" style={styles.input} />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Email Address</label>
                <input type="email" defaultValue="kumar@talentlink.com" style={styles.input} />
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

          {/* --- NEW APPEARANCE TAB --- */}
          {activeTab === 'appearance' && (
            <div>
              <h2 style={styles.sectionTitle}>Appearance Preference</h2>
              <p style={{ color: theme === 'dark' ? '#cbd5e1' : '#64748b', marginBottom: '20px' }}>
                Customize how TalentLink looks on your device.
              </p>
              
              <div style={styles.themeToggleContainer}>
                <div style={styles.themeOption}>
                  <span style={{ color: theme === 'dark' ? '#fff' : '#1e293b', fontWeight: '600' }}>Current Mode:</span>
                  <span style={{ marginLeft: '10px', color: '#3b82f6', fontWeight: 'bold', textTransform: 'capitalize' }}>{theme}</span>
                </div>
                
                <button style={styles.saveBtn} onClick={toggleTheme}>
                  <span style={{marginRight:'8px', display:'flex'}}>
                    {theme === 'dark' ? <Icons.Sun/> : <Icons.Moon/>}
                  </span> 
                  Switch to {theme === 'dark' ? 'Light' : 'Dark'} Mode
                </button>
              </div>
            </div>
          )}
          
        </div>
      </div>
    </div>
  );
};

// Helper Component for Tabs
const TabButton = ({ icon, label, active, onClick, theme }) => {
  const styles = getStyles(theme);
  return (
    <button style={active ? styles.activeTab : styles.tab} onClick={onClick}>
      <span style={{marginRight: '12px', fontSize: '16px', display:'flex'}}>{icon}</span>
      {label}
    </button>
  );
};

// --- DYNAMIC STYLES ---
const getStyles = (theme) => {
  const isDark = theme === 'dark';

  return {
    container: { 
      maxWidth: '1000px', 
      margin: '0 auto',
      // Background handled globally or via wrapper, but defined here if needed
      color: isDark ? '#ffffff' : '#1e293b' 
    },
    pageTitle: { 
      fontSize: '24px', 
      fontWeight: 'bold', 
      color: isDark ? '#ffffff' : '#1e293b', 
      marginBottom: '30px' 
    },
    layout: { 
      display: 'flex', 
      gap: '30px',
      flexDirection: 'row'
    },
    sidebar: { 
      width: '250px', 
      display: 'flex', 
      flexDirection: 'column', 
      gap: '5px' 
    },
    content: { 
      flex: 1, 
      backgroundColor: isDark ? '#1e293b' : 'white', 
      padding: '30px', 
      borderRadius: '12px', 
      boxShadow: isDark ? '0 4px 6px -1px rgba(0, 0, 0, 0.5)' : '0 1px 3px rgba(0,0,0,0.05)',
      border: isDark ? '1px solid #334155' : 'none'
    },
    tab: { 
      display: 'flex', 
      alignItems: 'center', 
      padding: '12px 15px', 
      border: 'none', 
      background: 'transparent', 
      color: isDark ? '#94a3b8' : '#64748b', 
      fontSize: '14px', 
      fontWeight: '500', 
      cursor: 'pointer', 
      borderRadius: '8px', 
      textAlign: 'left',
      transition: '0.2s'
    },
    activeTab: { 
      display: 'flex', 
      alignItems: 'center', 
      padding: '12px 15px', 
      border: 'none', 
      background: isDark ? 'rgba(59, 130, 246, 0.15)' : '#eff6ff', 
      color: '#3b82f6', 
      fontSize: '14px', 
      fontWeight: '600', 
      cursor: 'pointer', 
      borderRadius: '8px', 
      textAlign: 'left' 
    },
    sectionTitle: { 
      fontSize: '18px', 
      fontWeight: 'bold', 
      color: isDark ? '#ffffff' : '#1e293b', 
      marginBottom: '20px', 
      borderBottom: isDark ? '1px solid #334155' : '1px solid #e2e8f0', 
      paddingBottom: '10px' 
    },
    formGroup: { 
      marginBottom: '20px' 
    },
    label: { 
      display: 'block', 
      marginBottom: '8px', 
      fontSize: '13px', 
      fontWeight: '600', 
      color: isDark ? '#cbd5e1' : '#475569' 
    },
    input: { 
      width: '100%', 
      padding: '10px', 
      borderRadius: '6px', 
      border: isDark ? '1px solid #475569' : '1px solid #cbd5e1', 
      backgroundColor: isDark ? '#334155' : '#ffffff',
      color: isDark ? '#ffffff' : '#1e293b',
      fontSize: '14px', 
      outline: 'none' 
    },
    saveBtn: { 
      backgroundColor: '#3b82f6', 
      color: 'white', 
      border: 'none', 
      padding: '10px 20px', 
      borderRadius: '6px', 
      cursor: 'pointer', 
      fontWeight: '600', 
      display: 'flex', 
      alignItems: 'center' 
    },
    themeToggleContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '20px',
      padding: '20px',
      backgroundColor: isDark ? '#0f172a' : '#f8fafc',
      borderRadius: '8px'
    }
  };
};

export default ClientSettings;