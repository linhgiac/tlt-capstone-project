import React from 'react';
import { LikeOutlined } from '@ant-design/icons';

import styles from './styles.module.scss';

type ExpertTipProps = {
    children?: React.ReactNode
};

const ExpertTip = (props: ExpertTipProps) => {
    const { children } = props;
    return (
        <div className={styles["expert-tip-container"]}>
            <div className={styles["expert-tip-label"]}>
                <div className={styles["expert-tip-icon"]}>
                    <LikeOutlined />
                </div>
                Expert Tip
            </div>
            {children}
        </div>
    );
};

export default ExpertTip;