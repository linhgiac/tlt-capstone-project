import { useState } from 'react';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import Image from 'next/image';
import axios from 'axios';
import { useSetRecoilState } from 'recoil';
import { Button } from 'antd';
import { CopyOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';

import { DashboardItemType } from '../../../../configs/interfaces/dashboard.interface';
import styles from '../styles.module.scss';
import { EditableTitle } from '../../../custom';
import ResumeTitle from '../../resume/resume-import/resume-title';
import { resumeInfoState } from '../../../../recoil-state/resume-state/resume-changed-state/resume-changed-single-section.state';
import { HOST } from '../../../../configs/constants/misc';
import PopupModal from '../../../custom/popup-modal';
import { getAuthHeader } from '../../../../configs/restApi/clients';
import { useTranslation } from 'next-i18next';

type DashboardItemProps = {
    className?: string;
    item: DashboardItemType;
    onDelete: (id: number) => void;
    onDuplicate: (id: number) => void;
};

const DashboardItem = (props: DashboardItemProps) => {
    const { className, item, onDelete, onDuplicate } = props;
    const router = useRouter();
    const [isModalOpened, setIsModalOpened] = useState(false);
    const setResumeInfo = useSetRecoilState(resumeInfoState);
    const { t } = useTranslation();

    const editHandler = () => {
        setResumeInfo({ id: item.id });
        router.push({
            pathname: '/resumes/[id]/edit',
            query: {
                id: item.id,
            },
        });
    };

    const duplicateItemHandler = async () => {
        try {
            onDuplicate(item.id);
        } catch (error) {}
    };
    const onRename = (value: string) => {
    };

    const deleteItemHandler = async () => {
        try {
            onDelete(item.id);
            setIsModalOpened(false);
        } catch (error) {
            console.log('error :>> ', error);
        }
    };
    return (
        <div
            // style={{ display: 'inline-block' }}
            className={classNames(className)}>
            <div className={classNames(styles['dashboard-item'])}>
                <div
                    // size="large"
                    onClick={editHandler}
                    className={classNames(styles['dashboard-item-preview'])}>
                    <img
                        src={item?.thumbnail}
                        width={225}
                        height={321}
                    />
                </div>
                <div className={classNames(styles['dashboard-item-body'])}>
                    <ResumeTitle
                        editable={false}
                        title={item.title}></ResumeTitle>
                    {/* <div className={classNames(styles['dashboard-item-lastupdated'])}>Updated {item.lastUpdated}</div> */}
                    <div className={styles['dashboard-item-date']}>
                        {t('dashboard-created', {ns: 'dashboard'})} {item.createdAt}
                    </div>
                    <div className={styles['dashboard-item-date']}>
                        {t('dashboard-updated', {ns: 'dashboard'})} {item.updatedAt}
                    </div>
                    <div
                        className={classNames(
                            styles['dashboard-item-button-list']
                        )}>
                        <Button
                            size="large"
                            type="text"
                            className={classNames(
                                styles['dashboard-item-button']
                            )}
                            icon={
                                <EditOutlined
                                    style={{
                                        color: '#1890ff',
                                        fontSize: '18px',
                                    }}
                                />
                            }
                            onClick={editHandler}>
                            {t('dashboard-edit', { ns: 'dashboard' })}
                        </Button>
                        <Button
                            size="large"
                            icon={
                                <CopyOutlined
                                    style={{
                                        color: '#1890ff',
                                        fontSize: '18px',
                                    }}
                                />
                            }
                            type="text"
                            className={classNames(
                                styles['dashboard-item-button']
                            )}
                            onClick={duplicateItemHandler}>
                            {t('dashboard-duplicate', { ns: 'dashboard' })}
                        </Button>
                        <Button
                            size="large"
                            icon={
                                <DeleteOutlined
                                    style={{
                                        color: '#1890ff',
                                        fontSize: '18px',
                                    }}
                                />
                            }
                            type="text"
                            className={classNames(
                                styles['dashboard-item-button']
                            )}
                            onClick={() => {
                                setIsModalOpened(true);
                            }}>
                            {t('dashboard-delete', { ns: 'dashboard' })}
                        </Button>
                        <PopupModal
                            title={t('dashboard-delete-title', {
                                ns: 'dashboard',
                            })}
                            description={
                                t('dashboard-delete-description', {
                                    ns: 'dashboard',
                                }) as string
                            }
                            type={'confirm'}
                            visible={isModalOpened}
                            okText={
                                t('dashboard-delete-text', {
                                    ns: 'dashboard',
                                }) as string
                            }
                            cancelText={
                                t('dashboard-cancel-text', {
                                    ns: 'dashboard',
                                }) as string
                            }
                            onCancel={() => {
                                setIsModalOpened(false);
                            }}
                            onOk={deleteItemHandler}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardItem;
