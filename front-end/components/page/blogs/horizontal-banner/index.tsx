/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { useRouter } from 'next/router';
import { RightOutlined } from '@ant-design/icons';

import styles from './styles.module.scss';

const HorizontalBanner: React.FC = () => {
    const router = useRouter()

    return (
        <div
            className={styles["horizontal-banner-container"]}
            onClick={() => {
                router.push('/templates');
            }}
        >
            <div className={styles["horizontal-banner-main"]}>
                <div className={styles["horizontal-banner-text"]}>
                    <div className={styles["horizontal-banner-title"]}>
                        Build your resume in 15 minutes
                    </div>
                    <div className={styles["horizontal-banner-caption"]}>
                        Use professional field-tested resume templates that follow the exact 'resume rules' employers look for.
                    </div>
                </div>
            </div>
            <div className={styles["horizontal-banner-btn"]}>
                <div className={styles["horizontal-banner-btn-text"]}>
                    Create My Resume
                </div>
                <div className={styles["horizontal-banner-btn-icon"]}>
                    <RightOutlined />
                </div>
            </div>
        </div>
    );
};

export default HorizontalBanner;