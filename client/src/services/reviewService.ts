import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  orderBy, 
  serverTimestamp,
  Timestamp,
  doc,
  updateDoc,
  deleteDoc,
  where
} from 'firebase/firestore';
import { db } from '../firebase/config';
import { storageService } from './storageService';

export interface Review {
  id?: string;
  userName: string;
  rating: number;
  comment: string;
  images: string[];
  createdAt: Timestamp | any;
  approved: boolean;
}

export const reviewService = {
  async getReviews(onlyApproved: boolean = true): Promise<Review[]> {
    const reviewsRef = collection(db, 'reviews');
    let q;
    
    if (onlyApproved) {
      q = query(reviewsRef, where('approved', '==', true), orderBy('createdAt', 'desc'));
    } else {
      q = query(reviewsRef, orderBy('createdAt', 'desc'));
    }
    
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Review));
  },

  async addReview(reviewData: Omit<Review, 'id' | 'createdAt' | 'approved'>, files: File[]): Promise<string> {
    const imageUrls: string[] = [];
    
    if (files && files.length > 0) {
      for (const file of files) {
        const url = await storageService.uploadFile(file, 'reviews');
        imageUrls.push(url);
      }
    }

    const review: Omit<Review, 'id'> = {
      ...reviewData,
      images: imageUrls,
      createdAt: serverTimestamp(),
      approved: false, // Default to false for moderation
    };

    const docRef = await addDoc(collection(db, 'reviews'), review);
    return docRef.id;
  },

  async updateReviewStatus(reviewId: string, approved: boolean): Promise<void> {
    const reviewRef = doc(db, 'reviews', reviewId);
    await updateDoc(reviewRef, { approved });
  },

  async deleteReview(reviewId: string): Promise<void> {
    const reviewRef = doc(db, 'reviews', reviewId);
    await deleteDoc(reviewRef);
  }
};
