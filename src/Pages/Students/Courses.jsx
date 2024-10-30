import React from 'react'
import { CourseList } from './Dashboard';
import { Typography,Row,Col } from 'antd';
import {CustDes} from "../../Components/Card";


 const Courses = () => {
  return (
    <>
    <Typography.Title level={2} style={{color:'#fff',textAlign:'center'}} >Available Courses<br/>
    </Typography.Title >
    <Row  >
        {CourseList.slice(0,8).map((course)=>(
            <Col lg={6} md={8} sm={12}>
             <CustDes content={course} type='course' />
            </Col>
        ))}
    </Row>
    <Typography.Title level={2} style={{color:'#fff',textAlign:'center'}} >
    <a class="view">View More</a>
    </Typography.Title>
    </>
  )
}

export default Courses
