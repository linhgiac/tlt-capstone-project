import { get, isEmpty } from 'lodash';
import React from 'react';
import {
    ComplexSection,
    ComplexSectionDataType,
    ComplexSectionDetailsDataType,
    ComplexSectionItemDataType,
} from '../../../../configs/interfaces/resume.interface';
import DataDisplay from '../../../shared/DataDisplay';
import Education from './Education';
import EmploymentHistory from './EmploymentHistory';
import styles from './section.module.scss';
import Skill from './Skill';

type Props = {
    header?: string;
    sectionType?: string;
    items?: any;
    isShown?: boolean;
};
const Divide = () => {
    return (
        <div
            style={{
                width: '100%',
                height: '1px',
                backgroundColor: '#454545',
            }}></div>
    );
};

const Section = (props: Props) => {
    const { sectionType, header, items, isShown } = props;
    if (!items && isEmpty(items)) return null;

    const mapSectionTypeToSection = () => {
        switch (sectionType) {
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
