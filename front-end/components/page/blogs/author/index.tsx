import React from 'react';

import styles from './styles.module.scss';

type AuthorProps = {
    authorName: string,
    description: string,
    image: string,
};

const Author = (props: AuthorProps) => {
    const { authorName, description, image } = props;

    return (
        <div className={styles["author-container"]}>
            <div className={styles["author-img"]}>
                <img src={image} alt="author-image" />
            </div>
            <div className={styles["author-details"]}>
                <div className={styles["author-label"]}>written by</div>
                <div className={styles["author-name"]}>{authorName}</div>
                <div className={styles["author-description"]}>{description}</div>
            </div>
        </div>
    );
};

export default Author;