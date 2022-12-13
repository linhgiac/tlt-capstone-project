import classNames from 'classnames';
import { get } from 'lodash';
import React, { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { ComplexSection } from '../../configs/interfaces/resume.interface';
import { resumeSavedState } from '../../recoil-state/resume-state/resume.state';
import DataDisplay from '../shared/DataDisplay';
// import WebFont from 'webfontloader';
import styles from './styles.module.scss';
import Masthead from './widgets/masthead/Masthead';
import Section from './widgets/section/Section';

type Props = {};

const Template01 = (props: Props) => {
    const layout = [
        'employmentHistories',
        'skills',
        'educations',
    ] as ComplexSection[];
    const resumeSaved = useRecoilValue(resumeSavedState);
    const { personalDetails, professionalSummary, complexSections } =
        resumeSaved;
    const masthead = { personalDetails, professionalSummary };
    return (
        <div className={classNames('cv-format', styles.container)}>
            <div className={styles['masthead']}>
                <Masthead value={masthead} />
            </div>

            {layout.map(sectionType => {
                if (complexSections?.sectionType.includes(sectionType)) {
                    const header = get(
                        complexSections,
                        `sectionDetails.${sectionType}.header`
                    );
                    const items = get(
                        complexSections,
                        `sectionDetails.${sectionType}.items`
                    );
                    const isShownLevel = get(
                        complexSections,
                        `sectionDetails.${sectionType}.isShownLevel`
                    );
                    return (
                        <Section
                            key={sectionType}
                            sectionType={sectionType}
                            header={header}
                            items={items}
                            isShown={isShownLevel}
                        />
                    );
                }
            })}
        </div>
    );
};

export default Template01;
