// src/firebase.js
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyB7pP55qYm02DH4oVuWND23E-b52WHgxpg",
    authDomain: "dma-styles.firebaseapp.com",
    databaseURL: "https://dma-styles-default-rtdb.firebaseio.com",
    projectId: "dma-styles",
    storageBucket: "dma-styles.firebasestorage.app",
    messagingSenderId: "147135145729",
    appId: "1:147135145729:web:29e68359fe6b8be2451d00",
    measurementId: "G-WXS37Z4VYH",
};

// Prevent re-initializing Firebase if it’s already initialized
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getDatabase(app);
export const analytics = getAnalytics(app);
