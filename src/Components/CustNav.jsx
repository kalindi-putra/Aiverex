"use client";
import React, { useState, useEffect, useRef , useContext } from 'react';
import { SmileTwoTone } from "@ant-design/icons";
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from "./Navbar.module.css";
import { Button , Avatar , Dropdown , Menu} from "antd";
import { SmileOutlined, UserOutlined } from '@ant-design/icons';
import { AuthContext } from "../context/UserContext";
import { auth } from "../firebase/Firebase";
import NotificationBell from './NotificationBell';

function CustNav(props) {
  const {
    custLinks: NavLinks,
    left,
    right,
    dropDown,
    href,
    isLoggedIn,
  } = props;

  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/css/bootstrap.min.css"
      />
      <div
        className={`${styles["navigation-wrap"]} ${styles["start-header"]} ${styles["start-style"]} sticky-top`}
      >
        <div className={"container-fluid"}>
          <div className="row">
            <div className="col p-0">
              <nav className={`navbar navbar-expand-md navbar-dark p-2`}>
                <Link href="/" className={`${styles["navLogo"]} navbar-brand`} legacyBehavior>
                    <img
                      src="https://aivirex.in/assets/img/favicon/apple-touch-icon.png"
                      alt=""
                      width="30"
                      height="24"
                      className="d-inline-block align-text-top"
                    />
                    AIVIREX
                </Link>

                <button
                  className={`${styles["navbarToggler"]} navbar-toggler`}
                  type="button"
                  data-toggle="collapse"
                  data-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span
                    className={`${styles["navbarTogglerIcon"]} navbar-toggler-icon`}
                  ></span>
                </button>

                <div
                  className="collapse navbar-collapse"
                  id="navbarSupportedContent"
                >
                  <ul className="navbar-nav py-4 py-md-0">
                    {NavLinks.slice(0, left).map((item, index) => {
                      if (href == "0")
                        return (
                          <li key={index}
                            className={`${styles["navItems"]} nav-item pl-2 pl-md-0 ml-0 ml-md-2`}
                          >
                            <Link
                              href={item.link}
                              className={`${styles["navLinks"]} nav-link`}
                              legacyBehavior>
                            
                                {item.name}
                              
                            </Link>
                          </li>
                        );
                      else if (href == "1")
                        return (
                          <li key={index}
                            className={`${styles["navItems"]} nav-item pl-2 pl-md-0 ml-0 ml-md-2`}
                          >
                            <Link
                              className={`${styles["navLinks"]} nav-link`}
                              href={item.link}
                              legacyBehavior>
                              {item.name}
                            </Link>
                          </li>
                        );
                    })}
                  </ul>
                </div>
                <div
                  className="collapse navbar-collapse"
                  id="navbarSupportedContent"
                >
                  <ul className="navbar-nav ml-auto py-4 py-md-0">
                    {dropDown == "1" && (
                      <li
                        className={`${styles["navItems"]} nav-item pl-2 pl-md-0 ml-0 ml-md-2 position-relative`}
                      >
                        {/*  dropdown-toggle */}
                        <Link
                          href="#"
                          className={`${styles["navLinks"]} nav-link`}
                          data-toggle="dropdown"
                          role="button"
                          aria-haspopup="true"
                          aria-expanded="false"
                          legacyBehavior>
                            <SmileTwoTone size={150} /> 
                          
                        </Link>
                        <div
                          className={`${styles["dropdown-menu"]} ${styles["bg-black"]} dropdown-menu position-absolute`}
                        >
                          {NavLinks[right].map((item, index) => {
                            return (
                              <li key={index}>
                                <Link
                                  href={item.link}
                                  className={`${styles["dropdown-item"]} ${styles["text-white"]} ${styles["navLinks"]} nav-link `}>

                                  {item.name}

                                </Link>
                              </li>
                            );
                          })}
                        </div>
                      </li>
                    )}
                    {/* right */}
                    {NavLinks.slice(
                      left,
                      isLoggedIn == "1" ? right - 2 : right
                    ).map((item, index) => {
                      return (
                        <li
                          className={`${styles["navItems"]} nav-item pl-2 pl-md-0 ml-0 ml-md-2`}
                          key={index}
                        >
                          <Link href={item.link} className={`${styles["navLinks"]} nav-link`}>

                            {item.name}

                          </Link>
                        </li>
                      );
                    })}
                    {isLoggedIn == "1" && (
                      <li
                        className={`${styles["navItems"]} nav-item 1 pl-2 pl-md-0 ml-0 ml-md-2`}
                        key="logout"
                      >
                        <Link href="/auth/login" className={`${styles["navLinks"]} nav-link`}>
                          
                            Logout
                          
                        </Link>
                      </li>
                    )}
                  </ul>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const LandNav = () => {
  const {userData , isLoggedIn } = useContext(AuthContext);
  const router = useRouter();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownVisible(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        router.push('/');
        console.log('User signed out');
      })
      .catch((error) => {
        console.error('Sign-out error', error);
      });
  };
  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/css/bootstrap.min.css"
      />
      <div
        className={`${styles["navigation-wrap"]} ${styles["start-header"]} ${styles["start-style"]} sticky-top`}
      >
        <div className={"container-fluid"}>
          <div className="row">
            <div className="col p-0">
              <nav className={`navbar navbar-expand-md navbar-dark p-2`}>
                <Link href="/" className={`${styles["navLogo"]} px-4 navbar-brand`}>

                  <img
                    src="https://aivirex.in/assets/img/favicon/apple-touch-icon.png"
                    alt=""
                    width="30"
                    height="24"
                    className="d-inline-block align-text-top"
                  />AIVIREX
                                    
                </Link>
                <div className={`px-4`}>
                  <button
                    className={`${styles["navbarToggler"]} navbar-toggler`}
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                  >
                    <span
                      className={`${styles["navbarTogglerIcon"]} navbar-toggler-icon`}
                    ></span>
                  </button>
                </div>

                <div
                  className="collapse navbar-collapse"
                  id="navbarSupportedContent"
                >
                  <ul className="navbar-nav ml-auto py-4 py-md-0">

                    {!isLoggedIn && (
                      <ul className="navbar-nav ml-auto py-4 py-md-0">
                        <li
                      className={`${styles["navItems"]} nav-item pl-2 pl-md-0 ml-0 ml-md-2`}
                    >
                      <a
                        className={`${styles["navLinks"]} nav-link`}
                        href="#hero-sec"
                      >
                        Home
                      </a>
                    </li>
                    <li
                      className={`${styles["navItems"]} nav-item pl-2 pl-md-0 ml-0 ml-md-2`}
                    >
                      <a
                        className={`${styles["navLinks"]} nav-link`}
                        href="#about"
                      >
                        About
                      </a>
                    </li>
                    <li
                      className={`${styles["navItems"]} nav-item pl-2 pl-md-0 ml-0 ml-md-2`}
                    >
                      <a
                        className={`${styles["navLinks"]} nav-link`}
                        href="#progress"
                      >
                        How it works
                      </a>
                    </li>
                    <li
                      className={`${styles["navItems"]} nav-item pl-2 pl-md-0 ml-0 ml-md-2`}
                    >
                      <a
                        className={`${styles["navLinks"]} nav-link`}
                        href="#team"
                      >
                        Team
                      </a>
                    </li>
                    <li
                      className={`${styles["navItems"]} nav-item pl-2 pl-md-0 ml-0 ml-md-2`}
                    >
                      <a
                        className={`${styles["navLinks"]} nav-link`}
                        href="#featured"
                      >
                        Featured
                      </a>
                    </li>
                      <li
                        className={`${styles["navItems"]} nav-item pl-2 pl-md-0 ml-0 ml-md-2`}
                      >
                        <Link href="/auth/login" className={`${styles["navLinks"]} nav-link`}>
                          
                            Login
                          
                        </Link>
                      </li>
                      </ul>
                    )}
                    {!isLoggedIn && (
                      <li
                        className={`${styles["navItems"]} nav-item pl-2 pl-md-0 ml-0 ml-md-2`}
                      >
                        <Link href="/auth/register" className={`${styles["navLinks"]} nav-link`}>
                          
                            Register
                          
                        </Link>
                      </li>
                    )}
                    {isLoggedIn && (
                      <ul className="navbar-nav ml-auto py-4 py-md-0">
                        <li
                        className={`${styles["navItems"]} nav-item pl-2 pl-md-0 ml-0 ml-md-2`}
                      >
                        <Link href="/" className={`${styles["navLinks"]} nav-link`}>
                            Home
                        </Link>
                      </li>
                        <li
                        className={`${styles["navItems"]} nav-item pl-2 pl-md-0 ml-0 ml-md-2`}
                      >
                        <Link href="/student/codeEditor" className={`${styles["navLinks"]} nav-link`}>
                            Challenges
                        </Link>
                      </li>
                      <li
                        className={`${styles.navItems} nav-item pl-2 pl-md-0 ml-0 ml-md-2`}
                        ref={dropdownRef}
                        style={{ position: 'relative' , marginRight:'40px'}}
                      >
                        <div
                          onClick={() => setDropdownVisible((prev) => !prev)}
                          style={{ cursor: 'pointer' }}
                        >
                          <Avatar size={35} icon={<UserOutlined style={{ color: 'white' }} />} />
                        </div>

                        {dropdownVisible && (
                          <div
                            style={{
                              position: 'absolute',
                              top: '45px',
                              right: 0,
                              background: '#343434' ,
                              borderRadius: '4px',
                              boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                              zIndex: 1000,
                              minWidth: '160px',
                              color:'white',
                            }}
                          >
                            <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                              <li style={{ padding: '10px 20px', }}>
                                {(isLoggedIn && userData?.role === 'mentor') ? (
                                  <Link href="/mentor/dashboard" style={{ color: 'white', textDecoration: 'none', }}>Profile</Link>
                                ) : (
                                  <Link href="/student/dashboard" style={{ color: 'white', textDecoration: 'none' }}>Profile</Link>
                                )}
                              </li>
                              <li style={{ padding: '10px 20px' }}>
                                {(isLoggedIn && userData?.role === 'mentor') ? (
                                  <Link href="/mentor/edit-profile" style={{ color: 'white', textDecoration: 'none' }}>Edit Profile</Link>
                                ) : (
                                  <Link href="/student/edit-profile" style={{ color: 'white', textDecoration: 'none' }}>Edit Profile</Link>
                                )}
                              </li>
                              <li
                                style={{ padding: '10px 20px', cursor: 'pointer' }}
                                onClick={handleLogout}
                              >
                                Logout
                              </li>
                            </ul>
                          </div>
                        )}
                      </li>
                      </ul>
                    )}
                  </ul>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const MainNav = () => {
  const { userData, isLoggedIn } = useContext(AuthContext);
  const role = userData?.role || 'student'; 
  console.log("User Role:", role);
  const router = useRouter();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef();


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownVisible(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const mockNotifications = [
    {
      id: 1,
      description: ' Had a nice meeting. Duration can be used to specify how long the notification stays open. After the duration time elapses, the notification closes automatically. If not specified, default value is 4.5 seconds. If you set the value to 0, the notification box will never close automatically.',
      time: '2 hours ago'
    },
    {
      id: 2,
      description: 'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
      time: '5 hours ago'
    },
    {
      id: 3,
      description: 'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
      time: '5 hours ago'
    },
    {
      id: 4,
      description: 'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
      time: '5 hours ago'
    },
    {
      id: 5,
      description: 'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
      time: '5 hours ago'
    }
  ];
  const handleLogout = () => {
    auth.signOut()
      .then(() => {
        router.push("/");
        console.log("User signed out");
      })
      .catch((error) => {
        console.error("Sign-out error", error);
      });
  };

  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/css/bootstrap.min.css"
      />
      <div className={`${styles["navigation-wrap"]} ${styles["start-header"]} ${styles["start-style"]} sticky-top`}>
        <div className={"container-fluid"}>
          <div className="row">
            <div className="col p-0">
              <nav className={`navbar navbar-expand-md navbar-dark p-2`}>
                <Link
                  href="/"
                  className={`${styles["navLogo"]} px-4 navbar-brand`}
                  legacyBehavior>
                    <img
                      src="https://aivirex.in/assets/img/favicon/apple-touch-icon.png"
                      alt=""
                      width="30"
                      height="24"
                      className="d-inline-block align-text-top"
                    />
                    AIVIREX
                  
                </Link>

                <div className={`px-4`}>
                  <button
                    className={`${styles["navbarToggler"]} navbar-toggler`}
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                  >
                    <span className={`${styles["navbarTogglerIcon"]} navbar-toggler-icon`}></span>
                  </button>
                </div>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                  <ul className="navbar-nav ml-auto py-4 py-md-0">
                    {!isLoggedIn ? (
                      <>
                      <li className={`${styles["navItems"]} nav-item pl-2 pl-md-0 ml-0 ml-md-2`}>
                      <Link href="/" className={`${styles["navLinks"]} nav-link`}>Home</Link>
                    </li>
                    <li className={`${styles["navItems"]} nav-item pl-2 pl-md-0 ml-0 ml-md-2`}>
                      <Link href="#about" className={`${styles["navLinks"]} nav-link`}>About</Link>
                    </li>
                    <li className={`${styles["navItems"]} nav-item pl-2 pl-md-0 ml-0 ml-md-2`}>
                      <Link href="#progress" className={`${styles["navLinks"]} nav-link`}>How it works</Link>
                    </li>
                    <li className={`${styles["navItems"]} nav-item pl-2 pl-md-0 ml-0 ml-md-2`}>
                      <Link href="#team" className={`${styles["navLinks"]} nav-link`}>Team</Link>
                    </li>
                    <li className={`${styles["navItems"]} nav-item pl-2 pl-md-0 ml-0 ml-md-2`}>
                      <Link href="#featured" className={`${styles["navLinks"]} nav-link`}>Featured</Link>
                    </li>
                      </>
                    ) : (
                      <>
                          <li className={`${styles["navItems"]} nav-item pl-2 pl-md-0 ml-0 ml-md-2`}>
                            <Link href="/" className={`${styles["navLinks"]} nav-link`}>Home</Link>
                          </li>
                          <li className={`${styles["navItems"]} nav-item pl-2 pl-md-0 ml-0 ml-md-2`} style={{paddingLeft:'10px'}}>
                            <NotificationBell notifications={mockNotifications} />
                          </li>
                      </>
                    )}

                    {/* Auth Links */}
                    <ul className="navbar-nav ml-auto py-4 py-md-0">
                    {!isLoggedIn ? (
                      <>
                        <li className={`${styles["navItems"]} nav-item pl-2 pl-md-0 ml-0 ml-md-2`}>
                          <Link href="/auth/login" className={`${styles["navLinks"]} nav-link`}>Login</Link>
                        </li>
                        <li className={`${styles["navItems"]} nav-item pl-2 pl-md-0 ml-0 ml-md-2`}>
                          <Link href="/auth/register" className={`${styles["navLinks"]} nav-link`}>Register</Link>
                        </li>
                      </>
                    ) : (
                      <>
                        <li
                          className={`${styles["navItems"]} nav-item pl-2 pl-md-0 ml-5 mr-5`}
                          onClick={() => setDropdownVisible(!dropdownVisible)}
                          style={{ cursor: 'pointer', color: 'white' }}
                        >
                          <Avatar size={35} icon={<UserOutlined style={{ color: 'white' , }} />} />
                        </li>
                      </>
                    )}
                  </ul>

                  {isLoggedIn && dropdownVisible && (
                    <div
                      ref={dropdownRef}
                      style={{
                        position: 'absolute',
                        top: '70px',
                        right: '20px',
                        background: '#343434',
                        borderRadius: '4px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                        zIndex: 1000,
                        minWidth: '160px',
                        color: 'white',
                      }}
                    >
                        <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                          <li style={{ padding: '10px 20px', }}>
                            {(isLoggedIn && userData?.role === 'mentor') ? (
                              <Link href="/mentor/dashboard" style={{ color: 'white', textDecoration: 'none', }}>Profile</Link>
                            ) : (
                              <Link href="/student/dashboard" style={{ color: 'white', textDecoration: 'none' }}>Profile</Link>
                            )}
                          </li>
                          <li style={{ padding: '10px 20px' }}>
                            {(isLoggedIn && userData?.role === 'mentor') ? (
                              <Link href="/mentor/edit-profile" style={{ color: 'white', textDecoration: 'none' }}>Edit Profile</Link>
                            ) : (
                              <Link href="/student/edit-profile" style={{ color: 'white', textDecoration: 'none' }}>Edit Profile</Link>
                            )}
                          </li>
                          <li
                            style={{ padding: '10px 20px', cursor: 'pointer' }}
                            onClick={handleLogout}
                          >
                            Logout
                          </li>
                        </ul>
                    </div>
                  )}

                  </ul>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export { CustNav, LandNav, MainNav };