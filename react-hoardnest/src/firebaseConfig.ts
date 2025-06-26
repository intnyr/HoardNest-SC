// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB37n5rKmqCgN4KlXjlyIr4ko1NF4MOvSs",
  authDomain: "hoardnest.firebaseapp.com",
  projectId: "hoardnest",
  storageBucket: "hoardnest.appspot.com",
  messagingSenderId: "9192272734",
  appId: "1:9192272734:web:8009e95b4ca9b4930955cf",
  measurementId: "G-1NYC04LDZL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
