import { 
  collection, 
  query, 
  where, 
  onSnapshot, 
  doc, 
  updateDoc,
  getDocs
} from 'firebase/firestore';
import { db } from '../firebase/config';

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  role: string;
  adminApproved: boolean;
}

export const userService = {
  // Subscribe to all users (for admin management)
  subscribeUsers(callback: (users: UserProfile[]) => void) {
    const q = query(collection(db, 'users'));
    return onSnapshot(q, (snapshot) => {
      const users = snapshot.docs.map(doc => ({
        uid: doc.id,
        ...doc.data()
      })) as UserProfile[];
      callback(users);
    });
  },

  // Approve a user for admin role
  async approveAdmin(uid: string) {
    const docRef = doc(db, 'users', uid);
    return await updateDoc(docRef, {
      adminApproved: true,
      role: 'admin'
    });
  },

  // Revoke admin access
  async revokeAdmin(uid: string) {
    const docRef = doc(db, 'users', uid);
    return await updateDoc(docRef, {
      adminApproved: false,
      role: 'user'
    });
  },

  async requestAdminAccess(email: string, name: string) {
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: 'singhmanohar6699@gmail.com', // Sending to primary admin
        subject: `Admin Access Request: ${name}`,
        body: `
          <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
            <h2 style="color: #C89B3C;">Admin Access Request</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p>This user has requested administrative privileges in the Rudra Construction ERP.</p>
            <p>Please log in to approve them in the Staff Management section.</p>
          </div>
        `
      })
    });
    
    // Also send to the second admin
    await fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: 'singhnisha6356@gmail.com',
        subject: `Admin Access Request: ${name}`,
        body: `
          <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
            <h2 style="color: #C89B3C;">Admin Access Request</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p>This user has requested administrative privileges in the Rudra Construction ERP.</p>
            <p>Please log in to approve them in the Staff Management section.</p>
          </div>
        `
      })
    });

    return response.ok;
  }
};

