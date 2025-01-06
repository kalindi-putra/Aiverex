import { useState,useEffect } from 'react'
import React, { useContext } from 'react';
import { AuthContext } from './context/UserContext';
import reactLogo from '/assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './Components/Navbar'
import { Dashboard } from './Pages/Students/Dashboard'
import { Route, BrowserRouter as Router, Routes,useLocation,createBrowserRouter } from "react-router-dom";
import {CustNav,MainNav} from './Components/CustNav'
import Courses from './Pages/Students/Courses'
import PostCode from './Pages/Students/PostCode/'
import StudentCodeReview from './Pages/Students/StudentsCodeReview'
import MentDashboard from './Pages/Mentors/Dashboard'
import SideMenu from './Components/SideMenu'
import Registration from './Pages/Auth/Register'
import StudentRegistration from './Pages/Auth/StudentRegistration'
import MentorRegistration from './Pages/Auth/MentorRegistration'
import Home from './Pages/Home2'
import MentLayout from './Pages/Mentors/MentLayout'
import {NavLinks} from './store/data'
import StudentLayout from './Pages/Students/StudentLayout'
import Main from './Components/Main'
import { ProblemPage,LeaderBoard,Editorial,Submission,Discussion,Review } from './Pages/Students/Problem/home';
import PageNotFound from './Components/404'
import TakeTest from './Pages/Students/TakeTest'
// import CoursePage from './Components/CoursePage'
import ProtectedRoute from './ProtectedRoute';
import { StudentItems,MentItems } from './store/data';
import GitHubExplorer from './Pages/Mentors/GithubExplorer';
import QuestionTemplate from './Components/QuestionTemplate';
import LoginPage from './Pages/Auth/Login';
import MentorLogin from './Pages/Auth/MentorLogin';
import StudentLogin from './Pages/Auth/StudentLogin';
import ErrorBoundary from './ErrorBoundary';
import ExamInstructionsPage from './Pages/Students/Instructions';


function App() {

  const { userData } = useContext(AuthContext);

  // Check if userData exists and retrieve the name
  const name = userData ? userData.name : '';
  const role = userData ? userData.role : '';
  const path = useLocation().pathname;
  console.log(path,role)
  return (
    <>
      {path !== '/' && <MainNav />}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/StudentLogin" element={<StudentLogin />} />
        <Route path="/MentorLogin" element={<MentorLogin />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/StudentRegister" element={<StudentRegistration />} />
        <Route path="/MentorRegister" element={<MentorRegistration />} />

        {/* Student Routes */}
        <Route path="/student" element={<ProtectedRoute role="student" element={<ErrorBoundary><Dashboard /></ErrorBoundary>} />}>
          
        </Route>

        {/* Other routes that do not need StudentLayout */}
        <Route path="student/dashboard" element={<Dashboard />} />
        <Route path="student/instructions" element={<ExamInstructionsPage/>}/>
        <Route path="student/courses" element={<Courses />} />
        <Route path="student/post/problem" element={<QuestionTemplate />} />
        <Route path="student/post/submission" element={<Submission />} />
        <Route path="student/post/leaderboard" element={<LeaderBoard />} />
        <Route path="student/post/discussion" element={<Discussion />} />
        <Route path="student/post/status" element={<Review />} />
        <Route path="student/review" element={<StudentCodeReview />} />
        <Route path="student/take-test" element={<TakeTest />} />
        <Route path="student/codeEditor" element={<QuestionTemplate />} />


        {/* Mentor Routes */}
        <Route path="/mentors" element={<ProtectedRoute role="mentor" element={<MentLayout />} />}>
          <Route path="dashboard" element={<MentDashboard />} />
          <Route path="gitreview" element={<GitHubExplorer />} />
        </Route>

        {/* Fallback Route */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  )
}

export default App
