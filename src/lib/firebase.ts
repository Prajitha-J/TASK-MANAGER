
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your Firebase config (will be loaded from environment variables in production)
const firebaseConfig = {
  apiKey: "AIzaSyCtepAAmWvW5Z554a3tdDDAiVag3Sau_WM",
  authDomain: "task-manager-e55f7.firebaseapp.com",
  projectId: "task-manager-e55f7",
  storageBucket: "task-manager-e55f7.firebasestorage.app",
  messagingSenderId: "755110935733",
  appId: "1:755110935733:web:701ac173cf454b644092fc",
  measurementId: "G-9CZBY7QXV1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
