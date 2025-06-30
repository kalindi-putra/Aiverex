import { Layout, Space, Typography, Card, Statistic, Table,Avatar, Button,  } from 'antd';
const { Header, Footer, Sider, Content } = Layout;
import DemoLine from "../../Components/MentChart";

import SideMenu from '../../Components/SideMenu';
import MentTable from '../../Components/MentTable';
import{ DollarCircleOutlined, DollarCircleFilled, UsergroupAddOutlined, BugFilled,ScheduleOutlined,UserOutlined } from '@ant-design/icons'
import styles from './mlay.module.css';
import { Link } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase/Firebase';
import { useContext } from 'react';
import { AuthContext } from '../../context/UserContext';
import Tabletops from '../../Components/newMentTable';
import DemoLines from '../../Components/MentChart2';

const headerStyle = {
    color: '#fff',
  height:'auto',
  background: 'transparent',
  padding: 30,
  };
  const contentStyle = {
    textAlign: 'center',
    height: 'auto',
    color: '#fff',
    background: '#343434',
    margin: 10,
    borderRadius: '30px',
    overflow: 'hidden',
  };
const siderStyle = {
  textAlign: 'center',
  color: '#fff',
  backgroundColor: 'transparent',
  padding:'0',
    margin: '0',
    position:'sticky',
    bottom:0,
};
const footerStyle = {
    height: 'auto',
    color: '#fff',
    backgroundColor: '#108ee9',
    background: '#343434',
    margin: 10,
    overflow: 'hidden',
}


const App = () => {

  const [user] = useAuthState(auth);
  
  const { userData } = useContext(AuthContext);
  
  // Check if userData exists and retrieve the name
  const name = userData ? userData.name : '';
  const role = userData ? userData.role : '';
  const photoURL = userData ? userData.photoURL : '';
  const experience = userData ? userData.experience : '';
  const company = userData ? userData.company : '';
  const revenue = userData ? userData.revenue : '';
  const reviewed = userData ? userData.reviewed : '';

  return (

    <Layout>
        {/* <Footer style={footerStyle}>  */}
          <Typography.Title level={2} style={{color:'white', textAlign:'center', padding:0, margin:0}}>Mentor Dashboard</Typography.Title>
          {/* </Footer> */}
          <Footer style={footerStyle} className={styles['profile']} id="profile"> 
            <div className={styles['profileDiv']}>
            <Typography.Text  >Profile</Typography.Text>
            {user.photoURL ? (<img src={user.photoURL} alt="Profile" style={{ borderRadius: '60%' }} />) : (<Avatar size={64} icon={<UserOutlined />} />)}

            <Typography.Title level={5} style={{ margin: 0 }} >{ name }</Typography.Title>
            <div>
            <Link to="edit" style={{
              marginRight:'10px',
              backgroundColor:'#6B11DC',
              padding:'5px 20px',
              borderRadius:'5px',
              textDecoration:'none',
              color:'white'
            }} >Edit</Link>
            <Link to="" style={{
              marginRight:'10px',
              backgroundColor:'#6B11DC',
              padding:'5px 20px',
              borderRadius:'5px',
              textDecoration:'none',
              color:'white'
            }} >View</Link>
            </div>
            </div>
            <div className={styles['profileDiv']}>
            <Typography.Text  >Name : {name}</Typography.Text>
            <Typography.Text  >Company : {company}</Typography.Text>
            <Typography.Text  >Experience : {experience}</Typography.Text>
            <Typography.Text  >Email : {user.email ? (user.email) : ('email not found') }</Typography.Text>
            <div style={{paddingTop:'10px'}}>
              <Link to="https://github.com" target='_blank' style={{
                marginRight:'10px',
                backgroundColor:'#6B11DC',
                padding:'5px 20px',
                borderRadius:'5px',
                textDecoration:'none',
                color:'white'
              }} >Github</Link>
            <Link to="/link" style={{
              marginRight:'10px',
              backgroundColor:'#6B11DC',
              padding:'5px 20px',
              borderRadius:'5px',
              textDecoration:'none',
              color:'white'
            }} >Resume</Link>
            </div>
            </div>

            <div className={styles['profileDiv']}>
            <Typography.Text  >Create Test</Typography.Text>
            <ScheduleOutlined style={{
              color: 'white',
              backgroundColor: '#6B11DC',
              borderRadius: 50,
              fontSize:50,
              padding:10,
            }} />
            {/* <Link to='/schedule'>Upcoming 1 Meeting</Link> */}
            <div>
            <Button type="primary" style={{
              marginRight:'10px',
              backgroundColor:'#6B11DC',
              padding:'0px 20px',
              outline:'none'
            }} >View</Button>
            <Button type="primary" style={{
              marginRight:'10px',
              backgroundColor:'#6B11DC',
              padding:'0px 20px',
              outline:'none'
            }} >New</Button>
            </div>
            </div>
            <div className={styles['profileDiv']}></div>
          </Footer>
          <Header style={headerStyle} className={styles["achParent"]} >
          <Space size='large' wrap style={{display:'flex',justifyContent:'center'}}>
          <DashboardCard  icon={<DollarCircleOutlined style={{color: 'white', backgroundColor: '#6B11DC', borderRadius: 35, fontSize:54, padding:8 }} />} title={"Revenue"} value={revenue}/>
          <DashboardCard  icon={<BugFilled style={{color: 'white', backgroundColor: '#6B11DC', borderRadius: 35, fontSize:54, padding:8 }} />} title={"Reviewed"} value={reviewed}/>
          {/* <DashboardCard icon={<BugFilled style={{color: 'white', backgroundColor: '#6B11DC', borderRadius: 35, fontSize:54, padding:8 }} />} title={"Reviewed"} value={320}/> */}

      </Space>
          </Header>
          
          <Content style={contentStyle} className='TableLayoutDiv' >
          <Tabletops />
          </Content>
          <Card style={{margin: 20, padding:20,background:'#343434'}}> <Typography.Title level={3} >Total Revenue</Typography.Title> 
            <DemoLines /> </Card>
        </Layout>
      
      )
};

  function DashboardCard({ title, value, icon }) {
    return (
      <Card className={`${styles['achCards']} achCards`} >
        <Space>
          {icon}
          <Statistic title={title} value={value} style={{margin:0}}  />
        </Space>
      </Card>

      
    );
  }
  export default App;