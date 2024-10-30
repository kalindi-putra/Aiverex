import React from 'react';
import { Carousel,Col,Row } from 'antd';
import { useEffect, useState } from 'react';
import { CustDes } from './Card';
const contentStyle= {
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
  zIndex: 10,
};
const CustCarosuel = (props) => {
  const [scrWidth, setScrWidth] = useState(window.innerWidth);
  let srcSize = scrWidth
  const [incBy,setIncBy] = useState(4);
  useEffect(() => {
    const handleResize = () => {
      // const isMobileQuery = window.matchMedia('(max-width: 807px)');
      setScrWidth(window.innerWidth);
      setIncBy(Math.floor((scrWidth-100)/300))
    };

    handleResize(); // Check on component mount

    window.addEventListener('resize', handleResize); // Add event listener for window resize

    // return () => {
    //   window.removeEventListener('resize', handleResize); // Clean up event listener on component unmount
    // };
  }, [scrWidth]);
  const content = props.content;
  const loop = () =>{

    let arr = []
    for(let i=0;i<content.length;i+=incBy){
    arr.push(<div>
          {content.slice(i,i+incBy).map((item) => {
              return <CustDes content={item} type='testi' />
          })}

        </div>)
    }
    return arr
  }

     
  return (
    // <Carousel  effect='fade' afterChange={onChange}
    // >
    //   {content.slice(0,4).map((i) => {
    //   console.log(i)
    //   return(
    //     // <Col style={{width:'300px',display:'inline-flex'}}>
    //     <div style={{width:'300px',display:'inline-flex'}}>
    //       {content.slice(start,start+4).map((item) => {
    //           <CustDes content={item} type='testi' />
    //       })}

    //     </div>
    //     // </Col>
    //   )})}
    // </Carousel>
    <Carousel  effect='fade' autoplay 
    style={{
      paddingBottom:'5rem',
    }}
    >
      {/* {loop().map((i) => {
        console.log(i)
        return(
          // <Col style={{width:'300px',display:'inline-flex'}}>
          <div style={{width:'300px',display:'inline-flex'}}>
            <i/>
          </div>
          // </Col>
        )
      })} */}
      {loop()}
        
    </Carousel>
  );
};

const NormalCarosuel = () => (
  <Carousel autoplay>
    <div>
      <h3 style={contentStyle}>1</h3>
    </div>
    <div>
      <h3 style={contentStyle}>2</h3>
    </div>
    <div>
      <h3 style={contentStyle}>3</h3>
    </div>
    <div>
      <h3 style={contentStyle}>4</h3>
    </div>
  </Carousel>
);
export {CustCarosuel,NormalCarosuel};