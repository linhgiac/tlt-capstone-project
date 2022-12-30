import React from 'react';
import { ResumeDataType } from '../../../../../configs/interfaces/resume.interface';
import EducationImport from './education-import';
import EmploymentHistoryImport from './employment-history-import';
import LinkImport from './link-import';
import PersonalDetailsImport from './personal-details-import';
import ProfessionalSummaryImport from './professional-summary-import';
import SkillImport from './skill-import';
import { get } from 'lodash';

type Props = {
    className?: string;
};

const ResumeImportForm = (props: Props) => {
    const { className } = props;

    return (
        <div>
            <PersonalDetailsImport
                className="p-b-20"
                defaultTitle="Personal Details"
            />
            <ProfessionalSummaryImport
                className="p-b-20"
                defaultTitle="Professional Summary"
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

            <SkillImport
                className="p-b-20"
                defaultTitle="Skills"
                sectionType="skills"
            />
        </div>
    );
};

export default ResumeImportForm;
