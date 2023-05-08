import { isEmpty } from 'lodash';
import React from 'react';

import styles from './styles.module.scss';
import Education from './Education';
import EmploymentHistory from './EmploymentHistory';
import PersonalDetails from './PersonalDetails';
import ProfessionalSummary from './ProfessionalSummary';
import Skill from './Skill';

type Props = {
    sectionType?: any;
    header?: string;
    items?: any;
    isShown?: boolean;
};

const Section = (props: Props) => {
    const { sectionType, header, items, isShown } = props;
    if (!items && isEmpty(items)) return null;

    const mapSectionTypeToSection = () => {
        switch (sectionType) {
            case 'personalDetails': {
                return (
                    <PersonalDetails
                        header={header}
                        items={items}
                    />
                );
            }
            case 'professionalSummary': {
                return (
                    <ProfessionalSummary
                        header={header}
                        items={items}
                    />
                );
            }
            case 'employmentHistories': {
                return (
                    <EmploymentHistory
                        header={header}
                        items={items}
                    />
                );
            }
            case 'educations': {
                return (
                    <Education
                        header={header}
                        items={items}
                    />
                );
            }
            case 'skills': {
                return (
                    <Skill
                        header={header}
                        items={items}
                        isShown={isShown}
                    />
                );
            }
        }
    };
    return (
        <div className={styles['container']}>
            {/* <Divide /> */}

            {mapSectionTypeToSection()}
        </div>
    );
};

export default Section;
