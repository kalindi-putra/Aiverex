"use client";
import React, { useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from '../../../context/UserContext';
import { Layout, Typography, Row, Col, Affix , Tabs } from 'antd';
import { CustDes } from '../../../Components/Card';
const { Header, Footer, Content } = Layout;
import styles from '../layout.module.css';
import { auth } from '../../../firebase/Firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import Profile from '../../../Components/profile';
import TestScores from '../../../Components/testScores';
import Certificates from '../../../Components/certificates';
import SubmittedTests from '../../../Components/submittedTests';
import SideMenu from '../../../Components/SideMenu';
import { LandNav } from '@/Components/CustNav';

const progress = [
  {
    name: 'C',
    marks: 415,
    color: '#6B11DC',
  },
  {
    name: 'C++',
    marks: 330,
    color: '#6B11DC',
  },
  {
    name: 'Java',
    marks: 457,
    color: '#6B11DC',
  },
  {
    name: 'ReactJS',
    marks: 215,
    color: '#6B11DC',
  },
  {
    name: 'SpringBoot',
    marks: 390,
    color: '#6B11DC',
  },
  {
    name: 'Ruby',
    marks: 427,
    color: '#6B11DC',
  },
];




const Dashboard = () => {
  const [user, loading] = useAuthState(auth);
  const { userData } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState("certificates");
  const [scrWidth, setScrWidth] = useState(false);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const isMobileQuery = window.matchMedia('(max-width: 807px)');
      setScrWidth(isMobileQuery.matches);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const sectionRefs = {
    profile: useRef(null),
    education: useRef(null),
    certifications: useRef(null),
    scores: useRef(null),
    tests: useRef(null),
    courses: useRef(null)
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setSelectedKey(id);
    }
  };

  const fetchProgress = (userData) => {
    try {
      const progressArray = userData && userData.prog ? userData.prog : [];

      const progressObjects = progressArray.map((progressItem) => ({
        name: progressItem.name,
        marks: progressItem.marks,
        ps1: progressItem.ps1,
        ps2: progressItem.ps2,
        pstate1: progressItem.pstate1,
        pstate2: progressItem.pstate2,
      }));

      console.log('Progress fetched successfully:', progressObjects);
      return progressObjects;
    } catch (error) {
      console.error('Error fetching progress:', error);
      return [];
    }
  };

  // Call the fetchProgress function with the `userData` object
  const progressObjects = fetchProgress(userData);

  //----------------------------------------------------------

  const courselist = userData ? userData.courselist : '';


  const fetchCourse = (userData) => {
    try {
      // Retrieve the progress array from `userData`
      const colist = userData && userData.courselist ? userData.courselist : [];

      // Convert the progress array into an array of JavaScript objects
      const CourseObjects = colist.map((courseItem) => ({
        description: courseItem.description,
        id: courseItem.id,
        img: courseItem.img,
        name: courseItem.name,
        price: courseItem.price,

      }));

      console.log('Progress fetched successfully:', CourseObjects);
      return CourseObjects;
    } catch (error) {
      console.error('Error fetching progress:', error);
      return [];
    }
  };

  // Call the fetchProgress function with the `userData` object
  const CourseObjects = fetchCourse(userData);

  const items = [
    {
      key: "scores",
      label: (
        <span className={`${styles['dashBoardTabPane']} ${activeTab === "scores" ? styles.activeTab : ''}`}>
          Test Scores
        </span>
      ),
      children: <TestScores progress={progress} scrWidth={scrWidth} />,
    },
    {
      key: "tests",
      label: (
        <span className={`${styles['dashBoardTabPane']} ${activeTab === "tests" ? styles.activeTab : ''}`}>
          Tests
        </span>
      ),
      children: <SubmittedTests />,
    },
  ];

  return (
    <div>
      <div className={styles["dashboard-land-nav"]}>
        <LandNav />
      </div>
      <div className={styles['dashboardContainer']}>
        {/* Main Content */}
        <div className={styles['scrollSection']} ref={scrollContainerRef}>
          {/* Profile Section */}
          <div id="profile-section">
            <Profile />
          </div>

          <div>
            <Tabs
              className={`${styles['styledTabPane']} ${styles['ant-tabs-ink-bar']}`}
              defaultActiveKey="certificates"
              activeKey={activeTab}
              onChange={(key) => setActiveTab(key)}
              tabBarStyle={{ margin: '20px 60px 10px 80px', paddingLeft: '20px', marginTop: '30px' }}
              items={items}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;