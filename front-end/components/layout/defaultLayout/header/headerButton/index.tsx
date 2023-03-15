import { Avatar, Button, Dropdown } from 'antd';
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
import { UserOutlined } from '@ant-design/icons';
import LoginButton from './loginButton';
import LoggedButton from './loggedButton';

type HeaderButtonProps = {
    className: string;
};

const HeaderButton = (props: HeaderButtonProps) => {
    const { className } = props;
    const [isLogged, setIsLogged] = useRecoilState(userLoginState);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (hasCookie('accessToken')) {
            console.log('getCookie:>> ', hasCookie('accessToken'));
            setIsLogged(true);
        }
    }, []);

    console.log('isLogged', isLogged);
    const logoutHandler = async () => {
        try {
            setIsLoading(true);
            const headers = getAuthHeader();
            const refresh = getCookie('refreshToken');
            const response = await axios.post<any>(
                `${HOST}accounts/logout/`,
                { refresh: refresh },
                {
                    headers: headers,
                }
            );
            deleteCookie('accessToken');
            deleteCookie('refreshToken');
            router.push('/');
            router.reload();
        } catch (error) {}
        setIsLoading(false);
    };

    return (
        <div className={classNames(className)}>
            {!isLogged ? (
                <LoginButton />
            ) : (
                <LoggedButton onLogout={logoutHandler} />
            )}
        </div>
    );
};

export default HeaderButton;
