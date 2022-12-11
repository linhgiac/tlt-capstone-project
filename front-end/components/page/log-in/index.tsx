import React, { useCallback, useState } from 'react';
import { Button, Form, Typography } from 'antd';
import styles from './styles.module.scss';
import {
    FacebookFilled,
    GoogleOutlined,
    LinkedinFilled,
    UserOutlined,
} from '@ant-design/icons';
import classNames from 'classnames';
import LoginOption from './loginOption';
import LoginForm from './loginForm';
import { LoginValue } from '../../../configs/interfaces/user.interface';
import axios from 'axios';
import { useRouter } from 'next/router';
import { setCookie } from 'cookies-next';
import { useRecoilState } from 'recoil';
import { userLoginState } from '../../../recoil-state/user-state/user-state';

const { Title, Text } = Typography;

type Props = {};

type LoginResponse = {
    access: string,
    refresh: string,
}

const LoginContent = (props: Props) => {
    const [isLogging, setIsLogging] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [form] = Form.useForm();
    console.log('form :>> ', form);
    const [error, setError] = useState({ error: '' });
    const router = useRouter();
    const clickOptionHandler = useCallback(() => {
        setIsLogging(true);
    }, []);
    const [isLogged, setIsLogged] = useRecoilState(userLoginState);
    const loginHandler = async (values: any) => {
        try {
            console.log(values);
            setIsLoading(true);
            const response = await axios.post<LoginResponse>(
                'http://localhost:8000/accounts/token/',
                values,
                {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'application/json',
                    },
                }
            )
            console.log(response);
            setCookie('token-access', response.data.access);
            setCookie('token-refresh', response.data.refresh);
            setIsLogged(true);
            router.replace('/');
        } catch (error: any) {
            console.log(error.response.data);
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
                {isLogging ? (
                    <LoginForm
                        form={form}
                        onLogin={loginHandler}
                        isLoading={isLoading}
                        // onChangeValue={setUser}
                        // onLoginFailed = {}
                        onBack={() => {
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
