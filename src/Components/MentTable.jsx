import { Avatar, Table, Tooltip,Tag,Space,Button } from "antd";
import { Divider } from 'antd';
import CustModal from "./Modal";
import { useState } from "react";

function Tabletop () {
    const paginationConfig = {
        pageSize: 4, // Number of items per page
        size: 'default', // Size of pagination component ('default', 'small', 'large')
        showQuickJumper: true, // Display a quick jump input
        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`, // Custom total display format
      };
    const data = [
        {
            thumb: 'https://i.pinimg.com/550x/8e/a9/44/8ea944581cb87dd9571b02b9f2d87f15.jpg',
            id: '123456',
            score: 10,
            tags: ['Problem Statement',`A problem statement is a short, clear explanation of an issue or challenge that sums up what you want to change. It helps you, team members, and other stakeholders to focus on the problem, why it's important, and who it impacts. A good problem statement should create awareness and stimulate creative thinking.`],
            key: '1',
            on: ''+new Date().toLocaleString(),
        },
        {
            thumb: 'https://i.pinimg.com/550x/8e/a9/44/8ea944581cb87dd9571b02b9f2d87f15.jpg',
            id: '456123',
            score: 20,
            tags: ['Problem Statement',`A problem statement is a short, clear explanation of an issue or challenge that sums up what you want to change. It helps you, team members, and other stakeholders to focus on the problem, why it's important, and who it impacts. A good problem statement should create awareness and stimulate creative thinking.`],
            key: '2',
            on: ''+new Date().toLocaleString(),
        },
        {
            thumb: 'https://i.pinimg.com/550x/8e/a9/44/8ea944581cb87dd9571b02b9f2d87f15.jpg',
            id: '789456',
            score: 30,
            tags: ['Problem Statement',`A problem statement is a short, clear explanation of an issue or challenge that sums up what you want to change. It helps you, team members, and other stakeholders to focus on the problem, why it's important, and who it impacts. A good problem statement should create awareness and stimulate creative thinking.`],
            key: '3',
            on: ''+new Date().toLocaleString(),
        },
        {
            thumb: 'https://i.pinimg.com/550x/8e/a9/44/8ea944581cb87dd9571b02b9f2d87f15.jpg',
            id: '442156',
            score: 40,
            tags: ['Problem Statement',`A problem statement is a short, clear explanation of an issue or challenge that sums up what you want to change. It helps you, team members, and other stakeholders to focus on the problem, why it's important, and who it impacts. A good problem statement should create awareness and stimulate creative thinking.`],
            key: '4',
            on: ''+new Date().toLocaleString(),
        },
        {
            thumb: 'https://i.pinimg.com/550x/8e/a9/44/8ea944581cb87dd9571b02b9f2d87f15.jpg',
            id: '1233466',
            score: 50,
            tags: ['Problem Statement',`A problem statement is a short, clear explanation of an issue or challenge that sums up what you want to change. It helps you, team members, and other stakeholders to focus on the problem, why it's important, and who it impacts. A good problem statement should create awareness and stimulate creative thinking.`],
            key: '5',
            on: ''+new Date().toLocaleString(),
        },
    ]

    const columns = [
        // {
        //     title: 'Tech Stack',
        //     dataIndex: 'thumb',
        //     key: 'key',
        //     render:(link)=>{
        //         return <Avatar src={link} />
        //     },            
        // },
        {
            title: 'Student Id',
            dataIndex: 'id',
            key: 'key',
            render: id=>{
                return <a>{id}</a>
            }
        },
        // {
        //     title: 'Mentor1 Score',
        //     dataIndex: 'score',
        //     key: 'key',
        //     sorter: (a,b) => a.score - b.score
        // },
        // {
        //     title: 'Problem Statement',
        //     dataIndex: 'address',
        //     key: 'key',
        //     ellipsis: {
        //         showTitle: false,
        //       },
        //       render: (address) => (
        //         <Tooltip placement="topLeft" title={address} >
        //           {address}
        //         </Tooltip>
        //       ),
            
        // },
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
        // {
        //     title: 'Evaluate',
        //     key: 'key',
        //     render: payload =>{
        //         return <a href="#">{payload.score>20?'Pass':'Fail'}</a>
        //     }
        // },
    ]
    const [modal,setModal] = useState(false)
    const modalHandler = (e) =>{
      console.log('heloo')
      setModal(e.target.children[1].value)
      return
    }
    const onClose = (st) =>{
      setModal(st)
    }
  return (
    <div >
    {/* <Divider orientation="left" >Results</Divider> */}
    {modal&&<CustModal text={modal} onClose={onClose} />}
    <Table 
    dataSource={data}
    columns={columns}
    pagination={paginationConfig}
    >
    
    </Table>
    </div>
  );
}

//if u need u can add header around the table 
export default Tabletop;