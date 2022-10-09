import React from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames';

type ResumeExportResultProps = {
    className?: string;
};

const ResumeExportResult = (props: ResumeExportResultProps) => {
    const { className } = props;
    return (
        <div className={classNames(className, styles['resume-export-result'])}>
            ResumeExportResult
        </div>
    );
};

export default ResumeExportResult;
