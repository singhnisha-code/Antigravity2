import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  where, 
  doc, 
  updateDoc, 
  deleteDoc,
  onSnapshot,
  orderBy
} from 'firebase/firestore';
import { db } from '../firebase/config';

export interface Project {
  id?: string;
  name: string;
  location: string;
  budget: string;
  deadline: string;
  status: 'Planning' | 'Execution' | 'Delayed' | 'Completed';
  progress: number;
  createdAt?: any;
}

const COLLECTION_NAME = 'projects';

export const projectService = {
  // Create
  async createProject(project: Omit<Project, 'id' | 'createdAt'>) {
    return await addDoc(collection(db, COLLECTION_NAME), {
      ...project,
      createdAt: new Date().toISOString()
    });
  },

  // Read (Real-time)
  subscribeProjects(callback: (projects: Project[]) => void) {
    const q = query(collection(db, COLLECTION_NAME), orderBy('createdAt', 'desc'));
    return onSnapshot(q, (snapshot) => {
      const projects = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Project[];
      callback(projects);
    });
  },

  // Update
  async updateProject(id: string, updates: Partial<Project>) {
    const docRef = doc(db, COLLECTION_NAME, id);
    return await updateDoc(docRef, updates);
  },

  // Delete
  async deleteProject(id: string) {
    const docRef = doc(db, COLLECTION_NAME, id);
    return await deleteDoc(docRef);
  }
};
