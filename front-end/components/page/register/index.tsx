import classNames from 'classnames';
import React, { useState } from 'react';
import styles from './styles.module.scss';
import { FormInstance, Typography, Form } from 'antd';
import RegisterForm from './registerForm';
import { useRouter } from 'next/router';
import axios, { AxiosError } from 'axios';
const { Title, Text } = Typography;
type Props = {};

type RegisterResponse = {

}

const RegisterContent = (props: Props) => {
    const [form] = Form.useForm();
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const registerHandler = async (values: any) => {
        console.log('values :>> ', values);
        try {
            setIsLoading(true);
            const response = await axios.post<RegisterResponse>(
                'http://localhost:8000/accounts/register/',
                values,
                {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'application/json',
                    },
                }
            )
            console.log(response);
            router.replace('/log-in');
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
                    <Title>Register</Title>
                </div>

                <RegisterForm
                    form={form}
                    isLoading={isLoading}
                    onBack={() => {
                        router.push('./log-in');
                    }}
                    onRegister={registerHandler}
                />
            </div>
        </div>
    );
};

export default RegisterContent;
