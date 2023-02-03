import classNames from 'classnames';
import { get, isElement, isEmpty } from 'lodash';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { resumeChangedValueState } from '../../recoil-state/resume-state/resume-changed-state/resume-changed-single-section.state';
import DataDisplay from '../shared/DataDisplay';
import styles from './styles.module.scss';
import Masthead from './widgets/Masthead/Masthead';
import Section from './widgets/Section';

type Props = {};

const Berlin = (props: Props) => {
    const resumeData = useRecoilValue(resumeChangedValueState);
    const { personalDetails, professionalSummary, complexSections } =
        resumeData;

    const layout: any = [
        ['personalDetails', 'skills'],
        ['professionalSummary', 'employmentHistories', 'educations'],
    ];
    const mapSectionToLayout = (key: number, sectionType: any) => {
        let header;
        let items;
        let isShownLevel;
        if (sectionType === 'personalDetails') {
            if (!isEmpty(personalDetails)) {
                header = get(personalDetails, 'header');
                items = personalDetails;
            }
        }
        if (sectionType === 'professionalSummary') {
            if (!isEmpty(professionalSummary)) {
                header = get(professionalSummary, 'header');
                items = professionalSummary;
            }
        }
        if (complexSections?.sectionType.includes(sectionType)) {
            header = get(
                complexSections,
                `sectionDetails.${sectionType}.header`
            );
            items = get(complexSections, `sectionDetails.${sectionType}.items`);
            isShownLevel = get(
                complexSections,
                `sectionDetails.${sectionType}.isShownLevel`
            );
        }
        return (
            <Section
                key={key}
                sectionType={sectionType}
                header={header}
                items={items}
                isShown={isShownLevel}
            />
        );
    };

    return (
        <div className={classNames(styles.container)}>
            <div className={styles['masthead']}>
                <Masthead value={personalDetails} />
            </div>
            <div className={classNames('flex-row', styles['content'])}>
                <div className={styles['left-side']}>
                    {layout[0].map((sectionType: any, i: number) => {
                        return mapSectionToLayout(i, sectionType);
                    })}
                </div>
                <div className={styles['right-side']}>
                    {layout[1].map((sectionType: any, i: number) => {
                        return mapSectionToLayout(i ,sectionType);
                    })}
                </div>
            </div>
        </div>
    );
};

export default Berlin;
