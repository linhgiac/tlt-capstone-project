import classNames from 'classnames';
import { get } from 'lodash';
import React, { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { ComplexSection } from '../../configs/interfaces/resume.interface';
import { resumeChangedValueState } from '../../recoil-state/resume-state/resume-changed-state/resume-changed-single-section.state';
import {
    resumeLayoutState,
    resumeSelectedPageIndexState,
} from '../../recoil-state/resume-state/resume.state';
import styles from './styles.module.scss';
import Masthead from './widgets/masthead/Masthead';
import Section from './widgets/section/Section';

type Props = {};

const Template01 = (props: Props) => {
    const resumeData = useRecoilValue(resumeChangedValueState);
    const { personalDetails, professionalSummary, complexSections } =
        resumeData;
    const pageIndex = useRecoilValue(resumeSelectedPageIndexState);
    const resumeLayout = useRecoilValue(resumeLayoutState);
    const masthead = { personalDetails, professionalSummary };

    return (
        <div className={classNames('cv-format', styles.container)}>
            {pageIndex === 0 && (
                <div className={styles['masthead']}>
                    <Masthead value={masthead} />
                </div>
            )}

            {resumeLayout[pageIndex]['main'].map((type: any) => {
                if (complexSections?.sectionType.includes(type)) {
                    const header = get(
                        complexSections,
                        `sectionDetails.${type}.header`
                    );
                    const items = get(
                        complexSections,
                        `sectionDetails.${type}.items`
                    );
                    const isShownLevel = get(
                        complexSections,
                        `sectionDetails.${type}.isShownLevel`
                    );

                    return (
                        <Section
                            key={type}
                            sectionType={type}
                            header={header}
                            items={items}
                            isShown={isShownLevel}
                        />
                    );
                }
            })}
            {resumeLayout[pageIndex]['sidebar'].map((type: any) => {
                if (complexSections?.sectionType.includes(type)) {
                    const header = get(
                        complexSections,
                        `sectionDetails.${type}.header`
                    );
                    const items = get(
                        complexSections,
                        `sectionDetails.${type}.items`
                    );
                    const isShownLevel = get(
                        complexSections,
                        `sectionDetails.${type}.isShownLevel`
                    );

                    return (
                        <Section
                            key={type}
                            sectionType={type}
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
