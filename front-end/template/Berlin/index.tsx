import classNames from 'classnames';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { resumeChangedValueState } from '../../recoil-state/resume-state/resume-changed-state/resume-changed-single-section.state';
import styles from './styles.module.scss';
import Masthead from './widgets/Masthead/Masthead';

type Props = {};

const Berlin = (props: Props) => {
    const resumeData = useRecoilValue(resumeChangedValueState);

    const layout = [
        ['personalDetails', 'skills'],
        ['professionalSummary', 'employmentHistories', 'educations'],
    ];
    return (
        <div className={classNames('cv-format', styles.container)}>
            <div className={styles['masthead']}>
                <Masthead value={resumeData.personalDetails} />
            </div>
            <div className={classNames('flex-row', styles['content'])}>
                <div>Left side</div>
                <div>Right side</div>
            </div>
        </div>
    );
};

export default Berlin;
