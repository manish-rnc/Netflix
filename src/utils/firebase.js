// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAJ9vEFrVh8yK4xXkFRhvtBHEch-J7Q2xc",
  authDomain: "netflix-d3503.firebaseapp.com",
  projectId: "netflix-d3503",
  storageBucket: "netflix-d3503.appspot.com",
  messagingSenderId: "162994668401",
  appId: "1:162994668401:web:baf8768e3c221bf8b42cd0",
  measurementId: "G-3ED9EV30C4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
