import { DashboardItemType } from "../../../../configs/interfaces/dashboard.interface";
import classNames from 'classnames';
import styles from '../styles.module.scss';
import { useState } from "react";
import { Button } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { EditableTitle } from "../../../custom";
import ResumeTitle from "../../resume/resume-import/resume-title";
import { useRouter } from "next/router";
import Image from 'next/image'
import { useSetRecoilState } from 'recoil';
import { resumeInfoState } from '../../../../recoil-state/resume-state/resume-changed-state/resume-changed-single-section.state';
import { HOST } from '../../../../configs/constants/misc';
import axios from 'axios';
import PopupModal from '../../../custom/popup-modal';
import { getAuthHeader } from '../../../../configs/restApi/clients';

type DashboardItemProps = {
    item: DashboardItemType;
};

const DashboardItem = (props: DashboardItemProps) => {
    const { item } = props;
    const router = useRouter();
    const [isModalOpened, setIsModalOpened] = useState(false);
    const setResumeInfo = useSetRecoilState(resumeInfoState);

    const onClick = () => {
        console.log('On click item');
        setResumeInfo({ id: item.id });
        router.push({
            pathname: '/resumes/[id]/edit',
            query: {
                id: item.id,
            },
        });
    };
    const onRename = (value: string) => {
        console.log('On rename: ', value);
    };

    const deleteHandler = async () => {
        try {
            const response = await axios.delete(
                `${HOST}resume/${item.id}/delete/`,
                { headers: getAuthHeader() }
            );
            console.log('response', response);
            setIsModalOpened(false);
            router.reload();
        } catch (error) {
            console.log('error :>> ', error);
        }
    };
    return (
        <div className={classNames(styles['dashboard-item'])}>
            <div
                // size="large"
                onClick={onClick}
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
                        className={classNames(styles['dashboard-item-button'])}
                        onClick={onClick}>
                        Edit
                    </Button>
                    <Button
                        size="large"
                        className={classNames(styles['dashboard-item-button'])}
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
                        onOk={deleteHandler}
                    />
                </div>
            </div>
        </div>
    );
};

export default DashboardItem;