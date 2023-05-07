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
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { resumeInfoState } from '../../recoil-state/resume-state/resume-changed-state/resume-changed-single-section.state';
import { InboxOutlined, UploadOutlined } from '@ant-design/icons';
import { isEmpty } from 'lodash';
import { hasCookie } from 'cookies-next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { locale } from 'dayjs';
import {
    convertDashboardResponse,
    convertPayloadData,
} from '../../configs/utils/format.utils';
import { userState } from '../../recoil-state/user-state/user-state';

type DashboardProps = {
    dashboardData: DashboardDataType;
    error: any;
};

const Dashboard = (props: DashboardProps) => {
    const { dashboardData, error } = props;
    const { t } = useTranslation();
    const [isImportModalOpen, setIsImportModalOpen] = useState(false);
    const { id, avatar, ...userDetails } = useRecoilValue(userState);
    const setResumeInfo = useSetRecoilState(resumeInfoState);


    console.log('dashboardddd', dashboardData);
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

    const onCreateWithDetails = async () => {
        try {
            const headers = getAuthHeader();
            const resumeResponse = await axios.post(
                `${HOST}resume/create/`,
                { template: 2 },
                {
                    headers: headers,
                }
            );
            const resumeValue = await convertPayloadData({
                ...resumeResponse.data,
                personalDetails: userDetails,
            });
            console.log('resume value', resumeValue);
            try {
                const response = await axios.put(
                    `${HOST}resume/update/`,
                    resumeValue,
                    {
                        headers: getAuthHeader(),
                    }
                );
            } catch (error: any) {
                console.log('errorrrr', error);
            }

            console.log('resume value', resumeValue);
            console.log('resumeReponse', resumeResponse);
            console.log('userrrrrr', userDetails);
            router.push({
                pathname: '/resumes/[id]/edit',
                query: {
                    id: resumeResponse.data.id,
                },
            });
            setResumeInfo({
                id: resumeResponse.data.id,
                template: resumeResponse.data.template,
            });
        } catch (error: any) {
            console.log('error', error);
        }
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
        <div className={classNames(styles['dashboard'])}>
            <div className={classNames(styles['dashboard-header'])}>
                <h1>{t('dashboard-header', { ns: 'dashboard' })}</h1>
                <div>
                    <Button
                        className={styles.button}
                        size="large"
                        onClick={() => setIsImportModalOpen(true)}
                        style={{ marginRight: '10px' }}>
                        {t('dashboard-import', { ns: 'dashboard' })}
                    </Button>
                    <Button
                        className={styles.button}
                        size="large"
                        onClick={onCreate}
                        style={{ marginRight: '10px' }}>
                        {t('dashboard-create-new', { ns: 'dashboard' })}
                    </Button>
                    <Button
                        className={styles.button}
                        size="large"
                        onClick={onCreateWithDetails}>
                        + Create new with Personal Details
                    </Button>
                </div>
            </div>
            <Divider />
            {dashboardData && (
                <DashboardContainer
                    data={dashboardData.data}></DashboardContainer>
            )}
            <Modal
                centered
                title={t('dashboard-import-title', { ns: 'dashboard' })}
                open={isImportModalOpen}
                onOk={importHandler}
                onCancel={importCancelHanlder}
                okText={
                    t('dashboard-confirm-text', { ns: 'dashboard' }) as string
                }
                cancelText={
                    t('dashboard-cancel-text', { ns: 'dashboard' }) as string
                }>
                <div>
                    <Upload.Dragger
                        name={'file'}
                        onChange={uploadChangeHanlder}
                        maxCount={1}>
                        <p style={{ fontSize: '36px' }}>
                            <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">
                            {t('dashboard-upload-file', { ns: 'dashboard' })}
                        </p>
                    </Upload.Dragger>
                </div>
            </Modal>
        </div>
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
        const { locale } = ctx;
        return {
            props: {
                ...defaultReturnProps,
                ...(await serverSideTranslations(locale as string, [
                    'dashboard',
                ])),
                dashboardData:
                    resume === null
                        ? null
                        : { data: convertDashboardResponse(resume.data) },
            },
        };
    } catch (error: any) {
        console.log('erorrrrr', error);
        return {
            props: {
                ...defaultReturnProps,
                error: JSON.stringify(error),
            },
        };
    }
};
