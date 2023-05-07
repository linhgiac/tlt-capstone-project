import { Avatar, Button, Dropdown } from 'antd';
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import styles from './styles.module.scss';
import { useRouter } from 'next/router';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
    userLoginState,
    userState,
} from '../../../../../recoil-state/user-state/user-state';
import axios from 'axios';
import { HOST } from '../../../../../configs/constants/misc';
import { deleteCookie, getCookie, hasCookie } from 'cookies-next';
import { getAuthHeader } from '../../../../../configs/restApi/clients';
import { UserOutlined } from '@ant-design/icons';
import LoginButton from './loginButton';
import LoggedButton from './loggedButton';
import { convertProfileResponse } from '../../../../../configs/utils/format.utils';

type HeaderButtonProps = {
    className: string;
    isInline: boolean;
    onCloseDrawer: () => void;
};

const HeaderButton = (props: HeaderButtonProps) => {
    const { className, isInline, onCloseDrawer } = props;
    const [isLogged, setIsLogged] = useRecoilState(userLoginState);
    const [user, setUser] = useRecoilState(userState);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (hasCookie('accessToken')) {
            setIsLogged(true);
        }
    }, []);
    useEffect(() => {
        if (isLogged) {
            try {
                const headers = getAuthHeader({});
                axios
                    .get(`${HOST}accounts/user-details/`, {
                        headers: headers,
                    })
                    .then((response: any) => {
                        console.log('user response', response);
                        setUser(convertProfileResponse(response.data));
                    });
            } catch (error: any) {
                console.log('error errorrrr', error);
            }
        }
    }, [isLogged, setUser]);

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
            router.push('/');
            deleteCookie('accessToken');
            deleteCookie('refreshToken');
            setIsLogged(false);
            // router.reload();
        } catch (error) {}
        setIsLoading(false);
    };

    return (
        <div className={classNames(className)}>
            {!isLogged ? (
                <LoginButton onCloseDrawer={onCloseDrawer} />
            ) : (
                <LoggedButton
                    isInline={isInline}
                    onLogout={logoutHandler}
                    onCloseDrawer={onCloseDrawer}
                />
            )}
        </div>
    );
};

export default HeaderButton;
