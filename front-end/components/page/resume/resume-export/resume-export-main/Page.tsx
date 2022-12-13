import React from 'react';
import Template01 from '../../../../../template/template-01';
import styles from './pages.module.scss';

type Props = {};

const Page = (props: Props) => {
    return (
        <div
            id={'pdf'}
            className={styles.container}>
            <div className="cv-format">
                <Template01 />
            </div>
        </div>
    );
};

export default Page;
