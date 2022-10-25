import React from 'react';
import EmploymentHistoryImport from './employment-history-import';
import PersonalDetailsImport from './personal-details-import';
import ProfessionalSummaryImport from './professional-summary-import';

type Props = {
    className?: string;
};

const ResumeImportForm = (props: Props) => {
    const { className } = props;
    return (
        <div>
            <PersonalDetailsImport
                className='p-b-20'
                defaultTitle='Personal Details'
            />
            <ProfessionalSummaryImport
                className='p-b-20'
                defaultTitle='Professional Summary'
            />
            <EmploymentHistoryImport
                className='p-b-20'
                defaultTitle='Employment History'
                sectionType='employmentHistories'
            />
        </div>
    );
};

export default ResumeImportForm;
