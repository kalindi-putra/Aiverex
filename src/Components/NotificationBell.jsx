import React, { useState } from 'react';
import { Badge, Dropdown, List, Typography } from 'antd';
import { BellOutlined } from '@ant-design/icons';
import './NotificationBell.css';

const NotificationBell = ({ notifications = [] }) => {
    const [visible, setVisible] = useState(false);

    const notificationList = (
        <List
            className="notification-dropdown"
            itemLayout="horizontal"
            dataSource={notifications}
            renderItem={(item) => (
                <List.Item className="notification-item">
                    <List.Item.Meta
                        title={<Typography.Text strong>{item.title}</Typography.Text>}
                        description={
                            <div>
                                <Typography.Text type="secondary" style={{color:'white'}}>{item.description}</Typography.Text>
                                <Typography.Text type="secondary" className="notification-time">
                                    {item.time}
                                </Typography.Text>
                            </div>
                        }
                    />
                </List.Item>
            )}
        />
    );

    return (
        <Dropdown
            menu={{ items: [] }}
            trigger={['click']}
            open={visible}
            onOpenChange={setVisible}
            placement="bottomRight"
            dropdownRender={() => notificationList}
        >
            <Badge className="notification-badge">
                <BellOutlined className="notification-bell" />
            </Badge>
        </Dropdown>
    );
};

export default NotificationBell;
