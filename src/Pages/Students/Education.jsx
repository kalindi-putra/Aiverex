import React from 'react'
import {Typography} from 'antd';
import styles from './layout.module.css';

const Education = (props) => {

    const eduArray = props.eduArray ;
    const userData = props.userData ;
  return (
      <div className={styles['scrollItem']}>
          <section className={styles['section']}>
              <Typography.Title level={3} style={{ color: 'white', marginBottom: '24px' }}>
                  Education
              </Typography.Title>
              <div className={styles['educationGrid']}>
                  {(userData?.Education || eduArray).map((edu) => (
                      <div key={edu.id} className={styles['educationCard']}>
                          <Typography.Title style={{color:'white'}} level={4}>{edu.title}</Typography.Title>
                          <Typography.Text style={{color:'white'}} className={styles['eduMed']}>{edu.name}</Typography.Text>
                          <Typography.Text style={{color:'white'}}>{edu.year}</Typography.Text>
                          <Typography.Text style={{color:'white'}}>{edu.grade}</Typography.Text>
                          <Typography.Text style={{color:'white'}}>{edu.marks}</Typography.Text>
                      </div>
                  ))}
              </div>
          </section>
      </div>
  )
}

export default Education