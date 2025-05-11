import React, { useContext } from 'react';
import { Typography, Avatar, Button, Tag, Affix, Layout } from 'antd';
const { Header, Footer, Content } = Layout;
import { UserOutlined } from '@ant-design/icons';
import styles from './layout.module.css';
import { auth } from '../../firebase/Firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/UserContext';

const Profile = () => {
  const [user] = useAuthState(auth);
  const { userData } = useContext(AuthContext);
  const fullname = user?.displayName;
  const name = fullname?.split(' ')[0];
  const skills = [];

  return (
    <div className={styles['scrollItem']}>
      <section className={styles['section']}>
        <div className={styles['sectionContent']}>
          <div className={styles['header']} style={{ display: "flex", height: "180px", borderRadius: "20px", marginBottom: "25px" }}>
            <div className={styles['headerContent']}>
              <Typography.Title level={2} style={{ color: 'white', margin: 0, justifyContent: 'flex-start' }}>
                <p style={{ color: 'white', fontSize: '38px', fontWeight: 'bold' }}>Welcome back, {name} !</p>
                <p style={{ color: 'white', fontSize: '14px', fontWeight: 'normal', opacity: '0.6' }}>Learning isn't about getting it all right—it's about showing up and improving.</p>
              </Typography.Title>
            </div>
            <div style={{ justifyContent: 'flex-end' }}>
              <img src='/assets/welcome_img.png' alt="Welcome" style={{ width: '280px', height: '150px' }} />
            </div>
          </div>

          <div className={styles['profileGrid']}>
            {/* Profile Info */}
            <div className={styles['profileCard']}>
              {user?.photoURL ? (
                <img src={user.photoURL} alt="Profile" style={{ borderRadius: '50%', height: '25%', width: '25%' }} />
              ) : (
                <Avatar size={64} icon={<UserOutlined />} />
              )}
              <Typography.Title level={4} style={{ color: 'white', margin: '16px 0' }}>
                {user?.displayName}
              </Typography.Title>
              <Typography.Text style={{ color: '#ccc', fontSize: '24px' }}>
                {userData?.role || 'STUDENT'}
              </Typography.Text>
              <Button type="primary" onClick={() => auth.signOut()}>
                Sign out
              </Button>
            </div>

            {/* About */}
            <div className={styles['profileCard']}>
              <Typography.Title level={4} style={{ color: 'white' }}>
                About
              </Typography.Title>
              <Typography.Paragraph style={{ color: '#ccc' }}>
                {userData?.about || 'Add a brief description about yourself'}
              </Typography.Paragraph>
              <div style={{ paddingTop: '5px' }}>
                <Link to="https://google.com" style={{
                  marginRight: '10px',
                  backgroundColor: '#6B11DC',
                  padding: '5px 20px',
                  borderRadius: '5px',
                  textDecoration: 'none',
                  color: 'white'
                }}>Github</Link>
                <Link to="/link" style={{
                  marginRight: '10px',
                  backgroundColor: '#6B11DC',
                  padding: '5px 20px',
                  borderRadius: '5px',
                  textDecoration: 'none',
                  color: 'white'
                }}>Resume</Link>
              </div>
            </div>

            {/* Skills */}
            <div className={styles['profileCard']}>
              <Typography.Title level={4} style={{ color: 'white' }}>
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
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}>
                    <div style={{ width: '50px', height: '50px', overflow: 'hidden', borderRadius: '50%' }}>
                      <img
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQV73P_dxq7WW6judhHiZphAA2ogJW0hTQX6h_nHTVw4wIgfkGDl7sVmdN_sPdiPGUZobQ&usqp=CAU'
                        alt="No skills"
                      />
                    </div>
                    <p>No skills found</p>
                    <Link to="edit" style={{
                      backgroundColor: '#6B11DC',
                      padding: '5px 20px',
                      borderRadius: '5px',
                      textDecoration: 'none',
                      color: 'white'
                    }}>Add Skills</Link>
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
