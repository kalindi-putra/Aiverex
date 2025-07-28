"use client";
import React, { useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from '../../../context/UserContext';
import { Layout, Typography, Row, Col, Affix , Tabs } from 'antd';
import { CustDes } from '../../../Components/Card';
import Link from 'next/link';
const { Header, Footer, Content } = Layout;
import styles from '../layout.module.css';
import { CourseList } from '../../store/data';
import { auth } from '../../../firebase/Firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import Profile from '../../../Components/profile';
import TestScores from '../../../Components/testScores';
import Certificates from '../../../Components/certificates';
import SubmittedTests from '../../../Components/submittedTests';
import SideMenu from '../../../Components/sideMenu';
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



// Add this mock data near your other mock data
const sampleCertificates = [
  {
    id: 1,
    title: 'React Development',
    issuer: 'Meta',
    date: 'March 2024',
    image: 'https://media.licdn.com/dms/image/v2/D4D22AQEwHguGYe8Cuw/feedshare-shrink_2048_1536/feedshare-shrink_2048_1536/0/1686231313965?e=2147483647&v=beta&t=jHLpvQa7zVybNNiS7mF3gtee77ndYAGeDOnywj0LdA8'
  },
  {
    id: 2,
    title: 'Angular Development',
    issuer: 'Google',
    date: 'February 2024',
    image: 'https://campus.w3schools.com/cdn/shop/files/certificate_of_completion_angularjs_professional_d94c03b2-215c-4863-9c95-c4d8494440b5_844x667.jpg?v=1710928752'
  },
  {
    id: 3,
    title: 'Vue',
    issuer: 'Facebook',
    date: 'January 2024',
    image: 'https://campus.w3schools.com/cdn/shop/files/certificate_of_completion_vue.js_professional_844x667.jpg?v=1711023352'
  },
  {
    id: 4,
    title: 'Vue',
    issuer: 'Facebook',
    date: 'January 2024',
    image: 'https://campus.w3schools.com/cdn/shop/files/certificate_of_completion_vue.js_professional_844x667.jpg?v=1711023352'
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
      // Retrieve the progress array from `userData`
      const progressArray = userData && userData.prog ? userData.prog : [];

      // Convert the progress array into an array of JavaScript objects
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
      key: "certificates",
      label: (
        <span className={`${styles['dashBoardTabPane']} ${activeTab === "certificates" ? styles.activeTab : ''}`}>
          Certificates
        </span>
      ),
      children: <Certificates userData={userData} sampleCertificates={sampleCertificates} />,
    },
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
    {
      key: "courses",
      label: (
        <span className={`${styles['dashBoardTabPane']} ${activeTab === "courses" ? styles.activeTab : ''}`}>
          Courses
        </span>
      ),
      children: (
        <div className={styles['scrollItem']}>
          <section className={styles['section']}>
            <Typography.Title level={3} style={{ color: '#fff' }}>
              Try Taking this test
            </Typography.Title>
            <Row>
              {CourseList.slice(0, 4).map((course) => (
                <Col key={course.id} lg={6} md={8} sm={12}>
                  <CustDes content={course} type="test" />
                </Col>
              ))}
            </Row>
            <Typography.Title level={2} style={{ color: `var(--progress-completed-color)`, textAlign: 'center' }}>
              <Link href="/student/courses" style={{ color: `var(--progress-completed-color)`, textAlign: 'center' }} className="view">View More</Link>
            </Typography.Title>
          </section>
        </div>
      ),
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