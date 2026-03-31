import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "zerion-ai.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "zerion-ai",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "zerion-ai.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "388013317519",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:388013317519:web:330513b368b80c51c07ffa",
  measurementId: "G-GRNGBYXMK7"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
