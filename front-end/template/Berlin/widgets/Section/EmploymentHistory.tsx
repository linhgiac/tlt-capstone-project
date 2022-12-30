import classNames from 'classnames';
import moment from 'moment';
import React from 'react';
import { EmploymentHistoryItemDataType } from '../../../../configs/interfaces/resume.interface';
import styles from './styles.module.scss';

type Props = {
    items?: EmploymentHistoryItemDataType[];
};

const EmploymentHistory = (props: Props) => {
    const { items } = props;
    return (
        <div>
            {items?.map(item => {
                const title = () => {
                    if (item.jobTitle && item.employer)
                        return `${item.jobTitle}, ${item.employer}`;
                    else if (item.jobTitle) return `${item.jobTitle}`;
                    else if (item.employer) return `${item.employer}`;
                };
                return (
                    <div
                        key={item.position}
                        className={styles.item}>
                        <div className={classNames(styles['title-container'])}>
                            <div className={styles.title}>{title()}</div>
                            <div>{item.city}</div>
                        </div>
                        <div
                            style={{ paddingBottom: '10px', fontSize: '12px' }}>
                            {moment(item.startDate, 'YYYY/MM').format(
                                'MMM YYYY'
                            )}{' '}
                            -{' '}
                            {item.endDate
                                ? moment(item.endDate, 'YYYY/MM').format(
                                      'MMM YYYY'
                                  )
                                : 'Now'}
                        </div>
                        <div className={styles.content}>{item.description}</div>
                    </div>
                );
            })}
        </div>
    );
};

export default EmploymentHistory;
