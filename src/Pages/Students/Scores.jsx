import React, { useContext } from 'react';
import { AuthContext } from '../../context/UserContext';
import { Progress,Typography } from 'antd'

function Scores(props) {
    const pro = props.pro

    const { userData } = useContext(AuthContext);

  // Check if userData exists and retrieve the name
  const name = userData ? userData.name : '';

  return (
    <div style={{display:'inline-flex',margin:10,width:'350px'}}>
             <Progress type="circle" percent={(pro.marks/500)*100} size={80} strokeColor={'#6B11DC'}
              style={{ padding: 10,fontSize:'15px !important' }}
              format={(per) => { return `${pro.marks}/500` }}
              
            />
            {true&&<Typography.Text  style={{color:'white',display:'flex',flexDirection:'column',}}>
            Title : {pro.name} Programming<br></br>
            {pro.pstate1} {/* (30%) */} ({pro.ps1}%)
            <Progress percent={pro.ps1} style={{width:200}} showInfo={false} strokeColor={'#6B11DC'}/>
            {pro.pstate2} ({pro.ps2}%)
            <Progress percent={pro.ps2} style={{width:200}} showInfo={false} strokeColor={'#6B11DC'}/>
            </Typography.Text>}
            </div>
  )
}

export default Scores
