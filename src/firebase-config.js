import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyA7GxZqKUKmNtp_wX_2T97KmbtEATOHumw",
    authDomain: "blog-hive-05.firebaseapp.com",
    projectId: "blog-hive-05",
    storageBucket: "blog-hive-05.appspot.com",
    messagingSenderId: "134215353611",
    appId: "1:134215353611:web:16db0bd5ce0e8339cf4e0e",
    measurementId: "G-NV3HWSN0NL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Firebase Auth
export const auth = getAuth(app);
// Firebase database
export const db = getFirestore(app);
// Google Auth Provider
export const googleProvider = new GoogleAuthProvider();