import React from 'react'
import { Card ,Typography} from 'antd';
import styles from "./Auth.module.css"
import { Link } from 'react-router-dom';
const { Meta } = Card;

function LoginPage() {
  return (
    <div className={styles['RegDiv']}>
    <Typography.Title level={2} style={{fontSize:'40px',textAlign:'center',fontWeight:'0',marginTop:'30px'}}>Login</Typography.Title>
    <br/>
    <div className={styles['container']}>
    <Card 
    
    className={styles['cardReg']}
    cover={<img  src='/assets/mentors.png' alt='student' className={styles['regImg']}/>  }>
     <Link to="/MentorLogin" className={styles["redirect"]}>Login As Mentor</Link>
    
  </Card>
    <Card
    className={styles['cardReg']}
    cover={<img  src='/assets/students.png' alt='student' className={styles['regImg']}/>  }>
     <Link to="/StudentLogin" className={styles["redirect"]}>Login As Student</Link>
  </Card>
  
</div>
    </div>   

    
  )
}

export default LoginPage