import React,{useContext} from 'react'
import styles from './Home.module.css'
import { Link } from 'react-router-dom'
import { CustDes } from '../Components/Card'
import { Typography, Row, Col } from 'antd';
import {CustCarosuel,NormalCarosuel} from '../Components/CustCarosuel';
import { BarChartOutlined,FormOutlined,CodeOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { ExpertsData } from '../store/data';
import {CustNav,LandNav} from '../Components/CustNav';
import { AuthContext } from '../context/UserContext';

function Home2() { 
  const {isLoggedIn} = useContext(AuthContext)
  const LandLinks = [
    {
      name: 'Home',
      link: '#hero-sec'
    },
    {
      name: 'About',
      link: '#about'
    },
    {
      name: 'How it works',
      link: '#progress'
    },
    {
      name: 'Team',
      link: '#team'
    },
    {
      name: 'Featured',
      link: '#featured'
    },
    {
      name: 'Login',
      link: '/login'
    },
    {
      name: 'Register',
      link: '/register'
    },
  ]

  return (
    <div>
    <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/css/bootstrap.min.css'/>

      {/* <CustNav custLinks={LandLinks} left="5" right="8" dropDown="0" href="1"/> */}
      <LandNav/>

<div className={styles["hero-container"]} id="hero-sec">
  <div className="container-fluid">
  <div className="row d-flex">
    <div className="col align-middle">
      <div className="px-2 py-2 head">
      {/* <img src="https://img.freepik.com/free-vector/happy-freelancer-with-computer-home-young-man-sitting-armchair-using-laptop-chatting-online-smiling-vector-illustration-distance-work-online-learning-freelance_74855-8401.jpg?w=900&t=st=1667037491~exp=1667038091~hmac=7c71ea8afc8f3cc8065c5ccc05d105e3c8a7b76f0133016cb210a7882dc19611" className="img-fluid" alt="..."/> */}
      {/* <img src="https://sb-ui-kit-pro.startbootstrap.com/assets/img/illustrations/programming.svg" className="img-fluid"  alt="..."/> */}
      <lottie-player src="https://assets5.lottiefiles.com/packages/lf20_sy6jjyct.json"  background="transparent"  speed="1"  style={{width:'100%',height:'400px'}}  loop  autoplay></lottie-player>
      </div>
    </div>
    <div className="col text-white">
      <div className="px-5 py-5 mt-5">
        <div className="px-2 py-2 align-middle">
        <h4>Get all your needs Here</h4>
        <p> An online learning and teaching marketplace with over 204000 courses and 54 million students. Learn programming, marketing, data science and more.</p>
        </div>
        <div className="px-2 py-2">
          <Link to={isLoggedIn?'/home':'/login'} className={`${styles["btn"]} btn ${styles["btn-outline-primary"]}`}>Explore More About Us</Link>
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
<div className={`card-container ${styles["bg-black"]}`} id="about">
  <div className="container-fluid px-3 py-4">
  <div className="center mx-4 my-4 text-white">
      <h2 >About Us</h2>
    </div>
  <div className="d-flex flex-wrap">
    <div className="col text-white">
      <div className="px-2">
        <div className="align-middle">
        <h4>Who Are We?</h4>
        <p>AiVirex is a start-up company that was developed largely to address issues that the majority 
          of the population encounters with the help of innovation and technology. As a team, we take pride in 
          our strong work ethic and quick responsiveness and are firm believers in the value of creativity, meticulous attention to 
          detail, and achieving the optimal harmony between concept and execution to produce powerful and efficient solutions.
           We put a lot of effort into making our mission a reality in both of our daily endeavours: meeting the needs of our 
           clients and making the world a better place. Let's Innovate!</p>
        </div>
        <div className="px-2 py-2">
          <button type="button" className={`${styles["btn"]} btn ${styles["btn-outline-primary"]}`}>Drop A Review</button>
        </div>
      </div>
    </div>
    <div className="col align-middle">
      <div className="px-2 py-2">
      {/* <lottie-player src="https://assets6.lottiefiles.com/packages/lf20_hzfmxrr7.json"  background="transparent"  speed="1"  style="width: 300px; height: 300px;"  loop controls autoplay></lottie-player> */}
      {/* <img src="https://img.freepik.com/free-vector/happy-freelancer-with-computer-home-young-man-sitting-armchair-using-laptop-chatting-online-smiling-vector-illustration-distance-work-online-learning-freelance_74855-8401.jpg?w=900&t=st=1667037491~exp=1667038091~hmac=7c71ea8afc8f3cc8065c5ccc05d105e3c8a7b76f0133016cb210a7882dc19611" className="img-fluid" alt="..."/> */}
      <img src="https://sb-ui-kit-pro.startbootstrap.com/assets/img/illustrations/windows.svg" className="img-fluid" style={{width:'500px',height:'300px'}} alt="..."/>
      </div>
    </div>
</div>
</div>
</div>  
<section id="progress"className={`${styles["process"]} ${styles["bg-black"]}`}>
      <div className="container-fluid container-fluid-max text-white">
        <div className="row text-center py-5">
          <div className="col-12 pb-4">
            <h2 className="text-red">How It Works</h2>
          </div>
          <div className="col-12 col-sm-6 col-lg-3">
            <span className="fa-stack fa-2x">
          <CodeOutlined style={{fontSize:'60px',color:'#6B11DB'}} />
            </span>
            <h3 className="mt-3 text-red h4">Pick a Course</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sed repudiandae.</p>
          </div>
          <div className="col-12 col-sm-6 col-lg-3">
          <span className="fa-stack fa-2x">
          <FormOutlined style={{fontSize:'60px',color:'#6B11DB'}} />
            </span>
            <h3 className="mt-3 text-red h4">Take a Test</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sed repudiandae.</p>
          </div>
          <div className="col-12 col-sm-6 col-lg-3">
          <span className="fa-stack fa-2x">
          <BarChartOutlined style={{fontSize:'60px',color:'#6B11DB'}} />
            </span>
            <h3 className="mt-3 text-red h4">Get Reviewed</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sed repudiandae.</p>
          </div>
          <div className="col-12 col-sm-6 col-lg-3">
          <span className="fa-stack fa-2x">
          <CheckCircleOutlined style={{fontSize:'60px',color:'#6B11DB'}} />
            </span>
            <h3 className="mt-3 text-red h4">Be Certified</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sed repudiandae.</p>

          </div>
          <div className="col-12 pt-3">
            <a className={`${styles["btn"]} btn`} style={{width:'250px'}}  target="_blank" role="button">Learn More →</a>
          </div>
        </div>
      </div>
    </section>
<div className={`card-container ${styles["bg-black"]}`} id="team" >
  <div className="container-fluid px-3 py-3">
    <div className="center mx-4 my-4 text-white">
      <h2 >Meet Our Expert</h2>
      <p>Highly professional team</p>
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
    <Row xs={1} md={2} >
    {
      ExpertsData.slice(0,4).map((expert)=>{
        return <Col lg={6} md={8} sm={12}>
        <CustDes content={expert} type='expert' className="expertCard"/>
        </Col>
      })
    }
    </Row>
</div>
</div>
<div className={`${styles["testimonals-container"]} ${styles["text-white"]} ${styles["bg-black"]}`} id="testi">
  <div className="container-fluid">
  <div className="center mx-4 my-4 text-white">
      <h2>What Peoples Say </h2>
      <p>Read our Testimonals</p>
    </div>
 
    <CustCarosuel content={ExpertsData} type='testi'/>
    {/* <NormalCarosuel/> */}

</div>
</div>

  
<div className={styles["banner-container"]} id="featured">
  <div className="container-fluid px-4 py-4">
  <div className={`${styles["card"]} card text-white`}>
  <h2 className="card-header">Featured Courses</h2>
  <div className="card-body">
    <div className="container">
    <div className="row d-flex flex-wrap">
      <div className="col">
         <div className={`${styles["card"]} card ${styles["moveUp"]} move-up mb-2`} >
  <div className="card-header">Web Development</div>
  <div className="card-body">
    <h5 className="card-title">Front End + Backend</h5>
    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
  </div>
</div>
      </div>
      <div className="col">
    <div className={`${styles["card"]} card ${styles["moveUp"]} move-up mb-2`} >
  <div className="card-header">Web3.0</div>
  <div className="card-body">
    <h5 className="card-title">Web3 and Tools</h5>
    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
  </div>
</div>
      </div>
      <div className="col">
        <div className={`${styles["card"]} card ${styles["moveUp"]} move-up mb-2`} >
  <div className="card-header">Java Masterclass</div>
  <div className="card-body">
    <h5 className="card-title">Begineer Course</h5>
    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
  </div>
</div>
      </div>
        <div className="col">
        <div className={`${styles["card"]} card ${styles["moveUp"]} move-up mb-2`} >
  <div className="card-header">Python </div>
  <div className="card-body">
    <h5 className="card-title">Python AI</h5>
    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
  </div>
</div>
      </div>
      <div className="col">
        <div className={`${styles["card"]} card ${styles["moveUp"]} move-up mb-2`} >
  <div className="card-header">Python </div>
  <div className="card-body">
    <h5 className="card-title">Python AI</h5>
    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
  </div>
</div>
      </div>
      <div className="col">
        <div className={`${styles["card"]} card ${styles["moveUp"]} move-up mb-2`} >
  <div className="card-header">Python </div>
  <div className="card-body">
    <h5 className="card-title">Python AI</h5>
    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
  </div>
</div>
      </div>   


    </div>
    </div>
  </div>
</div>
</div>
</div>
<div className={`${styles["footer-container"]} ${styles["foot"]} p-5`}>
  <div className="container-fluid">
    <div>
  <div className="row" style={{textAlign:'left'}}>
  <div className="col-md-3 footer-column">
  <Link className={`${styles['navLogo']} navbar-brand`} to="/" ><img src="https://aivirex.in/assets/img/favicon/apple-touch-icon.png" alt="" width="30" height="24" className="d-inline-block align-text-top"/>
      							AIVIREX
	  					</Link>	
  <label style={{fontSize:'0.9rem'}} >
  Aivirex is a platform for learning and teaching online where students are mastering new skills and achieving their goals by learning from an extensive library of over 45,000 courses taught by expert instructors.
  </label>
  </div>
   <div className="col-md-3 footer-column">
        <ul className="nav flex-column">
          <li className={`${styles["navItems"]} nav-item`}>
            <span className="footer-title">Links</span>
          </li>
          <li >
            <a className={`${styles["navLinks"]} nav-link`} href="#hero-sec">Home</a>
          </li>
          <li >
            <a className={`${styles["navLinks"]} nav-link`} href="#about">About</a>
          </li>
          <li >
            <a className={`${styles["navLinks"]} nav-link`} href="#progress">How it works</a>
          </li>
          <li >
            <a className={`${styles["navLinks"]} nav-link`} href="#team">Team</a>
          </li>
          <li >
            <a className={`${styles["navLinks"]} nav-link`} href="#featured">Featured</a>
          </li>
        </ul>
      </div>
      <div className="col-md-3 footer-column">
        <ul className="nav flex-column">
          <li className={`${styles["navItems"]} nav-item`}>
            <span className="footer-title">Company</span>
          </li>
          <li >
            <a className={`${styles["navLinks"]} nav-link`} href="#">About us</a>
          </li>
          <li >
            <a className={`${styles["navLinks"]} nav-link`} href="#">Job postings</a>
          </li>
          <li >
            <a className={`${styles["navLinks"]} nav-link`} href="#">News and articles</a>
          </li>
        </ul>
      </div>
      <div className="col-md-3 footer-column">
        <ul className="nav flex-column">
          <li className={`${styles["navItems"]} nav-item`}>
            <span className="footer-title">Contact & Support</span>
          </li>
          <li >
            <a className={`${styles["navLinks"]} nav-link`} href="#"><i className="fas fa-comments"></i>Live chat</a>
          </li>
          <li >
            <a className={`${styles["navLinks"]} nav-link`} href="#"><i className="fas fa-envelope"></i>Contact us</a>
          </li>
          <li >
            <a className={`${styles["navLinks"]} nav-link`} href="#"><i className="fas fa-star"></i>Give feedback</a>
          </li>
        </ul>
      </div>
    </div>

    {/* <div className="text-center"><i className={`fas ${styles["fa-ellipsis-h"]}`}></i></div> */}
    <center>
      <div className="col-md-4 box">
      <br/>
        <span className={`${styles["copyright"]} ${styles["quick-links"]}`}>Copyright &copy; AiVirex Website {new Date().getFullYear()}
        </span>
      </div>
    </center>
  </div>
</div>
</div>
</div>
    </div>
  )
}

export default Home2
