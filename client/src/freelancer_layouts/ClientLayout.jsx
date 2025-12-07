import React from 'react';
import { Outlet } from 'react-router-dom';
import ClientSidebar from '../freelancer_components/sidebar/ClientSidebar';
import ClientNavbar from '../freelancer_components/navbar/ClientNavbar';

const ClientLayout = () => {
  return (
    <div style={styles.container}>
      {/* 1. Sidebar (Fixed Left) */}
      <div style={styles.sidebarWrapper}>
        <ClientSidebar />
      </div>

      {/* 2. Main Area (Right Side) */}
      <div style={styles.mainWrapper}>
        
        {/* Top Navbar */}
        <ClientNavbar />
        
        {/* Dashboard Content (Scrollable) */}
        <div style={styles.contentArea}>
          <Outlet /> 
        </div>

      </div>
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
  },
  mainWrapper: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
  },
  contentArea: {
    flex: 1,
    overflowY: 'auto', // Allows scrolling ONLY in the dashboard area
    padding: '30px',
  }
};

export default ClientLayout;
