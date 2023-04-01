import { Button, Form, Input } from "antd";
import classNames from "classnames";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

import styles from "./styles.module.scss";
import AccountAvatar from "../account-avatar";
import { convertProfilePayloadData } from "../../../../configs/utils/format.utils";
import { HOST } from "../../../../configs/constants/misc";
import { getAuthHeader } from "../../../../configs/restApi/clients";

type AccountFormProps = {
    className?: string;
    data: any;
};

type SaveAccountSettingResponse = {};

const AccountForm = (props: AccountFormProps) => {
    const { className, data } = props;
    const [avatar, setAvatar] = useState<File>();
    const [form] = Form.useForm();
    const router = useRouter()

    useEffect(() => {
        form.setFieldsValue(data);
    }, [data]);

    const saveProfileHandler = async (value: any) => {
        if (avatar) {
            value.avatar = avatar;
        }
        const convertedValue = convertProfilePayloadData(value);
        // convert Profile Payload Data
        // call API
        const authHeader = Object.assign(getAuthHeader(), { 'Content-Type': 'multipart/form-data' });
        try {
            const response = await axios.put<SaveAccountSettingResponse>(
                `${HOST}accounts/user-profile-update/${data.id}/`,
                convertedValue,
                {
                    headers: authHeader,
                }
            );
        } catch (error: any) {
            error?.response?.data.detail &&
                // setError(error.response.data.detail);
                // Error Handling
                console.log(error.response.data.detail);
        }
    };

    return (
        <div className={classNames(className)}>
            <Form
                form={form}
                layout="vertical"
                size="large"
                colon={false}
                onFinish={saveProfileHandler}
            >
                <Form.Item name="avatar">
                    <AccountAvatar
                        onChangeAvatar={(value: File) => setAvatar(value)}
                        fetchingURL = {data?.avatar ? data?.avatar : ""}
                    />
                </Form.Item>
                <Form.Item name="firstName" label="First Name">
                    <Input />
                </Form.Item>
                <Form.Item name="lastName" label="Last Name">
                    <Input />
                </Form.Item>
                <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                        {
                            type: "email",
                            message: "The input is not valid E-mail!",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item name="phone" label="Phone">
                    <Input />
                </Form.Item>
                <Form.Item name="country" label="Country">
                    <Input />
                </Form.Item>
                <Form.Item name="city" label="City">
                    <Input />
                </Form.Item>
                <Form.Item name="address" label="Address">
                    <Input />
                </Form.Item>
                <Form.Item>
                    <Button
                        className={classNames(styles["save-btn"])}
                        size="large"
                        type="text"
                        htmlType="submit"
                    >
                        Save
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default AccountForm;
