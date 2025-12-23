import React from 'react';
import Messages from './Messages';

// Wrapper for client-specific messages page
export default function ClientMessages() {
  // Optionally, add role-based logic or props here
  return <Messages userType="client" />;
}
