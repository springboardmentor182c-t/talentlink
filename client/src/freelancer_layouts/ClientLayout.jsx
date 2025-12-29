

import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import ClientSidebar from '../freelancer_components/sidebar/ClientSidebar';
import ClientNavbar from '../freelancer_components/navbar/ClientNavbar';
import NotificationSidebar from '../notifications/features/notifications/components/NotificationSidebar';
import '../App.css';

const ClientLayout = () => {
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  return (
    <div style={styles.container}>
      {/* --- FORCE CSS TO HIDE SCROLLBAR --- */}
      <style>{`
        /* Hide scrollbar for Chrome, Safari and Opera */
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        /* Hide scrollbar for IE, Edge and Firefox */
        .hide-scrollbar {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
      `}</style>

      {/* 1. Sidebar Wrapper */}
      {/* We apply the class 'hide-scrollbar' here */}
      <div style={styles.sidebarWrapper} className="hide-scrollbar">
        <ClientSidebar />
      </div>

      {/* 2. Main Area */}
      <div style={styles.mainWrapper}>
        <ClientNavbar onNotificationClick={() => setIsNotifOpen(true)} />
        
        {/* We apply 'hide-scrollbar' here too for the main page */}
        <div style={styles.contentArea} className="hide-scrollbar">
          <Outlet /> 
        </div>
      </div>

      <NotificationSidebar 
        isOpen={isNotifOpen} 
        onClose={() => setIsNotifOpen(false)} 
      />
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    height: '100vh',
    width: '100vw',
    backgroundColor: '#f3f4f8',
    fontFamily: "'Inter', sans-serif",
    overflow: 'hidden',
  },
  sidebarWrapper: {
    width: '260px',
    flexShrink: 0,
    height: '100%',
    overflowY: 'auto', // Scroll is enabled, but hidden by CSS class
    backgroundColor: '#0f172a', 
  },
  mainWrapper: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
  },
  contentArea: {
    flex: 1,
    overflowY: 'auto', 
    padding: '0',
  }
};

export default ClientLayout;