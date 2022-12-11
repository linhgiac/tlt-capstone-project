import { Button } from 'antd';
import React, { useState } from 'react';
import classNames from 'classnames';
import styles from './styles.module.scss';
import { useRouter } from 'next/router';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userLoginState } from '../../../../../recoil-state/user-state/user-state';

type HeaderButtonProps = {
    className: string;
};

const HeaderButton = (props: HeaderButtonProps) => {
    const { className } = props;
    const isLogged = useRecoilValue(userLoginState);
    const router = useRouter();
    const onLogout = async () => {

    }
    return (
        <div className={classNames(className)}>
            {!isLogged ? (
                <>
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
                </>
            ) : (
                <>
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
                            router.push('/dashboard');
                        }}>
                        My Resume
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
                        onClick={onLogout}>
                        Logout
                    </Button>
                </>
            )}
        </div>
    );
};

export default HeaderButton;
