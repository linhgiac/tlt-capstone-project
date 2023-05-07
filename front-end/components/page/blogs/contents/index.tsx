import React from 'react';
import { CHRONOLOGICAL_RESUME, HOW_TO_WRITE_A_RESUME, RESUME_FORMATS } from '../../../../configs/constants/blog.constants';
import BlogMenu from '../blog-menu';

import HowToWriteAResume from './howToWriteAResume';
import ResumeFormats from './resumeFormats';

import styles from './styles.module.scss';

type ContentProps = {
    blogTitle: string;
};

const Content = (props: ContentProps) => {
    const { blogTitle } = props;
    const mapBlogTitle2Content = () => {
        switch (blogTitle) {
            case HOW_TO_WRITE_A_RESUME:
                return <HowToWriteAResume />;
            case RESUME_FORMATS:
                return <ResumeFormats />;
        }
    };

    return (
        <>
            <div className={styles['blog-menu__tablet']}>
                <BlogMenu hasTableOfContents />
            </div>

            {mapBlogTitle2Content()}
        </>
    );
};

export default Content;