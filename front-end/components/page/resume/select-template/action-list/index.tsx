import {
    DownloadOutlined,
    DragOutlined,
    FormOutlined,
    LayoutOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Avatar, Button, Tooltip } from 'antd';
import React from 'react';
import DownloadButton from '../../../../custom/downnload-button';

import styles from '../styles.module.scss';

type Props = {
    onAction: (action: string) => void;
};

const ActionList = (props: Props) => {
    const { onAction } = props;
    return (
        <div>
            <div className={styles['action-item']}>
                <Tooltip
                    placement="right"
                    title={'Template'}>
                    <Button
                        style={{
                            backgroundColor: 'transparent',
                            color: 'white',
                            border: 'none',
                            fontSize: '18px',
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
                    title={'Editor'}>
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
                    title={'Template'}>
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
                    title={'Layout'}>
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
                    title={'Export'}>
                    <DownloadButton icon={true}/>
                </Tooltip>
            </div>
        </div>
    );
};

export default ActionList;
