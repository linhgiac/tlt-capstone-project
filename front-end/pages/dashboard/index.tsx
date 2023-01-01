import { Button, Divider } from 'antd';
import { useRouter } from 'next/router';
import React from 'react';
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

type DashboardProps = {
    dashboardData: DashboardDataType;
};

const Dashboard = (props: DashboardProps) => {
    const { dashboardData } = props;

    const setResumeInfo = useSetRecoilState(resumeInfoState);

    const router = useRouter();
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
    return (
        dashboardData && (
            <div className={classNames(styles['dashboard'])}>
                <div className={classNames(styles['dashboard-header'])}>
                    <h1>Resumes</h1>
                    <Button
                        className={styles.button}
                        size="large"
                        onClick={onCreate}>
                        + Create New
                    </Button>
                </div>
                <Divider />
                <DashboardContainer
                    data={dashboardData.data}></DashboardContainer>
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
};
