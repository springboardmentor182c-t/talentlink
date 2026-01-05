
import React, { useState, useRef, useEffect } from 'react';
import { useUser } from '../../context/UserContext';
import profileService from '../../services/profileService';
import { performLogout } from '../../utils/logout';
import {
  FaChevronDown, FaUser, FaCog, FaSignOutAlt,
  FaCloudUploadAlt, FaSearch,
  FaBars,
  FaChevronLeft
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

// 1. Import Theme Hooks & Icons
import { useTheme as useAppTheme } from '../../context/ThemeContext'; // Renamed to avoid conflict with MUI
import { useTheme as useMuiTheme, IconButton, Badge, Avatar } from '@mui/material'; // Use MUI for dynamic colors
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import Brightness4Icon from '@mui/icons-material/Brightness4'; // Moon
import Brightness7Icon from '@mui/icons-material/Brightness7'; // Sun

  const ClientNavbar = ({ onNotificationClick, onSidebarToggle, onDelete, onToggleFavourite, notifications = [], sidebarOpen = true }) => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  
  const { user, updateProfile, logout } = useUser();
  
  // 2. Theme Logic
  const { theme, toggleTheme } = useAppTheme(); // From your Context
  const muiTheme = useMuiTheme(); // From Material UI (for colors)

  const [tempName, setTempName] = useState(user?.name || "");
  const [tempAvatar, setTempAvatar] = useState(user?.avatar || "");

  useEffect(() => {
    if (user) {
        setTempName(user.name);
        setTempAvatar(user.avatar);
    }
  }, [user]);

  const handleLogout = () => {
    setIsMenuOpen(false);
    if (logout) logout();
    navigate('/login');
  };

  const toggleMenu = (e) => {
    e.stopPropagation();
    setIsMenuOpen(!isMenuOpen);
  };

  const handleEditClick = (e) => {
    e.stopPropagation();
    setTempName(user.name);
    setTempAvatar(user.avatar);
    setShowEditModal(true);
    setIsMenuOpen(false); 
  };

  const handleSaveProfile = () => {
    updateProfile(tempName, null);
    setShowEditModal(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setTempAvatar(imageUrl);
    }
  };

  // Dynamic Styles based on Theme
  const dynamicStyles = {
    navbar: {
      ...styles.navbar,
      backgroundColor: muiTheme.palette.background.paper,
      borderBottom: `1px solid ${muiTheme.palette.divider}`,
      color: muiTheme.palette.text.primary,
    },
    searchContainer: {
      ...styles.searchContainer,
      backgroundColor: theme === 'dark' ? "rgba(255,255,255,0.05)" : "#f8fafc",
      border: `1px solid ${muiTheme.palette.divider}`,
    },
    searchInput: {
      ...styles.searchInput,
      color: muiTheme.palette.text.primary,
    },
    dropdown: {
      ...styles.dropdown,
      backgroundColor: muiTheme.palette.background.paper,
      color: muiTheme.palette.text.primary,
      border: `1px solid ${muiTheme.palette.divider}`,
    },
    menuItem: {
      ...styles.menuItem,
      color: muiTheme.palette.text.primary,
    },
    menuDivider: {
      ...styles.menuDivider,
      backgroundColor: muiTheme.palette.divider,
    },
    modalContent: {
      ...styles.modalContent,
      backgroundColor: muiTheme.palette.background.paper,
    },
    textInput: {
      ...styles.textInput,
      backgroundColor: muiTheme.palette.background.default,
      color: muiTheme.palette.text.primary,
      borderColor: muiTheme.palette.divider,
    },
    modalTitle: {
      ...styles.modalTitle,
      color: muiTheme.palette.text.primary,
    }
  };

  if (!user) return null; 

  return (
    <>
      {/* Apply Dynamic Navbar Styles */}
      <div style={dynamicStyles.navbar}>
        
        {/* --- 1. SEARCH BAR --- */}
        <div style={styles.leftSection}>
          {onSidebarToggle && (
            <button
              type="button"
              style={{
                ...styles.toggleButton,
                backgroundColor: muiTheme.palette.primary.main
              }}
              onClick={onSidebarToggle}
            >
              {sidebarOpen ? <FaChevronLeft /> : <FaBars />}
            </button>
          )}
          <div style={dynamicStyles.searchContainer}>
            <FaSearch style={styles.searchIcon} />
            <input 
              type="text" 
              placeholder="Search projects, talent..." 
              style={dynamicStyles.searchInput} 
            />
          </div>
        </div>

        {/* --- 2. RIGHT SECTION --- */}
        <div style={styles.rightSection}>
          
          {/* THEME TOGGLE BUTTON */}
          <IconButton onClick={toggleTheme} sx={{ color: 'text.secondary' }}>
            {theme === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>

          <div style={styles.iconWrapper}>
            {(() => {
              const unread = (notifications || []).filter(n => !(n.read === true || n.is_read === true)).length;
              return (
                <IconButton
                  onClick={onNotificationClick}
                  sx={{ border: '1px solid', borderColor: 'divider', bgcolor: 'background.paper' }}
                >
                  {unread > 0 ? (
                    <Badge badgeContent={unread} color="error">
                      <NotificationsNoneIcon sx={{ color: 'text.secondary' }} />
                    </Badge>
                  ) : (
                    <NotificationsNoneIcon sx={{ color: 'text.secondary' }} />
                  )}
                </IconButton>
              );
            })()}
          </div>

          <div style={{ ...styles.separator, backgroundColor: muiTheme.palette.divider }}></div>

          <div style={styles.profileContainer}>
            <div style={styles.profileWrapper} onClick={toggleMenu}>
              {(() => {
                const avatarUploaded = !!localStorage.getItem('avatar_uploaded');
                const saved = localStorage.getItem('freelancer_avatar');
                const src = avatarUploaded ? (saved || user.avatar) : null;
                const initials = (user && user.name) ? user.name.split(/\s+/).map(p => p[0]).slice(0,2).join('').toUpperCase() : 'U';
                return (
                  <Avatar src={src || undefined} style={styles.avatar}>
                    {!src && initials}
                  </Avatar>
                );
              })()}
              <div style={styles.userInfo}>
                <span style={{ ...styles.userName, color: muiTheme.palette.text.primary }}>{user.name}</span>
                <span style={styles.userRole}>{user.role}</span>
              </div>
              <FaChevronDown style={{ fontSize: '12px', color: muiTheme.palette.text.secondary, marginLeft: '8px' }} />
            </div>

            {/* Dropdown Menu */}
            {isMenuOpen && (
              <div style={dynamicStyles.dropdown}>
                <div style={{...styles.dropdownHeader, color: muiTheme.palette.text.secondary }}>Account</div>
                
                <button style={dynamicStyles.menuItem} onClick={handleEditClick}>
                  <FaUser style={styles.menuIcon} /> Edit Profile
                </button>
                <button style={dynamicStyles.menuItem} onClick={() => setIsMenuOpen(false)}>
                  <FaCog style={styles.menuIcon} /> Settings
                </button>
                <div style={dynamicStyles.menuDivider}></div>
                <button 
                  style={{...dynamicStyles.menuItem, color: '#ef4444'}}
                  onClick={handleLogout}
                >
                <FaSignOutAlt style={{...styles.menuIcon, color: '#ef4444'}} /> Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* --- EDIT PROFILE MODAL --- */}
      {showEditModal && (
        <div style={styles.modalOverlay}>
          <div style={dynamicStyles.modalContent}>
            <h2 style={dynamicStyles.modalTitle}>Update Profile Details</h2>
            
            <div style={styles.modalBody}>
              <div style={styles.avatarUploadWrapper}>
                <img src={tempAvatar || "https://via.placeholder.com/100"} alt="Profile" style={styles.largeAvatar} />
                <div 
                  style={styles.cameraBtn} 
                  onClick={() => fileInputRef.current.click()}
                >
                  <FaCloudUploadAlt color="white" />
                </div>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  style={{display: 'none'}} 
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.inputLabel}>Full Name</label>
                <input 
                  type="text" 
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  style={dynamicStyles.textInput}
                />
              </div>
            </div>

            <div style={styles.modalFooter}>
              <button style={styles.cancelBtn} onClick={() => setShowEditModal(false)}>
                Cancel
              </button>
              <button style={styles.saveBtn} onClick={handleSaveProfile}>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// --- BASE STYLES (Colors are overridden in component) ---
const styles = {
  navbar: {
    height: '70px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 30px',
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
  searchContainer: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px 16px',
    borderRadius: '50px',
    width: '320px',
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
    fontSize: '14px',
    fontWeight: '500',
  },
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
  },
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
    lineHeight: '1.2'
  },
  userRole: {
    fontSize: '11px',
    color: '#64748b',
    fontWeight: '500',
    textTransform: 'uppercase'
  },
  dropdown: {
    position: 'absolute',
    top: '55px',
    right: '0',
    width: '220px',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
    padding: '8px',
    zIndex: 100,
    animation: 'fadeIn 0.2s ease-out',
  },
  dropdownHeader: {
    padding: '8px 12px',
    fontSize: '12px',
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  menuItem: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    padding: '10px 12px',
    fontSize: '14px',
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
    margin: '6px 0',
  },
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
    border: '1px solid',
    fontSize: '15px',
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