const SubmitCompound = () => {
    return ( 
        <Descriptions  bordered labelStyle={{color:'#ccc',background:'#343434'}} contentStyle={{color:'#ccc',background:'#343434'}}>
    <Descriptions.Item label="Test Name">Angular JS</Descriptions.Item>
    <Descriptions.Item label="Amount Paid">$1000</Descriptions.Item>
    <Descriptions.Item label="Automatic Renewal">YES</Descriptions.Item>
    <Descriptions.Item label="Submitted Time">2018-04-24 18:00:00</Descriptions.Item>
    {/* <Descriptions.Item label="Usage Time" span={2}>
      2019-04-24 18:00:00
    </Descriptions.Item> */}
    <Descriptions.Item label="Status" span={3}>
      <Badge status="processing" text="Waiting For Review" style={{color:'#fff'}} />
    </Descriptions.Item>
    {/* <Descriptions.Item label="Negotiated Amount">$80.00</Descriptions.Item>
    <Descriptions.Item label="Discount">$20.00</Descriptions.Item>
    <Descriptions.Item label="Official Receipts">$60.00</Descriptions.Item> */}
    <Descriptions.Item label="Description">
    The student demonstrated a strong understanding of the subject matter and applied their knowledge effectively in their written responses. They showcased clear and concise writing skills, providing well-structured answers with appropriate examples and supporting evidence. Their attention to detail and accuracy in presenting concepts was commendable. Overall, the student's performance on the written test was impressive, reflecting a solid grasp of the material and their ability to articulate ideas effectively.
    </Descriptions.Item>
  </Descriptions>
     );
}

export default SubmitCompound;

import React from 'react';
import { Badge, Descriptions, Typography } from 'antd';

{/* <Descriptions.Item label="Config Info">
      Data disk type: MongoDB
      <br />
      Database version: 3.4
      <br />
      Package: dds.mongo.mid
      <br />
      Storage space: 10 GB
      <br />
      Replication factor: 3
      <br />
      Region: East China 1
      <br />
    </Descriptions.Item> */}