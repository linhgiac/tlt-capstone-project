import React from 'react';
import router from 'next/router';
import { Layout } from 'antd';
import styles from './styles.module.scss';
import HeaderRouter from './headerRouter';
import HeaderButton from './headerButton';

const { Header } = Layout;
type Props = {};

const DefaultHeader = (props: Props) => {
    return (
        <Header className={styles.header}>
            <div
                className={styles.logo}
                onClick={() => router.push('/')}>
                Logo
            </div>

            <div className={styles['right-header']}>
                <HeaderRouter />
                <HeaderButton className={styles.button} />
            </div>
        </Header>
    );
};

export default DefaultHeader;
