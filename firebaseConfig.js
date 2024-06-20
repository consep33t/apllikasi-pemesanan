// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD3-Gr8pJ3xMREsGYXBsZyyPdzF1NxpZqg",
  authDomain: "stand-nasi-goreng.firebaseapp.com",
  projectId: "stand-nasi-goreng",
  storageBucket: "stand-nasi-goreng.appspot.com",
  messagingSenderId: "126935065084",
  appId: "1:126935065084:web:78775270a3fa3a8d721279",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
