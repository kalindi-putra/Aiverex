import React from 'react';
import { SmileTwoTone } from '@ant-design/icons';
import { Link,NavLink } from 'react-router-dom';
import styles from './Navbar.module.css';
import { useEffect,useState } from 'react';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/UserContext';
import {auth} from '../firebase/Firebase'


function CustNav(props) {
  const {custLinks:NavLinks,left,right,dropDown,href,isLoggedIn} = props;
  
  
    return (
      <>
      <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/css/bootstrap.min.css'/>
  
      
    <div className={`${styles["navigation-wrap"]} ${styles["start-header"]} ${styles["start-style"]} sticky-top`} >
      <div className={"container-fluid"}>
        <div className="row">
          <div className="col p-0">
            <nav className={`navbar navbar-expand-md navbar-dark p-2`}>
            
              <Link className={`${styles['navLogo']} navbar-brand`} to="/" ><img src="https://aivirex.in/assets/img/favicon/apple-touch-icon.png" alt="" width="30" height="24" className="d-inline-block align-text-top"/>
                      AIVIREX
                </Link>	
              
              <button className={`${styles["navbarToggler"]} navbar-toggler`} type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className={`${styles["navbarTogglerIcon"]} navbar-toggler-icon`}></span>
              </button>
              
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav py-4 py-md-0">
                  {/* left */}
                {NavLinks.slice(0,left).map((item, index) => {
                  if(href=="0")
                  return (
                    <li className={`${styles["navItems"]} nav-item pl-2 pl-md-0 ml-0 ml-md-2`}>
                      <Link className={`${styles["navLinks"]} nav-link`}  to={item.link} key={index}>{item.name}</Link>
                    </li>
                  )
                  else if(href=="1")
                  return (
                    <li className={`${styles["navItems"]} nav-item pl-2 pl-md-0 ml-0 ml-md-2`}>
                      <a className={`${styles["navLinks"]} nav-link`}  href={item.link} key={index}>{item.name}</a>
                    </li>
                  )
                })}
                </ul>
              </div>
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ml-auto py-4 py-md-0">
                  {dropDown=="1"&&<li className={`${styles["navItems"]} nav-item pl-2 pl-md-0 ml-0 ml-md-2 position-relative`}>
                    {/*  dropdown-toggle */}
                    <Link className={`${styles["navLinks"]} nav-link`}  data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false"><SmileTwoTone size={150}/></Link>
                    <div className={`${styles["dropdown-menu"]} ${styles["bg-black"]} dropdown-menu position-absolute`}>
                      {NavLinks[right].map((item, index) => {
                        return(
                          <Link className={`${styles["dropdown-item"]} ${styles["text-white"]} ${styles["navLinks"]} nav-link `} to={item.link} key={index} >{item.name}</Link>
                        )
                      })}
                    </div>
                  </li>}
                  {/* right */}
                  {NavLinks.slice(left,isLoggedIn=="1"?right-2:right).map((item, index) => {
                    return (
                      <li className={`${styles["navItems"]} nav-item pl-2 pl-md-0 ml-0 ml-md-2`} key={index} >
                        <Link className={`${styles["navLinks"]} nav-link`}  to={item.link} key={index}>{item.name}</Link>
                      </li>
                    )
                  })}
                  {isLoggedIn=="1"&&<li className={`${styles["navItems"]} nav-item pl-2 pl-md-0 ml-0 ml-md-2`}>
                    <Link className={`${styles["navLinks"]} nav-link`}  to="/logout" key="logout">Logout</Link>
                  </li>}
                </ul>
  
              </div>
              
            </nav>		
          </div>
        </div>
      </div>
    </div>
    
      </>
    )
  }


const LandNav = () => {
	const {isLoggedIn} = useContext(AuthContext)
	const navigate = useNavigate()
	const handleLogout = () => {
		//   const navigate = useNavigate()
		  auth.signOut()
			.then(() => {
			  // Sign-out successful.
			  navigate('/')
			  console.log('User signed out');
			})
			.catch((error) => {
			  // An error happened.
			  console.error('Sign-out error', error);
			});
		};
	return(
		<>
    <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/css/bootstrap.min.css'/>


	<div className={`${styles["navigation-wrap"]} ${styles["start-header"]} ${styles["start-style"]} sticky-top`} >
		<div className={"container-fluid"}>
			<div className="row">
				<div className="col p-0">
					<nav className={`navbar navbar-expand-md navbar-dark p-2`}>

					
						<Link className={`${styles['navLogo']} navbar-brand`} to="/" ><img src="https://aivirex.in/assets/img/favicon/apple-touch-icon.png" alt="" width="30" height="24" className="d-inline-block align-text-top"/>
      							AIVIREX
	  					</Link>	
						
						<button className={`${styles["navbarToggler"]} navbar-toggler`} type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
							<span className={`${styles["navbarTogglerIcon"]} navbar-toggler-icon`}></span>
						</button>
						
						<div className="collapse navbar-collapse" id="navbarSupportedContent">
							<ul className="navbar-nav py-4 py-md-0">
								<li className={`${styles["navItems"]} nav-item pl-2 pl-md-0 ml-0 ml-md-2`}>
									<a className={`${styles["navLinks"]} nav-link`}  href="#hero-sec">Home</a>
								</li>
								<li className={`${styles["navItems"]} nav-item pl-2 pl-md-0 ml-0 ml-md-2`}>
									<a className={`${styles["navLinks"]} nav-link`}  href="#about">About</a>
								</li>
								<li className={`${styles["navItems"]} nav-item pl-2 pl-md-0 ml-0 ml-md-2`}>
									<a className={`${styles["navLinks"]} nav-link`}  href="#progress">How it works</a>
								</li>
								<li className={`${styles["navItems"]} nav-item pl-2 pl-md-0 ml-0 ml-md-2`}>
									<a className={`${styles["navLinks"]} nav-link`}  href="#team">Team</a>
								</li>
								<li className={`${styles["navItems"]} nav-item pl-2 pl-md-0 ml-0 ml-md-2`}>
									<a className={`${styles["navLinks"]} nav-link`}  href="#featured">Featured</a>
								</li>
							</ul>
						</div>
						<div className="collapse navbar-collapse" id="navbarSupportedContent">
							<ul className="navbar-nav ml-auto py-4 py-md-0">
								{/* <li className={`${styles["navItems"]} nav-item pl-2 pl-md-0 ml-0 ml-md-2`} >
									<Link className={`${styles["navLinks"]} nav-link`}  to="/login">Login</Link>
								</li>
                <li className={`${styles["navItems"]} nav-item pl-2 pl-md-0 ml-0 ml-md-2`} >
									<Link className={`${styles["navLinks"]} nav-link`}  to="/register">Register</Link>
								</li>
								<li className={`${styles["navItems"]} nav-item pl-2 pl-md-0 ml-0 ml-md-2`}>
									<Link className={`${styles["navLinks"]} nav-link`}  to="/logout" key="logout">Logout</Link>
								</li> */}
                {!isLoggedIn&&(<li className={`${styles["navItems"]} nav-item pl-2 pl-md-0 ml-0 ml-md-2`} >
									<NavLink className={`${styles["navLinks"]} nav-link ${({isActive})=>{isActive&&styles['activeLink']}}`}  to="/login">Login</NavLink>
								</li>)}
								{!isLoggedIn&&(<li className={`${styles["navItems"]} nav-item pl-2 pl-md-0 ml-0 ml-md-2`} >
									<Link className={`${styles["navLinks"]} nav-link`}  to="/register">Register</Link>
								</li>)}
								{isLoggedIn&&(<li className={`${styles["navItems"]} nav-item pl-2 pl-md-0 ml-0 ml-md-2`}>
									<Link className={`${styles["navLinks"]} nav-link`} onClick={handleLogout} >Logout</Link>
								</li>)}
							</ul>

						</div>
						
					</nav>		
				</div>
			</div>
		</div>
	</div>
	
    </>
	)

}


const MainNav = () => {
	const {userData,isLoggedIn} = useContext(AuthContext)
	const navigate = useNavigate()
	const handleLogout = () => {
		//   const navigate = useNavigate()
		  auth.signOut()
			.then(() => {
			  // Sign-out successful.
			  navigate('/')
			  console.log('User signed out');
			})
			.catch((error) => {
			  // An error happened.
			  console.error('Sign-out error', error);
			});
		};
	return (
		<>
    <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/css/bootstrap.min.css'/>

    
	<div className={`${styles["navigation-wrap"]} ${styles["start-header"]} sticky-top`} >
		<div className={"container-fluid"}>
			<div className="row">
				<div className="col p-0">
					<nav className={`navbar navbar-expand-md navbar-dark p-2`}>
					
						<Link className={`${styles['navLogo']} navbar-brand`} to="/" ><img src="https://aivirex.in/assets/img/favicon/apple-touch-icon.png" alt="" width="30" height="24" className="d-inline-block align-text-top"/>
      							AIVIREX
	  					</Link>	
						
						<button className={`${styles["navbarToggler"]} navbar-toggler`} type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
							<span className={`${styles["navbarTogglerIcon"]} navbar-toggler-icon`}></span>
						</button>
						
						{userData&&<div className="collapse navbar-collapse" id="navbarSupportedContent">
							<ul className="navbar-nav py-4 py-md-0">
								{userData.role=='student'&&
                <>
                <li className={`${styles["navItems"]} nav-item pl-2 pl-md-0 ml-0 ml-md-2`}>
									<NavLink className={({isActive})=>`${styles["navLinks"]} nav-link ${isActive&&styles['activeLink']}`}  to="/home">Home</NavLink>
								</li>
								<li className={`${styles["navItems"]} nav-item pl-2 pl-md-0 ml-0 ml-md-2`}>
									<NavLink className={({isActive})=>`${styles["navLinks"]} nav-link ${isActive&&styles['activeLink']}`}  to="/courses">Courses</NavLink>
								</li>
								<li className={`${styles["navItems"]} nav-item pl-2 pl-md-0 ml-0 ml-md-2`}>
									<NavLink className={({isActive})=>`${styles["navLinks"]} nav-link ${isActive&&styles['activeLink']}`}  to="/review">Review</NavLink>
								</li>
								<li className={`${styles["navItems"]} nav-item pl-2 pl-md-0 ml-0 ml-md-2`}>
									<NavLink className={({isActive})=>`${styles["navLinks"]} nav-link ${isActive&&styles['activeLink']}`}  to="/post/problem">PostCode</NavLink>
								</li>
                </>
                }
								{userData.role=='mentor'&&<li className={`${styles["navItems"]} nav-item pl-2 pl-md-0 ml-0 ml-md-2`}>
									<NavLink className={({isActive})=>`${styles["navLinks"]} nav-link ${isActive&&styles['activeLink']}`}  to="/home">Home</NavLink>
								</li>}
							</ul>
						</div>}
						<div className="collapse navbar-collapse" id="navbarSupportedContent">
							<ul className="navbar-nav ml-auto py-4 py-md-0">
							<	li className={`${styles["navItems"]} nav-item position-relative`}>
									{/*  dropdown-toggle */}
									<Link className={`${styles["navLinks"]} nav-link`}  data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false"><SmileTwoTone size={150}/></Link>
									<div className={`${styles["dropdown-menu"]} ${styles["bg-black"]} dropdown-menu position-absolute`}>
										{isLoggedIn&&<>
										<Link className={`${styles["dropdown-item"]} ${styles["text-white"]} ${styles["navLinks"]} nav-link `} to="/home" >Dashboard</Link>	
										<Link className={`${styles["dropdown-item"]} ${styles["text-white"]} ${styles["navLinks"]} nav-link `} to="/home/notify" >Notification</Link>	
										<Link className={`${styles["dropdown-item"]} ${styles["text-white"]} ${styles["navLinks"]} nav-link `} to="/home/edit" >Edit Profile</Link>	
										</>}
                    {!isLoggedIn&&(
									<Link className={`${styles["navLinks"]} nav-link`}  to="/login">Login</Link>
								    )}
								{!isLoggedIn&&(
									<Link className={`${styles["navLinks"]} nav-link`}  to="/register">Register</Link>
								    )}
								{isLoggedIn&&(
									<Link className={`${styles["navLinks"]} nav-link`} >Logout</Link>
								    )}
                  </div>
								</li>
								<ul className="navbar-nav ml-auto py-4 py-md-0">
								{!isLoggedIn&&(<li className={`${styles["navItems"]} nav-item pl-2 pl-md-0 ml-0 ml-md-2`} >
								<NavLink className={({isActive})=>`${styles["navLinks"]} nav-link ${isActive&&styles['activeLink']}`}  to="/login">Login</NavLink>

								</li>)}
								{!isLoggedIn&&(<li className={`${styles["navItems"]} nav-item pl-2 pl-md-0 ml-0 ml-md-2`} >
									<NavLink className={({isActive})=>`${styles["navLinks"]} nav-link ${isActive&&styles['activeLink']}`}  to="/register">Register</NavLink>
								</li>)}
								{isLoggedIn&&(<li className={`${styles["navItems"]} nav-item pl-2 pl-md-0 ml-0 ml-md-2`}>
									<Link className={`${styles["navLinks"]} nav-link`} onClick={handleLogout} >Logout</Link>
								</li>)}
							</ul>
							</ul>

						</div>
						
					</nav>		
				</div>
			</div>
		</div>
	</div>
	
    </>
	)
}


export { CustNav, LandNav,MainNav}