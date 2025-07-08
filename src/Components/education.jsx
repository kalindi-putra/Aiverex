import React from 'react'
import {Typography} from 'antd';
import styles from '../app/student/layout.module.css';
import { BankOutlined, DotChartOutlined} from '@ant-design/icons';
import { BuildingIcon } from 'lucide-react';

const Education = (props) => {

    const eduArray = props.eduArray ;
    const userData = props.userData ;
  return (
      <div style={{marginTop:'40px'}}>
          <section>
              <Typography.Title level={3} style={{ color: 'white', marginBottom: '15px' }}>
                  Education
              </Typography.Title>
              <div className={styles['educationGrid']}>
                  {(userData?.Education || eduArray).map((edu) => (
                      <div key={edu.id} className={styles['educationCard']}>
                          <Typography.Title style={{color:'white'}} level={4}>{edu.title}</Typography.Title>
                          <div style={{display:'flex' , gap:'15px'}}>
                              <BankOutlined style={{fontSize:'40px'}} />
                              <div style={{ display: 'flex', flexDirection: 'column'}}>
                                  <Typography.Text style={{ color: 'white' , fontWeight:'bolder' , fontSize:'15px' }} className={styles['eduMed']}>{edu.name}</Typography.Text>
                                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                                      <div style={{ display: 'flex' }}>
                                          <Typography.Text style={{ color: '#a5a5a5', paddingRight: '3px' }}>{edu.grade}</Typography.Text>
                                          <p style={{color: '#a5a5a5'}}>-</p>
                                          <Typography.Text style={{ color: '#a5a5a5', paddingLeft: '3px' }}>{edu.marks}</Typography.Text>
                                      </div>
                                      <Typography.Text style={{ color: '#a5a5a5' , marginTop:'-18px' }}>{edu.year}</Typography.Text>
                                  </div>
                              </div>
                          </div>
                      </div>
                  ))}
              </div>
          </section>
      </div>
  )
}

export default Education