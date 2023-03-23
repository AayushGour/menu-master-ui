// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBhjUW2aQy0WojGttmCqTdxnUhahqn27hY",
  authDomain: "restaurant-a841c.firebaseapp.com",
  databaseURL: "https://restaurant-a841c-default-rtdb.firebaseio.com",
  projectId: "restaurant-a841c",
  storageBucket: "restaurant-a841c.appspot.com",
  messagingSenderId: "1046160375531",
  appId: "1:1046160375531:web:3f0ec70d2b6e9f185c08ae",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
