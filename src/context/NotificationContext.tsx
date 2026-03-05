import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
  actionLabel?: string;
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
  removeNotification: (id: string) => void;
  clearAllNotifications: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([
    // Données de test/démo
    {
      id: '1',
      title: 'Nouvelle inscription FabLab',
      message: 'Une nouvelle inscription pour la formation "Impression 3D avancée" a été reçue.',
      type: 'info',
      timestamp: new Date(Date.now() - 10 * 60 * 1000), // Il y a 10 minutes
      read: false,
      actionUrl: '/admin/inscriptions/fablab',
      actionLabel: 'Voir l\'inscription'
    },
    {
      id: '2',
      title: 'Maintenance requise',
      message: 'La machine "Ultimaker S3" nécessite une maintenance programmée.',
      type: 'warning',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // Il y a 2 heures
      read: false,
      actionUrl: '/admin/formations/fablab',
      actionLabel: 'Gérer les machines'
    },
    {
      id: '3',
      title: 'Formation complète',
      message: 'La formation "Découpe laser" a atteint sa capacité maximale.',
      type: 'success',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // Il y a 1 jour
      read: true,
      actionUrl: '/admin/formations/fablab',
      actionLabel: 'Voir les détails'
    }
  ]);

  const unreadCount = notifications.filter(notification => !notification.read).length;

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const addNotification = (notificationData: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    const newNotification: Notification = {
      ...notificationData,
      id: Date.now().toString(),
      timestamp: new Date(),
      read: false
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const value: NotificationContextType = {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    addNotification,
    removeNotification,
    clearAllNotifications
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};
