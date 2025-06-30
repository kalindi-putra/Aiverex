import React from 'react'
import {Typography} from 'antd';
import styles from './layout.module.css';
import CustTable from './Table'

const SubmittedTests = () => {
  return (
      <div className={styles['scrollItem']}>
          <section className={styles['section']}>
              <Typography.Title level={3} style={{ color: 'white', marginBottom: '24px' }}>
                  Submitted Tests
              </Typography.Title>
              <CustTable />
          </section>
      </div>
  )
}

export default SubmittedTests