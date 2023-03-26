import React from 'react'

import styles from './styles.module.scss'

type FigureProps = {
    src: string,
    caption?: string,
    alt?: string,
}

const Figure = (props: FigureProps) => {
    const { src, caption, alt } = props;
    
    return (
        <div className={styles["blog-img"]} >
            <img
                src={src}
                alt={alt}
            />
            {caption && (
                <div className={styles["blog-caption"]}>
                    {caption}
                </div>
            )}
        </div>
    );
};

export default Figure;