import { LoadingOutlined, PlusOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Modal, Upload, UploadFile, UploadProps } from 'antd';
import classNames from 'classnames';
import { isEmpty } from 'lodash';
import React, { useEffect, useState } from 'react';

import styles from './styles.module.scss';
import { HOST } from '../../../../configs/constants/misc';

type AccountAvatarProps = {
    className?: string;
    onChangeAvatar: (value: any) => void;
    fetchingURL: string;
};

const AccountAvatar = (props: AccountAvatarProps) => {
    const { className, onChangeAvatar, fetchingURL } = props;
    const [file, setFile] = useState<UploadFile>();
    const [avatarURL, setAvatarURL] = useState("");

    // More consideration
    useEffect(() => {
        console.log("TvT fetchingURL", `${HOST}${fetchingURL.replace('/', '')}`);
        setAvatarURL(`${HOST}${fetchingURL.replace('/', '')}`);
    }, [fetchingURL]);

    useEffect(() => {
        return () => {
            URL.revokeObjectURL(avatarURL);
        };
    }, [file]);
    const changeAvatarHandler: UploadProps['onChange'] = info => {
        setFile(info.file);
        if (info.file.originFileObj) {
            setAvatarURL(URL.createObjectURL(info.file.originFileObj));
            onChangeAvatar(info.file.originFileObj);
        }
        console.log('info', info.file);
    };
    return (
        <div
            className={classNames(
                className,
                styles['change-avatar__container']
            )}>
            <div>
                {' '}
                {avatarURL ? (
                    <Avatar
                        size={64}
                        src={<img src={avatarURL} />}
                    />
                ) : (
                    <Avatar
                        size={64}
                        icon={<UserOutlined />}
                    />
                )}
            </div>
            <Upload
                showUploadList={false}
                onChange={changeAvatarHandler}>
                <div className={classNames(styles['change-avatar'])}>
                    Change avatar
                </div>
            </Upload>
        </div>
    );
};

export default AccountAvatar;
