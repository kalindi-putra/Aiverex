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
import {Login,CustLogin} from './Pages/Auth/Login'
import Registration from './Pages/Auth/Register'
import StudentRegistration from './Pages/Auth/StudentRegistration'
import MentorRegistration from './Pages/Auth/MentorRegistration'
import Home from './Pages/Home2'
import MentLayout from './Pages/Mentors/MentLayout'
import {NavLinks} from './store/data'
import StudentLayout from './Pages/Students/StudentLayout'
import Main from './Components/Main'
import { EditProfile, Notify } from './Components/Dummy'
import { ProblemPage,LeaderBoard,Editorial,Submission,Discussion,Review } from './Pages/Students/Problem/home';
import PageNotFound from './Components/404'
import TakeTest from './Pages/Students/TakeTest'
// import CoursePage from './Components/CoursePage'
import ProtectedRoute from './ProtectedRoute';
import { StudentItems,MentItems } from './store/data';
import GitHubExplorer from './Pages/Mentors/GithubExplorer';


function App() {

  const { userData } = useContext(AuthContext);

  // Check if userData exists and retrieve the name
  const name = userData ? userData.name : '';
  const role = userData ? userData.role : '';

  const path = useLocation().pathname;
  console.log(path,role)
  return (
    <>
    {/* {path!='/'&&<CustNav custLinks={NavLinks} left="5" right="7" dropDown="1" href="0" isLoggedIn="0" />} */}
    
      {path!='/'&&<MainNav />}
      <Routes>
      <Route path='/home'element={
      <Main items={role=='student'&&StudentItems||role=='mentor'&&MentItems}/>
      } >
          <Route path='' element={
            role=='student'&&<StudentLayout/>||
            role=='mentor'&&<MentLayout/>
          }></Route>
          <Route path='notify' element={<Notify />} />
          <Route path='edit' element={<EditProfile/>}/>
          <Route path='review' element={<GitHubExplorer/>}/>
        </Route>
        <Route path='/student' element={<>
        <Dashboard/>
        </>}></Route>
        <Route path='/courses' element={<>
          <Courses />
        </>} ></Route>
        <Route path='/post' element={<PostCode />}>
          <Route path='problem' element={<ProblemPage/>}></Route>
          <Route path='submission' element={<Submission/>}></Route>
          <Route path='leaderboard' element={<LeaderBoard/>}></Route>
          {/* <Route path='editorial' element={<Editorial/>}></Route> */}
          <Route path='discussion' element={<Discussion/>}></Route>
          <Route path='status' element={<Review/>}></Route>
        </Route>
        {/* <Route path='/take-test/contents' element={
          <CoursePage/>
        }></Route> */}
        <Route path='/take-test' element={<>
          <TakeTest/>
        </>}></Route>
        <Route path='/gitreview' element={<>
          <GitHubExplorer />
        </>}></Route>
        <Route path='/review' element={<>
          <StudentCodeReview />
        </>}></Route>
        {/* <Route path='/mentors' element={<div className='SideAndPage'>
          <SideMenu />
          <div className="PageContent">
          <MentDashboard />
          </div>
        </div>} /> */}
        <Route path='/mentors' element={<Main/>}
        >
          <Route path='' element={<MentLayout/>}></Route>
        <Route path='notify' element={<Notify />} />
        </Route>
        <Route path='/login' element={<>
        <Login/>
        </>}></Route>
        <Route path='/register' element={<>
          <Registration/>
        </>}></Route>
        <Route path='/StudentRegister' element={<>
          <StudentRegistration/>
        </>}></Route>
        <Route path='/MentorRegister' element={<>
          <MentorRegistration/>
        </>}></Route>
        <Route path='/' element={
          <Home/>
        }></Route>
        <Route path="*" element={
          <PageNotFound/>
        } />
      </Routes>
    </>
  )
}

export default App
