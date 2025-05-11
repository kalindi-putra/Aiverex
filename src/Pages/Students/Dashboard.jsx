import React, { useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from '../../context/UserContext';
import { Layout, Typography, Row, Col, Affix } from 'antd';
import { CustDes } from '../../Components/Card';
const { Header, Footer, Content } = Layout;
import { Link, useNavigate } from 'react-router-dom';
import styles from './layout.module.css';
import { CourseList } from '../../store/data';
import { auth } from '../../firebase/Firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import Profile from './Profile';
import Education from './Education';
import TestScores from './TestScores';
import Certificates from './Certificates';
import SubmittedTests from './SubmittedTests';

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
  }
];

const eduArray = [
  {
    id: 1,
    title: 'School',
    name: 'Adithiya Vidyasharam',
    year: '2010-2018',
    grade: 'till 10th',
    marks: '69%'
  },
  {
    id: 2,
    title: 'Higher Studies',
    name: 'Slam Academy',
    year: '2018-2020',
    grade: 'till 12th',
    marks: '89%'
  },
  {
    id: 3,
    title: 'College',
    name: 'Panimalar College Of Eng',
    year: '2020-Present',
    grade: 'Final Year',
    marks: '8.0 cgpa'
  },
]

const Dashboard = () => {
  const [user, loading] = useAuthState(auth);
  const { userData } = useContext(AuthContext);
  const [visibleSection, setVisibleSection] = useState('profile');
  const [scrollDirection, setScrollDirection] = useState('down');
  const lastScrollTop = useRef(0);
  const [modal, setModal] = useState(false);
  const [scrWidth, setScrWidth] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef(null);
  const navigate = useNavigate() ;

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

  return (
    <div className={styles['dashboardContainer']}>

      {/* Main Content */}
      <div className={styles['scrollSection']} ref={scrollContainerRef}>
        {/* Profile Section */}
        <div id="profile-section">
          <Profile />
        </div>

        {/* Education Section */}
        <div id="education-section">
          <Education eduArray={eduArray} userData={userData} />
        </div>

        {/* Test Scores Section */}
        <div id="scores-section">
          <TestScores progress={progress} scrWidth={scrWidth} />
        </div>

        {/* Certificates Section */}
        <div id="certificates-section">
          <Certificates userData={userData} sampleCertificates={sampleCertificates} />
        </div>

        {/* Tests Section */}
        <div id="tests-section">
          <SubmittedTests />
        </div>

        {/* Courses Section */}
        <div id="courses-section" className={styles['scrollItem']}>
          <section className={styles['section']}>
            <Typography.Title level={2} style={{ color: '#fff', textAlign: 'center' }}>
              Try Taking this test
            </Typography.Title>
            <Row>
              {CourseList.slice(0, 4).map((course) => (
                <Col key={course.id} lg={6} md={8} sm={12}>
                  <CustDes content={course} type='test' />
                </Col>
              ))}
            </Row>
            <Typography.Title level={2} style={{ color: '#fff', textAlign: 'center' }}>
              <Link to='/courses' className="view">View More</Link>
            </Typography.Title>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;