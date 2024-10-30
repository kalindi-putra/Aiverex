import React,{useState} from 'react';
import { Space, Table, Tag,Button,Modal} from 'antd';
import CustModal from '../../Components/Modal';






const paginationConfig = {
  pageSize: 4, // Number of items per page
  size: 'default', // Size of pagination component ('default', 'small', 'large')
  showQuickJumper: true, // Display a quick jump input
  showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`, // Custom total display format
};
const CustTable = () => 
{ 
  const columns = [
    {
      title: 'Test Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
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
          {/* {tags.map((tag) => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'loser') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={tag} onClick={modalHandler}>
                {tag.toUpperCase()}
              </Tag>
            );
          })} */}
              <Tag color='purple' key={tags[0]} onClick={modalHandler}>
                {tags[0].toUpperCase()}
                <input type='hidden' value={tags[1]}/>
              </Tag>
        </>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary"   style={{
        width: '100%',
        borderRadius:'10px',
        textAlign: 'center',
        background:'#6B11DC'
      }}>
              Mentor's Review
            </Button>
        </Space>
      ),
    },
  ];
  
  const data = [
    {
      key: '1',
      name: 'React JS',
      on: ''+new Date().toLocaleString(),
      tags: ['Problem Statement',`A problem statement is a short, clear explanation of an issue or challenge that sums up what you want to change. It helps you, team members, and other stakeholders to focus on the problem, why it's important, and who it impacts. A good problem statement should create awareness and stimulate creative thinking.`],
    },
    {
      key: '2',
      name: 'Node JS',
      on: ''+new Date().toLocaleString(),
      tags: ['Problem Statement',`A problem statement is a short, clear explanation of an issue or challenge that sums up what you want to change. It helps you, team members, and other stakeholders to focus on the problem, why it's important, and who it impacts. A good problem statement should create awareness and stimulate creative thinking.`],
    },
    {
      key: '3',
      name: 'Java',
      on: ''+new Date().toLocaleString(),
      tags: ['Problem Statement',`A problem statement is a short, clear explanation of an issue or challenge that sums up what you want to change. It helps you, team members, and other stakeholders to focus on the problem, why it's important, and who it impacts. A good problem statement should create awareness and stimulate creative thinking.`],
    },
    {
      key: '4',
      name: 'Python',
      on: ''+new Date().toLocaleString(),
      tags: ['Problem Statement',`A problem statement is a short, clear explanation of an issue or challenge that sums up what you want to change. It helps you, team members, and other stakeholders to focus on the problem, why it's important, and who it impacts. A good problem statement should create awareness and stimulate creative thinking.`],
    },
    
  ];
  const [modal,setModal] = useState(false)
  const modalHandler = (e) =>{
    console.log('heloo')
    setModal(e.target.children[1].value)
    return
  }
  const onClose = (st) =>{
    setModal(st)
  }


  
  
  return(
    <>
     {modal&&<CustModal text={modal} onClose={onClose} />}
  <Table columns={columns} dataSource={data} pagination={paginationConfig} style={{color:'white !important'}} />
    </>
  )}

export default CustTable;