"use client";
import React, { useContext, useEffect, useState } from "react";
import Link from 'next/link';
import styles from "./page.module.css";
import Script from "next/script";
import { CustDes } from "../Components/Card";
import Image from "next/image";
import { Typography, Row, Col , Carousel } from "antd";
import { CustCarosuel, NormalCarosuel } from "../Components/CustCarosuel";
import {
  BarChartOutlined,
  FormOutlined,
  CodeOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { ExpertsData } from "./store/data";
import { CustNav, LandNav } from "../Components/CustNav";
import { AuthContext } from "../context/UserContext";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Typewriter } from 'react-simple-typewriter';
import next from "next";

function Home() {
  const { isLoggedIn } = useContext(AuthContext);
  const [isHovered, setIsHovered] = useState(false);

  const LandLinks = [
    {
      name: "Home",
      link: "#hero-sec",
    },
    {
      name: "About",
      link: "#about",
    },
    {
      name: "How it works",
      link: "#progress",
    },
    {
      name: "Team",
      link: "#team",
    },
    {
      name: "Featured",
      link: "#featured",
    },
    {
      name: "Login",
      link: "/login",
    },
    {
      name: "Register",
      link: "/register",
    },
  ];

  const sequence = [
    'Take the Test',
    'Earn the Batch',
    'Become the Expert',
  ];
  const getLoopedSequence = () => {
    return [...sequence];
  };

  useEffect(() => {
    AOS.init({ duration: 300, once: true });
  }, []);

  return (
    <div>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/css/bootstrap.min.css"
      />

      {/* <CustNav custLinks={LandLinks} left="5" right="8" dropDown="0" href="1"/> */}
      <LandNav />

      <div className={styles["hero-container"]} id="hero-sec">
        <div className="container-fluid" style={{marginTop:'2%' , marginBottom:'1%'}}>
          <div className="row d-flex row d-flex justify-content-center align-items-center">
            <div className="col align-middle">
              <div data-aos='zoom-in' className="px-2 py-2 head">
                {/* <Script
                  src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"
                  strategy="beforeInteractive"
                />- */}
                {/* <img src="https://img.freepik.com/free-vector/happy-freelancer-with-computer-home-young-man-sitting-armchair-using-laptop-chatting-online-smiling-vector-illustration-distance-work-online-learning-freelance_74855-8401.jpg?w=900&t=st=1667037491~exp=1667038091~hmac=7c71ea8afc8f3cc8065c5ccc05d105e3c8a7b76f0133016cb210a7882dc19611" className="img-fluid" alt="..."/> */}
                {/* <img src="https://sb-ui-kit-pro.startbootstrap.com/assets/img/illustrations/programming.svg" className="img-fluid"  alt="..."/> */}
                <lottie-player
                  src="https://lottie.host/95525dd7-2c8f-48be-aca3-948a9fdb2c95/3JwDZpuLqd.json"
                  background="transparent"
                  speed="1"
                  className={styles["lottiePlayer"]}
                  style={{ width: "100%", height: "550px" }}
                  loop
                  autoplay
                ></lottie-player>
              </div>
            </div>
            <div data-aos='fade-down' className="col text-white">
              <div className="px-5 py-5 mt-5">
                <div className="px-2 py-2 align-middle">
                  <div className={`${styles['typewriter-wrapper']} font-mono text-center`}>
                    <Typewriter
                      words={getLoopedSequence()}
                      loop={true}
                      cursor
                      cursorStyle="|"
                      cursorColor="green" 
                      typeSpeed={100}
                      deleteSpeed={100}
                      delaySpeed={3000}
                    />
                  </div>
                  <h4>Get all your needs Here</h4>
                  <p>
                    {" "}
                    An online learning and teaching marketplace with over 204000
                    courses and 54 million students. Learn programming,
                    marketing, data science and more.
                  </p>
                </div>
                <div data-aos='fade-zoom-in' className="px-2 py-2">
                  <Link
                    href={isLoggedIn ? "/" : "/auth/login"}
                    className={`${styles["btn"]} btn ${styles["btn-outline-primary"]}`}
                    style={{marginTop:'80px'}}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                  >
                    {isHovered ? "Sign In to Aivirex Account" : "Explore More About Us"}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="main-container">
  <div className="container-fluid">
  ...
</div>
</div> */}
        <div className={`card-container`} id="about" style={{marginBottom:'1%'}}>
          <div className="container-fluid px-3 py-4">
            <div data-aos="zoom-in-up" data-aos-anchor-placement="center-bottom" data-aos-duration="1000" className="center mx-4 my-4 text-white" style={{paddingBottom:'30px'}}>
              <h2>About Us</h2>
            </div>
            <div className="d-flex mx-auto align-items-center">
              <div className="col text-white">
                <div className="px-2">
                  <div data-aos="fade-up" data-aos-anchor-placement="center-bottom" data-aos-duration="1000" className="align-middle">
                    <h4>Who Are We?</h4>
                    <p>
                      AiVirex is a start-up company that was developed largely
                      to address issues that the majority of the population
                      encounters with the help of innovation and technology. As
                      a team, we take pride in our strong work ethic and quick
                      responsiveness and are firm believers in the value of
                      creativity, meticulous attention to detail, and achieving
                      the optimal harmony between concept and execution to
                      produce powerful and efficient solutions. We put a lot of
                      effort into making our mission a reality in both of our
                      daily endeavours: meeting the needs of our clients and
                      making the world a better place. Let&apos;s Innovate!
                    </p>
                  </div>
                  <div data-aos='fade-zoom-in' data-aos-anchor-placement="bottom-bottom" className="px-2 py-2">
                    <button
                      type="button"
                      className={`${styles["btn"]} btn ${styles["btn-outline-primary"]}`}
                      style={{marginTop:'40px'}}
                    >
                      Drop A Review
                    </button>
                  </div>
                </div>
              </div>
              <div className="col align-middle d-flex justify-content-center">
                <div className="px-2 py-2">
                  {/* <lottie-player src="https://assets6.lottiefiles.com/packages/lf20_hzfmxrr7.json"  background="transparent"  speed="1"  style="width: 300px; height: 300px;"  loop controls autoplay></lottie-player> */}
                  {/* <img src="https://img.freepik.com/free-vector/happy-freelancer-with-computer-home-young-man-sitting-armchair-using-laptop-chatting-online-smiling-vector-illustration-distance-work-online-learning-freelance_74855-8401.jpg?w=900&t=st=1667037491~exp=1667038091~hmac=7c71ea8afc8f3cc8065c5ccc05d105e3c8a7b76f0133016cb210a7882dc19611" className="img-fluid" alt="..."/> */}
                  < Image
                    src="https://sb-ui-kit-pro.startbootstrap.com/assets/img/illustrations/windows.svg"
                    className="img-fluid"
                    width= {650}
                    height={450}
                    alt="..."
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <section
          id="progress"
          className={`${styles["process"]}`}
        >
          <div className="container-fluid container-fluid-max text-white" style={{marginBottom:'1%'}}>
            <div className="row text-center py-5">
              <div data-aos="zoom-in-up" data-aos-anchor-placement="center-bottom" className="col-12 pb-4">
                <h2 className="text-red">How It Works</h2>
              </div>
              <div className="how-it-works-cards" style={{display:'flex' , alignItems:'center' , justifyContent:"center" , marginTop:'30px'}}>
                <div data-aos="zoom-in-up" data-aos-anchor-placement="center-bottom" data-aos-delay="0" data-aos-offset="100" className="col-12 col-sm-6 col-lg-3">
                  <span className="fa-stack fa-2x">
                    <CodeOutlined
                      style={{ fontSize: "60px", color: "#1DACD6" }}
                    />
                  </span>
                  <h3 className="mt-3 text-red h4">Pick a Course</h3>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit sed
                    repudiandae.
                  </p>
                </div>
                <div data-aos="zoom-in-up" data-aos-anchor-placement="center-bottom" data-aos-delay="100" data-aos-offset="100" className="col-12 col-sm-6 col-lg-3">
                  <span className="fa-stack fa-2x">
                    <FormOutlined
                      style={{ fontSize: "60px", color: "#1DACD6" }}
                    />
                  </span>
                  <h3 className="mt-3 text-red h4">Take a Test</h3>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit sed
                    repudiandae.
                  </p>
                </div>
                <div data-aos="zoom-in-up" data-aos-anchor-placement="center-bottom" data-aos-delay="200" data-aos-offset="100" className="col-12 col-sm-6 col-lg-3">
                  <span className="fa-stack fa-2x">
                    <BarChartOutlined
                      style={{ fontSize: "60px", color: "#1DACD6" }}
                    />
                  </span>
                  <h3 className="mt-3 text-red h4">Get Reviewed</h3>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit sed
                    repudiandae.
                  </p>
                </div>
                <div data-aos="zoom-in-up" data-aos-anchor-placement="center-bottom" data-aos-delay="300" data-aos-offset="100" className="col-12 col-sm-6 col-lg-3">
                  <span className="fa-stack fa-2x">
                    <CheckCircleOutlined
                      style={{ fontSize: "60px", color: "#1DACD6" }}
                    />
                  </span>
                  <h3 className="mt-3 text-red h4">Be Certified</h3>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit sed
                    repudiandae.
                  </p>
                </div>
              </div>
              <div data-aos='fade-zoom-in' data-aos-anchor-placement="bottom-bottom" className="col-12 pt-3">
                <a
                  className={`${styles["btn"]} btn`}
                  style={{ width: "250px" , marginTop:'60px'}}
                  target="_blank"
                  role="button"
                >
                  Learn More →
                </a>
              </div>
            </div>
          </div>
        </section>
        <div className={`card-container`} id="team">
          <div className="container-fluid px-3 py-3">
            <div data-aos="zoom-in-up" data-aos-anchor-placement="center-bottom" className="center mx-4 my-4 text-white" style={{paddingBottom:'30px'}}>
              <h2>Meet Our Expert</h2>
              <p data-aos="fade-left" data-aos-anchor-placement="center-bottom" data-aos-offset="100">Highly professional team</p>
            </div>
            {/* <img src="https://img.freepik.com/free-vector/work-time-concept-illustration_114360-1474.jpg?w=740&t=st=1667038053~exp=1667038653~hmac=7f51a4d7c9f7dc9e0e3a6d53d45f381fc455e5424bcc36a0bedca65db24487e7" className="card-img-top" style={{height:"300px",}} alt="..."/>
  <img src="https://img.freepik.com/free-vector/work-time-concept-illustration_114360-1074.jpg" className="card-img-top" style={{height:"300px"}} alt="..."/>
  <img src="https://img.freepik.com/free-vector/teaching-concept-illustration_114360-1708.jpg?w=740&t=st=1667038099~exp=1667038699~hmac=d144ede4a891a4bfcb57b109cc26614850ed35f5260bbf32541845325c476dbb" className="card-img-top" style={{height:"300px"}} alt="..."/> */}

            {/* <div className="row mb-5">
    {ExpertsData.slice(0,4).map((expert)=>{
  return <div className="col" style={{width:'300px',margin:0}}>
        <div className=`${styles["card"]} card bg-black" style={{width:'300px',margin:0}} >
  <img src={expert.img} className="card-img-top" alt="..." style={{width:'100%',height:'150px'}} />
  <div className="card-body">
    <h5 className="card-title">{expert.name}</h5>
    <p className="card-text">{expert.description}</p>
    <a href="#" className="btn org-btn">Learn More.</a>
  </div>
</div>
      </div>
})
}
    </div> */}
            <div className={styles['timeline']} style={{margin:'0 80px'}}>
              {ExpertsData.slice(0, 4).map((expert, index) => {
                return (
                  <Col
                    lg={6}
                    md={8}
                    sm={12}
                    key={expert.id || index}
                  >
                    <CustDes
                      index="index"
                      content={expert}
                      type="expert"
                      className={`expertCard`}
                    />
                  </Col>
                );
              })}
            </div>
          </div>
        </div>
        <div
          className={`${styles["testimonals-container"]} ${styles["text-white"]} ${styles["bg-black"]}`}
          id="testi"
        >
          <div className="container-fluid">
            <div data-aos="zoom-in-up" data-aos-anchor-placement="center-bottom" className="center mx-4 my-4 text-white">
              <h2>What Peoples Say </h2>
              <p data-aos="fade-left" data-aos-anchor-placement="center-bottom" data-aos-delay="300">Read our Testimonals</p>
            </div>

            <CustCarosuel content={ExpertsData} type="testi" />
            {/* <NormalCarosuel/> */}
          </div>
        </div>

        <div className={styles["banner-container"]} id="featured">
          <div className="container-fluid px-4 py-4">
            <div className={`${styles["card"]} card text-white`}>
              <h2 data-aos="zoom-in-up" data-aos-anchor-placement="center-bottom" className="card-header">Featured Courses</h2>
              <div className="card-body">
                <div className="container">
                  <Carousel
                    className={styles.carouselWrapper}
                    arrows
                    dots={false}
                    centerMode={false}
                    infinite={false}
                    slidesToShow={3}
                    slidesToScroll={1}
                    responsive={[
                      {
                        breakpoint: 1024,
                        settings: {
                          slidesToShow: 2,
                        },
                      },
                      {
                        breakpoint: 600,
                        settings: {
                          slidesToShow: 1,
                        },
                      },
                    ]}
                  >
                    <div className="col">
                      <div
                        data-aos="fade-zoom-in"
                        data-aos-easing="ease-in-back"
                        data-aos-offset="100"
                        className={`${styles["card"]} card ${styles["moveUp"]} move-up mb-4`}
                      >
                        <div className="card-header">Web Development</div>
                        <div className="card-body">
                          <h5 className="card-title">Front End + Backend</h5>
                          <p className="card-text">
                            Some quick example text to build on the card title and make up the bulk of the card&lsquo;s content.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="col">
                      <div data-aos="fade-zoom-in" data-aos-easing="ease-in-back" data-aos-offset="100"
                        className={`${styles["card"]} card ${styles["moveUp"]} move-up mb-4`}
                      >
                        <div className="card-header">Web Development</div>
                        <div className="card-body">
                          <h5 className="card-title">Front End + Backend</h5>
                          <p className="card-text">
                            Some quick example text to build on the card title
                            and make up the bulk of the card&apos;s content.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col">
                      <div data-aos="fade-zoom-in" data-aos-easing="ease-in-back" data-aos-offset="100"
                        className={`${styles["card"]} card ${styles["moveUp"]} move-up mb-4`}
                      >
                        <div className="card-header">Java Masterclass</div>
                        <div className="card-body">
                          <h5 className="card-title">Begineer Course</h5>
                          <p className="card-text">
                            Some quick example text to build on the card title
                            and make up the bulk of the card&apos;s content.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col">
                      <div data-aos="fade-zoom-in" data-aos-easing="ease-in-back" data-aos-offset="100"
                        className={`${styles["card"]} card ${styles["moveUp"]} mb-4`}
                      >
                        <div className="card-header">Python </div>
                        <div className="card-body">
                          <h5 className="card-title">Python AI</h5>
                          <p className="card-text">
                            Some quick example text to build on the card title
                            and make up the bulk of the card&apos;s content.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col">
                      <div data-aos="fade-zoom-in" data-aos-easing="ease-in-back" data-aos-offset="100"
                        className={`${styles["card"]} card ${styles["moveUp"]} move-up mb-4`}
                      >
                        <div className="card-header">Python </div>
                        <div className="card-body">
                          <h5 className="card-title">Python AI</h5>
                          <p className="card-text">
                            Some quick example text to build on the card title
                            and make up the bulk of the card&apos;s content.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col">
                      <div data-aos="fade-zoom-in" data-aos-easing="ease-in-back" data-aos-offset="100"
                        className={`${styles["card"]} card ${styles["moveUp"]} move-up mb-4`}
                      >
                        <div className="card-header">Python </div>
                        <div className="card-body">
                          <h5 className="card-title">Python AI</h5>
                          <p className="card-text">
                            Some quick example text to build on the card title
                            and make up the bulk of the card&apos;s content.
                          </p>
                        </div>
                      </div>
                    </div>
</Carousel>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={`${styles["footer-container"]} ${styles["foot"]} p-5`}>
          <div className="container-fluid">
            <div>
              <div className="row" style={{ textAlign: "left" }}>
                <div className="col-md-3 footer-column mr-5">
                  <Link className={`${styles["navLogo"]} navbar-brand`} style={{color:"#1DACD6"}} href="/">
                    <Image
                      src="https://aivirex.in/assets/img/favicon/apple-touch-icon.png"
                      alt=""
                      width={30}
                      height={24}
                      className="d-inline-block align-text-top"
                    />
                    AIVIREX
                  </Link>
                  <label style={{ fontSize: "0.9rem" }}>
                    Aivirex is a platform for learning and teaching online where
                    students are mastering new skills and achieving their goals
                    by learning from an extensive library of over 45,000 courses
                    taught by expert instructors.
                  </label>
                </div>
                <div className="col-md-2 footer-column">
                  <ul className="nav flex-column align-content-center">
                    <li className={`${styles["navItems"]} nav-item`}>
                      <span className="footer-title">Links</span>
                    </li>
                    <li>
                      <a
                        className={`${styles["navLinks"]} nav-link`}
                        href="#hero-sec"
                      >
                        Home
                      </a>
                    </li>
                    <li>
                      <a
                        className={`${styles["navLinks"]} nav-link`}
                        href="#about"
                      >
                        About
                      </a>
                    </li>
                    <li>
                      <a
                        className={`${styles["navLinks"]} nav-link`}
                        href="#progress"
                      >
                        How it works
                      </a>
                    </li>
                    <li>
                      <a
                        className={`${styles["navLinks"]} nav-link`}
                        href="#team"
                      >
                        Team
                      </a>
                    </li>
                    <li>
                      <a
                        className={`${styles["navLinks"]} nav-link`}
                        href="#featured"
                      >
                        Featured
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="col-md-3 footer-column">
                  <ul className="nav flex-column align-content-center">
                    <li className={`${styles["navItems"]} nav-item`}>
                      <span className="footer-title">Company</span>
                    </li>
                    <li>
                      <a className={`${styles["navLinks"]} nav-link`} href="#">
                        About us
                      </a>
                    </li>
                    <li>
                      <a className={`${styles["navLinks"]} nav-link`} href="#">
                        Job postings
                      </a>
                    </li>
                    <li>
                      <a className={`${styles["navLinks"]} nav-link`} href="#">
                        News and articles
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="col-md-3 footer-column">
                  <ul className="nav flex-column align-content-center">
                    <li className={`${styles["navItems"]} nav-item`}>
                      <span className="footer-title">Contact & Support</span>
                    </li>
                    <li>
                      <a className={`${styles["navLinks"]} nav-link`} href="#">
                        <i className="fas fa-comments"></i>Live chat
                      </a>
                    </li>
                    <li>
                      <a className={`${styles["navLinks"]} nav-link`} href="#">
                        <i className="fas fa-envelope"></i>Contact us
                      </a>
                    </li>
                    <li>
                      <a className={`${styles["navLinks"]} nav-link`} href="#">
                        <i className="fas fa-star"></i>Give feedback
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              {/* <div className="text-center"><i className={`fas ${styles["fa-ellipsis-h"]}`}></i></div> */}
              <center>
                <div className="col-md-4 box">
                  <br />
                  <span
                    className={`${styles["copyright"]} ${styles["quick-links"]}`}
                  >
                    Copyright &copy; AiVirex Website {new Date().getFullYear()}
                  </span>
                </div>
              </center>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
