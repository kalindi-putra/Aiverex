// Import the functions you need from the SDKs you need
import { initializeApp,getApps } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';



const firebaseConfig = {
  apiKey: "AIzaSyBWNG8awzo9zO9MWrLxatSLR-kNRg47Ar0",
  authDomain: "educate-5d670.firebaseapp.com",
  projectId: "educate-5d670",
  storageBucket: "educate-5d670.firebasestorage.app",
  messagingSenderId: "140333151569",
  appId: "1:140333151569:web:06af8e35ed779964fc0f70",
  measurementId: "G-VFQJHD8BP8"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

export const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
export const db = getFirestore (app);


const SignInWithGoogle = async (navigate) => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const { user } = result;

    // Check if it's the user's first time signing in with Google
    const userDocRef = doc(db, 'users', user.uid); // Store under 'users' collection
    const userDocSnapshot = await getDoc(userDocRef);

    if (userDocSnapshot.exists()) {
      // User already exists, navigate to the appropriate page based on role
      const userData = userDocSnapshot.data();
      if (userData.role === 'mentor') {
        navigate('/mentor-dashboard');
      } else {
        navigate('/student-dashboard');
      }
      console.log(user);
    } else {
      // User is signing in for the first time
      // Ask for the user's role (student or mentor)
      const userRole = prompt("Are you a student or a mentor? Please type 'student' or 'mentor'.").toLowerCase();

      // Validate the role input
      if (userRole !== 'student' && userRole !== 'mentor') {
        alert("Invalid role. Please sign up again with a valid role.");
        return;
      }

      const userData = {
        displayName: user.displayName,
        email: user.email,
        role: userRole, // Set the role based on user input
      };

      // Save user role data in Firestore
      await setDoc(userDocRef, userData);

      // Navigate to the correct dashboard based on role
      if (userRole === 'mentor') {
        navigate('/mentor-dashboard');
      } else {
        navigate('/student-dashboard');
      }

      console.log('First time sign in with Google. User role set as:', userRole);
      console.log(user);
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
    console.error("LinkedIn auth error:", error);
    throw error;
  }
};

// Add this new function to handle LinkedIn callback
export const handleLinkedInCallback = async (code, state) => {
  try {
    // Step 2: Exchange code for access token (this should be done on your backend)
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

    // Step 3: Sign in to Firebase with custom token
    const userCredential = await signInWithCustomToken(auth, data.customToken);
    const { user } = userCredential;

    // Step 4: Check/create user document in Firestore
    const userDocRef = doc(db, 'users', user.uid);
    const userDocSnapshot = await getDoc(userDocRef);

    if (!userDocSnapshot.exists()) {
      // Create new user document
      await setDoc(userDocRef, {
        displayName: data.linkedInProfile.displayName,
        email: data.linkedInProfile.email,
        role: state, // Use the state parameter we passed earlier
        provider: 'linkedin',
        createdAt: new Date().toISOString(),
      });
    }

    return user;
  } catch (error) {
    console.error("LinkedIn callback error:", error);
    throw error;
  }
};

export { SignInWithGoogle, SignInWithLinkedIn };
