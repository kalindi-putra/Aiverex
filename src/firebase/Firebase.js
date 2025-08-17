"use client"
import { initializeApp,getApps } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup , setPersistence,browserSessionPersistence } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
import { sessionManager } from "@/app/sessionManager/page";

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



const SignInWithGoogle = async (navigate, role) => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const { user } = result;

    const userDocRef = doc(db, 'users', user.uid);
    const userDocSnapshot = await getDoc(userDocRef);

    if (userDocSnapshot.exists()) {
      const userData = userDocSnapshot.data();

      // Role validation
      if (userData.role !== role) {
        alert(`You are trying to log in as a ${role}, but your account is registered as a ${userData.role}. Please log in with the correct role.`);
        return;
      }

      // Enhanced user data with current session info
      const sessionUserData = {
        ...userData,
        uid: user.uid,
        email: user.email,
        lastLogin: new Date().toISOString()
      };

      // Set session
      sessionManager.setSession(sessionUserData);

      // Set cookie for middleware
      document.cookie = `session=${JSON.stringify({ 
        isLoggedIn: true, 
        uid: user.uid,
        role: userData.role 
      })}; path=/; max-age=${2 * 60 * 60}`; // 2 hours

      // Navigate based on role
      if (userData.role === 'mentor') {
        navigate.push('/mentor/dashboard');
      } else {
        navigate.push('/student/dashboard');
      }

    } else {
      // First time user
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
        createdAt: new Date().toISOString(),
        uid: user.uid,
        lastLogin: new Date().toISOString()
      };

      // Save to Firestore
      await setDoc(userDocRef, userData);

      // Set session for new user
      sessionManager.setSession(userData);

      // Set cookie for middleware
      document.cookie = `session=${JSON.stringify({ 
        isLoggedIn: true, 
        uid: user.uid,
        role: userRole 
      })}; path=/; max-age=${2 * 60 * 60}`; // 2 hours

      // Navigate based on role
      if (userRole === 'mentor') {
        navigate.push('/mentor/dashboard');
      } else {
        navigate.push('/student/dashboard');
      }

      console.log('First time sign in with Google. User role set as:', userRole);
    }

    return result; // Return the result for additional handling if needed

  } catch (error) {
    console.error("Google Sign In Error:", error);
    throw error; // Propagate error to be handled by calling function
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
