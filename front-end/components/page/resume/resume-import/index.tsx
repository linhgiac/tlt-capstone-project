import React from 'react';
import PersonalDetailsImport from './personal-details-import';
import ResumeTitle from './resume-title';
import ProfessionalSummaryImport from './professional-summary-import';
import classNames from 'classnames';
import { Button } from 'antd';

type ResumeImportProps = {
    className?: string;
};

const ResumeImport = (props: ResumeImportProps) => {
    const { className } = props;
    return (
        <div className={classNames(className)}>
            <h2>Resume Import</h2>
            <ResumeTitle />
            <PersonalDetailsImport className='p-b-20' />
            <ProfessionalSummaryImport className='p-b-20' />
            <Button type='primary' size='large'>
                Save Resume
            </Button>
        </div>
    );
};

export default ResumeImport;
