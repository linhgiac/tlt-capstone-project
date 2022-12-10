import { FormInstance, Form, Input, Row, Button } from 'antd';
import { ValidateErrorEntity } from 'rc-field-form/lib/interface';
import React from 'react';
import styles from './styles.module.scss';

type Props = {
    form: FormInstance;
    onBack: () => void;
    onRegister: (values: any) => void;
};
const { Item } = Form;

const RegisterForm = (props: Props) => {
    const { onBack, onRegister, form } = props;
    return (
        <div>
            <Form
                layout="vertical"
                form={form}
                onFinish={onRegister}>
                <Item
                    label="Username"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                    ]}>
                    <Input size="large"></Input>
                </Item>
                <Item
                    label="Email"
                    name="email"
                    rules={[
                        {
                            type: 'email',
                            message: 'The input is not valid E-mail!',
                        },
                        {
                            required: true,
                            message: 'Please input your E-mail!',
                        },
                    ]}>
                    <Input size="large"></Input>
                </Item>
                <Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}>
                    <Input.Password size="large" />
                </Item>
                <Item
                    label="Confirm Password"
                    name="confirmPassword"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Please confirm your password!',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (
                                    !value ||
                                    getFieldValue('password') === value
                                ) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(
                                    new Error(
                                        'The two passwords that you entered do not match!'
                                    )
                                );
                            },
                        }),
                    ]}>
                    <Input.Password size="large" />
                </Item>
                <Row className={styles['button']}>
                    <Item>
                        <Button
                            size="large"
                            onClick={() => {
                                onBack();
                            }}>
                            Back
                        </Button>
                    </Item>
                    <Item>
                        <Button
                            size="large"
                            type="primary"
                            htmlType="submit">
                            Register
                        </Button>
                    </Item>
                </Row>
            </Form>
        </div>
    );
};

export default RegisterForm;
