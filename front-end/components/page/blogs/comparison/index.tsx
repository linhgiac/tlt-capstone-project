/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import { CheckCircleTwoTone, CloseCircleTwoTone } from '@ant-design/icons';

import styles from './styles.module.scss'

type ComparisonProps = {
    doList: string[],
    dontList: string[],
}

const Comparison = (props: ComparisonProps) => {
    const { doList, dontList } = props;

    return (
        <div className={styles["comparison-container"]} >
            <div className={styles["comparison-item"]}>
                <div className={styles["comparison-title"]}>
                    <div className={styles["comparison-icon"]}>
                        <CheckCircleTwoTone twoToneColor="#329e5d"/>
                    </div>
                    <div className={styles["comparison-text"]}>
                        Do
                    </div>
                </div>
                <div className={styles["comparison-list"]}>
                    <ul style={doList.length === 1 ? { listStyle: "none" } : undefined} >
                        {doList.map((doItem, idx) => (
                            <li key={idx}>{doItem}</li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className={styles["comparison-item"]}>
                <div className={styles["comparison-title"]}>
                    <div className={styles["comparison-icon"]}>
                        <CloseCircleTwoTone twoToneColor="#fb4558" />
                    </div>
                    <div className={styles["comparison-text"]}>
                        Don't
                    </div>
                </div>
                <div className={styles["comparison-list"]}>
                    <ul style={dontList.length === 1 ? { listStyle: "none" } : undefined} >
                        {dontList.map((dontItem, idx) => (
                            <li key={idx}>{dontItem}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Comparison;