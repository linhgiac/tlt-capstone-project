import React from 'react'
import { LAYOUT } from '../../configs/constants/misc';
import DefaultLayout from './defaultLayout';
import LoginLayout from './loginLayout';

type LayoutProps = {
    children: React.ReactNode;
    currentLayout: string;
};

const Layout = ({ children, currentLayout }: LayoutProps) => {
    switch (currentLayout) {
        case LAYOUT.DEFAULT:
            return <DefaultLayout>{children}</DefaultLayout>;
        case LAYOUT.LOGIN:
            return <LoginLayout>{children}</LoginLayout>;
        default:
            return <DefaultLayout>{children}</DefaultLayout>;
    }
};

export default Layout