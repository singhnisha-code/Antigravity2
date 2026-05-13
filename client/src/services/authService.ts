import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  signInWithPhoneNumber,
  RecaptchaVerifier,
  signInWithCustomToken,
  Auth
} from 'firebase/auth';
import { auth, db } from '../firebase/config';
import { doc, setDoc, getDoc, serverTimestamp, deleteDoc } from 'firebase/firestore';

export const authService = {
  // Google Login
  async signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    return await signInWithPopup(auth, provider);
  },

  // Phone OTP
  setupRecaptcha(containerId: string) {
    if (!(window as any).recaptchaVerifier) {
      (window as any).recaptchaVerifier = new RecaptchaVerifier(auth, containerId, {
        size: 'invisible',
        callback: () => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
        }
      });
    }
  },

  async sendPhoneOTP(phoneNumber: string) {
    const appVerifier = (window as any).recaptchaVerifier;
    return await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
  },

  async verifyPhoneOTP(confirmationResult: any, otp: string) {
    return await confirmationResult.confirm(otp);
  },

  // Email OTP (Custom Implementation using Firestore + Serverless Function)
  async sendEmailOTP(email: string) {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    // 1. Store OTP in Firestore (with expiration)
    await setDoc(doc(db, 'otp_verifications', email), {
      otp,
      createdAt: serverTimestamp(),
      expiresAt: Date.now() + 10 * 60 * 1000 // 10 minutes
    });

    // 2. Send Email via our serverless API
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: email,
        subject: 'Your Rudra ERP Login OTP',
        body: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px;">
            <h2 style="color: #C89B3C; text-align: center;">RUDRA CONSTRUCTION</h2>
            <p>Your One-Time Password (OTP) for logging into the ERP system is:</p>
            <div style="font-size: 32px; font-weight: bold; text-align: center; color: #0F172A; padding: 20px; background: #f8fafc; border-radius: 8px; letter-spacing: 5px;">
              ${otp}
            </div>
            <p style="color: #64748b; font-size: 12px; text-align: center; margin-top: 20px;">
              This OTP is valid for 10 minutes. If you did not request this, please ignore this email.
            </p>
          </div>
        `
      })
    });

    if (!response.ok) {
      throw new Error('Failed to send OTP email');
    }

    return true;
  },

  async verifyEmailOTP(email: string, otp: string) {
    const docRef = doc(db, 'otp_verifications', email);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      throw new Error('No OTP found or expired');
    }

    const data = docSnap.data();
    if (Date.now() > data.expiresAt) {
      await deleteDoc(docRef);
      throw new Error('OTP has expired');
    }

    if (data.otp !== otp) {
      throw new Error('Invalid OTP');
    }

    // Success - delete OTP
    await deleteDoc(docRef);
    
    // In a real system, you'd use signInWithCustomToken here if you had a backend.
    // For now, since this is a prototype, we can use a simpler approach or 
    // integrate with Firebase Auth properly if needed.
    // However, for this demo, we'll assume the client "authenticates" upon OTP success.
    // Note: This is NOT secure for production without server-side token generation.
    return true;
  }
};
