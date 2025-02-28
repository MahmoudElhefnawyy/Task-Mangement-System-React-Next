
import React, { createContext, useContext, useState, useEffect } from "react";
import { type Task } from "@shared/schema";

export interface Notification {
  id: string;
  title: string;
  message: string;
  read: boolean;
  timestamp: string;
  type: "reminder" | "dueDate" | "system";
  taskId?: number;
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Omit<Notification, "id" | "read" | "timestamp">) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearNotification: (id: string) => void;
  clearAllNotifications: () => void;
  checkDueDates: (tasks: Task[]) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotifications must be used within a NotificationProvider");
  }
  return context;
};

interface NotificationProviderProps {
  children: React.ReactNode;
}

export function NotificationProvider({ children }: NotificationProviderProps) {
  const [notifications, setNotifications] = useState<Notification[]>(() => {
    const saved = localStorage.getItem("notifications");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("notifications", JSON.stringify(notifications));
  }, [notifications]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const addNotification = (notification: Omit<Notification, "id" | "read" | "timestamp">) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      read: false,
      timestamp: new Date().toISOString(),
    };
    
    setNotifications(prev => [newNotification, ...prev]);
    
    // If browser notifications are enabled, show one
    if (Notification.permission === 'granted') {
      new Notification(notification.title, {
        body: notification.message,
      });
    }
  };

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

  const clearNotification = (id: string) => {
    setNotifications(prev => 
      prev.filter(notification => notification.id !== id)
    );
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };
  
  const checkDueDates = (tasks: Task[]) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    
    tasks.forEach(task => {
      if (!task.dueDate || task.status === "completed") return;
      
      const dueDate = new Date(task.dueDate);
      dueDate.setHours(0, 0, 0, 0);
      
      // Check if this is the first time we're notifying for this task
      const existingNotification = notifications.find(
        n => n.taskId === task.id && n.type === "dueDate"
      );
      
      if (existingNotification) return;
      
      if (dueDate.getTime() === tomorrow.getTime()) {
        addNotification({
          title: "Task Due Tomorrow",
          message: `"${task.title}" is due tomorrow`,
          type: "dueDate",
          taskId: task.id,
        });
      } else if (dueDate.getTime() === today.getTime()) {
        addNotification({
          title: "Task Due Today",
          message: `"${task.title}" is due today`,
          type: "dueDate",
          taskId: task.id,
        });
      } else if (dueDate < today) {
        addNotification({
          title: "Overdue Task",
          message: `"${task.title}" is overdue`,
          type: "dueDate",
          taskId: task.id,
        });
      }
    });
  };

  useEffect(() => {
    // Request permission for browser notifications
    if (Notification.permission !== 'granted' && Notification.permission !== 'denied') {
      Notification.requestPermission();
    }
  }, []);

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        addNotification,
        markAsRead,
        markAllAsRead,
        clearNotification,
        clearAllNotifications,
        checkDueDates,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}
