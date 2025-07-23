"use client";
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './postSubmission.module.css'; 

const PostSubmissionPage = () => {
  const router = useRouter();

  useEffect(() => {
        window.history.pushState(null, '', '/student/post-submission'); // Prevents back button from going to the test page directly
    window.addEventListener('popstate', function(event) {
      window.history.pushState(null, '', '/student/post-submission');
    });
  }, []);

  const handleGoHome = () => {
    router.push('/'); 
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Test Successfully Submitted!</h1>
      <p className={styles.message}>Thank you for completing the test.</p>
      <button onClick={handleGoHome} className={styles.homeButton}>
        Click here to go home
      </button>
    </div>
  );
};

export default PostSubmissionPage;