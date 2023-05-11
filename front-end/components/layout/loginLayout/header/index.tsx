import React from 'react';
import { Layout } from 'antd';
import styles from './styles.module.scss';
import { useRouter } from 'next/router';
import { CloseOutlined } from '@ant-design/icons';

const { Header } = Layout;
type Props = {};

const LoginLayoutHeader = (props: Props) => {
    const router = useRouter();
    return (
        <Header className={styles.header}>
            <div
                className={styles.logo}
                onClick={() => router.push('/')}>
            </div>

            <div
                className={styles['right-header']}
                onClick={() => router.push('/')}>
                <CloseOutlined
                    style={{ fontSize: '20px' }}
                />
            </div>
        </Header>
    );
};

export default LoginLayoutHeader;
