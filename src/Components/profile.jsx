"use client" ;
import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Typography, Avatar, Button, Tag } from 'antd';
import { UserOutlined, MailOutlined, PhoneOutlined, EnvironmentOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { auth } from '../firebase/Firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import Education from './education';
import { AuthContext } from '../context/UserContext';
import AOS from 'aos';
import 'aos/dist/aos.css';
import styles from '../app/student/layout.module.css';

const { Title, Paragraph, Text } = Typography;

const Profile = () => {
  const router = useRouter(); 
  const [user] = useAuthState(auth);
  const { userData } = useContext(AuthContext);
  const fullname = user?.displayName || 'User';
  const name = user?.displayName?.split(' ')[0] || 'User';
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    if (userData?.skills) {
      const trimmedSkills = userData.skills.length > 6
        ? userData.skills.slice(0, 6)
        : userData.skills;

      setSkills(trimmedSkills);
    }
  }, [userData?.skills]);

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

  useEffect(() => {
    AOS.init({ duration: 300, once: true });
  }, []);

  return (
    <div className={styles.scrollItem}>
      <section>
        <div className={`${styles.sectionContent} ${styles.gridParent}`} style={{display:'flex'}}>
          <div className={styles['gradientBorderRight']} style={{display:'flex' , flexDirection:'column' , width:'40%'}}>
          {/* Profile Picture & Name */}
            <div className={`${styles["gridlayout-userprofile"]} ${styles.profileCard}`} data-aos="zoom-in-right">
              <div >
                <EditOutlined
                 className={styles['overIconEffect']}
                  style={{
                    position: 'absolute',
                    marginTop:'15px',
                    marginRight:'10px',
                    top: 0,
                    right: 0,
                    fontSize: '18px',
                    cursor: 'pointer',
                    padding: '8px',
                  }}
                  onClick={() => router.push('/student/edit-profile')}/>
                 <div style={{ display: 'flex', justifyContent:'space-between' , gap:'25px'}}>
                  {
                    user?.photoURL ? (
                      <img src={user.photoURL} alt="Profile" style={{ borderRadius: '50%', height: 80, width: 80 }} />
                    ) : (
                      <Avatar size={64} icon={<UserOutlined />} />
                    )}
                  <Title level={4} style={{ color: 'white', marginTop: 16 }}>{fullname}</Title>
                </div>
              </div>
            </div>

          {/* Personal Information */}
            <div className={`${styles.profileCard}`} style={{ textAlign: 'left' }}>
              <Title level={4} style={{ color: 'white', marginBottom:'30px' }}>Personal Information</Title>
              <Paragraph style={{ color: user?.email === undefined ? '#707070' : 'white' , display: 'flex', gap: '15px', }}>
                <MailOutlined style={{color: user?.email === undefined ? '#707070' : 'white'}} /> {user?.email || 'Add email'}
              </Paragraph>
              <Paragraph style={{ color: user?.phone === undefined ? '#707070' : 'white', display: 'flex' , gap:'15px' }}>
                <PhoneOutlined style={{color: user?.phone === undefined ? '#707070' : 'white'}} /> {userData?.phone || 'Add phone number'}
              </Paragraph>
              <Paragraph style={{ color: user?.location === undefined ? '#707070' : 'white', display: 'flex' , gap:'15px' }}>
                <EnvironmentOutlined style={{color: user?.location === undefined ? '#707070' : 'white'}} /> {userData?.location || 'Add location'}
              </Paragraph>
            </div>
          {/* Resume */}
            <div className={`${styles["gridlayout-resume"]} ${styles.profileCard}`}>
              <Title level={4} style={{ color: 'white', margin: 0, flexShrink: 0 , marginBottom:'25px'}}>Resume</Title>

              {userData?.resumeLink ? (
                <a
                  href={userData.resumeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#6B11DC', textDecoration: 'underline', flexGrow: 1 }}
                >
                  View Resume
                </a>
              ) : (<div style={{display:'flex'}}>
                <span style={{ color: '#707070', flexGrow: 1 }}>Add your resume here</span>
                <Link
                  href="/link"
                  style={{
                    backgroundColor: '#6B11DC',
                    padding: '5px 10px',
                    borderRadius: '5px',
                    width:'80px',
                    textDecoration: 'none',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    flexShrink: 0,
                  }}
                >
                  <PlusOutlined style={{ color: 'white', paddingRight: '10px' }} />
                  Add
                </Link>
              </div>
              )}
            </div>
            {/* GitHub */}
            <div className={`${styles["gridlayout-github"]} ${styles.profileCard}`}>
              <Title level={4} style={{ color: 'white', margin: 0, flexShrink: 0, marginBottom: '25px' }}>GitHub</Title>

              {userData?.githubLink ? (
                <a
                  href={userData.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#6B11DC', textDecoration: 'underline', flexGrow: 1 }}
                >
                  View GitHub
                </a>
              ) : (
                <div style={{ display: 'flex' }}>
                  <span style={{ color: '#707070', flexGrow: 1 }}>Add your GitHub here</span>
                  <Link
                    href="/link"
                    style={{
                      backgroundColor: '#6B11DC',
                      padding: '5px 10px',
                      borderRadius: '5px',
                      width: '80px',
                      textDecoration: 'none',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <PlusOutlined style={{ color: 'white', paddingRight: '10px' }} />
                    Add
                  </Link>
                </div>
              )}
            </div>
          </div>

          <div  style={{display:'flex' , flexDirection:'column' , width:'100%' , marginLeft:'50px'}}>
          {/* Top Welcome Banner */}
          <div className={styles["gridlayout-welcome"]} style={{  background: 'linear-gradient(135deg,rgb(35, 35, 35) , #343434)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '180px', borderRadius: '20px', padding: '20px' }}>
            <div style={{paddingLeft:'70px' , paddingTop:'50px'}}>
              <Title level={2} style={{ color: 'white', margin: 0 }}>
                Welcome back, {name}!
              </Title>
              <p style={{ color: 'white', fontSize: '14px', opacity: 0.6 , paddingTop:'20px' }}>Learning isn't about getting it all right—it's about showing up and improving.</p>
            </div>
            <img src="/welcome_img.png" alt="Welcome" style={{ width: '280px', height: '150px' }} />
          </div>

            <div>
          <Education eduArray={eduArray} userData={userData} />
          </div>

          {/* Skills */}
          <div className={`${styles["gridlayout-skills"]} ${styles.profileCard}`} style={{marginTop:'20px'}}>
            <Title level={4} style={{ color: 'white' ,  marginBottom:'20px' }}>Skills</Title>
            <div style={{display:"flex"}}>
              {skills.length > 0 ? (
                skills.map((tag, i) => {
                  return (
                    <Tag color={"#343434"} key={tag} style={{ fontSize: '1.1rem',  padding:'8px'}}>
                      {tag}
                    </Tag>
                  );
                })
              ) : (
                <div style={{ display: 'flex' , gap:'300px'}}>
                      <div style={{display:"flex" , gap:'20px' , justifyContent:'center' , alignItems:'center'}} >
                        <div style={{ width: 50, height: 50, overflow: 'hidden', borderRadius: '50%' }}>
                          <img
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQV73P_dxq7WW6judhHiZphAA2ogJW0hTQX6h_nHTVw4wIgfkGDl7sVmdN_sPdiPGUZobQ&usqp=CAU"
                            alt="No skills"
                          />
                        </div>
                        <p>No skills found</p>
                      </div>
                  <Link href="/student/add_skill" style={{
                    height: '35px',
                    backgroundColor: '#6B11DC',
                    padding: '5px 20px',
                    borderRadius: '5px',
                    textDecoration: 'none',
                    color: 'white'
                  }}> <PlusOutlined style={{color:'white'}} /> Add Skills</Link>
                </div>
              )}
            </div>
          </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Profile;
