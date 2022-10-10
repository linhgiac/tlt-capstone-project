import { Button } from 'antd';
import { useRouter } from 'next/router';
import React from 'react';

type DashboardProps = {};

const Dashboard = (props: DashboardProps) => {
    const router = useRouter();
    return (
        <div>
            <Button
                type='primary'
                size='large'
                onClick={() => {
                    router.push({
                        pathname: '/resumes/[id]/edit',
                        query: {
                            id: 1,
                        },
                    });
                }}>
                Create My Resume
            </Button>
        </div>
    );
};

export default Dashboard;
