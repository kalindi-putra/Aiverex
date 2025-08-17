"use client"
import React, { createContext, useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/Firebase';
import { sessionManager } from '@/app/sessionManager/page';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const checkUserAuthentication = async () => {
      // Check for existing session first
      const sessionUser = sessionManager.getSession();
      if (sessionUser) {
        setIsLoggedIn(true);
        setUserData(sessionUser);
        return;
      }

      auth.onAuthStateChanged(async (user) => {
        if (user) {
          try {
            const userDocRef = doc(db, 'users', user.uid);
            const userDocSnapshot = await getDoc(userDocRef);
            
            if (userDocSnapshot.exists()) {
              const userData = userDocSnapshot.data();
              // Set session data
              sessionManager.setSession(userData);
              setIsLoggedIn(true);
              setUserData(userData);
            }
          } catch (error) {
            console.error("Error fetching user data:", error);
            sessionManager.clearSession();
            setIsLoggedIn(false);
            setUserData(null);
          }
        } else {
          sessionManager.clearSession();
          setIsLoggedIn(false);
          setUserData(null);
        }
      });
    };

    checkUserAuthentication();

    // Clear session on window close
    const handleBeforeUnload = () => {
      sessionManager.clearSession();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

  const login = (user) => {
    sessionManager.setSession(user);
    setIsLoggedIn(true);
    setUserData(user);
  };

  const logout = async () => {
    try {
      await auth.signOut();
      sessionManager.clearSession();
      setIsLoggedIn(false);
      setUserData(null);
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const authContextValue = {
    isLoggedIn,
    userData,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
