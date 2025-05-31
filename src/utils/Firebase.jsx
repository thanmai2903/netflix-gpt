// firebase.js
import { initializeApp, getApps } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBJDvwLJGI1aki0NpuZw0TI198Dy94YFbk",
  authDomain: "netflixgpt-c277d.firebaseapp.com",
  projectId: "netflixgpt-c277d",
  storageBucket: "netflixgpt-c277d.firebasestorage.app",
  messagingSenderId: "957792100901",
  appId: "1:957792100901:web:648620ef70d9c09d5f95cc",
  measurementId: "G-PHEK1DEMCF",
};

// Prevent reinitialization in dev environments with HMR
const app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

if (typeof window !== "undefined") {
  getAnalytics(app);
}

export const auth = getAuth(app);
