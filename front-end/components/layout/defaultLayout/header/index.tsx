import React from 'react';
import router from 'next/router';
import styles from './styles.module.scss';

type Props = {};

const DefaultHeader = (props: Props) => {
    return (
        <div className={styles.header}>
            <div className={styles.logo} onClick={() => router.push('/')}>
                Logo
            </div>
        </div>
    );
};

export default DefaultHeader;
