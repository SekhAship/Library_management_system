import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAVW37W3yPGzpdBLgdZieVVIMDbzUX3za0",
  authDomain: "library-7e775.firebaseapp.com",
  projectId: "library-7e775",
  storageBucket: "library-7e775.firebasestorage.app",
  messagingSenderId: "74644157354",
  appId: "1:74644157354:web:caccbf58e8d11e79ec71d3",
  measurementId: "G-V69HZXZ4WX"
};

const app = initializeApp(firebaseConfig);

const fireDB = getFirestore(app);
const auth = getAuth(app);

export { fireDB, auth } 