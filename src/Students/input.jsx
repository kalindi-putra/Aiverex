import React, { useState } from 'react';
import { db, auth } from '../../firebase/Firebase'; // Assuming this is the file where you have the Firebase configuration
import { getFirestore, doc, updateDoc } from 'firebase/firestore';

const SkillForm = () => {
  const [skills, setSkills] = useState('');


  
    const handleSubmit = async (e) => {
        e.preventDefault();
      
        const skillsArray = skills.split(',').map((skill) => skill.trim()); // Convert comma-separated string to an array
      
        // Get the user's UID from the Firebase auth
        const uid = auth.currentUser.uid;
      
        try {
          // Store the skills array in Firestore under the user's UID
          await updateDoc(doc(db, 'users', uid), { skills: skillsArray }); // Use updateDoc instead of setDoc
      
          console.log('Skills stored successfully');
        } catch (error) {
          console.error('Error storing skills:', error);
        }
      };
  


  return (
    <div>
      <h2>Enter Your Skills</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SkillForm;
