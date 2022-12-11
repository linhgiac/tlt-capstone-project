import { Button } from 'antd';
import React from 'react';
import classNames from 'classnames';
import styles from './styles.module.scss';
import { useRouter } from 'next/router';

type HeaderButtonProps = {
    className: string;
};

const HeaderButton = (props: HeaderButtonProps) => {
    const { className } = props;
    const router = useRouter();
    return (
        <div className={classNames(className)}>
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

export default HeaderButton;
