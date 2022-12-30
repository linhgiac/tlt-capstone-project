import classNames from 'classnames';
import moment from 'moment';
import React from 'react';
import { EducationItemDataType } from '../../../../configs/interfaces/resume.interface';
import styles from './styles.module.scss';

type Props = {
    header?: string;
    items?: EducationItemDataType[];
};

const Education = (props: Props) => {
    const { header, items } = props;
    return (
        <div>
            <div>{header}</div>
            {items?.map(item => {
                const title = () => {
                    if (item.school && item.degree)
                        return `${item.degree} at ${item.school}`;
                    else if (item.school) return `${item.school}`;
                    else if (item.degree) return `${item.degree}`;
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
                            {moment(item.startDate, 'YYYY/MM').format('YYYY')} -{' '}
                            {item.endDate
                                ? moment(item.endDate, 'YYYY/MM').format('YYYY')
                                : 'Now'}
                        </div>
                        <div className={styles.content}>{item.description}</div>
                    </div>
                );
            })}
        </div>
    );
};

export default Education;
