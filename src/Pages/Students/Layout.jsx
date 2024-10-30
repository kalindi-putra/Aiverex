import { Layout, Space, Typography, Avatar, Button, Modal, Progress, Row, Col,Image } from 'antd';
const { Header, Footer, Sider, Content } = Layout;
import { UserOutlined, createFromIconfontCN } from '@ant-design/icons';
import CustBadge from './CustBadge';
import { useEffect, useState } from 'react';
import Scores from './Scores';

let srcSize = false

const IconFont = createFromIconfontCN({
  scriptUrl: [
    '//at.alicdn.com/t/font_1788044_0dwu4guekcwr.js',
    // icon-javascript, icon-java, icon-shoppingcart (overridden)
    '//at.alicdn.com/t/font_1788592_a5xf2bdic3u.js', // icon-shoppingcart, icon-python
  ],
});
import CustTable from './Table';
import { CourseList } from './Dashboard';
const progress = [
  {
    name: 'C',
    marks: 415,
    color: '#6B11DC',
  },
  {
    name: 'C++',
    marks: 330,
    color: '#6B11DC',
  },
  {
    name: 'Java',
    marks: 457,
    color: '#6B11DC',
  },
  {
    name: 'C',
    marks: 415,
    color: '#6B11DC',
  },
  {
    name: 'C++',
    marks: 330,
    color: '#6B11DC',
  },
  {
    name: 'Java',
    marks: 457,
    color: '#6B11DC',
  },
]

const headerStyle = {
  color: '#fff',
  height:'auto',
  background: 'transparent',
  padding: srcSize?5:30,
};
const contentStyle = {
  textAlign: 'center',
  height: 'auto',
  color: '#fff',
  backgroundColor: '#108ee9',
  background: '#343434',
  margin: 10,
  borderRadius: '30px',
  overflow: 'hidden',
};

const siderStyle = {
  textAlign: 'center',
  color: '#fff',
  backgroundColor: '#3ba0e9',
  background: '#343434',
  margin: 10,
  borderRadius: '30px',
  padding: '20px 30px',
  height:'auto',
};
const footerStyle = {
  color: '#fff',
  backgroundColor: '#7dbcea',
  background: '#343434',
  margin: 10,
  borderRadius: '30px',
  padding: 10,
  height: 'auto',
};
let edit = () => {
  Modal.confirm({
    title: "Are you sure you want to edit this",
    onOk: () => {
      console.log("OK");
    },
  });
};

const CustLayout = () =>{
  const [scrWidth, setScrWidth] = useState(false);
  srcSize = scrWidth
  useEffect(() => {
    const handleResize = () => {
      const isMobileQuery = window.matchMedia('(max-width: 807px)');
      setScrWidth(isMobileQuery.matches);
    };

    handleResize(); // Check on component mount

    window.addEventListener('resize', handleResize); // Add event listener for window resize

    // return () => {
    //   window.removeEventListener('resize', handleResize); // Clean up event listener on component unmount
    // };
  }, [scrWidth]);
  
  return(
  <Space
    direction="vertical"
    style={{
      width: '100%',
      position:'relative',
    }}
    size={[0, 48]}
  >
    <Layout
     style={{
      background: 'transparent',
    }}>
      
      {scrWidth?
      <Header style={siderStyle} >
        <div>
          <Avatar size={100} icon={<UserOutlined />} />
          <Typography.Title level={4} style={{ color: '#fff', margin: 0 }} >Ajay Kumar
            <br /><Typography.Text style={{ color: '#fff' }} >Id : Ch 400</Typography.Text>
            <Button type="primary" shape="round" style={{
              width: '8rem',
              textAlign: 'center',
              background: '#6B11DC',
              margin: '20px 20px',
            }}
              onClick={edit}
            >
              Edit Profile
            </Button>
          </Typography.Title>
          <hr style={{
            color: '#ccc',
            margin: '0px',
            filter: blur(1),
          }} />
          <Typography.Title level={4} style={{ color: '#fff',textAlign:'left' }} >
            About 
            <Typography.Text style={{ color: '#fff',textAlign:'left' }} >
              <br/><br/>Current
              <br/>--
            </Typography.Text>
            <Typography.Text style={{ color: '#fff',textAlign:'left' }} >
              <br/>Expected year of Graduation
              <br />2024<br/>
            </Typography.Text>
            <Typography.Text style={{ color: '#fff',textAlign:'left',wordWrap:'wrap' }} >
              More about me
              <br />I am a 3rd year student at IIT Roorkee. I am a competitive programmer and a web developer.
            </Typography.Text>

            </Typography.Title>
            
        </div>
      </Header>
    :  <Sider style={siderStyle} width="300px" >
    <div>
      <Avatar size={100} icon={<UserOutlined />} />
      <Typography.Title level={4} style={{ color: '#fff', margin: 0 }} >Ajay Kumar
        <br /><Typography.Text style={{ color: '#fff' }} >Id : Ch 400</Typography.Text>
        <Button type="primary" shape="round" style={{
          width: '80%',
          textAlign: 'center',
          background: '#6B11DC',
          margin: '20px 20px',
        }}
          onClick={edit}
        >
          Edit Profile
        </Button>
      </Typography.Title>
      <hr style={{
        color: '#ccc',
        margin: '0px 30px',
        filter: blur(1),
      }} />
      <Typography.Title level={4} style={{ color: '#fff',textAlign:'left' }} >
        About 
        <Typography.Text style={{ color: '#fff',textAlign:'left' }} >
          <br/><br/>Current
          <br/>--
        </Typography.Text>
        <Typography.Text style={{ color: '#fff',textAlign:'left' }} >
          <br/>Expected year of Graduation
          <br />2024<br/>
        </Typography.Text>
        <Typography.Text style={{ color: '#fff',textAlign:'left' }} >
          More about me
          <br />I am a 3rd year student at IIT Roorkee. I am a competitive programmer and a web developer.
        </Typography.Text>

        </Typography.Title>
        
    </div>
  </Sider>
    }
      <Layout style={{
        background: 'transparent',
      }}>
        <Header style={headerStyle}>
          <div style={{
            background: '#343434',
            width: '100%',
            borderRadius: '30px',
            padding: scrWidth?10:30,
          }}>
            <Typography.Title level={4} style={{ color: '#fff', margin:'2px',  }} >Scores 
              <a class="view"style={{ float: 'right' }}>View More</a>
            </Typography.Title>

            {progress.slice(0,scrWidth?1:2).map((pro,i)=>
            <Scores pro={pro} />
          )
          }

          </div>
        </Header>
        <Footer style={footerStyle}>
          <Typography.Title level={4} style={{ color: '#fff', margin: 0, padding: '10px 20px' }} >Certificates : 4
            <a class="view"style={{ float: 'right' }}>View More</a>
            <Row style={{ paddingTop: '10px',display:'flex',flexWrap:'wrap',width:'100%' }}>
              {CourseList.slice(0,4).map((course) => (
              <Col style={{margin:5}}>
                <CustBadge content={course} />
              </Col>
              ))}
            </Row>
          </Typography.Title>
        </Footer>
            <Content style={contentStyle}>
              <CustTable />
            </Content>
      </Layout>
    </Layout>
  </Space>
  
)};
export default CustLayout;