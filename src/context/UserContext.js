"use client"
import React, { createContext, useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/Firebase';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  console.log("Auth provider:-",AuthContext);
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const checkUserAuthentication = async () => {
      auth.onAuthStateChanged(async (user) => {
        if (user) {
          setIsLoggedIn(true);

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
