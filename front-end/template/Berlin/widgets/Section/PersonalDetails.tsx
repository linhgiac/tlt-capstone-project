import classNames from 'classnames';
import { remove } from 'lodash';
import React from 'react';
import DataDisplay from '../../../shared/DataDisplay';
import styles from './styles.module.scss';

type Props = {
    items?: any;
};

const PersonalDetails = (props: Props) => {
    const { items } = props;
    const keys = remove(Object.keys(items), key => {
        if (
            key === 'header' ||
            key === 'jobTitle' ||
            key === 'firstName' ||
            key === 'lastName'
        ) {
            return false;
        }
        return true;
    });
    // console.log('check', check);
    return (
        <div>
            {(keys.includes('address') ||
                keys.includes('city') ||
                keys.includes('country')) && (
                <div>
                    <div className={styles['title']}>Address</div>
                    <div className={classNames(styles['content'])}>
                        <DataDisplay>{items?.address}</DataDisplay>
                        <DataDisplay>{items?.city}</DataDisplay>
                        <DataDisplay>{items?.country}</DataDisplay>
                    </div>
                </div>
            )}
            {keys.includes('phone') && (
                <div>
                    <div className={styles['title']}>Phone</div>
                    <div className={classNames(styles['content'])}>
                        <DataDisplay>{items?.phone}</DataDisplay>
                    </div>
                </div>
            )}
            {keys.includes('email') && (
                <div>
                    <div className={styles['title']}>Email</div>
                    <div className={classNames(styles['content'])}>
                        <DataDisplay>{items?.email}</DataDisplay>
                    </div>
                </div>
            )}
            {keys.includes('nationality') && (
                <div>
                    <div className={styles['title']}>Nationality</div>
                    <div className={classNames(styles['content'])}>
                        <DataDisplay>{items?.nationality}</DataDisplay>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PersonalDetails;
