import classNames from 'classnames';
import React from 'react';
import styles from './styles.module.scss';
import { FormInstance, Typography, Form } from 'antd';
import RegisterForm from './registerForm';
import { useRouter } from 'next/router';
const { Title, Text } = Typography;
type Props = {};

const RegisterContent = (props: Props) => {
    const [form] = Form.useForm();
    const router = useRouter();
    const registerHandler = (values: any) => {
        console.log('values :>> ', values);
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
