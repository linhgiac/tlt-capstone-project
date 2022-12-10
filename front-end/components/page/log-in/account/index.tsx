import { UserOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react';

type Props = {};

const AccountLogin = (props: Props) => {
    return (
        <Button type="text">
            <UserOutlined />
            Account
        </Button>
    );
};

export default AccountLogin;
