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
  }
};
