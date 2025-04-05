// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// import the firestore service
import { getFirestore } from "firebase/firestore";

// import the Firebase auth service
import { getAuth } from "firebase/auth"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBxA3Jzoy6NsYtnrLjOtW28K-2PML2gb98",
  authDomain: "btp610-w9-data-persistence.firebaseapp.com",
  projectId: "btp610-w9-data-persistence",
  storageBucket: "btp610-w9-data-persistence.firebasestorage.app",
  messagingSenderId: "794778438520",
  appId: "1:794778438520:web:3925e0db725af819e1568d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// initialize Firestore (db) service
const db = getFirestore(app)

// initialize Firebase auth service
const auth = getAuth(app)

// export the Firestore service from this js file so other parts of your app can use it
export { db, auth }
