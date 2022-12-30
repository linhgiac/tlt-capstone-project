import { get, isEmpty } from 'lodash';
import React from 'react';
import Education from './Education';
import EmploymentHistory from './EmploymentHistory';
import styles from './styles.module.scss';
import Skill from './Skill';
import PersonalDetails from './PersonalDetails';
import ProfessionalSummary from './ProfessionalSummary';
import Divide from '../../Divide';

type Props = {
    header?: string;
    sectionType?: string;
    items?: any;
    isShown?: boolean;
};

const Section = (props: Props) => {
    const { sectionType, header, items, isShown } = props;
    if (!items && isEmpty(items)) return null;

    const mapSectionTypeToSection = () => {
        switch (sectionType) {
            case 'personalDetails': {
                return <PersonalDetails items={items} />;
            }
            case 'professionalSummary': {
                return <ProfessionalSummary items={items} />;
            }
            case 'employmentHistories': {
                return <EmploymentHistory items={items} />;
            }
            case 'educations': {
                return <Education items={items} />;
            }
            case 'skills': {
                return (
                    <Skill
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
            <div className={styles.header}>
                {header}
                <Divide className={styles.underline} />
            </div>
            {mapSectionTypeToSection()}
        </div>
    );
};

export default Section;
