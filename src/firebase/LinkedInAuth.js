import { 
    getAuth, 
    signInWithCustomToken,
    createUserWithEmailAndPassword
  } from 'firebase/auth';
  import { 
    doc, 
    setDoc, 
    getDoc, 
    getFirestore 
  } from 'firebase/firestore';
  import { initializeApp } from 'firebase/app';
  
  // Initialize Firebase (make sure this is done once in your app)
  const firebaseConfig = {
    // Your Firebase config object
  };
  
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);
  
  export const handleLinkedInAuth = async (linkedinCode) => {
    try {
      // First, exchange the LinkedIn code for user data using your server
      const response = await fetch('http://localhost:5000/api/auth/linkedin/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code: linkedinCode }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to exchange LinkedIn code');
      }
  
      const linkedInData = await response.json();
      
      // Check if user exists in Firebase
      const userQuery = await getDoc(doc(db, 'users', `linkedin_${linkedInData.id}`));
      
      if (!userQuery.exists()) {
        // Create new user in Firebase Auth
        const userCredential = await createLinkedInUser(linkedInData);
        
        // Store additional user data in Firestore
        await setDoc(doc(db, 'users', `linkedin_${linkedInData.id}`), {
          email: linkedInData.email,
          displayName: `${linkedInData.firstName} ${linkedInData.lastName}`,
          profilePicture: linkedInData.profilePicture,
          role: 'mentor',
          linkedInId: linkedInData.id,
          linkedInProfile: linkedInData.publicProfileUrl,
          createdAt: new Date().toISOString(),
          lastLogin: new Date().toISOString()
        });
  
        return userCredential.user;
      } else {
        // User exists, sign them in
        const customToken = await generateCustomToken(linkedInData.id);
        const userCredential = await signInWithCustomToken(auth, customToken);
        
        // Update last login
        await setDoc(doc(db, 'users', `linkedin_${linkedInData.id}`), {
          lastLogin: new Date().toISOString()
        }, { merge: true });
  
        return userCredential.user;
      }
    } catch (error) {
      console.error('LinkedIn auth error:', error);
      throw error;
    }
  };
  
  // Server-side code (Node.js/Express)
  const express = require('express');
  const admin = require('firebase-admin');
  const axios = require('axios');
  const router = express.Router();
  
  // Initialize Firebase Admin
  const serviceAccount = require('./path-to-your-service-account.json');
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
  
  router.post('/api/auth/linkedin/token', async (req, res) => {
    try {
      const { code } = req.body;
      
      // Exchange authorization code for access token
      const tokenResponse = await axios.post('https://www.linkedin.com/oauth/v2/accessToken', null, {
        params: {
          grant_type: 'authorization_code',
          code,
          client_id: process.env.LINKEDIN_CLIENT_ID,
          client_secret: process.env.LINKEDIN_CLIENT_SECRET,
          redirect_uri: process.env.LINKEDIN_REDIRECT_URI
        }
      });
  
      const accessToken = tokenResponse.data.access_token;
  
      // Get user profile data from LinkedIn
      const profileResponse = await axios.get('https://api.linkedin.com/v2/me', {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
        params: {
          projection: '(id,firstName,lastName,profilePicture(displayImage~:playableStreams))'
        }
      });
  
      // Get user email
      const emailResponse = await axios.get('https://api.linkedin.com/v2/emailAddress', {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
        params: {
          q: 'members',
          projection: '(elements*(handle~))'
        }
      });
  
      const profileData = profileResponse.data;
      const email = emailResponse.data.elements[0]['handle~'].emailAddress;
  
      // Generate Firebase custom token
      const firebaseToken = await admin.auth().createCustomToken(`linkedin_${profileData.id}`);
  
      // Return user data and token
      res.json({
        id: profileData.id,
        email,
        firstName: profileData.firstName.localized.en_US,
        lastName: profileData.lastName.localized.en_US,
        profilePicture: profileData.profilePicture?.['displayImage~']?.elements[0]?.identifiers[0]?.identifier,
        firebaseToken
      });
    } catch (error) {
      console.error('LinkedIn token exchange error:', error);
      res.status(500).json({ error: 'Failed to authenticate with LinkedIn' });
    }
  });
  
  async function generateCustomToken(linkedInId) {
    try {
      return await admin.auth().createCustomToken(`linkedin_${linkedInId}`);
    } catch (error) {
      console.error('Error generating custom token:', error);
      throw error;
    }
  }
  
  async function createLinkedInUser(userData) {
    try {
      // Create custom token
      const customToken = await generateCustomToken(userData.id);
      
      // Sign in with custom token
      return await signInWithCustomToken(auth, customToken);
    } catch (error) {
      console.error('Error creating LinkedIn user:', error);
      throw error;
    }
  }
  
  export default router;