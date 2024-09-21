import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getAuth, GoogleAuthProvider} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyCcFdWHoWRLAoo0_oRz1r8YbOP1rUMgJsE",
  authDomain: "jt701-gcg.firebaseapp.com",  // jt701-gcg.firebaseapp.com
  projectId: "jt701-gcg",
  storageBucket: "jt701-gcg.appspot.com",
  messagingSenderId: "564141542377",
  appId: "1:564141542377:web:50a11d5cb11f4a2db5d978",
  measurementId: "G-8MPGES12X5"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const googleAuthProvider = new GoogleAuthProvider()

const auth = getAuth()

export {app, db, auth, googleAuthProvider}