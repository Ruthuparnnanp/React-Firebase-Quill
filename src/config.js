// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA7uekrmjoDD1jFFEdLytSnghEwfzbeu-w",
  authDomain: "cratry-c8019.firebaseapp.com",
  databaseURL: "https://cratry-c8019-default-rtdb.firebaseio.com",
  projectId: "cratry-c8019",
  storageBucket: "cratry-c8019.appspot.com",
  messagingSenderId: "272053031865",
  appId: "1:272053031865:web:22237183cba08a32985c68",
  measurementId: "G-Y0WLHJ5E0Y"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app)