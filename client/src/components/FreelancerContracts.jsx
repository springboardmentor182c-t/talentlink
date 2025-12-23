import React from 'react';
import { NotificationProvider } from '../contexts/NotificationContext.jsx';
import Contracts from '../Pages/Contracts.jsx';

const FreelancerContracts = () => {
  return (
    <NotificationProvider>
      <Contracts />
    </NotificationProvider>
  );
};

export default FreelancerContracts;