
import React, { createContext, useContext, useState, useEffect } from "react";
import { 
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";
import { auth, db } from "../lib/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

interface UserData {
  uid: string;
  email: string | null;
  name?: string;
  phone?: string;
  dob?: string;
  mode?: "student" | "employee" | "personal";
  profileComplete: boolean;
}

interface AuthContextType {
  currentUser: User | null;
  userData: UserData | null;
  loading: boolean;
  signUp: (email: string, password: string) => Promise<User>;
  signIn: (email: string, password: string) => Promise<User>;
  signInWithGoogle: () => Promise<User>;
  logout: () => Promise<void>;
  updateUserProfile: (data: Partial<UserData>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  async function signUp(email: string, password: string) {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    // Create user document with default values
    await setDoc(doc(db, "users", result.user.uid), {
      uid: result.user.uid,
      email: result.user.email,
      profileComplete: false,
      createdAt: new Date().toISOString()
    });
    return result.user;
  }

  async function signIn(email: string, password: string) {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return result.user;
  }

  async function signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    
    // Check if this is a new user
    const userDoc = await getDoc(doc(db, "users", result.user.uid));
    
    if (!userDoc.exists()) {
      // Create a new user document
      await setDoc(doc(db, "users", result.user.uid), {
        uid: result.user.uid,
        email: result.user.email,
        name: result.user.displayName || "",
        profileComplete: false,
        createdAt: new Date().toISOString()
      });
    }
    
    return result.user;
  }

  async function logout() {
    return signOut(auth);
  }

  async function updateUserProfile(data: Partial<UserData>) {
    if (!currentUser) throw new Error("No user is signed in");
    
    await setDoc(doc(db, "users", currentUser.uid), {
      ...userData,
      ...data
    }, { merge: true });
    
    // Update local state
    setUserData(prev => prev ? { ...prev, ...data } : null);
  }

  async function fetchUserData(user: User) {
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return docSnap.data() as UserData;
    }
    
    return null;
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      
      if (user) {
        const data = await fetchUserData(user);
        setUserData(data);
      } else {
        setUserData(null);
      }
      
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userData,
    loading,
    signUp,
    signIn,
    signInWithGoogle,
    logout,
    updateUserProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
