import {
    DownloadOutlined,
    DragOutlined,
    FormOutlined,
    LayoutOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Avatar, Button, Tooltip } from 'antd';
import { useRouter } from 'next/router';
import React from 'react';
import DownloadButton from '../../../../custom/downnload-button';
import { useTranslation } from 'next-i18next';
import styles from '../styles.module.scss';

type Props = {
    onAction: (action: string) => void;
};

const ActionList = (props: Props) => {
    const { onAction } = props;
    const { t } = useTranslation();
    const router = useRouter();
    return (
        <div>
            <div className={styles['action-item']}>
                <Tooltip
                    placement="right"
                    title={t('edit-account-settings', {ns: 'edit'})}>
                    <Button
                        style={{
                            backgroundColor: 'transparent',
                            color: 'white',
                            border: 'none',
                            fontSize: '18px',
                        }}
                        onClick={() => {
                            router.push('/account');
                        }}>
                        <Avatar
                            size={18}
                            icon={<UserOutlined />}
                        />
                    </Button>
                </Tooltip>
            </div>

            <div style={{ border: 'solid 0.5px white' }}></div>
            <div className={styles['action-item']}>
                <Tooltip
                    placement="right"
                    title={t('edit-editor', {ns: 'edit'})}>
                    <Button
                        style={{
                            backgroundColor: 'transparent',
                            color: 'white',
                            border: 'none',
                            fontSize: '18px',
                        }}
                        onClick={() => {
                            onAction('editor');
                        }}>
                        <FormOutlined />
                    </Button>
                </Tooltip>
            </div>
            <div className={styles['action-item']}>
                <Tooltip
                    placement="right"
                    title={t('edit-template', {ns: 'edit'})}>
                    <Button
                        style={{
                            backgroundColor: 'transparent',
                            color: 'white',
                            border: 'none',
                            fontSize: '18px',
                        }}
                        onClick={() => {
                            onAction('template');
                        }}>
                        <LayoutOutlined />
                    </Button>
                </Tooltip>
            </div>
            <div className={styles['action-item']}>
                <Tooltip
                    placement="right"
                    title={t('edit-layout', {ns: 'edit'})}>
                    <Button
                        style={{
                            backgroundColor: 'transparent',
                            color: 'white',
                            border: 'none',
                            fontSize: '18px',
                        }}
                        onClick={() => {
                            onAction('layout');
                        }}>
                        <DragOutlined />
                    </Button>
                </Tooltip>
            </div>
            <div className={styles['action-item']}>
                <Tooltip
                    placement="right"
                    title={t('edit-export', {ns:'edit'})}>
                    <DownloadButton icon={true} />
                </Tooltip>
            </div>
        </div>
    );
};

export default ActionList;
