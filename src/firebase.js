// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD-S6mXSGSJT8BSqfsXYfPBHiuu8ZuN6ik",
  authDomain: "chatapp-6b154.firebaseapp.com",
  projectId: "chatapp-6b154",
  storageBucket: "chatapp-6b154.appspot.com",
  messagingSenderId: "224838760293",
  appId: "1:224838760293:web:762427ed2541fbb8cd138c",
  measurementId: "G-9MYKC2MRR0",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
