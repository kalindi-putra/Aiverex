import React, { useState } from 'react';
import { Card, Typography, Tabs, Button } from 'antd';
import { GoogleOutlined, LinkedinOutlined, UserOutlined } from '@ant-design/icons';
import styles from "./Auth.module.css";
import { SignInWithGoogle, SignInWithLinkedIn } from '../../firebase/Firebase';

const { TabPane } = Tabs;

function RegisterPage() {
  const [activeTab, setActiveTab] = useState('student');

  const handleGoogleSignUp = async (role) => {
    try {
      await SignInWithGoogle(role);
    } catch (error) {
      console.error("Unable to register:", error);
    }
  };

  const handleLinkedInSignUp = async () => {
    try {
      await SignInWithLinkedIn('mentor');
    } catch (error) {
      console.error("Unable to register with LinkedIn:", error);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <Typography.Title level={2} className={styles.loginTitle}>
        Create Account
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
                <UserOutlined /> Student Registration
              </span>
            }
            key="student"
          >
            <div className={styles.loginOptions}>
              <Button
                type="primary"
                icon={<GoogleOutlined />}
                onClick={() => handleGoogleSignUp('student')}
                className={styles.loginButton}
                block
              >
                Sign up with Google
              </Button>
            </div>
          </TabPane>

          <TabPane
            tab={
              <span className={styles.tabLabel}>
                <UserOutlined /> Mentor Registration
              </span>
            }
            key="mentor"
          >
            <div className={styles.loginOptions}>
              <Button
                type="primary"
                icon={<GoogleOutlined />}
                onClick={() => handleGoogleSignUp('mentor')}
                className={styles.loginButton}
                block
              >
                Sign up with Google
              </Button>
              <Button
                type="primary"
                icon={<LinkedinOutlined />}
                onClick={handleLinkedInSignUp}
                className={styles.loginButton}
                block
              >
                Sign up with LinkedIn
              </Button>
            </div>
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
}

export default RegisterPage;