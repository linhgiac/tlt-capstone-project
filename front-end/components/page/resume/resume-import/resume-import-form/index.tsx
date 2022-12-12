import React from 'react';
import { ResumeDataType } from '../../../../../configs/interfaces/resume.interface';
import EducationImport from './education-import';
import EmploymentHistoryImport from './employment-history-import';
import LinkImport from './link-import';
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
                className="p-b-20"
                defaultTitle="Personal Details"
                initialValue={personalDetails}
            />
            <ProfessionalSummaryImport
                className="p-b-20"
                defaultTitle="Professional Summary"
                initialValue={professionalSummary}
            />
            <EmploymentHistoryImport
                className="p-b-20"
                defaultTitle="Employment History"
                sectionType="employmentHistories"
            />
            <EducationImport
                className="p-b-20"
                defaultTitle="Education"
                sectionType="educations"
            />
            <LinkImport
                className="p-b-20"
                defaultTitle="Website & Social Links"
                sectionType="links"
            />
        </div>
    );
};

export default ResumeImportForm;
