import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDrPczdT3d1NlNaSsniSRAWFsduYs56GBg",
  authDomain: "zerion-ai.firebaseapp.com",
  projectId: "zerion-ai",
  storageBucket: "zerion-ai.firebasestorage.app",
  messagingSenderId: "388013317519",
  appId: "1:388013317519:web:330513b368b80c51c07ffa",
  measurementId: "G-GRNGBYXMK7"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
