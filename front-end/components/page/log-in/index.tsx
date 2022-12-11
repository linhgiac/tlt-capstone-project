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

const { Title, Text } = Typography;

type Props = {};

const LoginContent = (props: Props) => {
    const [isLogging, setIsLogging] = useState(false);
    const [form] = Form.useForm();
    console.log('form :>> ', form);
    const [error, setError] = useState({ error: '' });

    const clickOptionHandler = useCallback(() => {
        setIsLogging(true);
    }, []);
    const loginHandler = async (values: any) => {
        try {
            const res = await axios.post('http://localhost:8000/accounts/token/', values);
        } catch (error) {

        }
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
