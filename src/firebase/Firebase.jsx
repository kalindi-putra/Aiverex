// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';

const firebaseConfig = {
  apiKey: "AIzaSyDERqhaqBK90iLmM1Qj2DgcOw1d9lkx73s",
  authDomain: "avrex-auth-proj.firebaseapp.com",
  projectId: "avrex-auth-proj",
  storageBucket: "avrex-auth-proj.appspot.com",
  messagingSenderId: "974100450020",
  appId: "1:974100450020:web:17dfc809bb72797b88faf1",
  measurementId: "G-36DKRDF25M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export const db = getFirestore (app);
// Firebase configuration code...

const SignInWithGoogle = async (navigate) => {
  try {
    const result = await signInWithPopup(auth, provider);
    const { user } = result;

    // Check if it's the user's first time signing in with Google
    const userDocRef = doc(db, 'users', user.uid);
    const userDocSnapshot = await getDoc(userDocRef);
    if (userDocSnapshot.exists()) {
      // User already exists, navigate to the "post" page
      navigate('/home');
      console.log(user);
    } else {
      // User is signing in for the first time
      // Set user role as "student" by default
      const userData = {
        role: 'student',
      };
      // Save user role data in Firestore
      await setDoc(userDocRef, userData);

      // Navigate to the "post" page
      navigate('/home');

      // Console log the user data
      console.log('First time sign in with Google. User role set as "student".');
      console.log(user);
    }
  } catch (error) {
    console.log(error.message);
  }
};

export { SignInWithGoogle, };

