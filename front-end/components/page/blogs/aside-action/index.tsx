import React from 'react';
import { TwitterOutlined, FacebookOutlined, LinkedinOutlined } from '@ant-design/icons';

import styles from './styles.module.scss';

const BlogAsideAction: React.FC = () => {
    return (
        <div className={styles.blogSharing}>
            <p className={styles.blogSharingTitle}>Share this article</p>
            <div className={styles.blogSharingList}>
                <div className={styles.blogSharingItem}>
                    <div className={styles.blogSharingIcon}>
                        <TwitterOutlined style={{ color: "#58a5e3" }} />
                    </div>
                </div>
                <div className={styles.blogSharingItem}>
                    <div className={styles.blogSharingIcon}>
                        <FacebookOutlined style={{ color: "#3b5997" }} />
                    </div>
                </div>
                <div className={styles.blogSharingItem}>
                    <div className={styles.blogSharingIcon}>
                        <LinkedinOutlined style={{ color: "#0077b5" }} />
                    </div>
                </div>
            </div>
        </div>
    )
};

export default BlogAsideAction;