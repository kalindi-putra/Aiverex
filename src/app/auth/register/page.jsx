"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Card, Typography, Tabs, Button, Form, Input, message
} from 'antd';
import {
  GoogleOutlined,
  LinkedinOutlined,
  UserOutlined,
  MailOutlined,
  LockOutlined
} from '@ant-design/icons';
import styles from '../Auth.module.css';
import { SignInWithGoogle, SignInWithLinkedIn } from '../../../firebase/Firebase';

const { TabPane } = Tabs;

function RegisterPage() {
  const [activeTab, setActiveTab] = useState('student');
  const [form] = Form.useForm();
  const navigate = useRouter();

  const handleRegister = async (values) => {
    const { name, email, password, confirmPassword } = values;

    if (password !== confirmPassword) {
      message.error("Passwords do not match");
      return;
    }

    try {
      console.log("Registering:", { ...values, role: activeTab });
      message.success("Registered successfully!");
      navigate.push('/');
    } catch (error) {
      console.error("Registration failed:", error);
      message.error("Unable to register");
    }
  };

  const renderForm = () => (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleRegister}
      className={styles.form}
    >
      <Form.Item
        name="name"
        rules={[{ required: true, message: 'Please enter your name' }]}
      >
        <Input prefix={<UserOutlined />} placeholder="Full Name" size="large" />
      </Form.Item>
      <Form.Item
        name="email"
        rules={[
          { required: true, message: 'Please enter your email' },
          { type: 'email', message: 'Invalid email address' }
        ]}
      >
        <Input prefix={<MailOutlined />} placeholder="Email" size="large" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please enter a password' }]}
      >
        <Input.Password prefix={<LockOutlined />} placeholder="Password" size="large" />
      </Form.Item>
      <Form.Item
        name="confirmPassword"
        rules={[{ required: true, message: 'Please confirm your password' }]}
      >
        <Input.Password prefix={<LockOutlined />} placeholder="Confirm Password" size="large" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className={styles.loginButton} block>
          Register
        </Button>
      </Form.Item>
    </Form>
  );

  const renderSocialButtons = () => (
    <>
      <div style={{ display: 'flex', alignItems: 'center', margin: '20px 0' }}>
        <hr style={{ flex: 1, border: 'none', borderTop: '1px solid #ccc' }} />
        <span style={{ margin: '0 10px', color: '#888' }}>Or sign up with</span>
        <hr style={{ flex: 1, border: 'none', borderTop: '1px solid #ccc' }} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: activeTab === 'mentor' ? '30px' : '0' }}>
        <Button
          shape="circle"
          size="large"
          icon={<GoogleOutlined style={{ fontSize: 28, color: 'white' }} />}
          className={styles.googleButton}
          onClick={() => SignInWithGoogle(activeTab)}
        />
        {activeTab === 'mentor' && (
          <Button
            size="large"
            shape="circle"
            icon={<LinkedinOutlined style={{ fontSize: 28, color: 'white' }} />}
            className={styles.linkedInButton}
            onClick={() => SignInWithLinkedIn('mentor')}
          />
        )}
      </div>
    </>
  );


  return (
    <div className={styles.loginContainer}>
      <Typography.Title level={2} className={styles.loginTitle} style={{color:'white' , display:'flex' , justifyContent:'center' , alignItems:'center'}}>
        Create Account
      </Typography.Title>

      <Card className={styles.loginCard}>
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          centered
          className={styles.loginTabs}
        >
          <TabPane tab={<span className={styles.tabLabel}><UserOutlined /> Student Registration</span>} key="student">
            <div className={styles.signUpSideContainerStudent}>
              <div className={styles.loginForm}>
                {renderForm()}
                {renderSocialButtons()}
              </div>
              <div className={styles.greetingContainerStudentRegister}>
                <div style={{ marginLeft: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <h2 style={{ marginBottom: '30px' }}>Already Have An Account?</h2>
                  <h4>Welcome Back!</h4>
                  <div>Welcome to Aivirex. Join and grow with us.</div>
                  <button
                    className={styles.loginRegisterToggleButton}
                    onClick={() => navigate.push("/auth/login")}
                  >
                    SignIn
                  </button>
                </div>
              </div>
            </div>
          </TabPane>

          <TabPane tab={<span className={styles.tabLabel}><UserOutlined /> Mentor Registration</span>} key="mentor">
            <div className={styles.signUpSideContainerMentor}>
              <div className={styles.greetingContainerMentorRegister}>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                  height: '100%',
                  paddingLeft: '40px',
                  boxSizing: 'border-box',
                  width: '100%'
                }}>
                  <h2 style={{ marginBottom: '30px' }}>Already Have An Account?</h2>
                  <h4>Welcome Back!</h4>
                  <div>Welcome to Aivirex. Join and grow with us.</div>
                  <button
                    className={styles.loginRegisterToggleButton}
                    onClick={() => navigate.push("/auth/login")}
                  >
                    SignIn
                  </button>
                </div>
              </div>
              <div className={styles.loginForm} style={{display:'flex' , justifyContent:'center' , alignItems:'center' , marginRight:'45px'}}>
                {renderForm()}
                {renderSocialButtons()}
              </div>
            </div>
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
}

export default RegisterPage;
