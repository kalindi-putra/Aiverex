import React from 'react';
import { useRouter } from 'next/navigation';
import { Menu } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { StudentItems } from '../app/store/data';
import './side.css';
import { auth } from '../firebase/Firebase';

const SideMenu = () => {
  const navigate = useRouter() ;
  const handleNavigation = (sectionId) => {
    const el = document.getElementById(sectionId);
    if(sectionId === '/student/codeEditor'){
      navigate.push('/student/codeEditor') ;
    }
    // else if(sectionId === '/student/edit-profile'){
    //   navigate('/student/edit-profile') ;
    // }
    else if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLogout = () => {
    auth.signOut().then(() => {
      console.log('User signed out');
      navigate.push('/') ;
    });
  };

  return (
    <div className="SideMenuFeatures">
      <Menu
        mode="vertical"
        theme="dark"
        defaultSelectedKeys={[StudentItems?.[0]?.key || '']}
        selectable
      >
        {StudentItems.map((item) => (
          <Menu.Item
            key={item.key}
            icon={<item.icon />}
            style={{ marginBottom: '20px' }}
            onClick={() => handleNavigation(item.sectionId)}
          >
            {item.label}
          </Menu.Item>
        ))}
        <Menu.Item
          key="logout"
          icon={<LogoutOutlined />}
          danger
          onClick={handleLogout}
          style={{
            position: 'absolute',
            bottom: '20px',
            width: '100%',
          }}
        >
          Logout
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default SideMenu;
