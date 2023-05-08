import { LoadingOutlined, PlusOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Modal, Upload, UploadFile, UploadProps } from 'antd';
import AntdImgCrop from 'antd-img-crop';
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
    const [imageURL, setImageURL] = useState('');

    // More consideration
    useEffect(() => {
        setImageURL(fetchingURL);
    }, [fetchingURL]);

    useEffect(() => {
        return () => {
            URL.revokeObjectURL(imageURL);
        };
    }, [file]);
    const beforeUpload = (file: any) => {
        if (file) {
            setImageURL(URL.createObjectURL(file));
            setFile(file);
            onUpload(file);
        }
    };
    const changeImageHandler: UploadProps['onChange'] = info => {
        // setFile(info.file);
        // if (info.file.originFileObj) {
        //     setImageURL(URL.createObjectURL(info.file.originFileObj));
        //     // onUpload(info.file.originFileObj);
        // }
    };
    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );
    return (
        <div className={classNames(className)}>
            <AntdImgCrop
                rotationSlider
                showReset>
                <Upload
                    name="image"
                    listType="picture-card"
                    className={classNames('avatar-uploader', { className })}
                    showUploadList={false}
                    disabled={false}
                    beforeUpload={beforeUpload}
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
            </AntdImgCrop>
        </div>
    );
};

export default ImageUpload;
