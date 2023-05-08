import React from 'react';
import LoginLayoutHeader from './header';

type LoginLayoutProps = {
    children: React.ReactNode;
};

const LoginLayout = (props: LoginLayoutProps) => {
    const { children } = props;
    return (
        <>
            <LoginLayoutHeader />
            <div>{children}</div>;
        </>
    );
};

export default LoginLayout;
