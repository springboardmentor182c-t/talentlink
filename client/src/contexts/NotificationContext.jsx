import React, { createContext, useContext, useEffect, useState } from 'react';
import { notificationService } from '../services/notificationService';

// Create notification context
const NotificationContext = createContext();

// Notification Provider Component
export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [activeContractIds, setActiveContractIds] = useState([]);

  useEffect(() => {
    // Subscribe to notifications
    const unsubscribe = notificationService.subscribe((notification) => {
      setNotifications(prev => [notification, ...prev]);
      setUnreadCount(prev => prev + 1);
    });

    // Load existing notifications
    setNotifications(notificationService.getNotifications());
    setUnreadCount(notificationService.getUnreadNotifications().length);

    return () => {
      unsubscribe();
    };
  }, []);

  // Start polling for contract updates when active contracts change
  useEffect(() => {
    if (activeContractIds.length > 0) {
      notificationService.startPolling(activeContractIds, 30000); // Poll every 30 seconds
    } else {
      notificationService.stopPolling();
    }

    return () => {
      notificationService.stopPolling();
    };
  }, [activeContractIds]);

  // Contract notification methods
  const notifyContractCreated = (contract) => {
    notificationService.createContractNotification(
      'contract_created',
      contract,
      `New contract "${contract.title}" has been created`
    );
  };

  const notifyContractStatusChanged = (contract, oldStatus, newStatus) => {
    notificationService.createContractNotification(
      'contract_status_changed',
      contract,
      `Contract "${contract.title}" status changed from ${oldStatus} to ${newStatus}`
    );
  };

  const notifyPaymentMade = (contract, amount, paymentType) => {
    const message = paymentType === 'escrow' 
      ? `Payment of $${amount} has been added to escrow for "${contract.title}"`
      : `Payment of $${amount} has been made for "${contract.title}"`;
    
    notificationService.createContractNotification(
      'contract_payment_made',
      contract,
      message
    );
  };

  const notifyMilestoneCompleted = (contract, milestone) => {
    notificationService.createContractNotification(
      'contract_milestone_completed',
      contract,
      `Milestone "${milestone.title}" has been completed in "${contract.title}"`
    );
  };

  const notifyContractCompleted = (contract) => {
    notificationService.createContractNotification(
      'contract_completed',
      contract,
      `Contract "${contract.title}" has been completed successfully`
    );
  };

  const notifyContractCancelled = (contract) => {
    notificationService.createContractNotification(
      'contract_cancelled',
      contract,
      `Contract "${contract.title}" has been cancelled`
    );
  };

  const notifyContractDisputed = (contract) => {
    notificationService.createContractNotification(
      'contract_disputed',
      contract,
      `Contract "${contract.title}" is under dispute`
    );
  };

  // Contract monitoring methods
  const startMonitoringContracts = (contractIds) => {
    setActiveContractIds(contractIds);
  };

  const stopMonitoringContracts = () => {
    setActiveContractIds([]);
  };

  // Notification management methods
  const markNotificationAsRead = (notificationId) => {
    notificationService.markAsRead(notificationId);
    setNotifications(prev => 
      prev.map(n => n.id === notificationId ? { ...n, read: true } : n)
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const markAllNotificationsAsRead = () => {
    notificationService.markAllAsRead();
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    setUnreadCount(0);
  };

  const clearAllNotifications = () => {
    notificationService.clearAll();
    setNotifications([]);
    setUnreadCount(0);
  };

  const clearOldNotifications = (hours = 24) => {
    notificationService.clearOldNotifications(hours);
    setNotifications(notificationService.getNotifications());
    setUnreadCount(notificationService.getUnreadNotifications().length);
  };

  const value = {
    notifications,
    unreadCount,
    notifyContractCreated,
    notifyContractStatusChanged,
    notifyPaymentMade,
    notifyMilestoneCompleted,
    notifyContractCompleted,
    notifyContractCancelled,
    notifyContractDisputed,
    startMonitoringContracts,
    stopMonitoringContracts,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    clearAllNotifications,
    clearOldNotifications
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

// Custom hook to use notification context
export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

export default NotificationContext;