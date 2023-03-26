import React from 'react';
import { TwitterOutlined, FacebookOutlined, LinkedinOutlined } from '@ant-design/icons';

import styles from './styles.module.scss';

const BlogFooterAction: React.FC = () => {
    return (
        <div className={styles["blog-action-container"]}>
            <div className={styles["blog-action-title"]}>
                Share this article
            </div>
            <div className={styles["blog-action-share-list"]}>

                <div className={styles["blog-action-share-item"]}>
                    <div className={styles["blog-action-icon"]}>
                        <TwitterOutlined style={{ color: "#58a5e3" }} />
                    </div>
                    Tweet
                </div>
                <div className={styles["blog-action-share-item"]}>
                    <div className={styles["blog-action-icon"]}>
                        <FacebookOutlined style={{ color: "#3b5997" }} />
                    </div>
                    Share
                </div>
                <div className={styles["blog-action-share-item"]}>
                    <div className={styles["blog-action-icon"]}>
                        <LinkedinOutlined style={{ color: "#0077b5" }} />
                    </div>
                    Post
                </div>
            </div>
        </div>
    );
};

export default BlogFooterAction;