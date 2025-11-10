




// src/firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAC8FM4brIppE6_Fz7zWVwK7ZmwGMg9d-E",
  authDomain: "portfolio-b1509.firebaseapp.com",
  projectId: "portfolio-b1509",
  databaseURL: "https://portfolio-b1509-default-rtdb.firebaseio.com", // ✅ important pour la Realtime DB
  storageBucket: "portfolio-b1509.appspot.com",
  messagingSenderId: "810882699073",
  appId: "1:810882699073:web:9fa7159208654f07145bc0",
  measurementId: "G-4X9B0K910J"
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export default app;