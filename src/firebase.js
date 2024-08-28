// src/firebase.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getMessaging } from "firebase/messaging";

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
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
const db = getFirestore(app);
const messaging = getMessaging(app);

export { app, auth, storage, db, messaging };
