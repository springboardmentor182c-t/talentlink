

import React, { useState, useEffect } from 'react';
import { useUser } from '../../context/UserContext';
import profileService from '../../services/profileService';
import { performLogout } from '../../utils/logout';
import {
  FaBell, FaChevronDown, FaUser, FaCog, FaSignOutAlt,
  FaSearch,
  FaBars,
  FaChevronLeft
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const ClientNavbar = ({ onNotificationClick, onSidebarToggle, sidebarOpen = true }) => {
  const navigate = useNavigate();

  // --- State Management ---
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [displayUser, setDisplayUser] = useState({
    name: '',
    avatar: "https://i.pravatar.cc/150?img=3",
    role: 'Client'
  });

  // Use user context mainly for logout/auth check
  const { user } = useUser();

  // Fetch Client Specific Profile
  useEffect(() => {
    const fetchClientProfile = async () => {
      try {
        const data = await profileService.client.getProfile();
        const fullName = `${data.first_name || ""} ${data.last_name || ""}`.trim();

        let avatarUrl = "https://i.pravatar.cc/150?img=3";
        if (data.profile_image) {
          avatarUrl = data.profile_image.startsWith('http')
            ? data.profile_image
            : `${process.env.REACT_APP_API_BASE_URL || 'http://127.0.0.1:8000'}${data.profile_image}`;
        }

        setDisplayUser({
          name: data.company_name || fullName || user.name || "Client",
          avatar: avatarUrl,
          role: 'Client'
        });
      } catch (err) {
        console.error("Failed to fetch client profile for navbar", err);
        // Fallback to global user if fetch fails (e.g. 404)
        setDisplayUser({
          name: user.name,
          avatar: user.avatar,
          role: 'Client'
        });
      }
    };

    fetchClientProfile();
  }, [user.name, user.avatar]); // Re-run if global user changes (e.g. after edit)

  // --- Handlers ---
  const handleLogout = async () => {
    setIsMenuOpen(false);
    await performLogout();
    navigate('/login');
  };

  const toggleMenu = (e) => {
    e.stopPropagation();
    setIsMenuOpen(!isMenuOpen);
  };

  const handleEditClick = (e) => {
    e.stopPropagation();
    setIsMenuOpen(false);
    navigate('/client/profile');
  };

  return (
    <>
      <div style={styles.navbar}>

        {/* --- 1. SEARCH BAR (Added on Left) --- */}
        <div style={styles.leftSection}>
          {onSidebarToggle && (
            <button
              type="button"
              style={styles.toggleButton}
              onClick={onSidebarToggle}
            >
              {sidebarOpen ? <FaChevronLeft /> : <FaBars />}
            </button>
          )}
          <div style={styles.searchContainer}>
            <FaSearch style={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search projects, talent..."
              style={styles.searchInput}
            />
          </div>
        </div>

        {/* --- 2. RIGHT SECTION (Notifications & Profile) --- */}
        <div style={styles.rightSection}>

          {/* Notification Bell */}
          <div style={styles.iconWrapper} onClick={onNotificationClick}>
            <FaBell style={{ color: '#64748b', fontSize: '18px' }} />
            <span style={styles.dotBadge}></span>
          </div>

          <div style={styles.separator}></div>

          {/* User Profile */}
          <div style={styles.profileContainer}>
            <div style={styles.profileWrapper} onClick={toggleMenu}>
              <img src={displayUser.avatar} alt="User" style={styles.avatar} />
              <div style={styles.userInfo}>
                <span style={styles.userName}>{displayUser.name}</span>
                <span style={styles.userRole}>{displayUser.role}</span>
              </div>
              <FaChevronDown style={{ fontSize: '12px', color: '#64748b', marginLeft: '8px' }} />
            </div>

            {/* Dropdown Menu */}
            {isMenuOpen && (
              <div style={styles.dropdown}>
                <div style={styles.dropdownArrow}></div>
                <div style={styles.dropdownHeader}>Account</div>

                <button style={styles.menuItem} onClick={handleEditClick}>
                  <FaUser style={styles.menuIcon} /> Profile
                </button>
                <button style={styles.menuItem} onClick={() => setIsMenuOpen(false)}>
                  <FaCog style={styles.menuIcon} /> Settings
                </button>
                <div style={styles.menuDivider}></div>
                <button
                  style={{ ...styles.menuItem, color: '#ef4444' }}
                  onClick={handleLogout}
                >
                  <FaSignOutAlt style={{ ...styles.menuIcon, color: '#ef4444' }} /> Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

// --- STYLES ---
const styles = {
  navbar: {
    height: '70px',
    backgroundColor: '#ffffff',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 30px',
    borderBottom: '1px solid #f1f5f9',
    position: 'relative',
    zIndex: 50,
  },
  leftSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  toggleButton: {
    border: 'none',
    backgroundColor: '#0f172a',
    color: '#ffffff',
    width: '36px',
    height: '36px',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: '0.2s',
  },

  // --- SEARCH BAR STYLES ---
  searchContainer: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#f8fafc', // Light grey background
    padding: '10px 16px',
    borderRadius: '50px',       // Pill shape
    width: '320px',
    border: '1px solid #e2e8f0',
    transition: '0.2s',
  },
  searchIcon: {
    color: '#94a3b8',
    marginRight: '12px',
    fontSize: '14px',
  },
  searchInput: {
    border: 'none',
    backgroundColor: 'transparent',
    outline: 'none',
    width: '100%',
    color: '#334155',
    fontSize: '14px',
    fontWeight: '500',
  },

  // --- RIGHT SECTION ---
  rightSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
  },
  iconWrapper: {
    position: 'relative',
    cursor: 'pointer',
    padding: '8px',
    transition: '0.2s',
  },
  dotBadge: {
    position: 'absolute',
    top: '6px',
    right: '6px',
    backgroundColor: '#ef4444',
    height: '8px',
    width: '8px',
    borderRadius: '50%',
    border: '1px solid white',
  },
  separator: {
    width: '1px',
    height: '24px',
    backgroundColor: '#e2e8f0',
  },

  // Profile Section
  profileContainer: { position: 'relative' },
  profileWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    cursor: 'pointer',
    padding: '4px 8px',
    borderRadius: '8px',
    transition: '0.2s',
  },
  avatar: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    objectFit: 'cover',
    border: '2px solid #e2e8f0'
  },
  userInfo: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  userName: {
    fontSize: '14px',
    fontWeight: '700',
    color: '#0f172a',
    lineHeight: '1.2'
  },
  userRole: {
    fontSize: '11px',
    color: '#64748b',
    fontWeight: '500',
    textTransform: 'uppercase'
  },

  // Dropdown Menu
  dropdown: {
    position: 'absolute',
    top: '55px',
    right: '0',
    width: '220px',
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
    border: '1px solid #f1f5f9',
    padding: '8px',
    zIndex: 100,
    animation: 'fadeIn 0.2s ease-out',
  },
  dropdownArrow: {
    position: 'absolute',
    top: '-6px',
    right: '20px',
    width: '12px',
    height: '12px',
    backgroundColor: 'white',
    borderLeft: '1px solid #f1f5f9',
    borderTop: '1px solid #f1f5f9',
    transform: 'rotate(45deg)',
  },
  dropdownHeader: {
    padding: '8px 12px',
    fontSize: '12px',
    fontWeight: '600',
    color: '#94a3b8',
    textTransform: 'uppercase',
  },
  menuItem: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    padding: '10px 12px',
    fontSize: '14px',
    color: '#1e293b',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    textAlign: 'left',
    fontWeight: '500',
  },
  menuIcon: {
    marginRight: '10px',
    color: '#1b4332',
    fontSize: '16px'
  },
  menuDivider: {
    height: '1px',
    backgroundColor: '#e2e8f0',
    margin: '6px 0',
  },

  // Modal Styles
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2000,
    backdropFilter: 'blur(4px)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: '16px',
    width: '500px',
    padding: '30px',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  modalTitle: {
    margin: 0,
    fontSize: '20px',
    fontWeight: '700',
    color: '#1e293b',
    textAlign: 'center',
  },
  modalBody: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '24px',
  },
  avatarUploadWrapper: {
    position: 'relative',
    width: '100px',
    height: '100px',
  },
  largeAvatar: {
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    objectFit: 'cover',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
  },
  cameraBtn: {
    position: 'absolute',
    bottom: '0',
    right: '0',
    backgroundColor: '#1b4332',
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    border: '2px solid white',
  },
  inputGroup: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  inputLabel: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#64748b',
  },
  textInput: {
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #cbd5e1',
    fontSize: '15px',
    color: '#1e293b',
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box',
  },
  modalFooter: {
    display: 'flex',
    justifyContent: 'center',
    gap: '16px',
    marginTop: '10px',
  },
  cancelBtn: {
    background: 'none',
    border: 'none',
    color: '#64748b',
    fontSize: '15px',
    fontWeight: '600',
    cursor: 'pointer',
    padding: '10px 20px',
  },
  saveBtn: {
    backgroundColor: '#1b4332',
    color: 'white',
    border: 'none',
    padding: '10px 32px',
    borderRadius: '8px',
    fontWeight: '600',
    fontSize: '15px',
    cursor: 'pointer',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
  },
};

export default ClientNavbar;