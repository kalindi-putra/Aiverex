import React from 'react'
import { Card ,Typography} from 'antd';
import styles from "./Auth.module.css"
import { Link } from 'react-router-dom';


const { Meta } = Card;
function RegisterPage() {
  return (
    <div className={styles['RegDiv']}>
    <Typography.Title level={2} style={{fontSize:'40px',textAlign:'center',fontWeight:'0',marginTop:'30px'}}>Register</Typography.Title>
    <br/>
    <div className={styles['container']}>
    <Card 
    
    className={styles['cardReg']}
    cover={<img  src='/assets/mentors.png' alt='student' className={styles['regImg']}/>  }>
     <Link to="/MentorRegister" className={styles["redirect"]}>Register As Mentor</Link>
    
  </Card>
    <Card
    className={styles['cardReg']}
    cover={<img  src='/assets/students.png' alt='student' className={styles['regImg']}/>  }>
     <Link to="/StudentRegister" className={styles["redirect"]}>Register As Student</Link>
  </Card>
  
</div>
    </div>   

    
  )
}

export default RegisterPage