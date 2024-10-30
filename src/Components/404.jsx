import React from 'react';
import { Button, Result } from 'antd';
import { Link } from 'react-router-dom';

const PageNotFound = () => (
  <Result style={{height:'90vh'}} 
    status="404"
    title="404"
    subTitle="Sorry, the page you visited does not exist."
    extra={<Button type="primary">Back Home</Button>}
  />
);

export default PageNotFound;