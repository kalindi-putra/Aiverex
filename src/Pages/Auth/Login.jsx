import React, { useState } from 'react';
import { Card, Typography, Tabs, Button } from 'antd';
import { GoogleOutlined, LinkedinOutlined, UserOutlined } from '@ant-design/icons';
import styles from "./Auth.module.css";
import { SignInWithGoogle, SignInWithLinkedIn } from '../../firebase/Firebase';

const { TabPane } = Tabs;

function LoginPage() {
  const [activeTab, setActiveTab] = useState('student');

  const handleGoogleSignIn = async (role) => {
    try {
      await SignInWithGoogle(role);
    } catch (error) {
      console.error("Unable to login:", error);
    }
  };

  const handleLinkedInLogin = async () => {
    const clientId = '86wnlcu4aj8j46';
    const redirectUri = 'http://localhost:5173/mentor/auth/callback';
    const scope = 'r_liteprofile r_emailaddress';
    const linkedInAuthUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${scope}`;
    window.location.href = linkedInAuthUrl;
  };

  return (
    <div className={styles.loginContainer}>
      <Typography.Title level={2} className={styles.loginTitle}>
        Welcome Back
      </Typography.Title>

      <Card className={styles.loginCard}>
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          centered
          className={styles.loginTabs}
        >
          <TabPane
            tab={
              <span className={styles.tabLabel}>
                <UserOutlined /> Student Login
              </span>
            }
            key="student"
          >
            <div className={styles.loginOptions}>
              <Button
                type="primary"
                icon={<GoogleOutlined />}
                onClick={() => handleGoogleSignIn('student')}
                className={styles.loginButton}
                block
              >
                Continue with Google
              </Button>
            </div>
          </TabPane>

          <TabPane
            tab={
              <span className={styles.tabLabel}>
                <UserOutlined /> Mentor Login
              </span>
            }
            key="mentor"
          >
            <div className={styles.loginOptions}>
              <Button
                type="primary"
                icon={<GoogleOutlined />}
                onClick={() => handleGoogleSignIn('mentor')}
                className={styles.loginButton}
                block
              >
                Continue with Google
              </Button>
              <Button
                type="primary"
                icon={<LinkedinOutlined />}
                onClick={handleLinkedInLogin}
                className={styles.loginButton}
                block
              >
                Continue with LinkedIn
              </Button>
            </div>
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
}

export default LoginPage;