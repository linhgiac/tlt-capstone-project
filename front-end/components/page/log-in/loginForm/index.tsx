import { Button, Form, FormInstance, Input, Row } from 'antd';
import { ValidateErrorEntity } from 'rc-field-form/lib/interface';
import React from 'react';
import styles from './styles.module.scss';

type Props = {
    form: FormInstance;
    onLogin: (values: any) => void;
    onBack: () => void;
};
const { Item } = Form;

const LoginForm = (props: Props) => {
    const { form, onBack, onLogin } = props;
    return (
        <div>
            <Form
                layout="vertical"
                form={form}
                onFinish={onLogin}>
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
                            Login
                        </Button>
                    </Item>
                </Row>
            </Form>
        </div>
    );
};

export default LoginForm;
