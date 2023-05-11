import {
    FacebookFilled,
    GoogleOutlined,
    LinkedinFilled,
    UserOutlined,
} from '@ant-design/icons';
import { Button, Typography } from 'antd';
import classNames from 'classnames';
import { useRouter } from 'next/router';

import React from 'react';
import styles from './styles.module.scss';

const { Text, Link } = Typography;
type Props = {
    onClick: () => void;
};

const LoginOption = (props: Props) => {
    const router = useRouter();
    const { onClick } = props;
    return (
        <div>
            <div className={styles['button']}>
                <Button type="primary">
                    <FacebookFilled />
                    Facebook
                </Button>
                <Button
                    type="primary"
                >
                    <GoogleOutlined />
                    Google
                </Button>
                <Button type="primary">
                    <LinkedinFilled />
                    LinkedIn
                </Button>
                <Button
                    onClick={() => {
                        onClick();
                    }}>
                    <UserOutlined />
                    Account
                </Button>
            </div>
            <Text
                type="secondary"
                className={classNames('center', styles['register'])}>
                I am not registerd -{' '}
                <Link
                    style={{ paddingLeft: '5px' }}
                    target="_blank"
                    onClick={() => {
                        router.push('/register');
                    }}>
                    {' '}
                    Sign Up
                </Link>
            </Text>
        </div>
    );
};

export default LoginOption;
