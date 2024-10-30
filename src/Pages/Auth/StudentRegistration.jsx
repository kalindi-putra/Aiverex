import React from 'react'
import styles from "./Auth.module.css"
import { Form,Input,Button } from 'antd';
import { Link } from 'react-router-dom';
import {GoogleCircleFilled,IdcardOutlined,UserOutlined } from "@ant-design/icons"
import { useState } from 'react';
// import '../Registration.css';
import { doc, setDoc } from 'firebase/firestore';
import { auth, SignInWithGoogle } from '../../firebase/Firebase'; // Import Firebase authentication module
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { db } from '../../firebase/Firebase';

function Student() {
  const [registerEmail, setRegisterEmail] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [name, setName] = useState('');
    const [role] = useState('student'); // Set the role as 'student' by default
    const [college, setCollege] = useState('');
    const [experience, setExperience] = useState('');
    const [resumeLink, setResumeLink] = useState('');
    const [githubLink, setGithubLink] = useState('');

    const navigate = useNavigate();
  
    const register = async () => {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
        const { user } = userCredential;
        console.log(user);
        
  
        // Store user's data in Firestore
        const userDocRef = doc(db, 'users', user.uid);
        await setDoc(userDocRef, {
          name,
          role,
          college,
          experience,
          resumeLink,
          githubLink,
          // courses,
        });
  
            // Redirect the user to their respective dashboard based on the role
      if (role) {
        navigate('/login')
      }
  
        // Success: Registration and data storage complete
        console.log('User registered successfully!');
      } catch (error) {
        console.log(error.message);
      }
    };

  return (
    <div className={styles['AuthDiv']} >
        <div className={`${styles["register-box"]} ${styles['hveImg']}`}>
        <div className={styles['imgDiv']} >
              <img src="https://sb-ui-kit-pro.startbootstrap.com/assets/img/illustrations/creativity.svg" alt="" />
            </div>
            <div className={styles['formDiv']}>
            <h2>Student Registration</h2>
      <Form className={styles['form']} autoComplete='off'>

             <Form.Item  name="username"
             rules={[
              {
                required: true,
                message: 'Please input your username!',
              },
            ]}
             >
                 <Input placeholder='User Name' className={styles['ip']} prefix={<UserOutlined/>} required
                 onChange={(e) => setName(e.target.value)}
                 ></Input>
             </Form.Item>
             <Form.Item  name="email"
             rules={[
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ]}
             >
                 <Input placeholder='Email Id' className={styles['ip']} prefix={<IdcardOutlined />} required 
                 onChange={(event) => {
                  setRegisterEmail(event.target.value);
                }}
                ></Input>
             </Form.Item>
             <Form.Item  name="password"
             rules={[
              {
                required: true,
                message: 'Please enter your unique password',
              },
            ]}
             >
                 <Input.Password placeholder='Password' className={styles['ip']} required
                 onChange={(event) => {
                  setRegisterPassword(event.target.value);
              }}
              ></Input.Password>
             </Form.Item>
             <Form.Item  name="cpassword"
              dependencies={['password']}
              rules={[
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('The new password that you entered do not match!'));
                  },
                }),
              ]}
             >
                 <Input.Password placeholder='Confirm Password' className={styles['ip']} required></Input.Password>
             </Form.Item>
             <Form.Item >
                 <Button className={styles['form-btn']}
                 onClick={register}>Register</Button>
             </Form.Item>
             <p className={styles["para-2"]}>
              Already Have An Account? <Link className={styles['redirect']} to="/login">Login</Link>
            </p>
            <p className={`${styles['para-2']} ${styles['or']}`}> 
              OR
            </p>
            <div className={styles['ggl']}>
              <a  className={styles["a4"]} 
              onClick={() => SignInWithGoogle(navigate)}
              >Sign in with Google</a>
            </div>
        </Form>
        </div>
    </div>
    
    </div>
  )
}

export default Student