// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyApoC7z9h7qjCdJ6xmOSE0ivB_TgfYyTsQ",
  authDomain: "home-bilal-ba2e3.firebaseapp.com",
  projectId: "home-bilal-ba2e3",
  storageBucket: "home-bilal-ba2e3.firebasestorage.app",
  messagingSenderId: "252476394916",
  appId: "1:252476394916:web:bf7ed7da0ea590d1a6c531",
  measurementId: "G-JE2E3F8NGP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);

export default auth;