"use client";
import React , { useEffect, useState } from 'react';
import { Carousel,Col,Row } from 'antd';
import { CustDes } from './Card';
import AOS from 'aos';
import 'aos/dist/aos.css';
const contentStyle= {
  height: '160px',
  maxWidth:'1200px',
  margin: 'auto',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
  zIndex: 10,
};

const CustCarosuel = (props) => {
  const [scrWidth, setScrWidth] = useState(window.innerWidth);
  //AOS Styling
  const [currentSlide, setCurrentSlide] = useState(0);
  useEffect(() => {
    AOS.init({ duration: 300, once: true });
  }, []);

  const handleSlideChange = (index) => {
    setCurrentSlide(index);
    AOS.refresh(); // Re-initialize animations after slide change
  };


  let srcSize = scrWidth
  const [incBy,setIncBy] = useState(4);
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setScrWidth(width);
      setIncBy(Math.floor((width - 100) / 300));
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const content = props.content;

  const loop = () => {
    let arr = [];
    for (let i = 0; i < content.length; i += incBy) {
      arr.push(
        <div
          key={i}
          style={{ paddingRight: "30px" }}
        >
          {content.slice(i, i + incBy).map((item, j) => (
            <CustDes key={j} content={item} type="testi" />
          ))}
        </div>
      );
    }
    return arr;
  };

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
    <Carousel  
      effect="fade"
      autoplay
      afterChange={handleSlideChange}
      style={{
        paddingBottom: '1rem',
        paddingTop:'1rem',
        margin: '0 auto',
        marginLeft: '70px',
        maxWidth: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems:'center',
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