import classNames from 'classnames';
import React, { useState } from 'react';
import styles from './styles.module.scss';
import { FormInstance, Typography, Form } from 'antd';
import RegisterForm from './registerForm';
import { useRouter } from 'next/router';
import axios, { AxiosError } from 'axios';
import { HOST } from '../../../configs/constants/misc';
import NotificationBox from '../../custom/notification-box';
const { Title, Text } = Typography;
type Props = {};

type RegisterResponse = {};

const RegisterContent = (props: Props) => {
    const [form] = Form.useForm();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const router = useRouter();
    const registerHandler = async (values: any) => {
        try {
            setIsLoading(true);
            const response = await axios.post<RegisterResponse>(
                `${HOST}accounts/register/`,
                values,
                {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'application/json',
                    },
                }
            );
            setSuccess(true);
            router.replace('/log-in');
        } catch (error: any) {
            if (error.response.data.username) {
                setError(error.response.data.username);
            } else if (error.response.data.password) {
                setError(error.response.data.password);
            } else if (error.response.data.email) {
                setError(error.response.data.email);
            }
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
                    <Title>Register</Title>
                </div>
                {error && (
                    <NotificationBox
                        type={'error'}
                        title={'Register Failed'}
                        msg={error}
                    />
                )}
                {success && (
                    <NotificationBox
                        type={'success'}
                        title={'Register Succeeded'}
                    />
                )}

                <RegisterForm
                    form={form}
                    isLoading={isLoading}
                    onBack={() => {
                        router.push('./log-in');
                        setError('');
                    }}
                    onRegister={registerHandler}
                />
            </div>
        </div>
    );
};

export default RegisterContent;
