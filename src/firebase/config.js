// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDv_J1VJnKsYxXn4_WwBXIaBMPNfTD4ml0",
  authDomain: "oasisvillagewebsite.firebaseapp.com",
  projectId: "oasisvillagewebsite",
  storageBucket: "oasisvillagewebsite.firebasestorage.app",
  messagingSenderId: "191259827838",
  appId: "1:191259827838:web:4192d7d1015a0ecc5c822f",
  measurementId: "G-M6Y900C74H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics only on client side
let analytics = null;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

export { app, analytics }; 