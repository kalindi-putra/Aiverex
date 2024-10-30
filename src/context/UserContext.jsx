import React, { createContext, useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/Firebase';

// Create a context to hold the authentication data
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  // State variables to track the authentication status and user data
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const checkUserAuthentication = async () => {
      // Check if the user is already authenticated
      auth.onAuthStateChanged(async (user) => {
        if (user) {
          // If the user is authenticated, set isLoggedIn to true
          setIsLoggedIn(true);

          // Fetch the user's data from Firestore using their user ID
          const userDocRef = doc(db, 'users', user.uid);
          const userDocSnapshot = await getDoc(userDocRef);
          if (userDocSnapshot.exists()) {
            // If user data exists, update the userData state with the fetched data
            const userData = userDocSnapshot.data();
            setUserData(userData);
          }
        } else {
          // If the user is not authenticated, set isLoggedIn to false and clear user data
          setIsLoggedIn(false);
          setUserData(undefined);
        }
      });
    };

    // Call the authentication check function when the component mounts
    checkUserAuthentication();
  }, []);

  // Create the authentication context value with the relevant data
  const authContextValue = {
    isLoggedIn,
    userData,
  };

  // Provide the authentication context to the nested components
  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
