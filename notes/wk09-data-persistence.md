#BTP610 - Week 9 - Data Persistence


## Install Starter Code

`btp610\apps\w09-firebase-starter`

Install dependencies


npm install

Run application, check that you have screens like this:


## Using GoogleFirebase
Configure your Firebase Project


To configure your firebase project:

- Decide what firebase services do you want to include in your mobile application?
- Answer: Cloud Firestore, and later on Firebase Authentication


After you decide which FB services to use, you have to add it to the project


How to Add Firestore to the Project
In the Project Overview page, click Build > Firestore Database
```powershell
npm install firebase
```

```javascript
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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

```


