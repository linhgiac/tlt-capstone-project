import classNames from 'classnames';
import { isEmpty } from 'lodash';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { resumeSavedState } from '../../../../recoil-state/resume-state/resume.state';
import DataDisplay from '../../../shared/DataDisplay';
import Divide from '../divide/Divide';
import styles from './masthead.module.scss';

type Props = { value?: any };

const Masthead = (props: Props) => {
    const { value } = props;
    if (!value && isEmpty(value)) {
        return null;
    }
    const { personalDetails, professionalSummary } = value;
    return (
        <div className="w-100">
            <div className={classNames('flex-col', 'center')}>
                <DataDisplay className={styles['name']}>
                    {personalDetails?.firstName} {personalDetails?.lastName}
                </DataDisplay>
                <DataDisplay textClassName={styles['job']}>
                    {personalDetails?.jobTitle}
                </DataDisplay>
                <Divide />
            </div>
            <div>
                <div
                    className={classNames(
                        styles['info'],
                        'flex-row',
                        'center'
                    )}>
                    <DataDisplay>{personalDetails?.phone}</DataDisplay>
                    <DataDisplay>{personalDetails?.email}</DataDisplay>
                    <DataDisplay>
                        {personalDetails?.address}, {personalDetails?.city},{' '}
                        {personalDetails?.country}
                    </DataDisplay>
                    <DataDisplay>{personalDetails?.nationality}</DataDisplay>
                    <DataDisplay>{personalDetails?.placeOfBirth}</DataDisplay>
                    <DataDisplay>{personalDetails?.dateOfBirth}</DataDisplay>
                </div>
            </div>
            <div>
                <Divide />
                <DataDisplay className={styles.header}>{professionalSummary?.header}</DataDisplay>
                <DataDisplay className={styles.content}>{professionalSummary?.content}</DataDisplay>
            </div>
        </div>
    );
};

export default Masthead;
