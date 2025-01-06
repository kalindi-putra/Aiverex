import React from 'react';
import './Instructions.css';
import { useNavigate } from 'react-router';

const ExamInstructionsPage = () => {
    const navigate = useNavigate();
    const handleFullScreen = () => {
        const element = document.documentElement; 
        if (element.requestFullscreen) {
          element.requestFullscreen(); 
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen();
        } else if (element.webkitRequestFullscreen) { 
          element.webkitRequestFullscreen();
        } else if (element.msRequestFullscreen) { 
          element.msRequestFullscreen();
        }
        navigate('/student/post/problem');
      };
  return (
    <div className="exam-instructions-page">
      {/* Header Section */}
      <div className="exam-header">
        <h1>Coding Examination</h1>
        <p>Instructions for the Examination</p>
      </div>
      
      <div className="exam-rules">
        <h2>Exam Rules</h2>
        <ul>
          <li>The examination will last for **30 minutes** only.</li>
          <li>Each question will be presented one by one. You will not be able to move to the next question until you complete the current one.</li>
          <li>Use **full-screen mode** for the coding environment for better focus and visibility.</li>
          <li>The page will **not reload** automatically. Avoid refreshing the page during the exam to prevent losing progress.</li>
          <li>Once the timer ends, your exam will be **automatically submitted**.</li>
        </ul>
      </div>
        
      <div className="exam-timing">
        <h2>Exam Timing</h2>
        <p>The exam will last for 30 minutes, and you will have one coding question at a time to solve.</p>
      </div>
        
      <div className="exam-format">
        <h2>Exam Format</h2>
        <ul>
          <li>You will be given a coding problem to solve. Focus entirely on solving it before moving to the next one.</li>
          <li>There are no time extensions; make sure to manage your time effectively.</li>
        </ul>
      </div>
      <div>
        <button className='start-test' onClick={()=>handleFullScreen()}>Start Test</button>
      </div>
    </div>
  );
};

export default ExamInstructionsPage;
