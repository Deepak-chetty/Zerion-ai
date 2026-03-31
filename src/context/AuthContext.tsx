import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';

// --- TYPES ---
export interface User {
  id: string;
  username: string;
  email: string;
  apiKeys: Record<string, string>;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (username: string, email: string, password: string, apiKeys: Record<string, string>) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  token: string | null;
  updateUser: (updatedUser: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  // Optional: add loading state to prevent flash, but kept simple to match existing style

  // Listen to Firebase Auth State Changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          // User logged in, fetch their custom data from Firestore
          const userDocRef = doc(db, 'users', firebaseUser.uid);
          const userDoc = await getDoc(userDocRef);
          
          if (userDoc.exists()) {
            const userData = userDoc.data() as Omit<User, 'id'>;
            setUser({ id: firebaseUser.uid, ...userData });
          } else {
            console.warn("Firestore user document missing! Falling back to basic Auth user object.");
            setUser({
              id: firebaseUser.uid,
              email: firebaseUser.email || '',
              username: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'User',
              apiKeys: {}
            });
          }
        } catch (e) {
          console.error("Critical Firestore Error during login: Check rules?", e);
          setUser({
            id: firebaseUser.uid,
            email: firebaseUser.email || '',
            username: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'User',
            apiKeys: {}
          });
        }
        
        const tk = await firebaseUser.getIdToken();
        setToken(tk);
      } else {
        // User logged out
        setUser(null);
        setToken(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      // Eagerly set user state to instantly update Navbar while Firestore catches up in the background
      setUser({
        id: userCredential.user.uid,
        email: email,
        username: email.split('@')[0],
        apiKeys: {}
      });
      return { success: true };
    } catch (err: any) {
      console.error("Login Error", err);
      // Clean up firebase specific error messages for the user UI
      let msg = "Invalid email or password.";
      if (err.code === "auth/invalid-credential") msg = "Incorrect password or account doesn't exist.";
      if (err.code === "auth/too-many-requests") msg = "Too many attempts. Try again later.";
      return { success: false, error: msg };
    }
  };

  const signup = async (username: string, email: string, password: string, apiKeys: Record<string, string>): Promise<{ success: boolean; error?: string }> => {
    try {
      // 1. Create account in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const newUid = userCredential.user.uid;

      // Eagerly set user state to instantly update Navbar
      setUser({
        id: newUid,
        email: email,
        username: username,
        apiKeys: apiKeys || {}
      });

      // 2. Save additional user metadata (username, apiKeys) to Firestore
      const newUserDoc = {
        username,
        email,
        apiKeys: apiKeys || {}
      };
      
      try {
        await setDoc(doc(db, 'users', newUid), newUserDoc);
      } catch (dbErr) {
        console.warn("Firestore save failed during signup! Make sure 'Firestore Database' is initialized in your Firebase Console.", dbErr);
        // Even if the Database save fails, their user account was securely created!
      }
      
      return { success: true };
    } catch (err: any) {
      console.error("Signup Error", err);
      let msg = err.message || "Signup failed.";
      if (err.code === "auth/email-already-in-use") msg = "This email is already taken.";
      if (err.code === "auth/weak-password") msg = "Password should be at least 6 characters.";
      if (err.code === "auth/operation-not-allowed") msg = "Failed! Did you enable 'Email/Password' Auth in Firebase Console?";
      return { success: false, error: msg };
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error("Logout Error", err);
    }
  };

  const updateUser = async (updatedUser: Partial<User>) => {
    if (!user) return;
    
    // Optimistic UI update
    const merge = { ...user, ...updatedUser };
    setUser(merge);
    
    // Save to Firestore
    try {
      const userDocRef = doc(db, 'users', user.id);
      
      const payload: any = { ...updatedUser };
      delete payload.id; // never update the ID field this way

      await updateDoc(userDocRef, payload);
    } catch (err) {
      console.error('Failed to update user in Firestore:', err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isAuthenticated: !!user, token, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
