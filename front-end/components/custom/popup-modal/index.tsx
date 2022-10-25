import { Button, Modal, Typography } from 'antd';
import React from 'react';
import styles from './styles.module.scss';

const { Text } = Typography;

const NOTIFICATION_TYPE = {
    ERROR: 'error',
    WARNING: 'warning',
    INFO: 'info',
    SUCCESS: 'success',
    CONFIRM: 'confirm',
};

type PopupModalProps = {
    visible?: boolean;
    title: string;
    description?: string;
    type: 'error' | 'warning' | 'info' | 'success' | 'confirm';
    okText?: string;
    cancelText?: string;
    onOk?: () => void;
    onCancel: () => void;
};

const PopupModal = (props: PopupModalProps) => {
    const {
        visible,
        title,
        description,
        type,
        onOk,
        onCancel,
        okText,
        cancelText = 'Cancel',
    } = props;
    const { ERROR, WARNING, SUCCESS, INFO, CONFIRM } = NOTIFICATION_TYPE;
    const mapTypeToHeaderColor = () => {
        switch (type) {
            case ERROR:
                return <div className={styles.error} />;
            case SUCCESS:
                return <div className={styles.success} />;
            case WARNING:
            case CONFIRM:
                return <div className={styles.warning} />;
            case INFO:
                return <div className={styles.info} />;
        }
    };

    return (
        <Modal
            open={visible}
            className={styles['modal']}
            footer={null}
            centered>
            <div className={styles['container']}>
                <div className={styles['header']}>{mapTypeToHeaderColor()}</div>
                <div className={styles['content']}>
                    <Text className={styles['title']}>{title}</Text>
                    <Text className={styles['description']}>{description}</Text>
                </div>
                <div className={styles['action']}>
                    <Button
                        onClick={onOk}
                        className={styles['button']}
                        size='large'>
                        {okText}
                    </Button>
                    <Button
                        onClick={onCancel}
                        type='primary'
                        className={styles['button']}
                        size='large'>
                        {cancelText}
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default PopupModal;
