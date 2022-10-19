import React from 'react';
import PersonalDetailsImport from './personal-details-import';
import ProfessionalSummaryImport from './professional-summary-import';

type Props = {
    className?: string;
};

const ResumeImportForm = (props: Props) => {
    const { className } = props;
    return (
        <div>
            <PersonalDetailsImport className='p-b-20' />
            <ProfessionalSummaryImport className='p-b-20' />
        </div>
    );
};

export default ResumeImportForm;
