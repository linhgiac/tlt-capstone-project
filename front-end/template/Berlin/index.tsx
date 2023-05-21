import classNames from 'classnames';
import { get, isElement, isEmpty } from 'lodash';
import React, { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { resumeChangedValueState } from '../../recoil-state/resume-state/resume-changed-state/resume-changed-single-section.state';
import { resumeLayoutState, resumeSelectedPageIndexState } from '../../recoil-state/resume-state/resume.state';
import DataDisplay from '../shared/DataDisplay';
import styles from './styles.module.scss';
import Masthead from './widgets/Masthead/Masthead';
import Section from './widgets/Section';

type Props = {};

const Berlin = (props: Props) => {
    const resumeData = useRecoilValue(resumeChangedValueState);
    const { personalDetails, professionalSummary, complexSections } =
        resumeData;
    const pageIndex = useRecoilValue(resumeSelectedPageIndexState);
    const resumeLayout = useRecoilValue(resumeLayoutState);
    // const layout: any = [
    //     ['personalDetails', 'skills'],
    //     ['professionalSummary', 'employmentHistories', 'educations'],
    // ];
    const mapSectionToLayout = (sectionType: any, key?: number) => {
        let sectionHeader;
        let items;
        let isShownLevel;
        if (sectionType === 'personalDetails') {
            if (!isEmpty(personalDetails)) {
                const {
                    id,
                    firstName,
                    lastName,
                    jobTitle,
                    position,
                    header = 'Personal Details',
                    ...details
                } = personalDetails;
                if (
                    !isEmpty(
                        Object.values(details).filter(value => value !== '')
                    )
                ) {
                    items = details;
                }
                sectionHeader = header;
            }
        }
        if (sectionType === 'professionalSummary') {
            if (!isEmpty(professionalSummary)) {
                sectionHeader = get(professionalSummary, 'header');
                if (professionalSummary.content !== '') {
                    items = { content: professionalSummary.content };
                }
            }
        }
        if (complexSections?.sectionType.includes(sectionType)) {
            sectionHeader = get(
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
                key={key ? key : 0}
                sectionType={sectionType}
                header={sectionHeader}
                items={items}
                isShown={isShownLevel}
            />
        );
    };

    const Layout = () => (
        <>
            {' '}
            {pageIndex === 0 ? (
                <>
                    <div className={styles['masthead']}>
                        <Masthead value={personalDetails} />
                    </div>

                    <div className={classNames('flex-row', styles['content'])}>
                        <div className={styles['side-bar']}>
                            {mapSectionToLayout('personalDetails')}
                            {resumeLayout[0]['sidebar'].map(
                                (type: any, i: number) => {
                                    return mapSectionToLayout(type, i);
                                }
                            )}
                        </div>
                        <div className={styles['main']}>
                            {mapSectionToLayout('professionalSummary')}
                            {resumeLayout[0]['main'].map(
                                (type: any, i: number) => {
                                    return mapSectionToLayout(type, i);
                                }
                            )}
                        </div>
                    </div>
                </>
            ) : (
                <div className={classNames('flex-row', styles['content'])}>
                    <div className={styles['side-bar']}>
                        {resumeLayout[pageIndex]['sidebar'].map(
                            (type: any, i: number) => {
                                return mapSectionToLayout(type, i);
                            }
                        )}
                    </div>
                    <div className={styles['main']}>
                        {resumeLayout[pageIndex]['main'].map(
                            (type: any, i: number) => {
                                return mapSectionToLayout(type, i);
                            }
                        )}
                    </div>
                </div>
            )}
        </>
    );

    return (
        <div className={classNames(styles.container)}>
            <Layout />
        </div>
    );
};

export default Berlin;
