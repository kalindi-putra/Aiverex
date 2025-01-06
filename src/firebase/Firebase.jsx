// Import the functions you need from the SDKs you need
import { initializeApp,getApps } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD5_nj44L6jfA8riWoUJ5jw83z8dRVErXw",
  authDomain: "aivirex-educate-45bfb.firebaseapp.com",
  databaseURL: "https://aivirex-educate-45bfb-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "aivirex-educate-45bfb",
  storageBucket: "aivirex-educate-45bfb.firebasestorage.app",
  messagingSenderId: "658664554251",
  appId: "1:658664554251:web:c23496a25d2b528711ec0e"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

export const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export const db = getFirestore (app);

const SignInWithGoogle = async (navigate) => {
  try {
    const result = await signInWithPopup(auth, provider);
    const { user } = result;

    // Check if it's the user's first time signing in with Google
    const userDocRef = doc(db, 'users', user.uid);
    const userDocSnapshot = await getDoc(userDocRef);
    if (userDocSnapshot.exists()) {
      // User already exists, navigate to the "post" page
      navigate('/student');
      console.log(user);
    } else {
      // User is signing in for the first time
      // Set user role as "student" by default
      const userData = {
        displayName : user.displayName,
        email: user.email,
        role: 'student',
      };
      // Save user role data in Firestore
      await setDoc(userDocRef, userData);

      // Navigate to the "post" page
      navigate('/student');

      // Console log the user data
      console.log('First time sign in with Google. User role set as "student".');
      console.log(user);
    }
  } catch (error) {
    console.log(error.message);
  }
};

export { SignInWithGoogle};

