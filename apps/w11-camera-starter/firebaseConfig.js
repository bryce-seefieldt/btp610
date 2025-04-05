import { initializeApp } from "firebase/app";

// TODO: Firebase storage import
import { getStorage } from "firebase/storage"


const firebaseConfig = {
    apiKey: "AIzaSyCoraicE8VelLV9ik5X49TeaLqkdeLaLfA",
    authDomain: "week08project-aa167.firebaseapp.com",
    projectId: "week08project-aa167",
    storageBucket: "week08project-aa167.appspot.com",
    messagingSenderId: "484166803174",
    appId: "1:484166803174:web:dc3058aeb68aa23de3a527"
};

const app = initializeApp(firebaseConfig)

// TODO: Initialize Firebase storage
const storage = getStorage(app)
// TODO: Export storage variable
export {storage}
