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
            style={{ display: 'inline-block' }}
            className={classNames(className)}>
            <div className={classNames(styles['dashboard-item'])}>
                <div
                    // size="large"
                    onClick={editHandler}
                    className={classNames(styles['dashboard-item-preview'])}>
                    <Image
                        src={item.thumbnail}
                        width={225}
                        height={321}
                    />
                </div>
                <div className={classNames(styles['dashboard-item-body'])}>
                    <ResumeTitle
                        editable={false}
                        title={item.title}></ResumeTitle>
                    {/* <div className={classNames(styles['dashboard-item-lastupdated'])}>Updated {item.lastUpdated}</div> */}
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
                            icon={<EditOutlined />}
                            onClick={editHandler}>
                            Edit
                        </Button>
                        <Button
                            size="large"
                            icon={<CopyOutlined />}
                            type="text"
                            className={classNames(
                                styles['dashboard-item-button']
                            )}
                            onClick={duplicateItemHandler}>
                            Duplicate
                        </Button>
                        <Button
                            size="large"
                            icon={<DeleteOutlined />}
                            type="text"
                            className={classNames(
                                styles['dashboard-item-button']
                            )}
                            onClick={() => {
                                setIsModalOpened(true);
                            }}>
                            Delete
                        </Button>
                        <PopupModal
                            title="Delete Resume"
                            description="Are you sure you want to delete this resume?"
                            type={'confirm'}
                            visible={isModalOpened}
                            okText="Delete"
                            cancelText="Cancel"
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
