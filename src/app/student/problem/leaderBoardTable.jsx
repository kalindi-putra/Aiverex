import React from 'react';
import { Space, Table, Tag } from 'antd';


const columns= [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Rank',
    dataIndex: 'rank',
    key: 'rank',
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    render: (_, { score,tags}) => (
      <>
        {tags.map((tag) => {
          let color = score > 80 ? 'green' :score > 40?'orange':'red' ;
          return (
            <Tag color={color} key={color}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: 'Score',
    dataIndex: 'score',
    key: 'score',
  },
  // {
  //   title: 'Action',
  //   key: 'action',
  //   render: (_, record) => (
  //     <Space size="middle">
  //       <a>Invite</a>
  //     </Space>
  //   ),
  // },
];

const data = [
  {
    key: '1',
    name: 'John Brown',
    rank: '1000',
    tags: ['nice'],
    score:'70'
  },
  {
    key: '2',
    name: 'Jim Green',
    rank: '1004',
    tags: ['excellent'],
    score:'90'
  },
  {
    key: '3',
    name: 'Joe Black',
    rank: '1008',
    tags: ['worst'],
    score:'10'
  },
  {
    key: '4',
    name: 'Jim Red',
    rank: '1012',
    tags: ['Okay'],
    score:'50'
  },
  {
    key: '5',
    name: 'Alex',
    rank: '1016',
    tags:['nice'],
    score:'70'
  },
  {
    key: '6',
    name: 'Brown',
    rank: '1020',
    tags:['worst'],
    score:'20'
  },
  {
    key: '7',
    name: 'Green',
    rank: '1024',
    tags:['excellent'],
    score:'92'
  }
];

const App = () => <Table columns={columns} dataSource={data} style={{padding:20}} />;

export default App;