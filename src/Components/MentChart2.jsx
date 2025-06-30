import React, { useState, useEffect, useContext } from 'react';
import { Line } from '@ant-design/plots';
import { AuthContext } from '../context/UserContext'; // Provide the correct path to your AuthContext
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/Firebase';
import { Button } from 'antd';
const DemoLines = () => {
    const { userData } = useContext(AuthContext);
    const [data, setData] = useState([]);
    const [showMessage, setShowMessage] = useState(false);
  
    useEffect(() => {
      const fetchData = async () => {
        if (userData && userData.lineChartData) {
          try {
            // Fetch the data from the Firebase database
            const querySnapshot = await getDocs(collection(db, userData.uid, 'linechartdata'));
            const fetchedData = [];
            querySnapshot.forEach((doc) => {
              const item = doc.data();
              fetchedData.push(item);
            });
            setData(fetchedData);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        } else {
          setShowMessage(true);
        }
      };
  
      fetchData();
    }, [userData]);
  
    const handleButtonClick = () => {
      // Handle button click to start earning
      console.log('Start Earning');
    };
  
    if (showMessage) {
      return (
        <div>
          <h5 style={{color: 'white'}}>You don't have made any earning to show.</h5>
          <Button type="primary" onClick={handleButtonClick}>
            Start Earning
          </Button>
        </div>
      );
    }
  
    const config = {
      data,
      xField: 'months',
      yField: 'value',
      label: {},
      point: {
        size: 5,
        shape: 'diamond',
        style: {
          fill: 'white',
          stroke: '#6B11DB',
          lineWidth: 2,
        },
      },
      tooltip: {
        showMarkers: false,
      },
      state: {
        active: {
          style: {
            shadowBlur: 4,
            stroke: '#6B11DB',
            fill: 'red',
          },
        },
      },
      interactions: [
        {
          type: 'marker-active',
        },
      ],
    };
  
    return <Line {...config} />;
  };

export default DemoLines;
