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

const { Title, Text } = Typography;

type Props = {};

const LoginContent = (props: Props) => {
    const [isLogging, setIsLogging] = useState(false);
    const [form] = Form.useForm();

    const clickOptionHandler = useCallback(() => {
        setIsLogging(true);
    }, []);
    const loginHandler = (values: any) => {
        console.log('loginValues', values);
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
