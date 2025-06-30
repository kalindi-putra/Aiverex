import { Card,Typography,Button,Rate } from 'antd';
import { useRouter } from 'next/navigation';
const { Title,Text,Paragraph } = Typography;
const { Meta } = Card;

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

const CustDes = (props) => {
  const { id, index, img, name, description, price, styles } = props.content;
  const type = props.type;
  const isLeft = id % 2 === 1;
  const router = useRouter();

  const handler = () => {
    if (type === 'test') router.push('\students\instructions');
    return;
  };

  return (
    <Card
      key={id}
      style={{
        padding: type !== 'expert' ? '5px' : '0px 20px',
        position: type === 'expert' && 'relative',
        borderRadius: type !== 'expert' ? 5 : 15,
        color: 'white',
        background: type === 'expert' ? 'transparent' : '#343434',
        border: 0,
        overflow: 'hidden',
        margin: type !== 'expert' ? 8 : "-60px 10px 0px 10px",
        width: type !== 'expert' ? 290 : 600,
        display: type !== 'expert' ? 'inline-block' : 'block',
        marginLeft: type === 'expert' && !isLeft ? "212%" : "0%" ,
        overflow: type === 'expert' && 'visible' ,
        // animation: 'movedown 1s linear forwards',
        // opacity: '0'
      }}
      bodyStyle={{ padding: '10px' }}
    >
      {type === 'expert' ? (
        <div style={{ display: 'flex', flexDirection: isLeft ? 'row-reverse' : 'row', alignItems: 'center', gap: 20 }}>
          <img src='assets/primaryDot.png' style={{ position:'absolute' , zIndex:'20' ,height:'50px' , width:'50px' , left: !isLeft && '-79px' , right: isLeft && '-81px' , top:'140px'}}></img>
          <span style={{
            height: '0',
            width: '0',
            position: 'absolute',
            top: '140px',
            zIndex: '1',
            borderTop: '20px solid transparent',
            borderBottom: '20px solid transparent',
            borderLeft: isLeft && '20px solid white',
            borderRight: !isLeft && '20px solid white',
            right: isLeft && '15px',
            left: !isLeft && '16px',
          }}></span>
          <img
            src={img}
            alt="expert"
            style={{
              borderRadius: 15,
              height: 180,
              width: 180,
              objectFit: 'cover',
            }}
          />
          <div style={{ flex: 1 }}>
            <Text style={{ color: 'white', fontSize: '23px' }}>{name}</Text>
            <Paragraph
              ellipsis={{ rows: 3 }}
              style={{ color: '#ccc' , paddingTop: '15px' }}
              type="secondary"
            >
              {description}
            </Paragraph>

            {type !== 'expert' && (
              <Button
                type="primary"
                shape="round"
                style={{
                  width: '100%',
                  background: '#6B11DC',
                }}
                onClick={handler}
              >
                {type === 'test' && 'Take Test'}
                {type === 'course' && 'View Course'}
              </Button>
            )}
          </div>
        </div>
      ) : type === 'test' ? (
        <div>
          <img
            src={img}
            alt="expert"
            style={{
              borderRadius: 15,
              height: 180,
              width: 180,
              objectFit: 'cover',
            }}
          />
          <div style={{ flex: 1 }}>
            <Text style={{ color: 'white', fontSize: '23px' }}>{name}</Text>
            <Paragraph
              ellipsis={{ rows: 3 }}
              style={{ color: '#ccc' , paddingTop: '15px' }}
              type="secondary"
            >
              {description}
            </Paragraph>

            {type !== 'expert' && (
              <Button
                type="primary"
                shape="round"
                style={{
                  width: '100%',
                  background: '#6B11DC',
                }}
                onClick={handler}
              >
                {type === 'test' && 'Take Test'}
                {type === 'course' && 'View Course'}
              </Button>
            )}
          </div>
        </div>
      ) : (
        <>
          <Paragraph
            ellipsis={{ rows: 5 }}
            style={{ color: '#ccc' }}
            type="secondary"
          >
            {description}
          </Paragraph>
          <Rate
            disabled
            allowHalf
            defaultValue={5}
            style={{ display: 'flex', justifyContent: 'center', color: 'white' }}
          />
          <Text
            italic
            style={{
              color: 'white',
              fontSize: '13px',
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            - {name}
          </Text>
        </>
      )}
    </Card>
  );
};


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



