import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

// Initialize Firebase
const firebaseConfig2 = {
  apiKey: "AIzaSyBOXNrjtfBw84vilFBbVwd8Tq1q7pGVJMY",
  authDomain: "myawsomeproject-20e9e-99b45.firebaseapp.com",
  projectId: "myawsomeproject-20e9e",
  storageBucket: "myawsomeproject-20e9e.appspot.com",
  messagingSenderId: "724841035203",
  appId: "1:724841035203:web:3c0f0e0388fd8d3a21f976",
  measurementId: "G-2ZRNSCPXPX",
};
const firebaseConfig = {
  apiKey: "AIzaSyBGeHqwYVlWqlQtjGvEW0cSJFXlCbrlijY",
  authDomain: "myawsomeproject-2.firebaseapp.com",
  projectId: "myawsomeproject-2",
  storageBucket: "myawsomeproject-2.appspot.com",
  messagingSenderId: "465854146431",
  appId: "1:465854146431:web:4f98840deda292b4f55c4a",
};

const app = initializeApp(firebaseConfig);
const app2 = initializeApp(firebaseConfig2, "myawsomeproject-2");
const db = getFirestore(app);
const db2 = getFirestore(app2);

export { db2, db, collection, addDoc };
