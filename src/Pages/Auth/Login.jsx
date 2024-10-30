import React, { useContext, useEffect, useState } from 'react'
import { Form,Input,Button, Checkbox, } from 'antd';
import styles from "./Auth.module.css"
import {GoogleCircleFilled } from "@ant-design/icons"
import { InfoCircleOutlined, UserOutlined,LockOutlined,IdcardOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
// import cstyles from "./CustAuth.module.css"


import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db, SignInWithGoogle } from '../../firebase/Firebase';
import { doc, getDoc } from 'firebase/firestore';
import { AuthContext } from '../../context/UserContext';


function Login() {
  const { isLoggedIn, userData }= useContext(AuthContext)
  const [form] = Form.useForm();
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    //Redirect to home if user is logged in already
    if (isLoggedIn) {
      navigate('/home');
    }
  }, [isLoggedIn, navigate]);

  const login = async (values) => {
    try {
      const { email, password } = values;
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const { user } = userCredential;
      console.log(user);
    } catch (e) {
      setError(e.message);
      console.log(e.message);
}
    };

  //     // Retrieve the user's role from Firestore
  //     const userDocRef = doc(db, 'users', user.uid);
  //     const userDocSnapshot = await getDoc(userDocRef);
  //     if (userDocSnapshot.exists()) {
  //       const userloginData = userDocSnapshot.data();
  //       console.log(userloginData);
        
        
  //       if (role) {
  //         navigate('/home');
  //       } else {
  //         setError('Invalid role');
  //         console.log('no role found');
  //       }
  //     } else {
  //       setError('User data not found');
  //     }
  //   } catch (e) {
  //     setError(e.message);
  //     console.log(e.message);
  //   }
  // };

  return (
    <div className={styles['AuthDiv']}>
      <div className={styles['login-box']}>
        <div className={styles['imgDiv']}>
          <lottie-player src="https://assets1.lottiefiles.com/packages/lf20_mjlh3hcy.json" background="transparent" speed="1" style={{ width: '300px', height: '100%' }} loop autoplay></lottie-player>
        </div>
        <div className={styles['formDiv']}>
          <h2>Login</h2>
          <Form className={styles['form']} autoComplete="off" form={form} name="normal_login" onFinish={login}>
            <Form.Item
              name="email"
              rules={[
                {
                  type: 'email',
                  message: 'The input is not a valid email address!',
                },
                {
                  required: true,
                  message: 'Please input your email address!',
                },
              ]}
            >
              <Input
                size="large"
                placeholder="Email Id"
                name="email"
                className={styles['ip']}
                prefix={<IdcardOutlined />}
                onChange={(event) => form.setFieldsValue({ email: event.target.value })}
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
            >
              <Input.Password
                placeholder="Password"
                className={styles['ip']}
                required
                onChange={(event) => form.setFieldsValue({ password: event.target.value })}
              />
            </Form.Item>
            {error && <p className={styles['error-message']}>{error}</p>}
            <Form.Item htmlType="submit">
              <Button
                className={styles['form-btn']}
                htmlType="submit"
                
    >
                Log In
              </Button>
            </Form.Item>
            <p className={styles['para-2']}>
              Not have an account? <Link className={styles['redirect']} to="/register">Register Here</Link>
            </p>
            <p className={`${styles['para-2']} ${styles['or']}`}>OR</p>
            <div className={styles['ggl']}>
              <a className={styles['a4']} onClick={() => SignInWithGoogle(navigate)}>
                 
                Sign in with Google
              </a>
            </div>
          </Form>
        </div>
      </div>
      <br />
    </div>
  );
}

export default Login;





const CustLogin = () => {
    const onFinish = (values) => {
      console.log('Received values of form: ', values);
    };
    return (
        <div className={cstyles["container"]}>
        <div className={cstyles["wrapper"]}>
         <h1>Login</h1><br/>
         <label>New User?<Link to="/register">Create an account</Link></label>
      <Form
        name="normal_login"
        className={cstyles["form"]}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}

      >
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: 'Please input your Username!',
            },
          ]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your Password!',
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
  
          <a className="login-form-forgot" href="">
            Forgot password
          </a>
        </Form.Item>
  
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
          Or <a href="">register now!</a>
        </Form.Item>
      </Form>
      </div>
    <br/>
    
    </div>
    );
  };
export  {CustLogin,Login};