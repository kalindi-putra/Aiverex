import React from 'react';
import Link from 'next/link';
import { Button, Result } from 'antd';

const PageNotFound = () => (
  <Result style={{height:'90vh'}} 
    status="404"
    title="404"
    subTitle="Sorry, the page you visited does not exist."
    extra={<Link href= '/' legacyBehavior>
        <Button type="primary" > Back Home</Button>
        </Link>}
  />
);

export default PageNotFound;