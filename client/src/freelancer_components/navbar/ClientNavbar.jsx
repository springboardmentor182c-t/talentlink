import React, { useState, useRef } from 'react';
import { FaBell, FaChevronDown, FaPen, FaCamera, FaSave, FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const ClientNavbar = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  // --- State Management ---
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  
  // User Data State
  const [user, setUser] = useState({
    name: 'Kumar Gosala',
    avatar: 'https://i.pravatar.cc/150?img=68'
  });

  // Temporary state for editing
  const [tempName, setTempName] = useState(user.name);
  const [tempAvatar, setTempAvatar] = useState(user.avatar);

  // --- Handlers ---
  const handleNotificationClick = () => {
    navigate('/notifications');
  };

  const handleLogout = () => {
    // 1. Clear user session/token here (Example: localStorage.removeItem('token'))
    console.log("Logging out...");
    
    // 2. Redirect to Login Page
    navigate('/login');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (isMenuOpen) {
      setIsEditing(false);
      setTempName(user.name);
      setTempAvatar(user.avatar);
    }
  };

  const handleEditClick = (e) => {
    e.stopPropagation();
    setIsEditing(true);
  };

  const handleSave = (e) => {
    e.stopPropagation();
    setUser({ name: tempName, avatar: tempAvatar });
    setIsEditing(false);
    setIsMenuOpen(false); 
  };

  const handleCancel = (e) => {
    e.stopPropagation();
    setTempName(user.name);
    setTempAvatar(user.avatar);
    setIsEditing(false);
  };

  const handleAvatarClick = (e) => {
    if (isEditing) {
      e.stopPropagation();
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setTempAvatar(imageUrl);
    }
  };

  return (
    <div style={styles.navbar}>
      <div style={styles.rightSection}>
        
        {/* --- Notification Bell --- */}
        <div style={styles.iconWrapper} onClick={handleNotificationClick}>
          <FaBell style={{ color: '#64748b', fontSize: '18px' }} />
          <span style={styles.badge}>9</span>
        </div>

        <div style={styles.separator}></div>

        {/* --- User Profile Section --- */}
        <div style={styles.profileContainer}>
          <div style={styles.profileWrapper} onClick={toggleMenu}>
            <div style={styles.userInfo}>
              <span style={styles.userName}>{user.name}</span>
              <FaChevronDown style={{ fontSize: '10px', color: '#64748b', marginLeft: '5px' }} />
            </div>
            <img 
              src={user.avatar} 
              alt="User" 
              style={styles.avatar} 
            />
          </div>

          {/* --- Dropdown Menu --- */}
          {isMenuOpen && (
            <div style={styles.dropdown}>
              
              {/* Header of Dropdown */}
              <div style={styles.dropdownHeader}>
                <div style={styles.avatarContainer} onClick={handleAvatarClick}>
                   <img src={isEditing ? tempAvatar : user.avatar} alt="Profile" style={styles.largeAvatar} />
                   {isEditing && (
                     <div style={styles.cameraOverlay}>
                       <FaCamera color="white" />
                       <input 
                         type="file" 
                         ref={fileInputRef} 
                         style={{display: 'none'}} 
                         accept="image/*"
                         onChange={handleFileChange}
                       />
                     </div>
                   )}
                </div>
              </div>

              {/* Body of Dropdown */}
              <div style={styles.dropdownBody}>
                {isEditing ? (
                  // --- EDIT MODE ---
                  <div style={styles.editForm}>
                    <label style={styles.label}>Display Name</label>
                    <input 
                      type="text" 
                      value={tempName}
                      onChange={(e) => setTempName(e.target.value)}
                      style={styles.input}
                    />
                    <div style={styles.actionButtons}>
                      <button style={styles.cancelBtn} onClick={handleCancel}>
                        <FaTimes />
                      </button>
                      <button style={styles.saveBtn} onClick={handleSave}>
                        <FaSave style={{marginRight: '5px'}}/> Save
                      </button>
                    </div>
                  </div>
                ) : (
                  // --- VIEW MODE ---
                  <div>
                    <div style={styles.dropdownName}>{user.name}</div>
                    <div style={styles.dropdownEmail}>client@apex.com</div>
                    
                    <button style={styles.menuItem} onClick={handleEditClick}>
                      <FaPen style={styles.menuIcon} /> Edit Profile
                    </button>
                    <div style={styles.menuDivider}></div>
                    <button 
                      style={{...styles.menuItem, color: '#ef4444'}}
                      onClick={handleLogout} // <--- LOGOUT TRIGGER
                    >
                       Log Out
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

// --- STYLES ---
const styles = {
  navbar: {
    height: '70px',
    backgroundColor: '#ffffff',
    display: 'flex',
    justifyContent: 'flex-end', // Aligns everything to the right
    alignItems: 'center',
    padding: '0 30px',
    borderBottom: '1px solid #f1f5f9',
    position: 'relative',
    zIndex: 50, // Ensure it stays on top
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
  badge: {
    position: 'absolute',
    top: '2px',
    right: '2px',
    backgroundColor: '#ef4444', // Red notification dot
    color: 'white',
    fontSize: '10px',
    fontWeight: 'bold',
    height: '16px',
    width: '16px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '2px solid white',
  },
  separator: {
    width: '1px',
    height: '24px',
    backgroundColor: '#e2e8f0',
  },
  profileContainer: {
    position: 'relative',
  },
  profileWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    cursor: 'pointer',
    userSelect: 'none',
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
  },
  userName: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#334155',
  },
  avatar: {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    objectFit: 'cover',
    border: '2px solid #e2e8f0',
  },
  
  // Dropdown Styles
  dropdown: {
    position: 'absolute',
    top: '50px',
    right: '0',
    width: '260px',
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    border: '1px solid #f1f5f9',
    overflow: 'hidden',
    animation: 'fadeIn 0.2s ease-out',
  },
  dropdownHeader: {
    backgroundColor: '#f8fafc',
    padding: '20px',
    display: 'flex',
    justifyContent: 'center',
    borderBottom: '1px solid #e2e8f0',
  },
  avatarContainer: {
    position: 'relative',
    width: '80px',
    height: '80px',
  },
  largeAvatar: {
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    objectFit: 'cover',
    border: '3px solid white',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  cameraOverlay: {
    position: 'absolute',
    bottom: '0',
    right: '0',
    backgroundColor: '#3b82f6',
    width: '28px',
    height: '28px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    border: '2px solid white',
  },
  dropdownBody: {
    padding: '15px',
  },
  dropdownName: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: '16px',
    color: '#1e293b',
  },
  dropdownEmail: {
    textAlign: 'center',
    fontSize: '12px',
    color: '#64748b',
    marginBottom: '15px',
  },
  menuItem: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    padding: '10px 12px',
    fontSize: '14px',
    color: '#475569',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: '0.2s',
    textAlign: 'left',
  },
  menuIcon: {
    marginRight: '10px',
    color: '#94a3b8',
  },
  menuDivider: {
    height: '1px',
    backgroundColor: '#e2e8f0',
    margin: '8px 0',
  },
  
  // Edit Form Styles
  editForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  label: {
    fontSize: '12px',
    fontWeight: '600',
    color: '#64748b',
  },
  input: {
    padding: '8px 12px',
    borderRadius: '6px',
    border: '1px solid #cbd5e1',
    fontSize: '14px',
    outline: 'none',
  },
  actionButtons: {
    display: 'flex',
    gap: '10px',
    marginTop: '5px',
  },
  saveBtn: {
    flex: 1,
    backgroundColor: '#3b82f6',
    color: 'white',
    border: 'none',
    padding: '8px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelBtn: {
    width: '36px',
    backgroundColor: '#f1f5f9',
    color: '#64748b',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
};

export default ClientNavbar;
