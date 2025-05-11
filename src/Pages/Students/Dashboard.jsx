import React, { useContext, useState, useEffect } from 'react';
import { Col, Row, Typography, Button, Input, Form } from 'antd';
import { CusCard, CustDes, Learn } from "../../Components/Card";
import CustLayout from './Layout';
import { AuthContext } from '/src/context/UserContext';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db , auth } from '../../firebase/Firebase';
import { useNavigate } from 'react-router';

const CourseList = [
  {
    id: 1,
    name: 'C++',
    img: '/assets/course.png',
    description: 'C++ is a general-purpose programming language created by Bjarne Stroustrup. It is widely used for system/software development and game programming due to its performance and efficiency.',
    price: 5000,
    duration: '2 months',
  },
  {
    id: 2,
    name: 'Java',
    img: '/assets/course2.png',
    description: 'Java is a high-level, class-based, object-oriented programming language. It is designed to have as few implementation dependencies as possible, making it ideal for building cross-platform applications.',
    price: 6000,
    duration: '2 months',
  },
  {
    id: 3,
    name: 'Python',
    img: '/assets/course3.jpeg',
    description: 'Python is a widely used, high-level programming language known for its simplicity and readability. It is used for web development, data analysis, machine learning, and automation tasks.',
    price: 4000,
    duration: '2 months',
  }
];


const Dashboard = () => {
  const { userData, setUserData } = useContext(AuthContext);
  const [editing, setEditing] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [studentData, setStudentData] = useState(null);

  // Session timeout effect
  useEffect(() => {
    const timer = setTimeout(() => {
        alert('Please log in again. Session expired!');
        navigate('/login');
    }, 30 * 60 * 1000);

    return () => clearTimeout(timer);
  }, [navigate]);

  // Fetch student data effect
  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        if (!auth.currentUser) {
          navigate('/login');
          return;
        }

        const studentDocRef = doc(db, 'users', auth.currentUser.uid);
        const studentDoc = await getDoc(studentDocRef);
        
        if (studentDoc.exists()) {
          const data = studentDoc.data();
          console.log(data)
          setStudentData(data);
          setUserData(data); // Update context with fetched data
        } else {
          console.log('No student data found');
        }
      } catch (error) 
      {
        console.error('Error fetching student data:', error);
      } 
      finally {
        setLoading(false);
      }
    };

    fetchStudentData();
  }, [setUserData, navigate]);

  const saveDataToFirestore = async (values) => {
    try {
      const userDocRef = doc(db, 'users', auth.currentUser.uid);
      await setDoc(userDocRef, { 
        ...studentData,
        ...values,
        updatedAt: new Date().toISOString()
      }, { merge: true });
      
      setStudentData(prev => ({ ...prev, ...values }));
      setUserData(prev => ({ ...prev, ...values }));
      setEditing(false);
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '20px' }}>Loading...</div>;
  }

  return (
    <div style={{
      padding: '20px 40px',
      color: '#fff',
      background: '#262626',
      borderRadius: 30,
      margin: { lg: '30px 10px', sm: '0px' },
    }}>
      <center><h1>Student Dashboard</h1></center>
      
      <p>Welcome {studentData?.displayName || userData?.displayName || "Student"}!</p>
      <CustLayout />

      {/* Display student profile data */}
      <div style={{ marginBottom: '20px' }}>
        <h2>Profile Information</h2>
        <p>Email: {studentData?.email}</p>
        <p>Role: {studentData?.role}</p>
        <p>Join Date: {studentData?.createdAt && new Date(studentData.createdAt).toLocaleDateString()}</p>
      </div>

      {/* Display skills and education if available */}
      {(studentData?.skills || studentData?.education) ? (
        <div>
          <h2>Skills: {studentData.skills}</h2>
          <h2>Education: {studentData.education}</h2>
          <Button onClick={() => setEditing(true)}>Edit Information</Button>
        </div>
      ) : (
        <div style={{padding:'10px'}}>
          <Button onClick={() => setEditing(true)}>Add Skills and Education</Button>
        </div>
      )}

      {/* Rest of your existing code... */}
      {editing && (
        <div style={{paddingBottom:'20px'}}>
          <Form
            form={form}
            onFinish={saveDataToFirestore}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              maxWidth: '400px',
              margin: '0 auto',
              padding: '20px',
              backgroundColor: '#f9f9f9',
              borderRadius: '8px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            }}
          >
            <Form.Item label="Skills" name="skills" style={{ marginBottom: '15px' }}>
              <Input
                placeholder="Enter your skills"
                style={{
                  padding: '10px',
                  borderRadius: '4px',
                  border: '1px solid #ddd',
                }}
              />
            </Form.Item>

            <Form.Item label="Education" name="education" style={{ marginBottom: '20px' }}>
              <Input
                placeholder="Enter your education"
                style={{
                  padding: '10px',
                  borderRadius: '4px',
                  border: '1px solid #ddd',
                }}
              />
            </Form.Item>

            <Button
              type="primary"
              htmlType="submit"
            >
              Save
            </Button>
          </Form>
        </div>
      )}

      <Typography.Title level={2} style={{ color: '#fff', textAlign: 'center' }}>
        Try Taking this test
      </Typography.Title>
      <center>
        <div >
      <Row style={{display:'flex', justifyContent:'space-evenly'}}>
        {CourseList.slice(0, 4).map((course) => (
          <Col lg={6} md={8} sm={12} key={course.id}>
            <CustDes content={course} type='test' />
          </Col>
        ))}
      </Row>
      </div>
      </center>

      <Typography.Title level={2} style={{ color: '#fff', textAlign: 'center' }}>
        <a className="view">View More</a>
      </Typography.Title>
    </div>
  );
};


export { Dashboard,CourseList};
