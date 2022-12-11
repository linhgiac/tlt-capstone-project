import { Button } from 'antd';
import React from 'react';
import HomeCard from '../home-card';

type Props = {};

const HomeInstruction = (props: Props) => {
    const TITLE = 'Create perfect resumes for the modern job market';
    const DESCRIPTION =
        'Creating a resume or cover letter has never been this easy! In three simple steps, create the perfect document to impress hiring managers and employers. Minimum time, maximum professional quality.';
    return (
        <HomeCard
            title={TITLE}
            description={DESCRIPTION}>
            <Button>Create My Button</Button>
        </HomeCard>
    );
};

export default HomeInstruction;
