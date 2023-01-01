import { Button } from 'antd';
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import styles from './styles.module.scss';
import { useRouter } from 'next/router';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userLoginState } from '../../../../../recoil-state/user-state/user-state';
import axios from 'axios';
import { HOST } from '../../../../../configs/constants/misc';
import { deleteCookie, getCookie, hasCookie } from 'cookies-next';
import { getAuthHeader } from '../../../../../configs/restApi/clients';

type HeaderButtonProps = {
    className: string;
};

const HeaderButton = (props: HeaderButtonProps) => {
    const { className } = props;
    const [isLogged, setIsLogged] = useRecoilState(userLoginState);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    if (getCookie('accessToken')) {
        setIsLogged(true);
    }
    console.log('isLogged', isLogged);
    const logoutHandler = async () => {
        try {
            setIsLoading(true);
            const headers = getAuthHeader();
            const refresh = getCookie('tokenRefresh');
            const response = await axios.post<any>(
                `${HOST}accounts/logout/`,
                { refresh: refresh },
                {
                    headers: headers,
                }
            );
            deleteCookie('tokenAccess');
            deleteCookie('tokenRefresh');
            router.replace('/');
            router.reload();
        } catch (error) {
        }
        setIsLoading(false);
    };

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
                        onClick={logoutHandler}>
                        Logout
                    </Button>
                </>
            )}
        </div>
    );
};

export default HeaderButton;
