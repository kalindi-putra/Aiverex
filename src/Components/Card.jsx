import { Card,Typography,Button,Rate } from 'antd';
import { redirect, useNavigate } from 'react-router';
const { Title,Text,Paragraph } = Typography;
const { Meta } = Card;

// Simple Card without any props

const CusCard = () => (
  <Card
    style={{
      width: 290,
      padding: 10,
      borderRadius: 40,
      background: type!='testi'?'#343434':'linear-gradient(145deg, #343434, #2b2b2b)',
      border:0,
      color: '#fff',
      margin: 10,
    }}
    cover={<img alt="example" src={course} 
        style={{
            borderRadius: 40,
            height: 180,
            width: 270,
            backgroundSize: 'cover',
        }}
    />}
    bodyStyle={{padding: "10px",}}
  >
    <Text style={{ color: 'white',fontWeight:'2px',fontSize:'23px' }}>Course Name</Text><br/>
    <Paragraph ellipsis={{ rows: 3, expandable: false }}
    style={{ color: '#ccc',
    
  }}  
  type='secondary'>Web and application development community of IIIT Ranchi has been primarily responsible for providing innovative technical solutions to most of the issues in the institute. </Paragraph>
    <Button type="primary" shape="round"   style={{
      width: '100%',
      textAlign: 'center',
      background:'#6B11DC'
    }}>
            Take Test
          </Button>
  </Card>
);


// Cards Constructed using props content

const CustDes = (props) =>{
  const {id,img,name,description,price,styles} = props.content
  const type = props.type
  const navigate = useNavigate()
  const haddler = () =>{
    if(type=='test')
    navigate('contents')
    return 
  }
return (
  <Card key={id}
    style={{
      padding: type=='testi'?'5px':'10px',
      borderRadius: type=='testi'?5:40,
      // :'linear-gradient(109.6deg, black 11.2%, #242424 51.2%, black 98.6%)'
      background: '#343434',
      border:0,
      color: '#fff',
      margin: type=='testi'?8:10,
      width: type=='testi'&&290,
      display: type=='testi'&&'inline-block',
    }}
    cover={type!='testi'&&<img alt="example" src={img} 
        style={{
            borderRadius: 40,
            height: 180,
            backgroundSize: 'cover',
        }}
    />}
    bodyStyle={{padding: "10px",}}
  >
    {type!='testi'&&<Text style={{ color: 'white',fontWeight:'2px',fontSize:'23px' }}>{name}<br/></Text>}
    <Paragraph ellipsis={{ rows: type=='testi'?5:3, expandable: false }}
    style={{ color: '#ccc',
    
  }}  
  type='secondary'>
    {description}
  </Paragraph>
  {type=='testi'&&<Rate disabled allowHalf defaultValue={5} style={{display:'flex',justifyContent:'center'}}/>}

  {type=='testi'&&<Text style={{ color: 'white',fontWeight:'2px',fontSize:'13px',display: 'flex', justifyContent: 'flex-end' }} italic={true}>- {name}<br/></Text>}

    {type!='testi'&&type!='expert'&&<Button type="primary" shape="round"   style={{
      width: '100%',
      textAlign: 'center',
      background:'#6B11DC'
    }} onClick={haddler} >
            {type=='test'&&'Take Test' || type=='course'&&'View Course'}
          </Button>}
          {/* {type=='expert'&& <a href="#" >View Expert</a>} */}
        {/* <Typography.Title level={5} style={{color:'#ccc',textAlign:'left',borderTop:'1px solid #ccc',fontSize:'15px'}} > 22/07/2023 </Typography.Title > */}
  </Card>
)
}

/// Not Yet used card comp

const Learn = () =>{
    return (

      <Card
    style={{
      width:300,
      padding: 0,
      "& .ant-card-body": {
        padding: 0
      }
    }}
  >
    <img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" width={50} height={50} />
    <Meta title="Europe Street beat" description="www.instagram.com" />
  </Card>
    )
}

export {CusCard,CustDes,Learn}



