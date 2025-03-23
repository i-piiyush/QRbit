import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword 
} from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

// Your Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyArd29SUNXA4SXZn_nlC5Qwl2aOZZY4mCQ",
    authDomain: "qrbit-22e2c.firebaseapp.com",
    projectId: "qrbit-22e2c",
    storageBucket: "qrbit-22e2c.firebasestorage.app",
    messagingSenderId: "950931839233",
    appId: "1:950931839233:web:051b90bb3f2a2fd3546300",
    measurementId: "G-7511MHX20J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, createUserWithEmailAndPassword, signInWithEmailAndPassword, setDoc, doc };
