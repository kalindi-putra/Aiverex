import React, { useContext } from 'react';
import { AuthContext } from '../../context/UserContext';
import { Layout, Space, Typography, Row, Col, Avatar, Button, Tag } from 'antd';
import { CustDes } from '../../Components/Card';
const { Header, Footer, Sider, Content } = Layout;
import SideMenu from '../../Components/SideMenu';
import { Link } from 'react-router-dom';
import { FileProtectOutlined, DollarCircleOutlined, DollarCircleFilled, UsergroupAddOutlined, BugFilled, ScheduleOutlined, UserOutlined } from '@ant-design/icons'
import styles from './layout.module.css';
import Scores from './Scores';
import CustBadge from './CustBadge';
import CustTable from './Table';
import { useState, useEffect } from 'react';
import { tags, progress, CourseList, StudentItems } from '../../store/data'
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase/Firebase';
import { collection, addDoc } from 'firebase/firestore';
import { auth } from '../../firebase/Firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import CustTablee from './Table2';



const headerStyle = {
  color: '#fff',
  height: 'auto',
  background: '#242424',
  padding: 0,
  margin: 10,
  borderRadius: '30px',
};
const contentStyle = {
  textAlign: 'center',
  height: 'auto',
  color: '#fff',
  background: '#343434',
  margin: 10,
  borderRadius: '30px',
  overflow: 'hidden',
};
const siderStyle = {
  textAlign: 'center',
  color: '#fff',
  backgroundColor: 'transparent',
  padding: '0',
  margin: '0',
  position: 'sticky',
  bottom: 0,
  borderRadius: '30px',
};
const footerStyle = {
  height: 'auto',
  color: '#fff',
  backgroundColor: '#108ee9',
  background: '#343434',
  margin: 10,
  overflow: 'hidden',
  padding: 10,
  borderRadius: '30px',
}
let srcSize;
const StudentLayout = () => {
  const [user] = useAuthState(auth);

  const { userData } = useContext(AuthContext);

  // Check if userData exists and retrieve the name
  const name = userData ? userData.name : '';
  const role = userData ? userData.role : '';
  const skills = userData && userData.skills ? userData.skills : [];
  const collegename = userData ? userData.collegename : '';
  const collegeyear = userData ? userData.collegeyear : '';
  const collegedegree = userData ? userData.collegedegree : '';
  const highstudyname = userData ? userData.highstudyname : '';
  const highstudycourse = userData ? userData.highstudycourse : '';
  const schoolname = userData ? userData.schoolname : '';

  // Check if userData exists and retrieve the photoURL
  const photoURL = userData ? userData.photoURL : '';

  const prog = userData ? userData.prog : '';


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
  return (
    <>
      <Space direction="vertical" style={{ width: '100%' }} size={[0, 48]}>
        <Layout>
          <Typography.Title level={2} style={{ color: 'white', textAlign: 'center', padding: 0, margin: 0 }}>Student Dashboard</Typography.Title>

          <Footer style={footerStyle} className={styles['profile']} id="profile">
            <div className={styles['profileDiv']}>
              <Typography.Text  >Profile</Typography.Text>
              {user.photoURL ? (<img src={user.photoURL} alt="Profile" style={{ borderRadius: '60%' }} />) : (<Avatar size={64} icon={<UserOutlined />} />)}
              <span>{user.displayName}</span>
              <button onClick={() => auth.signOut()}>Sign out</button>
              <Typography.Title level={5} style={{ margin: 0 }} >{name}</Typography.Title>
              <div>
                <Button type="primary" style={{
                  marginRight: '10px',
                  backgroundColor: '#6B11DC',
                  padding: '0px 20px',
                  outline: 'none'
                }} >Edit</Button>
                <Button type="primary" style={{
                  marginRight: '10px',
                  backgroundColor: '#6B11DC',
                  padding: '0px 20px',
                  outline: 'none'
                }} >View</Button>
              </div>
            </div>
            <div className={styles['profileDiv']}>

              <Typography.Title level={4} style={{ color: '#fff', textAlign: 'left' }} >
                About
              </Typography.Title>
              <Typography.Paragraph ellipsis={{ rows: 4, expandable: false }}
                style={{
                  color: '#ccc',
                  textAlign: 'left'
                }}
                type='secondary'>
                {role}
              </Typography.Paragraph>


              <div style={{ paddingTop: '5px' }}>
                <Link to="https://google.com" style={{
                  marginRight: '10px',
                  backgroundColor: '#6B11DC',
                  padding: '5px 20px',
                  borderRadius: '5px',
                  textDecoration: 'none',
                  color: 'white'
                }} >Github</Link>
                <Link to="/link" style={{
                  marginRight: '10px',
                  backgroundColor: '#6B11DC',
                  padding: '5px 20px',
                  borderRadius: '5px',
                  textDecoration: 'none',
                  color: 'white'
                }} >Resume</Link>
              </div>
            </div>

            <div className={styles['profileDiv']}>
              <Typography.Title level={4} style={{ color: '#fff', textAlign: 'left', margin: 0 }} >
                Skills
              </Typography.Title>
              <div className={styles['tags']}>
                {skills.length > 0 ? (
                  skills.map((tag, i) => {
                    let color = i % 2 === 0 ? 'geekblue' : 'green';
                    return (
                      <Tag color={color} key={tag} style={{ fontSize: '1.1rem' }}>
                        {tag}
                      </Tag>
                    );
                  })
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }} >
                    <div style={{ width: '50px', height: '50px', overflow: 'hidden', borderRadius: '50%' }}>
                      <img style={{ width: '100%', height: '100%', objectFit: 'cover', }} src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQV73P_dxq7WW6judhHiZphAA2ogJW0hTQX6h_nHTVw4wIgfkGDl7sVmdN_sPdiPGUZobQ&usqp=CAU' />
                    </div>
                    <p>No skills found</p>
                    <Link to="edit" style={{
                      backgroundColor: '#6B11DC',
                      padding: '5px 20px 5px 20px',
                      borderRadius: '5px',
                      textDecoration: 'none',
                      color: 'white'
                    }} >Add Skills </Link>
                  </div>
                )}

              </div>
            </div>
          </Footer>
          <Footer style={footerStyle}>

            <div className={styles['edu']}>
              <Typography.Title level={4} className={styles['eduTitle']} >
                <FileProtectOutlined className={styles['eduIcon']} />Education</Typography.Title>
              {eduArray.length > 0 ? <ul className={styles["eduItems"]}>
                {
                  eduArray.map((edu) => {
                    return <li className={styles["eduList"]}>
                      <Typography.Title level={4} >{edu.title}</Typography.Title>
                      <Typography.Text className={styles["eduMed"]} >{edu.name}</Typography.Text>
                      {/*IIT Roorkee*/} {edu.year} {/*(2019-2022)*/}
                      <Typography.Text className={styles["eduCourse"]}> {edu.grade}{/*B.Tech Computer Science*/}</Typography.Text>
                    </li>
                  })
                }
              </ul> :
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }} >
                  <h6 >No Education Details Found</h6>
                  <Link to="edit" style={{
                    backgroundColor: '#6B11DC',
                    padding: '5px 10px 5px 10px',
                    borderRadius: '5px',
                    textDecoration: 'none',
                    color: 'white',
                    fontSize: '15px'
                  }} >Add Education Detail</Link>
                </div>
              }
              {/* {some works need to be done here whih include fetching of aray of student education details and this will be done after the form element } */}
            </div>

          </Footer>
          {progressObjects.length > 0 &&
            <Header style={headerStyle}>
              <div style={{
                background: '#343434',
                width: '100%',
                padding: 10,
                borderRadius: 30,
              }}>
                <Typography.Title level={4} style={{ color: '#fff', margin: '2px', textAlign: 'center' }}>Scores
                  <a className="view" style={{ float: 'right' }}>View More</a>
                </Typography.Title>
                (
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                }}>
                  {progressObjects.slice(0, 3).map((pro, i) => <Scores pro={pro} key={i} />)}
                </div>
                )
              </div>
            </Header>}
          <Footer style={footerStyle}>
            <Typography.Title level={4} style={{ color: '#fff', marginLeft:'10px'}} >Verified Skills
              
            </Typography.Title>
            {CourseObjects.length >0 ? 
            <div>
            <Row style={{ paddingTop: '10px', display: 'flex', flexWrap: 'wrap', width: '100%' }}>
              {CourseObjects.slice(0, 5).map((course) => (
                <Col style={{ margin: 5 }}>
                  <CustBadge content={course} />
                </Col>
              ))}
            </Row>
              {CourseObjects.length<5&&<center><a class="view">View More</a></center>}
            </div>
             : (
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap:5,
                padding:5
              }}>
                <div style={{ width: '50px', height: '50px', margin: '0px', overflow: 'hidden', borderRadius: '50%', }}>

                  <img style={{ width: '100%', height: '100%', objectFit: 'cover' }} src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQV73P_dxq7WW6judhHiZphAA2ogJW0hTQX6h_nHTVw4wIgfkGDl7sVmdN_sPdiPGUZobQ&usqp=CAU' alt="No skills found" />
                </div>

                <Link to="https://google.com" style={{
                  margin: '10px',
                  backgroundColor: '#6B11DC',
                  padding: '5px 10px 5px 10px',
                  borderRadius: '5px',
                  textDecoration: 'none',
                  color: 'white',
                  fontSize: '15px'
                }} >Add Skills</Link>

                <h6 >No Scores found</h6>

              </div>
            )

            }
          </Footer>
          <Content style={contentStyle}>

            <CustTablee />

          </Content>

          <Header style={headerStyle}>
            <Typography.Title level={2} style={{ color: '#fff', textAlign: 'center' }} >Try Taking this test<br />
            </Typography.Title>
            <Row>
              {CourseList.slice(0, 4).map((course) => (
                <Col lg={6} md={8} sm={12}>
                  <CustDes content={course} type='test' />
                </Col>
              ))}
            </Row>
            <Typography.Title level={2} style={{ color: '#fff', textAlign: 'center' }} >
              <a class="view">View More</a>
            </Typography.Title>
          </Header>
        </Layout>
      </Space>
    </>
  );
}

export default StudentLayout;