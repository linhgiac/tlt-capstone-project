import React from 'react';
import { CHRONOLOGICAL_RESUME, HOW_TO_WRITE_A_RESUME, RESUME_FORMATS } from '../../../../configs/constants/blog.constants';

import HowToWriteAResume from './howToWriteAResume';
import ResumeFormats from './resumeFormats';

type ContentProps = {
    blogTitle: string;
};

const Content = (props: ContentProps) => {
    const { blogTitle } = props;
    const mapBlogTitle2Content = () => {
        switch (blogTitle) {
            case HOW_TO_WRITE_A_RESUME:
                return <HowToWriteAResume />
            case RESUME_FORMATS:
                return <ResumeFormats />
        }
    };

    return (
        <>
            {mapBlogTitle2Content()}
        </>
    );
};

export default Content;