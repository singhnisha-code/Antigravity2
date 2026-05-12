import { 
  collection, 
  addDoc, 
  query, 
  where, 
  onSnapshot, 
  updateDoc, 
  doc, 
  orderBy, 
  limit 
} from 'firebase/firestore';
import { db } from '../firebase/config';

export interface Notification {
  id?: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  createdAt: any;
}

export const notificationService = {
  // Send a notification
  async sendNotification(notification: Omit<Notification, 'id' | 'read' | 'createdAt'>) {
    return await addDoc(collection(db, 'notifications'), {
      ...notification,
      read: false,
      createdAt: new Date().toISOString()
    });
  },

  // Subscribe to user notifications
  subscribeNotifications(userId: string, callback: (notifications: Notification[]) => void) {
    const q = query(
      collection(db, 'notifications'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc'),
      limit(20)
    );
    
    return onSnapshot(q, (snapshot) => {
      const notifications = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Notification[];
      callback(notifications);
    });
  },

  // Mark as read
  async markAsRead(notificationId: string) {
    const docRef = doc(db, 'notifications', notificationId);
    return await updateDoc(docRef, { read: true });
  }
};
