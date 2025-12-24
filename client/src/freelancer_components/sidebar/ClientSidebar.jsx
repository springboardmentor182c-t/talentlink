

import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  FaHome, 
  FaBriefcase, 
  FaFileInvoiceDollar, 
  FaFileAlt, 
  FaEnvelope, 
  FaCog, 
  FaQuestionCircle,
  FaSignOutAlt,
  FaFileContract,
  FaUserFriends 
} from 'react-icons/fa';

// 1. IMPORT YOUR CSS TO GET THE .hide-scrollbar CLASS
// Adjust the path "../../App.css" if your folder structure is different
import '../../App.css'; 

const ClientSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("Logging out from sidebar...");
    navigate('/login');
  };

  return (
    <div style={styles.sidebar}>
      {/* --- Logo Area --- */}
      <div style={styles.logoArea}>
        <div style={styles.logoText}>
          <span style={styles.logoIcon}>▲</span> Talent Link
        </div>
        <div style={styles.subText}>Client Portal</div>
      </div>

      {/* --- Main Menu Section --- */}
      {/* 2. ADD className="hide-scrollbar" HERE */}
      {/* This is the div that actually scrolls, so it needs the class to hide the bar */}
      <div style={styles.scrollableContent} className="hide-scrollbar">
        <div style={styles.sectionLabel}>MENU</div>
        
        <NavItem 
          to="/client/dashboard" 
          icon={<FaHome />} 
          label="Overview" 
          isActive={location.pathname === '/client/dashboard'} 
        />
        <NavItem 
          to="/client/projects" 
          icon={<FaBriefcase />} 
          label="My Projects" 
          isActive={location.pathname === '/client/projects'} 
        />
        
        <NavItem 
          to="/client/proposals" 
          icon={<FaUserFriends />} 
          label="Review Proposals" 
          isActive={location.pathname === '/client/proposals'} 
        />

        <NavItem 
          to="/client/financials" 
          icon={<FaFileInvoiceDollar />} 
          label="Financials" 
          isActive={location.pathname === '/client/financials'} 
        />
        
        <NavItem 
          to="/client/contracts" 
          icon={<FaFileContract />} 
          label="Contracts" 
          isActive={location.pathname === '/client/contracts'} 
        />

        <NavItem 
          to="/client/documents" 
          icon={<FaFileAlt />} 
          label="Documents" 
          isActive={location.pathname === '/client/documents'} 
        />
        <NavItem 
          to="/client/messages" 
          icon={<FaEnvelope />} 
          label="Messages" 
          isActive={location.pathname === '/client/messages'} 
        />

        {/* --- Settings Section --- */}
        <div style={{ ...styles.sectionLabel, marginTop: '20px' }}>PREFERENCES</div>
        
        <NavItem 
          to="/client/settings" 
          icon={<FaCog />} 
          label="Settings" 
          isActive={location.pathname === '/client/settings'} 
        />
        <NavItem 
          to="/client/help" 
          icon={<FaQuestionCircle />} 
          label="Help Center" 
          isActive={location.pathname === '/client/help'} 
        />
      </div>

      {/* --- Bottom Logout --- */}
      <div style={styles.logoutSection}>
        <button style={styles.logoutBtn} onClick={handleLogout}>
          <FaSignOutAlt style={{ marginRight: '10px' }} /> Log Out
        </button>
      </div>
    </div>
  );
};

// Helper Component for Links
const NavItem = ({ to, icon, label, isActive }) => {
  const finalStyle = isActive ? { ...styles.link, ...styles.activeLink } : styles.link;
  
  return (
    <Link to={to} style={finalStyle}>
      <span style={styles.icon}>{icon}</span>
      {label}
    </Link>
  );
};

const styles = {
  sidebar: {
    width: '100%',
    height: '100%',
    backgroundColor: '#0a1f44', 
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
  },
  logoArea: {
    padding: '30px 25px',
    borderBottom: '1px solid rgba(255,255,255,0.08)',
    marginBottom: '10px',
    flexShrink: 0,
  },
  logoText: {
    fontSize: '20px',
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
    marginBottom: '5px',
    letterSpacing: '0.5px',
  },
  logoIcon: {
    color: '#3b82f6',
    marginRight: '10px',
    fontSize: '22px'
  },
  subText: {
    fontSize: '12px',
    color: '#94a3b8',
    paddingLeft: '32px',
    fontWeight: '500',
  },
  scrollableContent: {
    flex: 1,
    overflowY: 'auto',
    padding: '10px 15px',
  },
  sectionLabel: {
    fontSize: '11px',
    fontWeight: 'bold',
    color: '#64748b',
    padding: '0 15px 10px 15px',
    letterSpacing: '1px',
  },
  link: {
    display: 'flex',
    alignItems: 'center',
    padding: '12px 15px',
    textDecoration: 'none',
    color: '#cbd5e1', 
    fontSize: '14px',
    borderRadius: '8px',
    transition: 'all 0.2s ease',
    marginBottom: '5px',
  },
  activeLink: {
    backgroundColor: 'rgba(59, 130, 246, 0.2)', 
    color: '#ffffff',
    fontWeight: '600',
    borderLeft: '3px solid #3b82f6', 
  },
  icon: {
    marginRight: '15px',
    fontSize: '16px',
    minWidth: '20px',
  },
  logoutSection: {
    padding: '20px',
    borderTop: '1px solid rgba(255,255,255,0.08)',
    flexShrink: 0,
  },
  logoutBtn: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
    color: '#cbd5e1',
    border: 'none',
    padding: '12px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    transition: '0.2s',
  }
};

export default ClientSidebar;