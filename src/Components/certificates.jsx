import React from 'react'
import { Typography, Card } from 'antd';
import styles from '../app/student/layout.module.css';

const Certificates = (props) => {

    const userData = props.userData ;
    const sampleCertificates = props.sampleCertificates ;
  return (
      <div className={styles['scrollItem']}>
          <section className={styles['section']}>
              <Typography.Title level={3} style={{ color: 'white', marginBottom: '24px' }}>
                  Certificates
              </Typography.Title>
              <div className={styles['certificationsGrid']}>
                  {(userData?.certificates || sampleCertificates).map((cert) => (
                      <Card
                          key={cert.id}
                          hoverable
                          className={styles['certificateCard']}
                          cover={
                              <div className={styles['certificateImageContainer']}>
                                  <img alt={cert.title} src={cert.image} className={styles['certificateImage']} />
                              </div>
                          }
                      >
                          <Card.Meta
                              title={<Typography.Text style={{ color: 'white' }}>{cert.title}</Typography.Text>}
                              description={
                                  <div className={styles['certificateDetails']}>
                                      <Typography.Text type="secondary" style={{color:'white'}}>{cert.issuer}</Typography.Text>
                                      <Typography.Text type="secondary" style={{color:'white'}}>{cert.date}</Typography.Text>
                                  </div>
                              }
                          />
                      </Card>
                  ))}
              </div>
          </section>
      </div>
  )
}

export default Certificates