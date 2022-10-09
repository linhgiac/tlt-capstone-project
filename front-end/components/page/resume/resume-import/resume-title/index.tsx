import React from 'react';
import { EditableTitle } from '../../../../custom';
import styles from './styles.module.scss';

type ResumeTitleProps = {};

const ResumeTitle = (props: ResumeTitleProps) => {
    return (
        <>
            <EditableTitle className={styles['resume-title']}>
                Untitle
            </EditableTitle>
        </>
    );
};

export default ResumeTitle;
