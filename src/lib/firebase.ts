import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyD1S4fS2FskeF0UUc-TpmAqvE-woOUy3t8",
  authDomain: "my-portfolio-b3e28.firebaseapp.com",
  projectId: "my-portfolio-b3e28",
  storageBucket: "my-portfolio-b3e28.firebasestorage.app",
  messagingSenderId: "308158787194",
  appId: "1:308158787194:web:567bb53c2f5665cd5115c3",
  measurementId: "G-RTZCSZX26N"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);
