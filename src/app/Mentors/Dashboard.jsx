import React, { useEffect, useState } from 'react';
import { Layout, Typography, Statistic, Card, Space } from 'antd';
import { DollarCircleOutlined, BugFilled, UserOutlined } from '@ant-design/icons';
import { getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import Tabletop from '../../Components/MentTable';
import styles from './layout.module.css';

const { Title, Text } = Typography;

const Dashboard = () => {
  const [mentorName, setMentorName] = useState('Mentor');
  const firstName = mentorName.split(" ").at(0);
  const [photoURL, setPhotoURL] = useState(UserOutlined);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setMentorName(user.displayName || "Mentor");
        setPhotoURL(user.photoURL || UserOutlined);
        console.log(photoURL) ;
        console.log("User is authenticated:", user);
      } else {
        navigate('/login');
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // Replace this mock data with actual Firebase data fetching
    setTotalRevenue(12345);
    setTotalReviews(250);
  }, []);

    return (
        <div className={styles['dashboardContainer']}>
            <div className={styles['scrollSection']} style={{display:'flex'}}>
                <div id="profile-section" style={{ padding: '20px 60px' }}>
                    <Title level={2} style={{ color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <img src={photoURL} style={{ borderRadius: '50%' }} />
                        <Text style={{ color: 'white', fontSize: '24px', paddingTop:'15px' }} strong>{mentorName}</Text>
                        <p style={{ color: 'blue', fontSize: '18px', paddingTop:'5px', opacity:'0.7' }} strong>Mentor</p>
                    </Title>
                    <div style={{ display: 'flex', flexDirection: 'column', marginTop: 30 }}>
                        <Space size="large" wrap style={{ display: 'flex', flexDirection: 'column' }}>
                            <DashboardCard
                                icon={<DollarCircleOutlined style={iconStyle} />}
                                title={"Total Revenue"}
                                value={totalRevenue}
                            />
                            <DashboardCard
                                icon={<BugFilled style={iconStyle} />}
                                title={"Total Reviews"}
                                value={totalReviews}
                            />
                        </Space>
                    </div>
                </div>

                <div style={{ padding: '0 60px', width:'100%' }}>
                    <div style={{ background: 'linear-gradient(135deg,rgb(35, 35, 35) , #343434)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '130px', borderRadius: '20px', padding: '20px' }}>
                        <div style={{ paddingLeft: '70px', paddingTop: '50px' }}>
                            <Title level={2} style={{ color: 'white', margin: 0 }}>
                                Welcome back, {firstName}!
                            </Title>
                            <p style={{ color: 'white', fontSize: '14px', opacity: 0.6, paddingTop: '20px' }}>Mentoring isn’t about having all answers—it’s about guiding others while continuing to grow yourself</p>
                        </div>
                        <img src="/assets/mentorGreetImg.png" alt="Welcome" style={{ width: '200px', height: '130px' }} />
                    </div>
                    <Card style={{ marginTop: 30 , opacity:'0.8' }}>
                        <Title level={3}>Mentor Stats Summary</Title>
                        <Text>Total courses reviewed: {totalReviews}</Text>
                    </Card>

                    <div style={{ marginTop: 30 }}>
                        <Tabletop />
                    </div>
                </div>
            </div>
        </div>
    );
};

const iconStyle = {
  color: 'white',
  backgroundColor: '#6B11DC',
  borderRadius: 35,
  fontSize: 54,
  padding: 8,
};

function DashboardCard({ title, value, icon }) {
  return (
    <Card style={{ backgroundColor: '#343434', border: 'none' }}>
      <Space direction="horizontal" size="large">
        {icon}
        <Statistic
          title={<span style={{ color: 'white' }}>{title}</span>}
          value={value}
          valueStyle={{ color: 'white' }}
        />
      </Space>
    </Card>
  );
}

export default Dashboard;
