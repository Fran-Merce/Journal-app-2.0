// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyAuPNc-OZOByT_nEQb9VEwdgsj9SyL1jqg",
  authDomain: "journal-2-0.firebaseapp.com",
  projectId: "journal-2-0",
  storageBucket: "journal-2-0.appspot.com",
  messagingSenderId: "486126749894",
  appId: "1:486126749894:web:799bb1b750294a6e25efc7",
};

export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);
export const firebaseDB = getFirestore(firebaseApp);
