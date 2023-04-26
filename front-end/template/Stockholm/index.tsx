import classNames from 'classnames';
import { isEmpty, get } from 'lodash';
import React from 'react';
import { useRecoilValue } from 'recoil';

import styles from './styles.module.scss';
import {
    resumeSelectedPageIndexState,
    resumeLayoutState,
} from '../../recoil-state/resume-state/resume.state';
import Masthead from './widgets/Masthead';
import Section from './widgets/Section';
import { resumeChangedValueState } from '../../recoil-state/resume-state/resume-changed-state/resume-changed-single-section.state';

type Props = {};

const Stockholm = (props: Props) => {
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
                console.log('persional Details', personalDetails);
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
                console.log('itemssssss', items);
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
                    <Masthead
                        className={styles.masthead}
                        value={personalDetails}
                    />
                    <div className="flex-row">
                        <div className={styles.main}>
                            {mapSectionToLayout('professionalSummary')}
                            {resumeLayout[0]['main'].map(
                                (type: any, i: number) => {
                                    return mapSectionToLayout(type, i);
                                }
                            )}
                        </div>
                        <div className={styles.sidebar}>
                            {mapSectionToLayout('personalDetails')}
                            {resumeLayout[0]['sidebar'].map(
                                (type: any, i: number) => {
                                    console.log('resumeLayout', resumeLayout);
                                    console.log('aaaasasadasdsas', type);
                                    return mapSectionToLayout(type, i);
                                }
                            )}
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div className="flex-row">
                        <div className={styles.main}>
                            {resumeLayout[pageIndex]['main'].map(
                                (type: any, i: number) => {
                                    return mapSectionToLayout(type, i);
                                }
                            )}
                        </div>
                        <div className={styles.sidebar}>
                            {resumeLayout[pageIndex]['sidebar'].map(
                                (type: any, i: number) => {
                                    console.log('resumeLayout', resumeLayout);
                                    console.log('aaaasasadasdsas', type);
                                    return mapSectionToLayout(type, i);
                                }
                            )}
                        </div>
                    </div>
                </>
            )}
        </>
    );

    return (
        <div className={classNames(styles.container)}>
            <Layout />
        </div>
    );
};

export default Stockholm;
