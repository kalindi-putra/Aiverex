import React from 'react';
import { Layout, Menu } from 'antd';
import { Link, Outlet } from 'react-router-dom';

const { Header, Content, Footer } = Layout;

const ProtectedLayout = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
          <Menu.Item key="1">
            <Link to="/home">Home</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/student/dashboard">Dashboard</Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="/student/take-test">Take Test</Link>
          </Menu.Item>
          <Menu.Item key="4">
            <Link to="/logout">Logout</Link>
          </Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '0 50px', marginTop: '64px' }}>
        <div style={{ padding: 24, minHeight: 380 }}>
          <Outlet />
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Your App ©2025</Footer>
    </Layout>
  );
};

export default ProtectedLayout;