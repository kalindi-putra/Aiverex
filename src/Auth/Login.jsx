import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Card, Typography, Tabs, Button, Form, Input, message } from 'antd';
import { ReadOutlined, SolutionOutlined, GoogleOutlined, LinkedinOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
import styles from "./Auth.module.css";
import { SignInWithGoogle, auth } from '../../firebase/Firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { AuthContext } from '../../context/UserContext';

const { TabPane } = Tabs;

function Login() {
  const [activeTab, setActiveTab] = useState('student');
  const [form] = Form.useForm();
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
  }, []);

  const handleGoogleSignIn = async (role) => {
    try {
      await SignInWithGoogle(navigate, role);
    } catch (error) {
      message.error("Unable to login with Google");
      console.error(error);
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
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/home');
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
                  <button className={styles["loginRegisterToggleButton"]} onClick={() => navigate("/register")}>
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
                  <button className={styles["loginRegisterToggleButton"]} onClick={() => navigate("/register")}>
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
