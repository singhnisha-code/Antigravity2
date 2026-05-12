import { 
  collection, 
  addDoc, 
  query, 
  orderBy, 
  limit, 
  onSnapshot 
} from 'firebase/firestore';
import { db } from '../firebase/config';

export interface AuditLog {
  id?: string;
  userId: string;
  userName: string;
  action: string;
  module: string;
  details: string;
  ipAddress?: string;
  createdAt: any;
}

export const auditService = {
  // Create an audit log
  async logAction(log: Omit<AuditLog, 'id' | 'createdAt'>) {
    return await addDoc(collection(db, 'audit_logs'), {
      ...log,
      createdAt: new Date().toISOString()
    });
  },

  // Subscribe to recent logs (Admin only)
  subscribeLogs(callback: (logs: AuditLog[]) => void) {
    const q = query(
      collection(db, 'audit_logs'),
      orderBy('createdAt', 'desc'),
      limit(50)
    );
    
    return onSnapshot(q, (snapshot) => {
      const logs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as AuditLog[];
      callback(logs);
    });
  }
};
