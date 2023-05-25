import { Button, Form, Input, Modal } from "antd";
import classNames from "classnames";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

import styles from "./styles.module.scss";
import AccountAvatar from "../account-avatar";
import { convertProfilePayloadData } from "../../../../configs/utils/format.utils";
import { HOST } from "../../../../configs/constants/misc";
import { getAuthHeader } from "../../../../configs/restApi/clients";
import { useTranslation } from "next-i18next";

type AccountFormProps = {
    className?: string;
    data: any;
};

type SaveAccountSettingResponse = {};

const AccountForm = (props: AccountFormProps) => {
    const { className, data } = props;
    const [avatar, setAvatar] = useState<File>();
    const [isSuccessful, setIsSuccessful] = useState(false)
    const [form] = Form.useForm();
    const router = useRouter()
    const { t } = useTranslation();

    useEffect(() => {
        form.setFieldsValue(data);
    }, [data]);

    const saveProfileHandler = async (value: any) => {
        if (value.avatar) {
            delete value.avatar;
        }
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
            setIsSuccessful(true)
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
                <Form.Item name="firstName" label={t('account-first-name', {ns: 'account'})}>
                    <Input />
                </Form.Item>
                <Form.Item name="lastName" label={t('account-last-name', {ns: 'account'})}>
                    <Input />
                </Form.Item>
                <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                        {
                            type: "email",
                            message: t('account-invalid-email', {ns: 'account'}) as string,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item name="phone" label={t('account-phone', {ns: 'account'})}>
                    <Input />
                </Form.Item>
                <Form.Item name="country" label={t('account-country', {ns: 'account'})}>
                    <Input />
                </Form.Item>
                <Form.Item name="city" label={t('account-city', {ns: 'account'})}>
                    <Input />
                </Form.Item>
                <Form.Item name="address" label={t('account-address', {ns: 'account'})}>
                    <Input />
                </Form.Item>
                <Form.Item>
                    <Button
                        className={classNames(styles["save-btn"])}
                        size="large"
                        type="text"
                        htmlType="submit"
                    >
                        {t('account-save', {ns: 'account'})}
                    </Button>
                </Form.Item>
            </Form>
            <Modal
                title={<div> {t('account-save-success', {ns: 'account'})}</div>}
                centered
                open={isSuccessful}
                onCancel={() => {
                    setIsSuccessful(false);
                }}
                footer={null}></Modal>
        </div>
    );
};

export default AccountForm;
