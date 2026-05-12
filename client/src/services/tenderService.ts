import { 
  collection, 
  addDoc, 
  onSnapshot, 
  query, 
  doc, 
  updateDoc, 
  deleteDoc,
  orderBy
} from 'firebase/firestore';
import { db } from '../firebase/config';

export interface Tender {
  id?: string;
  title: string;
  client: string;
  value: string;
  deadline: string;
  status: 'Draft' | 'Submitted' | 'Under Review' | 'Won' | 'Lost';
  fileUrl?: string;
  createdAt: any;
}

const COLLECTION_NAME = 'tenders';

export const tenderService = {
  // Create
  async submitTender(tender: Omit<Tender, 'id' | 'createdAt'>) {
    return await addDoc(collection(db, COLLECTION_NAME), {
      ...tender,
      createdAt: new Date().toISOString()
    });
  },

  // Read (Real-time)
  subscribeTenders(callback: (tenders: Tender[]) => void) {
    const q = query(collection(db, COLLECTION_NAME), orderBy('createdAt', 'desc'));
    return onSnapshot(q, (snapshot) => {
      const tenders = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Tender[];
      callback(tenders);
    });
  },

  // Update Status
  async updateTenderStatus(id: string, status: Tender['status']) {
    const docRef = doc(db, COLLECTION_NAME, id);
    return await updateDoc(docRef, { status });
  },

  // Delete
  async deleteTender(id: string) {
    const docRef = doc(db, COLLECTION_NAME, id);
    return await deleteDoc(docRef);
  }
};
