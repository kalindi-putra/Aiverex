import React from 'react'
import styles from "./Auth.module.css"
import { Form, Button } from 'antd';
import { InfoCircleOutlined, UserOutlined, IdcardOutlined, LinkOutlined, ContactsOutlined } from '@ant-design/icons';
import { Input, Tooltip } from 'antd';
import { GoogleCircleFilled, GithubOutlined } from "@ant-design/icons"
import { Link } from 'react-router-dom';
import { useState } from 'react';
// import '../Registration.css';
import { doc, setDoc } from 'firebase/firestore';
import { auth } from '../../firebase/Firebase'; // Import Firebase authentication module
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { db } from '../../firebase/Firebase';


function Registration() {
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [name, setName] = useState('');
  const [role] = useState('mentor'); // Set the role as 'mentor' by default
  const [company, setCompany] = useState('');
  const [experience, setExperience] = useState('');
  const [resumeLink, setResumeLink] = useState('');
  const [githubLink, setGithubLink] = useState('');

  const navigate = useNavigate();

  const register = async () => {
    const response = await fetch('http://localhost:5000/api/auth/mentor/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email: registerEmail,
        password: registerPassword,
        company: company,
        experience: experience,
        resumeLink: resumeLink,
        githubLink: githubLink
      }),
    });

    const result = await response.json();

    if (response.status === 201) {
      console.log(result.message);
      navigate(role === 'student' ? '/student' : '/mentors');
    } else {
      console.error(result.error);
    }
  };
    return (
        <div className={styles["AuthDiv"]} >
            <div className={`${styles["register-box"]} ${styles['hveImg']}`}>
                <div className={styles['imgDiv']}>
                    <img src="https://sb-ui-kit-pro.startbootstrap.com/assets/img/illustrations/creativity.svg" alt="" />
                </div>
                <div className={styles['formDiv']}>
                    <h2 >Mentor Registration</h2>
                    <Form className={styles['form']} hoverable autoComplete='off' >

                        <Form.Item name="username"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter your name!',
                                },
                            ]}
                        >
                            <Input placeholder='Name' className={styles["ip"]} prefix={<UserOutlined />} required
                            onChange={(e) => setName(e.target.value)}
                            ></Input>
                        </Form.Item>
                        <Form.Item name="company"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter your company name!',
                                },
                            ]}
                        >
                            <Input placeholder='Company' className={styles["ip"]} prefix={<ContactsOutlined />} required
                            onChange={(e) => setCompany(e.target.value)}
                            ></Input>
                        </Form.Item>
                        <Form.Item name="email" >
                            <Input placeholder='Email' className={styles["ip"]} prefix={<IdcardOutlined />} required
                            onChange={(event) => {
                                setRegisterEmail(event.target.value); }}
                            ></Input>
                        </Form.Item>
                        <Form.Item name="exp"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter your field of experience!',
                                },
                            ]}
                        >
                            <Input placeholder='Field of Experience' className={styles["ip"]} prefix={<InfoCircleOutlined />} required
                            onChange={(e) => setExperience(e.target.value)}
                                ></Input>
                        </Form.Item>
                        <Form.Item name="resume"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please provide your resume as link!',
                                },
                            ]}
                        >
                            <Input placeholder='Resume Link' className={styles["ip"]} prefix={<LinkOutlined />} required
                            onChange={(e) => setResumeLink(e.target.value)}
                            ></Input>
                        </Form.Item>
                        <Form.Item name="git"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please provide your github profile as link',
                                },
                            ]}
                        >
                            <Input placeholder='Github Link' className={styles["ip"]} prefix={<GithubOutlined />} require
                            onChange={(e) => setGithubLink(e.target.value)}
                            ></Input>
                        </Form.Item>
                        <Form.Item name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter your unique password!',
                                },
                            ]}
                        >
                            <Input.Password placeholder='Password' className={styles['ip']} required
                            onChange={(event) => {
                                setRegisterPassword(event.target.value);
                            }}
                            ></Input.Password>
                        </Form.Item>
                        <Form.Item >
                            <Button className={styles['form-btn']}
                            onClick={register}
                            >Register</Button>
                        </Form.Item>
                        <p className={styles["para-2"]}>
                            Already Have An Account? <Link className={styles['redirect']} to="/login">Login</Link>
                        </p>
                    </Form>
                </div>
            </div>


        </div>
    )
}

export default Registration
