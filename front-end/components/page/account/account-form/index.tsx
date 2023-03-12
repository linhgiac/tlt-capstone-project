import { Button, Form, Input } from 'antd';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';

import styles from './styles.module.scss';
import AccountAvatar from '../account-avatar';

type Props = {
    className?: string;
    data: any;
};

const AccountForm = (props: Props) => {
    const { className, data } = props;
    const [avatar, setAvatar] = useState<File>();
    const [form] = Form.useForm();
    useEffect(() => {
        form.setFieldsValue(data);
    }, [data]);

    return (
        <div className={classNames(className)}>
            <Form
                form={form}
                layout="vertical"
                size="large"
                colon={false}
                onFinish={(value: any) => {
                    if (avatar) {
                        value.avatar = avatar;
                    }
                }}>
                <Form.Item name="avatar">
                    <AccountAvatar
                        onChangeAvatar={(value: File) => setAvatar(value)}
                    />
                </Form.Item>
                <Form.Item
                    name="firstName"
                    label="First Name">
                    <Input />
                </Form.Item>
                <Form.Item
                    name="lastName"
                    label="Last Name">
                    <Input />
                </Form.Item>
                <Form.Item
                    name="email"
                    label="Email"
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
                    <Input />
                </Form.Item>
                <Form.Item
                    name="phone"
                    label="Phone">
                    <Input />
                </Form.Item>
                <Form.Item>
                    <Button
                        className={classNames(styles['save-btn'])}
                        size="large"
                        type="text"
                        htmlType="submit">
                        Save
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default AccountForm;
