import { useState, useEffect } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth, db } from '../firebase/config';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  role: 'admin' | 'manager' | 'user' | 'client';
  companyId?: string;
  adminApproved?: boolean;
}

const AUTHORIZED_ADMINS = [
  'singhmanohar6699@gmail.com',
  'singhnisha6356@gmail.com'
];


export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      
      if (firebaseUser) {
        // Fetch additional profile data from Firestore
        const docRef = doc(db, "users", firebaseUser.uid);
        const docSnap = await getDoc(docRef);
        
        const isAuthorizedAdmin = AUTHORIZED_ADMINS.includes(firebaseUser.email || '');

        if (docSnap.exists()) {
          const data = docSnap.data();
          setProfile({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName,
            ...data,
            // Force role to 'user' if not an authorized admin or not approved
            role: (isAuthorizedAdmin && data.adminApproved) ? 'admin' : 'user'
          } as UserProfile);
        } else {
          // Create default profile if not in Firestore
          const newProfile: UserProfile = {
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName,
            role: 'user',
            adminApproved: false
          };
          
          await setDoc(docRef, newProfile);
          setProfile(newProfile);
        }
      } else {
        setProfile(null);
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { user, profile, loading };
};

