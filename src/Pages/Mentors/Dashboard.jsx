import { Space, Typography, Card, Statistic, Table,  } from "antd"
import{ DollarCircleOutlined, DollarCircleFilled, UsergroupAddOutlined,BugFilled, CalendarOutlined } from '@ant-design/icons'
import Tabletop from "../../Components/MentTable"
import DemoLine from "../../Components/MentChart";
import React, { useState, useEffect } from 'react';

const { Title } = Typography;


function Dashboard() {
    // Simulate data fetching (replace with actual API calls or Firebase)
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [totalReviews, setTotalReviews] = useState(0);
    const [reviewsLeft, setReviewsLeft] = useState(0);
    const [mentorName, setMentorName] = useState(""); // State for mentor's name

    useEffect(() => {
        // Fetch current authenticated user
        const auth = getAuth();
        
        // Listen to authentication state change
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // Set the mentor's name from Firebase user
                setMentorName(user.displayName || "Mentor"); // Use display name if available
            } else {
                // No user signed in, redirect or handle accordingly
                setMentorName("Mentor");
            }
        });

        // Cleanup the listener on component unmount
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        // Simulate an API call to fetch dashboard data (replace with actual data fetching)
        const fetchData = async () => {
            const data = {
                totalRevenue: 12345,
                totalReviews: 250,
                reviewsLeft: 10,
            };
            setTotalRevenue(data.totalRevenue);
            setTotalReviews(data.totalReviews);
            setReviewsLeft(data.reviewsLeft);
        };

        fetchData();
    }, []);

    return (
        <div>
            <center><Title>Mentor Dashboard</Title></center>
            <Title>Welcome <span>{mentorName}</span></Title>

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
                <DashboardCard 
                    icon={<CalendarOutlined style={{color: 'white', backgroundColor: '#6B11DC', borderRadius: 35, fontSize:54, padding:8 }} />} 
                    title={"Reviews Left"} 
                    value={reviewsLeft} 
                />
            </Space>

            <Card style={{margin: 20, paddingBottom:20}}> 
                <Title level={3}>Total Revenue</Title> 
                <DemoLine /> 
            </Card>

            <Tabletop />
        </div>
    );
}

// eslint-disable-next-line react/prop-types
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
