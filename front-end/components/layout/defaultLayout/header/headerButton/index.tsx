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
                className={classNames('m-l-8', 'h-40px', styles['text-button'])}
                size="middle"
                type="text"
                onClick={() => {
                    router.push('/log-in');
                }}>
                Log in
            </Button>
            <Button
                className={classNames('m-l-8', 'h-40px')}
                size="middle"
                type="primary">
                Sign Up
            </Button>
        </div>
    );
};

export default HeaderButton;
