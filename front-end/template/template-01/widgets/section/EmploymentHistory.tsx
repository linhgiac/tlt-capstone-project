import React from 'react';
import Markdown from '../../../../components/custom/mark-down';
import { EmploymentHistoryItemDataType } from '../../../../configs/interfaces/resume.interface';
import DataDisplay from '../../../shared/DataDisplay';
import Divide from '../divide/Divide';
import styles from './section.module.scss';
import moment from 'moment';

type Props = {
    header?: string;
    items?: EmploymentHistoryItemDataType[];
};

const EmploymentHistory = (props: Props) => {
    const { header, items } = props;
    return (
        <div>
            <Divide />
            <DataDisplay className={styles.header}>{header}</DataDisplay>
            {items?.map(item => {
                return (
                    <>
                        <DataDisplay className={styles['title']}>
                            {item.employer} | {item.jobTitle}
                        </DataDisplay>
                        <DataDisplay className={styles.date}>
                            {moment(item.startDate, 'YYYY/MM').format(
                                'MMMM YYYY'
                            )}{' '}
                            -{' '}
                            {item.endDate
                                ? moment(item.endDate, 'YYYY/MM').format(
                                      'MMMM YYYY'
                                  )
                                : 'Now'}
                        </DataDisplay>
                        <DataDisplay className={styles.description}>
                            <Markdown>{item.description}</Markdown>
                        </DataDisplay>
                    </>
                );
            })}
        </div>
    );
};

export default EmploymentHistory;
