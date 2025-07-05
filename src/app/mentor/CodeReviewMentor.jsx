import React from 'react';
import { Layout, Space, Typography, Avatar, Button, Modal, Progress, Row, Col,Image, Card, Grid, Divider} from 'antd';
const { Header, Footer, Sider, Content } = Layout;
import { UserOutlined, createFromIconfontCN } from '@ant-design/icons';
const { Meta } = Card;
import MyEditor from '../../Components/EditorComp5';
const IconFont = createFromIconfontCN({
  scriptUrl: [
    '//at.alicdn.com/t/font_1788044_0dwu4guekcwr.js',
    // icon-javascript, icon-java, icon-shoppingcart (overridden)
    '//at.alicdn.com/t/font_1788592_a5xf2bdic3u.js', // icon-shoppingcart, icon-python
  ],
});
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

const editor__body = {
  color: '#fff',
  backgroundColor: '#7dbcea',
  background: '#3D3D3D',
  borderRadius: '30px',
  height: 160
};
const editor__wrapper = {
  color: '#fff',
  backgroundColor: '#7dbcea',
  background: '#3D3D3D',
  borderRadius: '30px',
  height: 160
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

const annotations = [
  {
    row: 2, // must be 0 based
    column: 5, // must be 0 based
    text: "error.message", // text to show in tooltip
    type: "error"
  }
];

function handleEditorClick(event) {
  const editor = monaco.editor.getFocusedEditor();
  if (editor) {
    const position = editor.getPositionAt(event.target.positionLineNumber, 1);
    const lineNumber = position.lineNumber;
    console.log('Clicked on line:', lineNumber);
  }
}

const CodeReviewMentor = (props) => (
      <Space 
      direction="vertical"
      style={{
        display:"flex",
        padding:10
      }}
      
      >
        <Typography.Text  style={{ 
          color: 'white', 
          margin: 0, 
          cursor:'pointer'
          }} onClick={props.goBack} >{`< Return back`}
          </Typography.Text>
        <Typography.Title level={3} style={{ 
          color: '#fff', 
          margin: 0, 
          }} >Code Review
          </Typography.Title>

        <MyEditor gitContent={props.gitContent} />

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
        <Row
        style={{height: "300px",display:'flex',flexWrap:'wrap',gap:'10px'}}>
          <Card style={{
            background: '#3D3D3D',
            minWidth:'450px',
            borderRadius: '30px',
            height: "100%"
          }}
          bordered={false}
          title = {<Typography.Title level={3} style={{ color: '#fff', margin: 0 }} >Score
        </Typography.Title>}
        headStyle = {{background: "#535353", borderRadius: "30px 30px 0px 0px"}}
          >
          </Card>
          <Card style={{
            background: '#3D3D3D',
            minWidth:'450px',
            borderRadius: '30px',
            height: '100%'
          }}
          bordered= {false}
          title={<Typography.Title level={3} style={{ color: '#fff', margin: 0 }} >Something
        </Typography.Title>}
        headStyle = {{background: "#535353", borderRadius: "30px 30px 0px 0px"}}
          >
          </Card>
          </Row>
          <Card style={{
            background: '#3D3D3D',
            width: '100%',
            borderRadius: '30px',
            height: 300
          }}
          bordered= {false}
          title={<Typography.Title level={3} style={{ color: '#fff', margin: 0 }} >What Needs Improvement?
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
        </Typography.Title>
          </Button>
      </Space>
  );
export default CodeReviewMentor;

