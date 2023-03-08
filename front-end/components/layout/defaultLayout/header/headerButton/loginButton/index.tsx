import { Button } from 'antd';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import React from 'react';
import styles from '../styles.module.scss';

type Props = {};

const LoginButton = (props: Props) => {
    const router = useRouter();
    return (
        <div>
            <Button
                className={classNames(
                    'm-l-8',
                    'h-40px',
                    styles['text-button'],
                    styles['button']
                )}
                size="large"
                type="text"
                onClick={() => {
                    router.push('/log-in');
                }}>
                Log in
            </Button>
            <Button
                className={classNames(
                    'm-l-8',
                    'h-40px ',
                    'btn-lg-b-r-6',
                    styles['button']
                )}
                size="large"
                type="primary"
                onClick={() => router.push('/register')}>
                Sign Up
            </Button>
        </div>
    );
};

export default LoginButton;
