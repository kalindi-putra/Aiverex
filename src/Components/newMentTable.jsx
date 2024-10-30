import { Avatar, Table, Tooltip, Tag, Space, Button } from 'antd';
import { Divider } from 'antd';
import CustModal from './Modal';
import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/UserContext'; // Provide the correct path to your AuthContext
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/Firebase';
import Typography from 'antd/es/typography/Typography';

function Tabletops() {
  const paginationConfig = {
    pageSize: 4, // Number of items per page
    size: 'default', // Size of pagination component ('default', 'small', 'large')
    showQuickJumper: true, // Display a quick jump input
    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`, // Custom total display format
  };

  const { userData } = useContext(AuthContext);
  const [tableData, setTableData] = useState([]);
  const [modal, setModal] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const fetchTableData = async () => {
      if (userData && userData.tableData) {
        try {
          const querySnapshot = await getDocs(collection(db, userData.uid, 'tableData'));
          const fetchedData = [];
          querySnapshot.forEach((doc) => {
            fetchedData.push({ ...doc.data(), key: doc.id });
          });
          setTableData(fetchedData);
        } catch (error) {
          console.error('Error fetching table data:', error);
        }
      } else {
        setShowMessage(true);
      }
    };

    fetchTableData();
  }, [userData]);

  const modalHandler = (e) => {
    setModal(e.target.children[1].value);
    return;
  };

  const onClose = (st) => {
    setModal(st);
  };

  const handleButtonClick = () => {
    // Handle button click to start earning
    console.log('Start Earning');
  };

  const columns = [
    {
      title: 'Student Id',
      dataIndex: 'id',
      key: 'key',
      render: (id) => {
        return <a>{id}</a>;
      },
    },
    {
      title: 'Submitted On',
      dataIndex: 'on',
      key: 'on',
    },
    {
      title: 'Tags',
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

  if (showMessage) {
    return (
      // <div>
        
      //   <p>You don't have table data.</p>
      //   <Button type="primary" onClick={handleButtonClick}>
      //     Start Earning
      //   </Button>
      // </div>
      <></>
    );
  }

  return (
    <div>
      {modal && <CustModal text={modal} onClose={onClose} />}
      <Table dataSource={tableData} columns={columns} pagination={paginationConfig} />
    </div>
  );
}

export default Tabletops;




// PREVIOUS CODE WITH SOME ERRORS

// import { Avatar, Table, Tooltip, Tag, Space, Button } from 'antd';
// import { Divider } from 'antd';
// import CustModal from './Modal';
// import { useEffect, useState } from 'react';
// import { Firestore } from 'firebase/firestore';
// import { collection, getDocs } from 'firebase/firestore';

// function Tabletops() {
//   const paginationConfig = {
//     pageSize: 4, // Number of items per page
//     size: 'default', // Size of pagination component ('default', 'small', 'large')
//     showQuickJumper: true, // Display a quick jump input
//     showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`, // Custom total display format
//   };

//   const [tableData, setTableData] = useState([]);
//   const [modal, setModal] = useState(false);

//   useEffect(() => {
//     const fetchTableData = async () => {
//       const querySnapshot = await getDocs(collection(Firestore, 'tableData'));
//       const fetchedData = [];
//       querySnapshot.forEach((doc) => {
//         fetchedData.push({ ...doc.data(), key: doc.id });
//       });
//       setTableData(fetchedData);
//     };
//     fetchTableData();
//   }, []);

//   const modalHandler = (e) => {
//     setModal(e.target.children[1].value);
//     return;
//   };

//   const onClose = (st) => {
//     setModal(st);
//   };

//   const columns = [
//     {
//       title: 'Student Id',
//       dataIndex: 'id',
//       key: 'key',
//       render: (id) => {
//         return <a>{id}</a>;
//       },
//     },
//     {
//       title: 'Submitted On',
//       dataIndex: 'on',
//       key: 'on',
//     },
//     {
//       title: 'Tags',
//       key: 'tags',
//       dataIndex: 'tags',
//       render: (_, { tags }) => (
//         <>
//           <Tag color="purple" key={tags[0]} onClick={modalHandler}>
//             {tags[0].toUpperCase()}
//             <input type="hidden" value={tags[1]} />
//           </Tag>
//         </>
//       ),
//     },
//     {
//       title: 'Action',
//       key: 'action',
//       render: (_, record) => (
//         <Space size="middle">
//           <Button
//             type="primary"
//             style={{
//               width: '100%',
//               borderRadius: '10px',
//               textAlign: 'center',
//               background: '#6B11DC',
//             }}
//           >
//             Mentor's Review
//           </Button>
//         </Space>
//       ),
//     },
//   ];

//   return (
//     <div>
//       {modal && <CustModal text={modal} onClose={onClose} />}
//       <Table dataSource={tableData} columns={columns} pagination={paginationConfig} />
//     </div>
//   );
// }

// export default Tabletops;
