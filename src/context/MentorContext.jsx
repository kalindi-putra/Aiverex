import React, { createContext, useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/Firebase';

// Create a context with default values for mentor authentication
const MentorAuthContext = createContext({
  isMentor: false,
  isLoggedIn: false,
  mentorData: null,
  isLoading: true,
  error: null,
  mentorStatus: 'inactive' // Can be 'active', 'inactive', 'pending', 'suspended'
});

const MentorAuthProvider = ({ children }) => {
  const [isMentor, setIsMentor] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mentorData, setMentorData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mentorStatus, setMentorStatus] = useState('inactive');

  useEffect(() => {
    let unsubscribe;

    const initializeMentorAuth = async () => {
      try {
        unsubscribe = auth.onAuthStateChanged(async (user) => {
          try {
            if (user) {
              setIsLoggedIn(true);
              
              // Fetch mentor-specific data from Firestore
              const mentorDocRef = doc(db, 'mentors', user.uid);
              const mentorDocSnapshot = await getDoc(mentorDocRef);
              
              if (mentorDocSnapshot.exists()) {
                const mentorDocData = mentorDocSnapshot.data();
                setIsMentor(true);
                setMentorData(mentorDocData);
                setMentorStatus(mentorDocData.status || 'inactive');
                
                // Verify mentor's credentials and status
                await verifyMentorCredentials(mentorDocData);
              } else {
                // User is logged in but not a mentor
                setIsMentor(false);
                setMentorData(null);
                setMentorStatus('inactive');
                console.warn('User is not registered as a mentor');
              }
            } else {
              // Reset all states when logged out
              setIsLoggedIn(false);
              setIsMentor(false);
              setMentorData(null);
              setMentorStatus('inactive');
            }
          } catch (err) {
            console.error('Error processing mentor auth state:', err);
            setError(err.message);
          } finally {
            setIsLoading(false);
          }
        });
      } catch (err) {
        console.error('Error setting up mentor auth listener:', err);
        setError(err.message);
        setIsLoading(false);
      }
    };

    const verifyMentorCredentials = async (mentorData) => {
      try {
        // Check mentor's verification status
        if (!mentorData.isVerified) {
          setMentorStatus('pending');
          return;
        }

        // Check if mentor's account is suspended
        if (mentorData.isSuspended) {
          setMentorStatus('suspended');
          return;
        }

        // Check if mentor's credentials are expired
        const credentialsExpiry = new Date(mentorData.credentialsExpiry);
        if (credentialsExpiry < new Date()) {
          setMentorStatus('inactive');
          return;
        }

        // All checks passed, mentor is active
        setMentorStatus('active');
      } catch (err) {
        console.error('Error verifying mentor credentials:', err);
        setError(err.message);
        setMentorStatus('inactive');
      }
    };

    initializeMentorAuth();

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  // Helper function to check if mentor can perform certain actions
  const canPerformMentorActions = () => {
    return isMentor && mentorStatus === 'active' && isLoggedIn;
  };

  // Helper function to get mentor's current availability
  const getMentorAvailability = () => {
    if (!mentorData) return 'unavailable';
    return mentorData.availability || 'unavailable';
  };

  const mentorContextValue = {
    isMentor,
    isLoggedIn,
    mentorData,
    isLoading,
    error,
    mentorStatus,
    canPerformMentorActions,
    getMentorAvailability
  };

  return (
    <MentorAuthContext.Provider value={mentorContextValue}>
      {children}
    </MentorAuthContext.Provider>
  );
};

// Custom hook for easier context consumption
const useMentorAuth = () => {
  const context = React.useContext(MentorAuthContext);
  if (context === undefined) {
    throw new Error('useMentorAuth must be used within a MentorAuthProvider');
  }
  return context;
};

export { MentorAuthContext, MentorAuthProvider, useMentorAuth };