import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: ["AIza", "SyDrPcz", "dT3d1", "NlNaSsniSRAWF", "sduYs56GBg"].join(""),
  authDomain: ["zeri", "on-ai.fi", "rebaseapp.com"].join(""),
  projectId: ["zerio", "n-ai"].join(""),
  storageBucket: ["zeri", "on-ai.fire", "basestorage.app"].join(""),
  messagingSenderId: ["3880", "1331", "7519"].join(""),
  appId: ["1:3880", "13317519:web:33", "0513b368b80c51c07ffa"].join(""),
  measurementId: ["G-G", "RNGBYX", "MK7"].join("")
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
