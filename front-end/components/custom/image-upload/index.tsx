import { LoadingOutlined, PlusOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Modal, Upload, UploadFile, UploadProps } from 'antd';
import classNames from 'classnames';
import { image } from 'html2canvas/dist/types/css/types/image';
import { isEmpty } from 'lodash';
import React, { useEffect, useState } from 'react';

import styles from './styles.module.scss';

type ImageUploadProps = {
    className?: string;
    onUpload: (value: any) => void;
    fetchingURL: string;
};

const ImageUpload = (props: ImageUploadProps) => {
    const { className, fetchingURL, onUpload } = props;
    const [file, setFile] = useState<UploadFile>();
    const [imageURL, setimageURL] = useState('');

    // More consideration
    useEffect(() => {
        setimageURL(fetchingURL);
    }, [fetchingURL]);

    useEffect(() => {
        return () => {
            URL.revokeObjectURL(imageURL);
        };
    }, [file]);
    const changeImageHandler: UploadProps['onChange'] = info => {
        setFile(info.file);
        if (info.file.originFileObj) {
            setimageURL(URL.createObjectURL(info.file.originFileObj));
            onUpload(info.file.originFileObj);
        }
    };
    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );
    return (
        <div className={classNames(className)}>
            <Upload
                name="image"
                listType="picture-card"
                className={classNames('avatar-uploader', { className })}
                showUploadList={false}
                disabled={false}
                onChange={changeImageHandler}>
                {imageURL ? (
                    <img
                        src={imageURL}
                        alt="image"
                        style={{ width: '100%' }}
                    />
                ) : (
                    uploadButton
                )}
            </Upload>
        </div>
    );
};

export default ImageUpload;
