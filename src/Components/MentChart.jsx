import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Line } from '@ant-design/plots';

const DemoLine = () => {
  // const data = [
  //   {
  //     months: 'jan',
  //     value: 3,
  //   },
  //   {
  //     months: 'feb',
  //     value: 4,
  //   },
  //   {
  //     months: 'march',
  //     value: 3.5,
  //   },
  //   {
  //     months: 'apr',
  //     value: 5,
  //   },
  //   {
  //     months: 'may',
  //     value: 4.9,
  //   },
  //   {
  //     months: 'jun',
  //     value: 6,
  //   },
  //   {
  //     months: 'july',
  //     value: 7,
  //   },
  //   {
  //     months: 'aug',
  //     value: 9,
  //   },
  //   {
  //     months: 'sep',
  //     value: 13,
  //   },
  // ];
  const config = {
    data,
    xField: 'months',
    yField: 'value',
    label: {},
    point: {
      size: 5,
      shape: 'diamond',
      style: {
        fill: 'white',
        stroke: '#6B11DB',
        lineWidth: 2,
      },
    },
    tooltip: {
      showMarkers: false,
    },
    state: {
      active: {
        style: {
          shadowBlur: 4,
          stroke: '#6B11DB',
          fill: 'red',
        },
      },
    },
    interactions: [
      {
        type: 'marker-active',
      },
    ],
  };
  return <Line {...config} />;
};

export default DemoLine