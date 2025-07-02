import styles from './PostCode.module.css';
import { Form, Button, Checkbox, Input, Select, Space, Typography, Card, message, } from 'antd';
const { Title } = Typography;
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu,Tag } from 'antd';
import { useEffect, useState } from 'react';
import { NavLink,Outlet } from 'react-router-dom';
import './PostMenu.css'
import { Statistic } from 'antd';
const { Countdown } = Statistic;
  // Dayjs is also OK

const items = [
  {
    label:(
      <NavLink to='/post/problem' className={styles['menuLinks']} style={({isActive})=>{
        return {
          color:isActive?'#6B11DB':'',
      }
      }}>
         Problem
      </NavLink>
    ),
    key: 'problem',
    icon: <MailOutlined />,
  },
  {
    label:(
      <NavLink to='/post/submission' className={styles['menuLinks']} style={({isActive})=>{
        return {
          color:isActive?'#6B11DB':'',
      }
      }}>
        Submission
      </NavLink>
    ),
    key: 'submission',
    icon: <AppstoreOutlined />,
  },
  // {
  //   label: (
  //     <NavLink to="/post/leaderboard" className={styles['menuLinks']} style={({isActive})=>{
  //       return {
  //         color:isActive?'#6B11DB':'',
  //     }
  //     }}>
  //       LeaderBoard
  //     </NavLink>
  //   ),
  //   key: 'leader',
  //   icon: <AppstoreOutlined />,
  // },
  {
    label: (
      <NavLink to="/post/status" className={styles['menuLinks']} style={({isActive})=>{
        return {
          color:isActive?'#6B11DB':'',
      }
      }}>
        Review Status
      </NavLink>
    ),
    key: 'review',
    icon: <AppstoreOutlined />,
  },
  {
    label: (
      <NavLink to="/post/discussion" className={styles['menuLinks']} style={({isActive})=>{
        return {
          color:isActive?'#6B11DB':'',
      }
      }}>
        Discussion
      </NavLink>
    ),
    key: 'discussion',
    icon: <AppstoreOutlined />,
  },
  // {
  //   label: (
  //     <NavLink to="/post/editorial" className={styles['menuLinks']} style={({isActive})=>{
  //       return {
  //         color:isActive?'#6B11DB':'',
  //     }
  //     }}>
  //       Editorial
  //     </NavLink>
  //   ),
  //   key: 'editorial',
  //   icon: <AppstoreOutlined />,
  // },
  // {
  //   label: 'Navigation Three - Submenu',
  //   key: 'SubMenu',
  //   icon: <SettingOutlined />,
  //   children: [
  //     {
  //       type: 'group',
  //       label: 'Item 1',
  //       children: [
  //         {
  //           label: 'Option 1',
  //           key: 'setting:1',
  //         },
  //         {
  //           label: 'Option 2',
  //           key: 'setting:2',
  //         },
  //       ],
  //     },
  //     {
  //       type: 'group',
  //       label: 'Item 2',
  //       children: [
  //         {
  //           label: 'Option 3',
  //           key: 'setting:3',
  //         },
  //         {
  //           label: 'Option 4',
  //           key: 'setting:4',
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   label: (
  //     <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
  //       Navigation Four - Link
  //     </a>
  //   ),
  //   key: 'alipay',
  // },
];
const TimerOnFinish = () => {
  console.log('finished!');
};

const onFinishFailed = () => {
  message.error('Submit failed!');
};

const isValidGitHubLink = (link) => {
  // Regular expression pattern for matching GitHub repository links
  const githubLinkPattern = /^(?:https?:\/\/)?(?:www\.)?github\.com\/[^\s/]+\/[^\s/]+$/;

  // Test if the link matches the pattern
  return githubLinkPattern.test(link);
};




function PostCode() {
  const [deadline,setDeadline] = useState()
  useEffect(()=>{
    setDeadline(Date.now() + 1000 * 30)
  },[])
  const [current, setCurrent] = useState('mail');
  const onClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };
  return(
    <div className={styles['postDiv']} >
        <div className={styles['probHead']}>
            <h3>Array Reversal <br/><Tag color='orange' >Medium</Tag></h3>
            <Countdown  value={deadline} onFinish={TimerOnFinish} valueStyle={{color:'white'}} />
        </div>
      <div className={`${styles['probPart']} probPart`} >
       <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} className={styles['ant-menu']}  >
       </Menu>
       <Outlet/>
       {/* <ProblemContent/> */}
    </div>
        {/* {PostUrCode} */}
        </div>
    )
}

export default PostCode;