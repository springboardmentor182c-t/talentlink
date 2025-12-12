// Notification service for handling contract-related notifications
import { contractService } from './contractService';

class NotificationService {
  constructor() {
    this.notifications = [];
    this.subscribers = [];
    this.pollingInterval = null;
    this.lastCheckTime = new Date();
  }

  // Subscribe to notifications
  subscribe(callback) {
    this.subscribers.push(callback);
    return () => {
      this.subscribers = this.subscribers.filter(sub => sub !== callback);
    };
  }

  // Notify all subscribers
  notifySubscribers(notification) {
    this.subscribers.forEach(callback => {
      try {
        callback(notification);
      } catch (error) {
        console.error('Error in notification callback:', error);
      }
    });
  }

  // Add notification
  addNotification(notification) {
    this.notifications.unshift({
      ...notification,
      id: Date.now() + Math.random(),
      timestamp: new Date(),
      read: false
    });
    
    // Keep only last 50 notifications
    if (this.notifications.length > 50) {
      this.notifications = this.notifications.slice(0, 50);
    }
    
    this.notifySubscribers(notification);
  }

  // Get all notifications
  getNotifications() {
    return this.notifications;
  }

  // Get unread notifications
  getUnreadNotifications() {
    return this.notifications.filter(n => !n.read);
  }

  // Mark notification as read
  markAsRead(notificationId) {
    const notification = this.notifications.find(n => n.id === notificationId);
    if (notification) {
      notification.read = true;
    }
  }

  // Mark all notifications as read
  markAllAsRead() {
    this.notifications.forEach(notification => {
      notification.read = true;
    });
  }

  // Create contract notification
  createContractNotification(type, contract, message, metadata = {}) {
    const notification = {
      type: 'contract',
      subtype: type,
      title: this.getNotificationTitle(type),
      message,
      contractId: contract.id,
      contractTitle: contract.title,
      priority: this.getNotificationPriority(type),
      metadata
    };

    this.addNotification(notification);
  }

  // Get notification title based on type
  getNotificationTitle(type) {
    const titles = {
      'contract_created': 'Contract Created',
      'contract_status_changed': 'Contract Status Updated',
      'contract_payment_made': 'Payment Made',
      'contract_milestone_completed': 'Milestone Completed',
      'contract_completed': 'Contract Completed',
      'contract_cancelled': 'Contract Cancelled',
      'contract_disputed': 'Contract Disputed',
      'contract_overdue': 'Contract Overdue',
      'payment_due': 'Payment Due',
      'milestone_due': 'Milestone Due'
    };

    return titles[type] || 'Contract Update';
  }

  // Get notification priority
  getNotificationPriority(type) {
    const highPriority = ['contract_disputed', 'contract_overdue', 'payment_due'];
    const mediumPriority = ['contract_status_changed', 'contract_cancelled', 'milestone_due'];
    
    if (highPriority.includes(type)) return 'high';
    if (mediumPriority.includes(type)) return 'medium';
    return 'low';
  }

  // Start polling for contract updates
  startPolling(contractIds = [], interval = 30000) {
    if (this.pollingInterval) {
      this.stopPolling();
    }

    const poll = async () => {
      try {
        for (const contractId of contractIds) {
          await this.checkContractUpdates(contractId);
        }
        this.lastCheckTime = new Date();
      } catch (error) {
        console.error('Error polling contract updates:', error);
      }
    };

    // Poll immediately and then at intervals
    poll();
    this.pollingInterval = setInterval(poll, interval);
  }

  // Stop polling
  stopPolling() {
    if (this.pollingInterval) {
      clearInterval(this.pollingInterval);
      this.pollingInterval = null;
    }
  }

  // Check for contract updates
  async checkContractUpdates(contractId) {
    try {
      const activities = await contractService.getContractActivities(contractId);
      
      // Filter activities since last check
      const recentActivities = activities.filter(activity => 
        new Date(activity.created_at) > this.lastCheckTime
      );

      // Create notifications for recent activities
      recentActivities.forEach(activity => {
        this.createActivityNotification(activity, contractId);
      });
    } catch (error) {
      console.error(`Error checking updates for contract ${contractId}:`, error);
    }
  }

  // Create notification from activity
  createActivityNotification(activity, contractId) {
    const notificationType = this.mapActivityToNotificationType(activity.activity_type);
    const message = this.formatActivityMessage(activity);
    
    this.createContractNotification(
      notificationType,
      { id: contractId, title: activity.contract_title || 'Contract' },
      message,
      { activityId: activity.id }
    );
  }

  // Map activity type to notification type
  mapActivityToNotificationType(activityType) {
    const mapping = {
      'created': 'contract_created',
      'status_changed': 'contract_status_changed',
      'payment_made': 'contract_payment_made',
      'milestone_completed': 'contract_milestone_completed',
      'milestone_approved': 'contract_milestone_completed',
      'contract_completed': 'contract_completed',
      'contract_cancelled': 'contract_cancelled',
      'contract_disputed': 'contract_disputed',
      'note_added': 'contract_status_changed'
    };

    return mapping[activityType] || 'contract_status_changed';
  }

  // Format activity message for notification
  formatActivityMessage(activity) {
    return activity.description || `${activity.user_name} performed ${activity.activity_type}`;
  }

  // Clear all notifications
  clearAll() {
    this.notifications = [];
  }

  // Clear notifications older than specified hours
  clearOldNotifications(hours = 24) {
    const cutoffTime = new Date(Date.now() - hours * 60 * 60 * 1000);
    this.notifications = this.notifications.filter(n => 
      new Date(n.timestamp) > cutoffTime
    );
  }
}

// Create and export singleton instance
const notificationService = new NotificationService();

// Export notification service and class for testing
export { notificationService, NotificationService };

// Export notification service as default
export default notificationService;