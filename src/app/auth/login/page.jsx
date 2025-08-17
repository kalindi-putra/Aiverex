"use client"
import { useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, Typography, Tabs, Button, Form, Input, message } from 'antd';
import { ReadOutlined, SolutionOutlined, GoogleOutlined, LinkedinOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
import styles from "../Auth.module.css";
import { SignInWithGoogle, auth,db } from '../../../firebase/Firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { AuthContext } from '../../../context/UserContext';
import { sessionManager } from '@/app/sessionManager/page';
import { doc, getDoc,setDoc } from 'firebase/firestore';

const { TabPane } = Tabs;

function Login() {
  const [activeTab, setActiveTab] = useState('student');
  const [form] = Form.useForm();
  const [error, setError] = useState('');
  const router = useRouter();
  const { login, isLoggedIn } = useContext(AuthContext);

  // Redirect if already logged in
  useEffect(() => {
    const session = sessionManager.getSession();
    if (session) {
      router.push(session.role === 'student' ? '/student/dashboard' : '/mentor/dashboard');
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
  }, []);

  const handleGoogleSignIn = async (role) => {
    try {
      const result = await SignInWithGoogle(role);
      const user = result.user;
      
      // Create or update user document in Firestore with role
      const userDocRef = doc(db, 'users', user.uid);
      
      // First check if user exists
      const userDocSnapshot = await getDoc(userDocRef);
      
      let userData;
      
      if (userDocSnapshot.exists()) {
        // If user exists, use existing data but update role if needed
        userData = {
          ...userDocSnapshot.data(),
          role: role, // Update role based on login choice
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL
        };
      } else {
        // If user doesn't exist, create new user data
        userData = {
          uid: user.uid,
          email: user.email,
          role: role,
          displayName: user.displayName,
          photoURL: user.photoURL,
          createdAt: new Date().toISOString(),
          lastLogin: new Date().toISOString()
        };
        
        // Set the new user data in Firestore
        await setDoc(userDocRef, userData);
      }

      console.log("User Data before session:", userData);
      
      // Set session with the complete user data
      sessionManager.setSession(userData);
      
      // Update context with the same data
      login(userData);
      
      // Set cookie for middleware with essential data
      document.cookie = `session=${JSON.stringify({ 
        isLoggedIn: true, 
        uid: user.uid,
        role: role 
      })}; path=/; max-age=${2 * 60 * 60}`; // 2 hours
      
      // Redirect based on role
      router.push(role === 'student' ? '/student/dashboard' : '/mentor/dashboard');
      
    } catch (error) {
      console.error("Google Sign In Error:", error);
      message.error("Unable to login with Google");
    }
  };

  const handleLinkedInLogin = () => {
    const clientId = '86wnlcu4aj8j46';
    const redirectUri = 'http://localhost:5173/mentor/auth/callback';
    const scope = 'r_liteprofile r_emailaddress';
    const linkedInAuthUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${scope}`;
    window.location.href = linkedInAuthUrl;
  };

  const handleEmailPasswordLogin = async (values) => {
    const { email, password } = values;
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Get additional user data from Firestore
      const userDocRef = doc(db, 'users', user.uid);
      const userDocSnapshot = await getDoc(userDocRef);
      
      if (userDocSnapshot.exists()) {
        const userData = {
          ...userDocSnapshot.data(),
          role: activeTab,
          uid: user.uid,
          email: user.email
        };
        
        // Set session
        sessionManager.setSession(userData);
        // Update context
        login(userData);
        
        // Set cookie for middleware
        document.cookie = `session=${JSON.stringify({ 
          isLoggedIn: true, 
          role: activeTab 
        })}; path=/; max-age=${2 * 60 * 60}`; // 2 hours

        router.push(activeTab === 'student' ? '/student/dashboard' : '/mentor/dashboard');
      } else {
        setError('User profile not found');
      }
    } catch (e) {
      setError('Invalid email or password');
      console.error(e);
    }
  };

  const renderEmailPasswordForm = () => (
    <Form
      form={form}
      name="email_password_login"
      layout="vertical"
      onFinish={handleEmailPasswordLogin}
      className={styles['form']}
    >
      <Form.Item
        name="email"
        rules={[
          { required: true, message: 'Please enter your email' },
          { type: 'email', message: 'Enter a valid email' },
        ]}
      >
        <Input
          prefix={<MailOutlined />}
          placeholder="Email"
          size="large"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please enter your password' }]}
      >
        <Input.Password
          prefix={<LockOutlined />}
          placeholder="Password"
          size="large"
        />
      </Form.Item>
      {error && <p className={styles['error-message']}>{error}</p>}
      <Form.Item style={{display:'flex',  justifyContent:'center' , marginTop:'50px'}}>
        <Button type="primary" htmlType="submit" className={styles['loginButton']}>
          Log In
        </Button>
      </Form.Item>
    </Form>
  );

  return (
    <div className={styles['loginContainer']}>
      <Typography.Title style={{ color: 'white', justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
        Welcome Back
      </Typography.Title>

      <Card className={styles['loginCard']}>
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          centered
          className={styles['loginTabs']}
        >
          <TabPane
            tab={<span className={styles['tabLabel']}><ReadOutlined /> Student Login</span>}
            key="student"
          >
            
            <div className={styles["signUpSideContainerStudent"]}>
              <div className={styles["loginForm"]}>
                {renderEmailPasswordForm()}
                <div style={{ display: 'flex', alignItems: 'center', margin: '20px 0' }}>
                  <hr style={{ flex: 1, border: 'none', borderTop: '1px solid #ccc' }} />
                  <span style={{ margin: '0 10px', whiteSpace: 'nowrap', color: '#888' }}>Or Sign in with</span>
                  <hr style={{ flex: 1, border: 'none', borderTop: '1px solid #ccc' }} />
                </div>
                <div style={{display: 'flex', justifyContent: 'center' }}>
                  <Button
                    className={styles['googleButton']}
                    shape="circle"
                    size="large"
                    icon={<GoogleOutlined style={{ fontSize: 32, color: 'white' }} />}
                    onClick={() => handleGoogleSignIn('student')}
                  />
                </div>
              </div>
              <div className={styles["greetingContainerStudent"]}>
                <div style={{display:'flex' , flexDirection:"column" , justifyContent:'center' , marginLeft:'40px'}}>
                  <h2 style={{marginBottom:'30px'}}>New to Aivirex Innovations!</h2>
                  <h4>Ready to Learn?</h4>
                  <div>Join Aivirex and Transform Your Tomorrow</div>
                  <button className={styles["loginRegisterToggleButton"]} onClick={() => router.push("/auth/register")}>
                    SignUp
                  </button>
                </div>
              </div>
            </div>
          </TabPane>

          <TabPane
            tab={<span className={styles['tabLabel']}><SolutionOutlined /> Mentor Login</span>}
            key="mentor"
          >
            <div className={styles["signUpSideContainerMentor"]}>
              <div className={styles["greetingContainerMentor"]}>
                <div style={{display:'flex' , flexDirection:"column" , justifyContent:'center' , marginLeft:'40px'}}>
                  <h2 style={{marginBottom:'30px'}}>New to Aivirex Innovations!</h2>
                  <h4>Ready to Learn?</h4>
                  <div>Join Aivirex and Transform Your Tomorrow</div>
                  <button className={styles["loginRegisterToggleButton"]} onClick={() => router.push("/auth/register")}>
                    SignUp
                  </button>
                </div>
              </div>
              <div className={styles["loginForm"]}>
                {renderEmailPasswordForm()}
                <div style={{ display: 'flex', alignItems: 'center', margin: '20px 0' }}>
                  <hr style={{ flex: 1, border: 'none', borderTop: '1px solid #ccc' }} />
                  <span style={{ margin: '0 10px', whiteSpace: 'nowrap', color: '#888' }}>Or Sign in with</span>
                  <hr style={{ flex: 1, border: 'none', borderTop: '1px solid #ccc' }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'center' , gap:'30px' }}>
                  <Button
                    className={styles['googleButton']}
                    shape='circle'
                    size='large'
                    icon={<GoogleOutlined style={{ fontSize: 32, color: 'white' }} />}
                    onClick={() => handleGoogleSignIn('mentor')}
                  />
                  <Button
                    className={styles['linkedInButton']}
                    size='large'
                    icon={<LinkedinOutlined style={{ fontSize: 32, color: 'white' , borderRadius: '4', }} />}
                    onClick={handleLinkedInLogin}
                  />
                </div>
              </div>
            </div>
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
}

export default Login;
