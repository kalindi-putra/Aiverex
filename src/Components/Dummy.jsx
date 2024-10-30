import { Layout, Typography,Card } from "antd";
const {  Content } = Layout;
import { SmileOutlined } from '@ant-design/icons';
import './Dummy.css'
import SkillForms from "./Form";
const contentStyle = {
    height: '100vh',
    color: '#fff',
    background: '#343434',
    margin: 10,
    borderRadius: '30px',
    overflow: 'hidden',
    padding:10
  };
  const contentsStyle = {
    height: '100%',
    color: '#fff',
    background: '#343434',
    margin: 10,
    borderRadius: '30px',
    overflow: 'hidden',
    padding:10
  };
const Notify = () => {
    return (
<Content style={contentStyle} className='notifyClass'  >
    <Typography.Title level={2} style={{color:'white', padding:0, margin:0}}>Notifications</Typography.Title>
    <div>
    <Card  className='cardStyle'>
        <Typography.Text><SmileOutlined/> Had a nice meeting</Typography.Text><br/>
    Duration can be used to specify how long the notification stays open. After the duration time elapses, the notification closes automatically. If not specified, default value is 4.5 seconds. If you set the value to 0, the notification box will never close automatically.
    </Card>
    <Card  className='cardStyle'>
    This is the content of the notification. This is the content of the notification. This is the content of the notification.
    </Card>
    <Card  className='cardStyle'>
    This is the content of the notification. This is the content of the notification. This is the content of the notification.
    </Card>
    <Card  className='cardStyle'>
    This is the content of the notification. This is the content of the notification. This is the content of the notification.
    </Card>
    </div>
          </Content>
    )
}

const EditProfile = () => {
    return (
<Content style={contentsStyle}  >
   {/*  <h1>Edit Profile Page</h1> */}
    <SkillForms />
          </Content>
    )
}


export {Notify,EditProfile}