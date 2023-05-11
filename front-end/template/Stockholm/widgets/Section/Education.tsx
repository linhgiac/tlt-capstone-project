import { IdcardOutlined } from '@ant-design/icons';
import React from 'react';

import styles from './styles.module.scss';
import DataDisplay from '../../../shared/DataDisplay';
import moment from 'moment';

type Props = {
    header?: string;
    items: any;
};
const mapDataToItemHeader = (degree: string, school: string, city: string) => {
    let result;
    if (degree) {
        if (school) {
            if (city) {
                result = `${degree} at ${school}, ${city}`;
            } else result = `${degree} at ${school}`;
        } else {
            if (city) {
                result = `${degree}, ${city}`;
            } else result = `${degree}`;
        }
    } else {
        if (school) {
            if (city) {
                result = `${school}, ${city}`;
            } else result = `${school}`;
        } else {
            if (city) {
                result = `${city}`;
            } else result = ``;
        }
    }
    return result;
};
const Education = (props: Props) => {
    const { header, items } = props;
    return (
        <DataDisplay>
            <DataDisplay
                icon={<IdcardOutlined />}
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
                                item.degree,
                                item.school,
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

export default Education;
