import React,{useState, useContext, useEffect} from 'react';
import { Space, Table, Tag,Button,Modal} from 'antd';
import CustModal from '../../Components/Modal';
import { AuthContext } from '../../context/UserContext';
import { collection, doc, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/Firebase';





const paginationConfig = {
    pageSize: 4,
    size: 'default',
    showQuickJumper: true,
    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
  };
  
  const CustTablee = () => {
    const { userData } = useContext(AuthContext);
    const [modal, setModal] = useState(false);
    const [data, setData] = useState([]);
  
    useEffect(() => {
      const fetchTableData = async () => {
        if (userData) {
          try {
            // Fetch the collection named 'progress' for the current user
            const userProgressCollection = collection(db, 'users', userData.uid, 'progress');
            const querySnapshot = await getDocs(userProgressCollection);
  
            // Create an array to hold the fetched data
            const tableData = [];
            querySnapshot.forEach((doc) => {
              // Extract the document data and add it to the array
              const progressItem = doc.data();
              tableData.push({
                key: doc.id,
                name: progressItem.name,
                on: progressItem.on,
                tags: ['Problem Statement', progressItem.problemStatement],
              });
            });
  
            // Update the table data state
            setData(tableData);
          } catch (error) {
            console.error('Error fetching table data:', error);
          }
        }
      };
  
      // Call the fetchTableData function when the userData changes
      fetchTableData();
    }, [userData]);
    if(data.length==0){
      console.log(data)
      return (
        <></>
      )
    }
    const modalHandler = (e) => {
      setModal(e.target.children[1].value);
    };
  
    const onClose = (st) => {
      setModal(st);
    };
  
    const columns = [
      {
        title: 'Test Name',
        dataIndex: 'name',
        key: 'name',
        render: (text) => text,
      },
      {
        title: 'Submitted On',
        dataIndex: 'on',
        key: 'on',
      },
      {
        title: 'Statements',
        key: 'tags',
        dataIndex: 'tags',
        render: (_, { tags }) => (
          <>
            <Tag color="purple" key={tags[0]} onClick={modalHandler}>
              {tags[0].toUpperCase()}
              <input type="hidden" value={tags[1]} />
            </Tag>
          </>
        ),
      },
      {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
          <Space size="middle">
            <Button
              type="primary"
              style={{
                width: '100%',
                borderRadius: '10px',
                textAlign: 'center',
                background: '#6B11DC',
              }}
            >
              Mentor's Review
            </Button>
          </Space>
        ),
      },
    ];
    
  
    return (
      <>
        {modal && <CustModal text={modal} onClose={onClose} />}
        <Table columns={columns} dataSource={data} pagination={paginationConfig} style={{ color: 'white !important' }} />
      </>
    );
  };
  
  export default CustTablee;