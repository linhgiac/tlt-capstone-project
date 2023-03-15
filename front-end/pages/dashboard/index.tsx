import { Button, Divider, message, Modal, Upload } from 'antd';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { DashboardDataType } from '../../configs/interfaces/dashboard.interface';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { MOCKED_DASHBOARD } from '../../mock/dashboard.mock';
import DashboardContainer from '../../components/page/dashboard/dashboard-container';
import classNames from 'classnames';
import styles from './styles.module.scss';
import { HOST, LAYOUT } from '../../configs/constants/misc';
import axios from 'axios';
import { getAuthHeader } from '../../configs/restApi/clients';
import Divide from '../../template/template-01/widgets/divide/Divide';
import { useSetRecoilState } from 'recoil';
import { resumeInfoState } from '../../recoil-state/resume-state/resume-changed-state/resume-changed-single-section.state';
import { InboxOutlined, UploadOutlined } from '@ant-design/icons';
import { isEmpty } from 'lodash';
import { hasCookie } from 'cookies-next';

type DashboardProps = {
    dashboardData: DashboardDataType;
    error: any;
};

const Dashboard = (props: DashboardProps) => {
    const { dashboardData, error } = props;

    const [isImportModalOpen, setIsImportModalOpen] = useState(false);
    const setResumeInfo = useSetRecoilState(resumeInfoState);

    const router = useRouter();
    useEffect(() => {
        if (error || !hasCookie('accessToken')) {
            router.push('/');
        }
    }, [error, router]);

    const onSelect = (id: number) => {
        router.push({
            pathname: '/resumes/[id]/edit',
            query: {
                id: id,
            },
        });
    };

    const onCreate = async () => {
        const headers = getAuthHeader();
        const response = await axios.post(
            `${HOST}resume/create/`,
            { template: 2 },
            {
                headers: headers,
            }
        );
        router.push({
            pathname: '/resumes/[id]/edit',
            query: {
                id: response.data.id,
            },
        });
        setResumeInfo({
            id: response.data.id,
            template: response.data.template,
        });
    };

    const importHandler = () => {};

    const importCancelHanlder = () => {
        setIsImportModalOpen(false);
    };

    const uploadChangeHanlder = (info: any) => {
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    };
    return (
        dashboardData && (
            <div className={classNames(styles['dashboard'])}>
                <div className={classNames(styles['dashboard-header'])}>
                    <h1>Resumes</h1>
                    <div>
                        <Button
                            className={styles.button}
                            size="large"
                            onClick={() => setIsImportModalOpen(true)}
                            style={{ marginRight: '10px' }}>
                            + Import
                        </Button>
                        <Button
                            className={styles.button}
                            size="large"
                            onClick={onCreate}>
                            + Create New
                        </Button>
                    </div>
                </div>
                <Divider />
                <DashboardContainer
                    data={dashboardData.data}></DashboardContainer>
                <Modal
                    centered
                    title="Import Resume"
                    open={isImportModalOpen}
                    onOk={importHandler}
                    onCancel={importCancelHanlder}>
                    <div>
                        <Upload.Dragger
                            name={'file'}
                            onChange={uploadChangeHanlder}
                            maxCount={1}>
                            <p style={{ fontSize: '36px' }}>
                                <InboxOutlined />
                            </p>
                            <p className="ant-upload-text">
                                Click or drag file to this area to upload
                            </p>
                        </Upload.Dragger>
                    </div>
                </Modal>
            </div>
        )
    );
};

export default Dashboard;

// export const getServerSideProps: GetServerSideProps = async (context) => {
//     return { props: { dashboardData: MOCKED_DASHBOARD } };
// }

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
    const { req, res } = ctx;
    const defaultReturnProps = {
        currentLayout: LAYOUT.DEFAULT,
    };
    try {
        const headers = getAuthHeader({ req, res });

        const resume = await axios.get(`${HOST}resume/`, {
            headers: headers,
        });

        return {
            props: {
                ...defaultReturnProps,
                dashboardData: resume === null ? null : { data: resume.data },
            },
        };
    } catch (error: any) {
        return {
            props: {
                ...defaultReturnProps,
                error: JSON.stringify(error),
            },
        };
    }
};
