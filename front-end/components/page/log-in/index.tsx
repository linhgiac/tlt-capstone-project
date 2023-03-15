import React, { useCallback, useState } from 'react';
import { Button, Form, notification, Typography } from 'antd';
import styles from './styles.module.scss';
import classNames from 'classnames';
import LoginOption from './loginOption';
import LoginForm from './loginForm';
import { LoginValue } from '../../../configs/interfaces/user.interface';
import axios from 'axios';
import { useRouter } from 'next/router';
import { setCookie } from 'cookies-next';
import { useRecoilState } from 'recoil';
import { userLoginState } from '../../../recoil-state/user-state/user-state';
import { openNotificationWithIcon } from '../../../configs/utils/noti.utils';
import NotificationBox from '../../custom/notification-box';
import { HOST } from '../../../configs/constants/misc';

const { Title, Text } = Typography;

type Props = {};

type LoginResponse = {
    access: string;
    refresh: string;
};

const LoginContent = (props: Props) => {
    const router = useRouter();
    const [form] = Form.useForm();

    const [isLogging, setIsLogging] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [isLogged, setIsLogged] = useRecoilState(userLoginState);

    const clickOptionHandler = useCallback(() => {
        setIsLogging(true);
    }, []);

    const loginHandler = async (values: any) => {
        try {
            setIsLoading(true);
            const response = await axios.post<LoginResponse>(
                `${HOST}accounts/token/`,
                values,
                {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'application/json',
                    },
                }
            );
            setCookie('accessToken', response.data.access);
            setCookie('refreshToken', response.data.refresh);
            setIsLogged(true);
            router.replace('/');
        } catch (error: any) {
            error?.response?.data.detail &&
                setError(error.response.data.detail);

        }
        setIsLoading(false);
    };
    
    return (
        <div className={styles['login-container']}>
            <div
                style={{
                    width: '100%',
                    maxWidth: '420px',
                    margin: '0px auto',
                }}>
                <div className={classNames('center', styles['title'])}>
                    <Title>Login</Title>
                    {isLogging ? (
                        <Text type="secondary">
                            Enter your username and password
                        </Text>
                    ) : (
                        <Text type="secondary">
                            We are happy to see you back
                        </Text>
                    )}
                </div>
                {error && (
                    <NotificationBox
                        type={'error'}
                        title={'Login Failed'}
                        msg={error}
                    />
                )}
                {isLogging ? (
                    <LoginForm
                        form={form}
                        onLogin={loginHandler}
                        isLoading={isLoading}
                        // onChangeValue={setUser}
                        // onLoginFailed = {}
                        onBack={() => {
                            setError('');
                            setIsLogging(false);
                        }}
                    />
                ) : (
                    <LoginOption onClick={clickOptionHandler} />
                )}
            </div>
        </div>
    );
};

export default LoginContent;
