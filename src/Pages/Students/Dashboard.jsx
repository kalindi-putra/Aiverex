

import React, { useContext, useState, useEffect } from 'react';
import { Col, Row, Typography, Button, Input, Form } from 'antd';
import { CusCard, CustDes, Learn } from "../../Components/Card";
import CustLayout from './Layout';
import { AuthContext } from '/src/context/UserContext';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '/src/firebase/Firebase';
const CourseList = [
    {
        id: 1,
        name: 'React',
        img:'/assets/course.png',
        description: 'React is a JavaScript library for building user interfaces. It is maintained by Facebook and a community of individual developers and companies.',
        price: 5000,
        duration: '2 months',
    },
    {
        id: 2,
        name: 'Angular',
        img:'/assets/course2.png',
        description: 'Angular is a TypeScript-based open-source web application framework led by the Angular Team at Google and by a community of individuals and corporations.',
        price: 6000,
        duration: '2 months',
    },
    {
        id: 3,
        name: 'Vue',
        img:'/assets/course3.png',
        description: 'Vue.js is an open-source model–view–viewmodel front end JavaScript framework for building user interfaces and single-page applications.',
        price: 4000,
        duration: '2 months',
    },
    {
        id: 4,
        name: 'Vue',
        img:'/assets/course2.png',
        description: 'Vue.js is an open-source model–view–viewmodel front end JavaScript framework for building user interfaces and single-page applications.',
        price: 4000,
        duration: '2 months',
    },
    {
        id:5,
        name:'SQL',
        img:'/assets/course.png',
        description:'SQL is a domain-specific language used in programming and designed for managing data held in a relational database management system, or for stream processing in a relational data stream management system.',
        price:3000,
        duration:'2 months',
    },
    {
        id:6,
        name:'Python',
        img:'/assets/course3.png',
        description:'Python is an interpreted high-level general-purpose programming language. Python\'s design philosophy emphasizes code readability with its notable use of significant indentation.',
        price:3000,
        duration:'2 months',
    },
    {
        id:7,
        name:'Java',
        img:'/assets/course2.png',
        description:'Java is a class-based, object-oriented programming language that is designed to have as few implementation dependencies as possible.',
        price:3000,
        duration:'2 months',
    },
    {
        id:8,
        name:'C++',
        img:'/assets/course.png',
        description:'C++ is a general-purpose programming language created by Bjarne Stroustrup as an extension of the C programming language, or "C with Classes".',
        price:3000,
        duration:'2 months',
    },
    {
        id:9,
        name:'C',
        img:'/assets/course3.png',
        description:'C is a general-purpose, procedural computer programming language supporting structured programming, lexical variable scope, and recursion, with a static type system.',
        price:3000,
        duration:'2 months',
    },
    {
        id:10,
        name:'JavaScript',
        img:'/assets/course2.png',
        description:'JavaScript, often abbreviated as JS, is a programming language that conforms to the ECMAScript specification.',
        price:3000,
        duration:'2 months',
    },
]

const Dashboard = () => {
  const { userData, setUserData } = useContext(AuthContext);
  const [editing, setEditing] = useState(false);
  const [form] = Form.useForm();

  // Fetch updated user data from Firestore
  useEffect(() => {
    const fetchAdditionalUserData = async () => {
      if (userData && !userData.skills) {
        setEditing(true);
      }
    };

    fetchAdditionalUserData();
  }, [userData]);

  const saveDataToFirestore = async (values) => {
    const userDocRef = doc(db, 'users', auth.currentUser.uid);
    await setDoc(userDocRef, { ...userData, ...values }, { merge: true });
    setUserData((prev) => ({ ...prev, ...values }));
    setEditing(false);
  };

  return (
    <div style={{
      padding: '20px 40px',
      color: '#fff',
      background: '#262626',
      borderRadius: 30,
      margin: { lg: '30px 10px', sm: '0px' },
    }}>
      <center><h1>Student Dashboard</h1></center>
      
      <p>Welcome {userData ? userData.displayName : "Student"}!</p>
      <CustLayout />

      {/* Display user's data if available */}
      {userData && userData.skills ? (
        <div>
          <h2>Skills: {userData.skills}</h2>
          <h2>Education: {userData.education}</h2>
        </div>
      ) : (
        <div>
          <Button onClick={() => setEditing(true)}>Add Skills and Education</Button>
        </div>
      )}

      {/* Form for updating skills and education */}
      {editing && (
        <Form form={form} onFinish={saveDataToFirestore}>
          <Form.Item label="Skills" name="skills">
            <Input placeholder="Enter your skills" />
          </Form.Item>
          <Form.Item label="Education" name="education">
            <Input placeholder="Enter your education" />
          </Form.Item>
          <Button type="primary" htmlType="submit">Save</Button>
        </Form>
      )}
      
      <Typography.Title level={2} style={{ color: '#fff', textAlign: 'center' }}>
        Try Taking this test
      </Typography.Title>
      <Row>
        {CourseList.slice(0, 4).map((course) => (
          <Col lg={6} md={8} sm={12} key={course.id}>
            <CustDes content={course} type='test' />
          </Col>
        ))}
      </Row>

      <Typography.Title level={2} style={{ color: '#fff', textAlign: 'center' }}>
        <a className="view">View More</a>
      </Typography.Title>
    </div>
  );
};


export { Dashboard,CourseList};
