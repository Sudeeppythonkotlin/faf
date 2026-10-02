// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCUV40-Gzk4lW6nKpKVkQZTat1Gpa8SqX4",
  authDomain: "f-a-f-2026.firebaseapp.com",
  projectId: "f-a-f-2026",
  storageBucket: "f-a-f-2026.firebasestorage.app",
  messagingSenderId: "423203553552",
  appId: "1:423203553552:web:7eb3172813f16cb0102595",
  measurementId: "G-1GKYXGP891"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
