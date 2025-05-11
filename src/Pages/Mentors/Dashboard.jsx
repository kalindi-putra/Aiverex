import { Space, Typography, Card, Statistic  } from "antd"
import{ DollarCircleOutlined,BugFilled } from '@ant-design/icons'
import Tabletop from "../../Components/MentTable"
import  { useState, useEffect } from 'react';
import { getAuth ,  } from "firebase/auth";
import { Navigate } from "react-router";
const { Title , Text} = Typography;


function Dashboard() {
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [totalReviews, setTotalReviews] = useState(0);
    const [mentorName, setMentorName] = useState(""); // State for mentor's name

    useEffect(() => {
        const auth = getAuth();
        
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                setMentorName(user.displayName || "Mentor"); // Use display name if available
            } else {
                Navigate('/login');

            }
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const data = {
                totalRevenue: 12345,
                totalReviews: 250,
                reviewsLeft: 10,
            };
            setTotalRevenue(data.totalRevenue);
            setTotalReviews(data.totalReviews);
        };

        fetchData();
    }, []);

    return (
        <div>
            <center><Title>Mentor Dashboard</Title></center>
            <Title>Welcome <Text strong>{mentorName}</Text></Title>

            <Space size='large' wrap>
                <DashboardCard 
                    icon={<DollarCircleOutlined style={{color: 'white', backgroundColor: '#6B11DC', borderRadius: 35, fontSize:54, padding:8 }} />} 
                    title={"Total Revenue"} 
                    value={totalRevenue} 
                />
                <DashboardCard 
                    icon={<BugFilled style={{color: 'white', backgroundColor: '#6B11DC', borderRadius: 35, fontSize:54, padding:8 }} />} 
                    title={"Total Reviews"} 
                    value={totalReviews} 
                />
                   </Space>

            <Card style={{margin: 20, paddingBottom:20}}> 
                <Title level={3}>Total Revenue</Title> 
            </Card>

            <Tabletop />
        </div>
    );
}

function DashboardCard({ title, value, icon }) {
    return (
        <Card>
            <Space direction="horizontal">
                {icon}
                <Statistic title={title} value={value} />
            </Space>
        </Card>
    );
}

export default Dashboard;
