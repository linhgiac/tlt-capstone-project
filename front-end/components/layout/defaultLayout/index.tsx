import React from 'react';
import { Layout } from 'antd';
import styles from './styles.module.scss';
import DefaultHeader from './header';

const { Header } = Layout;

type Props = {
    children: React.ReactNode;
};

const DefaultLayout = (props: Props) => {
    const { children } = props;
    return (
        <>
            <DefaultHeader />
            <div>{children}</div>
        </>
    );
};

export default DefaultLayout;
