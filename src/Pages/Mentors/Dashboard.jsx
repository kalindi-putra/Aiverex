import { Space, Typography, Card, Statistic, Table,  } from "antd"
import{ DollarCircleOutlined, DollarCircleFilled, UsergroupAddOutlined, BugFilled } from '@ant-design/icons'
import Tabletop from "../../Components/MentTable"
import DemoLine from "../../Components/MentChart";


function Dashboard() {
    return (
      <div >
    <center><Typography.Title>Mentor Dashboard</Typography.Title></center>
            <Typography.Title>Welcome <span> Kumar</span></Typography.Title>



            <Space size='large' wrap>
          
          



                <DashboardCard icon={<DollarCircleOutlined style={{color: 'white', backgroundColor: '#6B11DC', borderRadius: 35, fontSize:54, padding:8 }} />} title={"Revenue"} value={1234}/>
            
                <DashboardCard icon={<BugFilled style={{color: 'white', backgroundColor: '#6B11DC', borderRadius: 35, fontSize:54, padding:8 }} />} title={"Reviewed"} value={320}/>
                
            </Space>
            <Card style={{margin: 20, paddingBottom:20}}> <Typography.Title level={3} >Total Revenue</Typography.Title> 
            <DemoLine /> </Card>
            <Tabletop />
        </div>
    )
}

// eslint-disable-next-line react/prop-types
function DashboardCard({ title, value, icon }) {
    return (
      <Card>
        <Space direction="horizontal">
          {icon}
          <Statistic title={title} value={value}/>
        </Space>
      </Card>

      
    );
  }
  
  
export default Dashboard