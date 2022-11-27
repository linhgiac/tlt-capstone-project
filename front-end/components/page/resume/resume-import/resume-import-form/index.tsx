import React from 'react';
import { ResumeDataType } from '../../../../../configs/interfaces/resume.interface';
import EmploymentHistoryImport from './employment-history-import';
import PersonalDetailsImport from './personal-details-import';
import ProfessionalSummaryImport from './professional-summary-import';

type Props = {
    className?: string;
    initialValue: ResumeDataType;
};

const ResumeImportForm = (props: Props) => {
    const { className, initialValue } = props;
    const { personalDetails, professionalSummary, complexSections } =
        initialValue;
    return (
        <div>
            <PersonalDetailsImport
                className='p-b-20'
                defaultTitle='Personal Details'
                initialValue={personalDetails}
            />
            <ProfessionalSummaryImport
                className='p-b-20'
                defaultTitle='Professional Summary'
                initialValue={professionalSummary}
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
