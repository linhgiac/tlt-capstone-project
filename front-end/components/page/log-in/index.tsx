import React from 'react';
import { Typography } from 'antd';
import FacebookLogin from './facebook';
import GoogleLogin from './google';
import LinkedInLogin from './linkedIn';
import AccountLogin from './account';

const { Title, Text } = Typography;

type Props = {};

const LoginContent = (props: Props) => {
    return (
        <>
            <Title>Login</Title>
            <Text type="secondary">We are happy to see you back</Text>
            <div>
                <FacebookLogin />
                <GoogleLogin />
            </div>
            <div>
                <LinkedInLogin />
                <AccountLogin />
            </div>
        </>
    );
};

export default LoginContent;
