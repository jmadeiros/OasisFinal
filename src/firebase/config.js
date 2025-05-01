// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBihF8LlrOxP3f_-7G_w4ZP3Yk-UqAJOpU",
  authDomain: "village2-7a95d.firebaseapp.com",
  projectId: "village2-7a95d",
  storageBucket: "village2-7a95d.firebasestorage.app",
  messagingSenderId: "127494847818",
  appId: "1:127494847818:web:fd961c18dbdf72882955b3",
  measurementId: "G-13H2NKF491"
};

// Initialize Firebase
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0]; // if already initialized, use that one
}

const db = getFirestore(app);

export { app, db }; // Export db
// const analytics = getAnalytics(app); // Removed analytics for now as it wasn't used 