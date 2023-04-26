import { ShoppingOutlined } from '@ant-design/icons';
import React from 'react';

import styles from './styles.module.scss';
import DataDisplay from '../../../shared/DataDisplay';
import moment from 'moment';

type Props = {
    header?: string;
    items: any;
};

const mapDataToItemHeader = (
    jobTitle: string,
    employer: string,
    city: string
) => {
    let result;
    if (jobTitle) {
        if (employer) {
            if (city) {
                result = `${jobTitle} at ${employer}, ${city}`;
            } else result = `${jobTitle} at ${employer}`;
        } else {
            if (city) {
                result = `${jobTitle}, ${city}`;
            } else result = `${jobTitle}`;
        }
    } else {
        if (employer) {
            if (city) {
                result = `${employer}, ${city}`;
            } else result = `${employer}`;
        } else {
            if (city) {
                result = `${city}`;
            } else result = ``;
        }
    }
    return result;
};

const EmploymentHistory = (props: Props) => {
    const { header, items } = props;
    console.log('itemssEmploy', items);
    return (
        <DataDisplay>
            <DataDisplay
                icon={<ShoppingOutlined />}
                className={styles.header}>
                {header}
                {/* <Divide className={styles.underline} /> */}
            </DataDisplay>

            {items.map((item: any, i: number) => {
                return (
                    <DataDisplay
                        key={i}
                        className={styles.item}>
                        <DataDisplay className={styles['item-header']}>
                            {mapDataToItemHeader(
                                item.jobTitle,
                                item.employer,
                                item.city
                            )}
                        </DataDisplay>
                        <DataDisplay className={styles['item-date']}>
                            {item.startDate && (
                                <>
                                    {moment(item.startDate, 'YYYY/MM').format(
                                        'MMMM YYYY'
                                    )}
                                    {' - '}
                                </>
                            )}
                            {item.endDate
                                ? moment(item.endDate, 'YYYY/MM').format(
                                      'MMMM YYYY'
                                  )
                                : `now`}
                        </DataDisplay>
                        <DataDisplay>{item.description}</DataDisplay>
                    </DataDisplay>
                );
            })}
        </DataDisplay>
    );
};

export default EmploymentHistory;
