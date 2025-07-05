import { Layout, Space, } from 'antd';
const { Sider } = Layout;
import SideMenu from '../app/student/sideMenu';
const siderStyle = {
  textAlign: 'center',
  color: '#fff',
  backgroundColor: 'transparent',
  padding: '0',
  margin: '0',
  position: 'sticky',
  bottom: 0,
};
const Main = (props) => {
  return (
    <Space
      direction="vertical"
      style={{
        width: '100%',
        padding: 0,
      }}
      size={[0, 48]}
    >
      <Layout>
        <Sider style={siderStyle}><SideMenu items={props.items} /></Sider>
      </Layout>
    </Space>
  )

}

export default Main;