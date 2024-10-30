import { Layout, Space, Typography, Avatar, Button, Modal, Progress, Row, Col,Image, Card, Grid, Divider} from 'antd';
const { Header, Footer, Sider, Content } = Layout;
import { UserOutlined, createFromIconfontCN } from '@ant-design/icons';
// import CustBadge from '../components/CustBadge';
import { useState } from 'react';
const { Meta } = Card;
const IconFont = createFromIconfontCN({
  scriptUrl: [
    '//at.alicdn.com/t/font_1788044_0dwu4guekcwr.js',
    // icon-javascript, icon-java, icon-shoppingcart (overridden)
    '//at.alicdn.com/t/font_1788592_a5xf2bdic3u.js', // icon-shoppingcart, icon-python
  ],
});
// import CustTable from './Table';
// import { Courses } from './Dashboard';
const progress = [
  {
    name: 'C',
    percent: 30,
    color: '#6B11DC',
  },
  {
    name: 'C++',
    percent: 30,
    color: '#6B11DC',
  },
  {
    name: 'Java',
    percent: 30,
    color: '#6B11DC',
  },
]

const headerStyle = {
  color: '#fff',
  height: 200,
  background: 'transparent',
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
  padding: 10,
   
};
const contentStyle = {
  textAlign: 'center',
  minHeight: 200,
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
};
const footerStyle = {
  color: '#fff',
  backgroundColor: '#7dbcea',
  background: '#343434',
  margin: 10,
  borderRadius: '30px',
  padding: 10,
  height: 160,
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
  return(
      <Space 
      direction="vertical"
      size= {50}
      style={{
        display:"flex",
      }}
      
      >
        <Typography.Title level={1} style={{ 
          color: '#fff', 
          margin: 0, 
          padding: '10px 20px'
          }} >Code Review<Row style={{ paddingTop: '20px' }}>
              {/* {Courses.map((course) => (
              <Col span={6}>
                <CustBadge course={course} />
              </Col>
              ))} */}
            </Row>
          </Typography.Title>
        <div style={{
          color: '#fff',
          backgroundColor: '#7dbcea',
          background: '#3D3D3D',

          borderRadius: '30px',

          height: 160
        }}>
        <img alt="ChatGPT Connection" src="../assets/chatgptImage.png"  />
            {/* <a class="view"style={{ float: 'right' }}>View More</a> */}
            
        </div>

        <Divider
        colorSplit="#FFFFFF"
        style={{
          padding: '0px 0px',
          margin: 0
        }}
        ></Divider>
        <Typography.Title level={1} style={{ 
          color: '#fff', 
          margin: 0, 
          padding: '0px 0px'
          }} >Mentor Score
          </Typography.Title>
          <Divider
        colorSplit="#FFFFFF"
        style={{
          padding: '0px 0px',
          margin: 0
        }}
        ></Divider>
        <Row gutter={16} 
        style={{height: "300px"}}>
          <Col span={8}>
          <Card style={{
            background: '#3D3D3D',
            width: '100%',
            borderRadius: '30px',
            height: "100%"
          }}
          bordered={false}
          title = {<Typography.Title level={3} style={{ color: '#fff', margin: 0 }} >Score
          {/* <a class="view"style={{ float: 'right', color:"white" }}>View More</a> */}
        </Typography.Title>}
        headStyle = {{background: "#535353", borderRadius: "30px 30px 0px 0px"}}
          >
          </Card>
          </Col>
          <Col span={16}>
          <Card style={{
            background: '#3D3D3D',
            width: '100%',
            borderRadius: '30px',
            height: '100%'
          }}
          bordered= {false}
          title={<Typography.Title level={3} style={{ color: '#fff', margin: 0 }} >What Was Good?
          {/* <a class="view"style={{ float: 'right', color:"white" }}>View More</a> */}
        </Typography.Title>}
        headStyle = {{background: "#535353", borderRadius: "30px 30px 0px 0px"}}
          >
          </Card>
          </Col>
          </Row>
          <Card style={{
            background: '#3D3D3D',
            width: '100%',
            borderRadius: '30px',
            height: 300
          }}
          bordered= {false}
          title={<Typography.Title level={3} style={{ color: '#fff', margin: 0 }} >What Needs Improvement?
          {/* <a class="view"style={{ float: 'right', color:"white" }}>View More</a> */}
        </Typography.Title>}
        headStyle = {{background: "#535353", borderRadius: "30px 30px 0px 0px"}}
          >
          </Card>

          <Card style={{
            background: '#3D3D3D',
            width: '100%',
            borderRadius: '30px',
            height: 300
          }}
          bordered= {false}
          title={<Typography.Title level={3} style={{ color: '#fff', margin: 0 }} >Overall Feedback
          {/* <a class="view"style={{ float: 'right', color:"white" }}>View More</a> */}
        </Typography.Title>}
        headStyle = {{background: "#535353", borderRadius: "30px 30px 0px 0px"}}
          >
          </Card>
          
          <Button type="primary" shape="round"   style={{
      width: '100%',
      textAlign: 'center',
      background:'#6B11DC',
      height: 75
    }}>
            <Typography.Title level={3} style={{ color: '#fff', margin: 0 }} >Submit
          {/* <a class="view"style={{ float: 'right', color:"white" }}>View More</a> */}
        </Typography.Title>
          </Button>
      </Space>
  
)};
export default CustLayout;