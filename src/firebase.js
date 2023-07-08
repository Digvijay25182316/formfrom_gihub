import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBOXNrjtfBw84vilFBbVwd8Tq1q7pGVJMY",
  authDomain: "myawsomeproject-20e9e-99b45.firebaseapp.com",
  projectId: "myawsomeproject-20e9e",
  storageBucket: "myawsomeproject-20e9e.appspot.com",
  messagingSenderId: "724841035203",
  appId: "1:724841035203:web:3c0f0e0388fd8d3a21f976",
  measurementId: "G-2ZRNSCPXPX",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, addDoc };
