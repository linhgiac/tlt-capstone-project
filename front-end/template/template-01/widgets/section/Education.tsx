import React from 'react';
import { EducationItemDataType } from '../../../../configs/interfaces/resume.interface';
import DataDisplay from '../../../shared/DataDisplay';
import Divide from '../divide/Divide';
import styles from './section.module.scss';
import moment from 'moment';

type Props = {
    header?: string;
    items?: EducationItemDataType[];
};

const Education = (props: Props) => {
    const { header, items } = props;
    return (
        <div>
            <div>
                <Divide />
                <DataDisplay className={styles.header}>{header}</DataDisplay>
                {items?.map(item => {
                    return (
                        <>
                            <DataDisplay className={styles['title']}>
                                {item.school}
                            </DataDisplay>
                            <DataDisplay className={styles.date}>
                                {moment(item.startDate, 'YYYY/MM').format(
                                    'YYYY'
                                )}{' '}
                                -{' '}
                                {item.endDate
                                    ? moment(item.endDate, 'YYYY/MM').format(
                                          'YYYY'
                                      )
                                    : 'Now'}
                            </DataDisplay>
                            <DataDisplay className={styles.description}>
                                {item.degree}
                            </DataDisplay>
                        </>
                    );
                })}
            </div>
        </div>
    );
};

export default Education;
