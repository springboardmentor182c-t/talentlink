import React from 'react';
import Messages from './Messages';

// Wrapper for freelancer-specific messages page
export default function FreelancerMessages() {
  // Optionally, add role-based logic or props here
  return <Messages userType="freelancer" />;
}
