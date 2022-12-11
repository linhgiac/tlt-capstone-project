import { Button } from 'antd';
import { useRouter } from 'next/router';
import React from 'react';
import { DashboardDataType } from '../../configs/interfaces/dashboard.interface';
import { GetServerSideProps } from 'next';
import { MOCKED_DASHBOARD } from '../../mock/dashboard.mock';
import DashboardContainer from '../../components/page/dashboard/dashboard-container';
import classNames from 'classnames';
import styles from './styles.module.scss';

type DashboardProps = {
    dashboardData: DashboardDataType
};

const Dashboard = (props: DashboardProps) => {
    const { dashboardData } = props
    console.log(dashboardData);
    const router = useRouter();
    const onSelect = (id: number) => {
        router.push({
            pathname: '/resumes/[id]/edit',
            query: {
                id: id,
            },
        });
    }
    const onCreate = () => {
        console.log("Create new resume");
    }
    return (
        <div className={classNames(styles['dashboard'])}>
            <div className={classNames(styles['dashboard-header'])}>
                <h1>Resumes</h1>
                <Button onClick={onCreate}>+ Create New</Button>
            </div>
            <DashboardContainer data={dashboardData.data}></DashboardContainer>
        </div>
    );
};

export default Dashboard;

export const getServerSideProps: GetServerSideProps = async (context) => {
    return { props: { dashboardData: MOCKED_DASHBOARD } };
}