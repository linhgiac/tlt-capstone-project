import { Avatar, Button, Dropdown, Menu } from 'antd';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import type { MenuProps } from 'antd';
import React from 'react';

import styles from '../styles.module.scss';
import { UserOutlined } from '@ant-design/icons';
type Props = {
    onLogout: () => void;
};

const LoggedButton = (props: Props) => {
    const { onLogout } = props;
    const router = useRouter();

    const items: MenuProps['items'] = [
        {
            key: 'account',
            label: <Avatar icon={<UserOutlined />} />,
            children: [
                {
                    key: 'settings',
                    label: (
                        <div
                            onClick={() => {
                                router.push('/account');
                            }}>
                            Account Settings
                        </div>
                    ),
                },
                {
                    key: 'logout',
                    label: <div onClick={onLogout}>Logout</div>,
                },
            ],
        },
    ];
    return (
        <div className={classNames(styles['logged-button__container'])}>
            {window.location.pathname !== '/dashboard' && (
                <Button
                    className={classNames(
                        'm-l-8',
                        'h-40px',
                        styles['text-button'],
                        styles['button']
                    )}
                    size="large"
                    type="text"
                    disabled={
                        window.location.pathname === '/dashboard' ? true : false
                    }
                    onClick={() => {
                        router.push('/dashboard');
                    }}>
                    My Resume
                </Button>
            )}

            <Menu
                items={items}
                selectedKeys={[]}
                mode="horizontal"
            />

            {/* <Button
                className={classNames(
                    'm-l-8',
                    'h-40px ',
                    'btn-lg-b-r-6',
                    styles['button']
                )}
                size="large"
                type="primary"
                onClick={onLogout}>
                Logout
            </Button> */}
        </div>
    );
};

export default LoggedButton;
