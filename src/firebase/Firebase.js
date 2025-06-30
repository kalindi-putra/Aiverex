/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import { initializeApp,getApps } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup , setPersistence,browserSessionPersistence } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyBWNG8awzo9zO9MWrLxatSLR-kNRg47Ar0",
  authDomain: "educate-5d670.firebaseapp.com",
  projectId: "educate-5d670",
  storageBucket: "educate-5d670.firebasestorage.app",
  messagingSenderId: "140333151569",
  appId: "1:140333151569:web:06af8e35ed779964fc0f70",
  measurementId: "G-VFQJHD8BP8"
};


const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];


export const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
export const db = getFirestore (app);



const handlePersistance=()=>{
    setPersistence(auth, browserSessionPersistence).
    then(() => {
      // Auth state changed
      return signInWithPopup(auth, googleProvider);
    })
    .then((_result) => {
      console.log("User signed in:");
    })
    .catch((_error) => {
      console.error("Login error:");
  })
    
  };



const SignInWithGoogle = async (navigate , role) => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const { user } = result;

    const userDocRef = doc(db, 'users', user.uid); // Store under 'users' collection
    const userDocSnapshot = await getDoc(userDocRef);

    if (userDocSnapshot.exists()) {
      const userData = userDocSnapshot.data();

      if(userData.role !== role){

        alert(`You are trying to log in as a ${role}, but your account is registered as a ${userData.role}. Please log in with the correct role.`);
        return;
      }

      if (userData.role === 'mentor') {
        navigate('/mentor/dashboard');
      } else {
        navigate('/student/dashboard');
      }
    } else {
      const userRole = prompt("Are you a student or a mentor? Please type 'student' or 'mentor'.").toLowerCase();

      if (userRole !== 'student' && userRole !== 'mentor') {
        alert("Invalid role. Please sign up again with a valid role.");
        return;
      }

      const userData = {
        displayName: user.displayName,
        email: user.email,
        role: userRole,
        provider: 'google',
        createdAt:new Date().toISOString() // Set the role based on user input
      };

      await setDoc(userDocRef, userData);

      if (userRole === 'mentor') {
        navigate('/mentor/dashboard');
      } else {
        navigate('/student/dashboard');
      }

      console.log('First time sign in with Google. User role set as:');
    }
  } catch (error) {
    console.log(error.message);
  }
};

const SignInWithLinkedIn = async (role) => {
  try {
    const clientId = '86wnlcu4aj8j46';
    const redirectUri = 'http://localhost:5173/mentor/auth/callback';
    const scope = 'r_liteprofile r_emailaddress';
    
    // Step 1: Redirect to LinkedIn OAuth
    const linkedInAuthUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${scope}&state=${role}`;
    window.location.href = linkedInAuthUrl;
  } catch (error) {
    console.error("LinkedIn auth error:");
    throw error;
  }
};

export const handleLinkedInCallback = async (code, state) => {
  try {
    const response = await fetch('http://localhost:5173/mentor/auth/callback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code, state }),
    });

    const data = await response.json();
    
    if (!data.customToken) {
      throw new Error('No custom token received');
    }

    const userCredential = await signInWithCustomToken(auth, data.customToken);
    const { user } = userCredential;


    const userDocRef = doc(db, 'users', user.uid);
    const userDocSnapshot = await getDoc(userDocRef);

    if (!userDocSnapshot.exists()) {
      await setDoc(userDocRef, {
        displayName: data.linkedInProfile.displayName,
        email: data.linkedInProfile.email,
        role: state, 
        provider: 'linkedin',
        createdAt: new Date().toISOString(),
      });
    }

    return user;
  } catch (error) {
    console.error("LinkedIn callback error:");
    throw error;
  }
};

export { SignInWithGoogle, SignInWithLinkedIn  , handlePersistance};
