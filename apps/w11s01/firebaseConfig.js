// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// 1. import the firestore service
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA3tNHGmO6K-GfXOq4PaYgb0Jz_-uyrULY",
  authDomain: "w25project-e6fa1.firebaseapp.com",
  projectId: "w25project-e6fa1",
  storageBucket: "w25project-e6fa1.firebasestorage.app",
  messagingSenderId: "275921266199",
  appId: "1:275921266199:web:99621398efd48d7f9b1e52"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// 2. initialize Firestore service
const db = getFirestore(app)    //  initializing the database service
const auth = getAuth()        // initialize the authentication service

// 3. export the Firestore service from this js file so other parts of your app can use it
export { db , auth }