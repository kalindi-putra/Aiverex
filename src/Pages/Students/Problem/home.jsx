import LeaderBoardTable from './LeaderBoardTable'
import './CustomDesignForTable.css'
import { Avatar, List, Space } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import React from 'react';
import SubmitCompound from './SubmitCompound';
import { Collapse } from 'antd';
import PostUrCodes from '../PostUrCode';
const accordionData = [
  {
    title: 'What is the Aivirex Skills Certification Test',
    content: `The Aivirex Skills Certification Test is a standardized assessment aimed at evaluating a developer’s
     technical proficiency. We strongly believe that well-defined skills can help developers
      showcase their value regardless of pedigree.`
  },
  {
    title: 'What happens if I fail the test?',
    content: `No harm done. If you fail to clear the test, you can retake the test again after a 
    stipulated period of time. Your results and failed attempts will remain private and will not be
     shared with any company.In the meantime, you can still continue to Learn on Aivirex.!`
  },
  {
    title: 'Why should I take this test?',
    content: `At Aivirex skills test you can learn the laguage with a hands on project
    where the assignments are from  top companies which helps you to solve real world problmes and interview aspect
    and also you you will have a hands on project where the project will be reviewed by Mentors
     From top tech compnies which they evaluate your assignments based on your code , creativity etc.`
  },
  {
    title: 'How should I prepare for the test?',
    content: `You can prepare the test by learning the fundamental concepts of the language and also learng 
    from the resources from Aivirex eduaction`
  },
  {
    title: 'Why should I take this test?',
    content: `At Aivirex skills test you can learn the laguage with a hands on project
    and also you you will have a hands on project where the project will be reviewed by Mentors
     From top tech compnies which they evaluate your assignments based on your code , creativity etc .`
  }
];
const data = Array.from({
  length: 3,
}).map((_, i) => ({
  href: 'https://ant.design',
  title: `ant design part ${i}`,
  avatar: `https://xsgames.co/randomusers/avatar.php?g=pixel&key=${i}`,
  description:
    'Ant Design, a design language for background applications, is refined by Ant UED Team.',
  content:
    'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
}));
const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const ProblemPage = () =>{
    return (
        <div style={{padding:30}}>
            Snow Howler is the librarian at the central library of the city of HuskyLand. He must handle requests which come in the following forms:
<br/>
1 x y : Insert a book with  pages at the end of the  shelf.
<br/>
2 x y : Print the number of pages in the  book on the  shelf.
<br/>
3 x : Print the number of books on the  shelf.
<br/>
Snow Howler has got an assistant, Oshie, provided by the Department of Education. Although inexperienced, Oshie can handle all of the queries of types 2 and 3.
<br/>
Help Snow Howler deal with all the queries of type 1.
<br/>
Oshie has used two arrays:<br/>
<div style={{background:'#343434',padding:10,}}>
    <pre style={{color:'#ccc'}}>
    int* total_number_of_books;<br/>
/*<br/>
 * This stores the total number of books on each shelf.<br/>
 */<br/>
<br/>
int** total_number_of_pages;<br/>
/*<br/>
 * This stores the total number of pages in each book of each shelf.<br/>
 * The rows represent the shelves and the columns represent the books.<br/>
 */<br/>
    </pre>
</div>
Input Format<br/>
<br/>
The first line contains an integer , the number of shelves in the library.<br/>
The second line contains an integer , the number of requests.<br/>
Each of the following  lines contains a request in one of the three specified formats.<br/>
<br/>
Constraints<br/>
<br/>
For each query of the second type, it is guaranteed that a book is present on the  shelf at  index.<br/>
Both the shelves and the books are numbered starting from 0.<br/>
Maximum number of books per shelf .<br/>
Output Format<br/>
<br/>
Write the logic for the requests of type 1. The logic for requests of types 2 and 3 are provided.<br/>
<br/>
Sample Input 0<br/>
<div style={{background:'#343434',padding:10,}}>
    <pre style={{color:'#ccc'}}>
    5<br/>
5<br/>
1 0 1<br/>
1 0 2<br/>
1 2 7<br/>
2 2 0<br/>
3 0<br/>
    </pre>
</div>
Explanation 0<br/>
<br/>
There are  shelves and  requests, or queries.<br/>
- 1 Place a  page book at the end of shelf .<br/>
- 2 Place a  page book at the end of shelf .<br/>
- 3 Place a  page book at the end of shelf .<br/>
- 4 The number of pages in the  book on the  shelf is 78.<br/>
- 5 The number of books on the  shelf is 2.<br/>
        </div>
    )
}

const Submission = () =>{
    return (
        <PostUrCodes />
    )
}

const Editorial = () =>{
    return (
        <div>
            · Round 2 is an application building challenge followed by a review of the code written by you for the same.
             The objective of this round is to check your problem solving, coding ability and ability to learn & adapt to new technologies 
             quickly.
        </div>
    )
}
const LeaderBoard = () =>{
    return (
        <div className='LeaderDiv' >
        <LeaderBoardTable/>
        </div>
    )
}
const Discussion = () =>{
  {accordionData.map(({ title, content }) => 
    <Collapse title={title} content={content} />
  )}
}

const Review = () =>{
    return (
        <>
        <SubmitCompound/>
        <center><button>Learn More</button></center>
        </>
    )
}


export {ProblemPage,Editorial,Submission,LeaderBoard,Discussion,Review}