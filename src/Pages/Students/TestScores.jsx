import React from 'react'
import {Typography} from 'antd';
import styles from './layout.module.css';
import Scores from './Scores';

const TestScores = (props) => {
    const progress = props.progress ;
    const scrWidth = props.scrWidth ;

  return (
      <div className={styles['scrollItem']}>
          <section className={styles['section']}>
              <div style={{
                  background: '#343434',
                  width: '100%',
                  borderRadius: '30px',
                  padding: scrWidth ? 10 : 30,
              }}>
                  <Typography.Title level={4} style={{ color: '#fff', margin: '2px' , marginBottom: '30px'}}>
                      Test Scores
                      <a className="view" style={{ float: 'right' }}>View More</a>
                  </Typography.Title>
                  {progress.slice(0, scrWidth ? 2 : 6).map((pro, i) => (
                      <Scores key={i} pro={pro} />
                  ))}
              </div>
          </section>
      </div>
  )
}

export default TestScores