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
                initialValue={get(
                    complexSections,
                    'sectionDetails.employmentHistories'
                )}
            />
            <EducationImport
                className="p-b-20"
                defaultTitle="Education"
                sectionType="educations"
                initialValue={get(complexSections, 'sectionDetails.educations')}
            />
            <LinkImport
                className="p-b-20"
                defaultTitle="Website & Social Links"
                sectionType="links"
                initialValue={get(complexSections, 'sectionDetails.links')}
            />

            <SkillImport
                className="p-b-20"
                defaultTitle="Skills"
                sectionType="skills"
                initialValue={get(complexSections, 'sectionDetails.skills')}
            />
        </div>
    );
};

export default ResumeImportForm;
